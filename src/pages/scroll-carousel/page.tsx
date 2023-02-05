import { useScroll, useSprings, animated, useSpring } from '@react-spring/web'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { IMAGES } from '../../utils'

function ScrollCarousel() {
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 640 })
  const isDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })
  const isLargeDesktop = useMediaQuery({ minWidth: 1280 })

  const getOffset = React.useCallback(() => {
    if (isMobile) {
      return 100
    }
    if (isTablet) {
      return 400
    }
    if (isDesktop) {
      return 600
    }
    return 800
  }, [isMobile, isTablet, isDesktop])

  const [springs, api] = useSprings(
    IMAGES.length,
    i => ({
      x: getOffset() + i * 240 + i * 24,
      config: {
        mass: 1,
        tension: 500,
        friction: 15,
      },
    }),
    [getOffset],
  )
  const [diff, diffApi] = useSpring(() => ({
    x: 0,
  }))

  useScroll({
    onChange: ({ value }) => {
      api.start(i => ({
        x: getOffset() + 1000 * -value.scrollYProgress + i * 240 + i * 24,
      }))
      diffApi.start({ x: -value.scrollYProgress })
    },
  })

  return (
    <div className='h-[200vh]'>
      <div className='sticky top-[calc(50%-128px)]'>
        <div className='relative h-72 w-screen overflow-hidden'>
          {springs.map((style, i) => (
            <animated.div
              key={IMAGES[i]}
              style={style}
              className='absolute left-0 h-72 w-60 overflow-hidden rounded-lg'
            >
              <animated.img
                style={{ x: diff.x.to([0, -1], [0, -100]).to(x => x) }}
                src={IMAGES[i]}
                className='pointer-events-none relative h-full w-auto max-w-none touch-none select-none object-cover'
              />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrollCarousel
