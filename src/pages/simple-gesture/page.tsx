import * as React from 'react'
import { useDrag } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
import { useRect } from '@reach/rect'

function Gesture() {
  const ref = React.useRef<HTMLDivElement>(null)
  const rect = useRect(ref)

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ offset: [mx, my] }) => {
      api.start({ x: mx, y: my })
    },
    {
      bounds: {
        top: 0,
        right: (rect?.width ?? 0) - 64,
        bottom: (rect?.height ?? 0) - (rect?.top ?? 0),
        left: 0,
      },
      rubberband: true,
    },
  )

  return (
    <>
      <div
        ref={ref}
        className='pointer-events-none absolute inset-0 -z-10 border-8 border-dashed border-sky-500 bg-blue-200'
      />
      <a.div
        className='h-16 w-16 touch-none rounded-md bg-orange-500'
        style={{ x, y }}
        {...bind()}
      />
    </>
  )
}

function SimpleGesturePage() {
  return (
    <div className='relative mx-auto w-app-content flex-1'>
      <Gesture />
    </div>
  )
}

export default SimpleGesturePage
