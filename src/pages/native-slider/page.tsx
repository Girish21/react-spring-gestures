import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

const right = {
  background:
    'linear-gradient(90deg, rgba(0,140,60,1) 0%, rgba(0,218,203,1) 100%)',
  justifyContent: 'flex-start',
}

const left = {
  background:
    'linear-gradient(90deg, rgba(163,0,51,1) 0%, rgba(223,0,0,1) 100%)',
  justifyContent: 'flex-end',
}

const Slider = () => {
  const [style, api] = useSpring(() => ({
    x: 0,
    scale: 1,
    ...right,
  }))

  const bind = useDrag(({ down, movement: [x] }) => {
    api.start({
      x: down ? x : 0,
      scale: down ? 1.1 : 1,
      ...(x < 0 ? left : right),
    })
  })

  return (
    <div className='mx-auto h-full w-app-content'>
      <div className='grid h-full place-content-center'>
        <animated.div
          {...bind()}
          style={{
            backgroundImage: style.background,
            justifyContent: style.justifyContent,
          }}
          className='relative flex h-24 w-80 touch-none select-none items-center justify-start rounded-2xl px-8'
        >
          <animated.div
            style={{
              scale: style.x.to({
                range: [35, 300],
                output: [0, 1],
                map: Math.abs,
                extrapolate: 'clamp',
              }),
            }}
            className='h-10 w-10 rounded-full bg-white'
          />
          <animated.div
            className='absolute left-0 grid h-full w-full place-content-center rounded-2xl bg-stone-800 text-3xl text-white'
            style={{ x: style.x, scale: style.scale }}
          >
            Slide
          </animated.div>
        </animated.div>
      </div>
    </div>
  )
}

export default Slider
