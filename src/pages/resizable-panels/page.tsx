import * as React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { clamp } from '../../utils'

const Panel = ({
  children,
  initialSize,
  minSize,
  maxSize,
  direction = 'horizontal',
}: {
  children: React.ReactNode
  initialSize: number
  minSize: number
  maxSize: number
  direction?: 'horizontal' | 'vertical'
}) => {
  const [firstChild, secondChild] = React.Children.toArray(children)

  const [{ size, active }, api] = useSpring(() => ({
    size: initialSize,
    active: 0,
  }))

  const bind = useDrag(({ down, delta: [dx, dy], memo = size.get() }) => {
    memo = clamp(
      memo + (direction === 'horizontal' ? dx : dy),
      minSize,
      maxSize,
    )

    api.start({ size: memo, immediate: down })

    if (down) {
      document.documentElement.style.cursor = 'grabbing'
      api.start({ active: 1 })
    } else {
      document.documentElement.style.cursor = ''
      api.start({ active: 0 })
    }

    return memo
  })

  const sizeProperty = direction === 'horizontal' ? 'width' : 'height'

  return (
    <div
      className={`relative flex ${
        direction === 'horizontal'
          ? 'h-full flex-row'
          : 'h-full w-full flex-col'
      }`}
    >
      <animated.div style={{ [sizeProperty]: size }}>{firstChild}</animated.div>
      <animated.div
        style={{
          opacity: active.interpolate({ range: [0, 1], output: [0, 1] }),
        }}
        className={`${
          direction === 'horizontal' ? 'h-full w-2' : 'h-2 w-full'
        } touch-none bg-red-600`}
        {...bind()}
      />
      <div className='flex-1'>{secondChild}</div>
    </div>
  )
}

const ResizablePanel = () => {
  return (
    <div className='mx-auto w-app-content flex-1'>
      <Panel initialSize={250} minSize={100} maxSize={300}>
        <div className='h-full bg-blue-500' />
        <Panel initialSize={300} minSize={100} maxSize={400}>
          <div className='h-full bg-gray-500' />
          <div className='h-full bg-green-500' />
        </Panel>
      </Panel>
    </div>
  )
}

export default ResizablePanel
