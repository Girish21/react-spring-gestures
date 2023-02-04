import * as React from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useRect } from '@reach/rect'
import { useMediaQuery } from 'react-responsive'

import { clamp, IMAGES } from '../../utils'

function CardCarousel() {
  const ref = React.useRef<HTMLDivElement>(null)
  const currentIndex = React.useRef(0)
  const isMobile = useMediaQuery({ maxWidth: 640 })

  const rect = useRect(ref)

  const getPosition = React.useCallback(
    (i: number) => {
      return (i - currentIndex.current) * (isMobile ? 300 : 500) + 60
    },
    [isMobile],
  )

  const getScale = React.useCallback((i: number) => {
    return Math.cos((i - currentIndex.current) * 0.6)
  }, [])

  const [springs, api] = useSprings(IMAGES.length, i => ({
    x: getPosition(i),
    scale: getScale(i),
    display:
      i < currentIndex.current - 1 || i > currentIndex.current + 1
        ? 'none'
        : 'block',
  }))

  const bind = useDrag(
    ({ direction: [xDir], active, movement: [mx], distance: [dx], cancel }) => {
      if (active && dx > (rect?.width ?? 0) / 3) {
        currentIndex.current = clamp(
          currentIndex.current + (xDir > 0 ? -1 : 1),
          0,
          IMAGES.length - 1,
        )
        cancel()
      }
      api.start(i => {
        if (i < currentIndex.current - 1 || i > currentIndex.current + 1) {
          return { display: 'none' }
        }
        return {
          x: getPosition(i) + (active ? mx : 0),
          scale: Math.cos(
            (i - currentIndex.current) * 0.6 + (active ? mx / 500 : 0),
          ),
          display: 'block',
        }
      })
    },
  )

  return (
    <div className='grid h-full place-content-center'>
      <div
        ref={ref}
        className='relative flex h-96 w-screen touch-none select-none items-center justify-start overflow-hidden p-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:z-10 before:w-4 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:bottom-0 after:w-4 after:bg-gradient-to-l after:from-white after:to-transparent sm:w-[624px]'
        {...bind()}
      >
        {springs.map((style, i) => (
          <animated.div
            key={i}
            style={style}
            className='absolute left-0 h-52 w-[300px] overflow-hidden rounded-lg sm:h-72 sm:w-[500px]'
          >
            <img
              src={IMAGES[i]}
              className='pointer-events-none h-full w-full touch-none select-none object-fill'
            />
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default CardCarousel
