import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import { IMAGES } from '../../utils'

function CardFlip() {
  const [style, api] = useSpring(() => ({ rotateY: 0 }))

  const bind = useDrag(({ velocity: [vx], offset: [ox] }) => {
    api.start({
      rotateY: ox * 0.5,
    })
  })

  return (
    <div className='mx-auto grid h-full w-app-content place-content-center'>
      <div
        className='perspective-600 relative aspect-square w-[50vh] max-w-[90vw] touch-none select-none drop-shadow-2xl md:max-w-none'
        {...bind()}
      >
        <animated.div
          className='transform-perspective absolute h-full w-full touch-none select-none'
          style={style}
        >
          <img
            className='backface-hidden pointer-events-none absolute h-full w-full max-w-none touch-none select-none rounded-lg object-cover object-center'
            alt='image 1'
            src={IMAGES[0]}
          />
          <img
            className='backface-hidden rotate-Y-180 pointer-events-none absolute h-full w-full max-w-none touch-none select-none rounded-lg object-cover object-center'
            alt='image 2'
            src={IMAGES[1]}
          />
        </animated.div>
      </div>
    </div>
  )
}

export default CardFlip
