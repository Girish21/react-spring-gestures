import * as Slider from '@radix-ui/react-slider'
import { animated, to, useSpring } from '@react-spring/web'

function ColorPicker() {
  const [style, api] = useSpring(() => ({
    value: 0,
  }))

  const r = style.value.to({
    range: [0, 60, 120, 180, 240, 300, 360],
    output: [255, 255, 0, 0, 0, 255, 255],
  })

  const g = style.value.to({
    range: [0, 60, 120, 180, 240, 300, 360],
    output: [0, 255, 255, 255, 0, 0, 0],
  })

  const b = style.value.to({
    range: [0, 60, 120, 180, 240, 300, 360],
    output: [0, 0, 0, 255, 255, 255, 0],
  })

  return (
    <div className='mx-auto w-app-content flex-1'>
      <div className='grid h-full place-content-center gap-y-6 bg-gradient-to-r from-blue-700 to-cyan-800'>
        <animated.div
          className='relative h-40 w-80'
          style={{
            backgroundColor: to(
              [r, g, b],
              (r, g, b) => `rgb(${r}, ${g}, ${b})`,
            ),
          }}
        >
          <div className='absolute h-full w-full bg-gradient-to-r from-white to-transparent' />
          <div className='absolute h-full w-full bg-gradient-to-b from-transparent to-black' />
        </animated.div>
        <Slider.Root
          min={0}
          max={360}
          className='relative flex h-4 w-80 touch-none select-none items-center rounded-sm bg-color-strip'
          onValueChange={([value]) => {
            api.start({ value, immediate: true })
          }}
        >
          <Slider.Thumb>
            <span className='relative block h-8 w-3 rounded border-2 border-black bg-transparent' />
          </Slider.Thumb>
        </Slider.Root>
      </div>
    </div>
  )
}

export default ColorPicker
