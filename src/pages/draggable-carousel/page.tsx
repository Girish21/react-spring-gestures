import * as React from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useRect } from '@reach/rect'
import { clamp } from '../../utils'

const IMAGES = [
  'https://images.unsplash.com/photo-1669751553048-d78e452fcb55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1670700880082-e3c577fa248a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
  'https://images.unsplash.com/photo-1670813347701-352337009210?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
  'https://images.unsplash.com/photo-1670979313222-310eaa2d5601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1670711454039-9c666bda8240?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
] as const

const DraggableCarousel = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const currentIndex = React.useRef(0)
  const rect = useRect(ref)

  const [springs, api] = useSprings(
    IMAGES.length,
    i => ({
      x: i * (rect?.width || 0),
      scale: (rect?.width || 0) === 0 ? 0 : 1,
      display: 'block',
    }),
    [rect],
  )

  const bind = useDrag(
    ({ active, direction: [xDir], movement: [mx], distance: [dx], cancel }) => {
      if (active && dx > (rect?.width || 0) / 3) {
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
        const x =
          (i - currentIndex.current) * (rect?.width || 0) + (active ? mx : 0)
        const scale = active ? 1 - dx / (rect?.width || 0) / 2 : 1

        return { x, scale, display: 'block' }
      })
    },
  )

  return (
    <div ref={ref} className='flex-1 overflow-hidden'>
      <div className='relative flex h-full items-center justify-center'>
        {springs.map(({ display, scale, x }, i) => (
          <animated.div
            {...bind()}
            className='absolute h-full w-full touch-none'
            style={{ x, display }}
            key={i}
          >
            <animated.div
              className='h-full w-full bg-cover bg-center bg-no-repeat shadow-2xl shadow-slate-800/80'
              style={{ scale, backgroundImage: `url(${IMAGES[i]})` }}
            />
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default DraggableCarousel
