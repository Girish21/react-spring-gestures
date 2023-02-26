import {
  useSpring,
  animated,
  useIsomorphicLayoutEffect,
} from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import * as React from 'react'

import { getItemId, useItemRefs } from '../../hooks/use-items-ref'
import { clamp } from '../../utils'

function SimpleDragIndicator() {
  const currentIdx = React.useRef(1)
  const { getItemProps, itemsRefs } = useItemRefs()
  const [style, api] = useSpring(() => ({
    width: 0,
    x: 0,
    config: { tension: 300, friction: 60 },
  }))

  const bind = useDrag(
    ({ active, direction: [x], movement: [mx], distance: [dx], cancel }) => {
      if (active && dx > 60) {
        const nextIdx = clamp(
          x < 0 ? currentIdx.current + 1 : currentIdx.current - 1,
          1,
          3,
        )
        currentIdx.current = nextIdx
        cancel()
      }
      const activeEl = itemsRefs.current.get(getItemId(currentIdx.current))
      const activeElBoundingRect = activeEl?.getBoundingClientRect()

      api.start({
        width: activeElBoundingRect?.width ?? 0,
        x: (activeEl?.offsetLeft ?? 0) - (active ? mx : 0),
      })
    },
  )

  useIsomorphicLayoutEffect(() => {
    const activeEl = itemsRefs.current.get(getItemId(currentIdx.current))
    const activeElBoundingRect = activeEl?.getBoundingClientRect()
    api.set({
      width: activeElBoundingRect?.width ?? 0,
      x: activeEl?.offsetLeft ?? 0,
    })
  }, [])

  return (
    <div className='mx-auto grid h-full w-app-content place-content-center gap-4'>
      <div className='relative flex items-center gap-4'>
        <div {...getItemProps({ index: 1 })}>Tab 1</div>
        <div {...getItemProps({ index: 2 })}>Tab 2</div>
        <div {...getItemProps({ index: 3 })}>Tab Very Long Name 3</div>
        <animated.div
          className='absolute left-0 bottom-0 h-0.5 bg-red-600'
          style={style}
        />
      </div>
      <div
        {...bind()}
        className='h-64 w-72 cursor-grab touch-none select-none border-2 border-dashed border-blue-700 bg-blue-300'
      />
    </div>
  )
}

export default SimpleDragIndicator
