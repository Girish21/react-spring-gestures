import {
  animated,
  to,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import * as React from 'react'

import { getItemId, useItemRefs } from '../../hooks/use-items-ref'
import { clamp } from '../../utils'

function SimpleDragIndicator() {
  const nextIdxRef = React.useRef(1)
  const currentIdx = React.useRef(1)
  const { getItemProps, itemsRefs } = useItemRefs()
  const [style, api] = useSpring(() => ({
    c: 1,
    x: 0,
    width: 0,
    config: { tension: 300, friction: 60 },
  }))

  const bind = useDrag(
    ({ active, direction: [x], movement: [mx], distance: [dx], cancel }) => {
      const nextIndex = x < 0 ? currentIdx.current + 1 : currentIdx.current - 1

      if (active && dx > 80) {
        const nextIdx = clamp(nextIndex, 1, 3)
        nextIdxRef.current = nextIdx

        cancel()
      }

      const optimisticNextIndex = clamp(nextIndex, 1, 3)
      const optimisticNextEl = itemsRefs.current.get(
        getItemId(optimisticNextIndex),
      )

      const activeEl = itemsRefs.current.get(getItemId(currentIdx.current))

      const lerp = (floor: number, ceil: number, ratio: number) =>
        floor * (1 - ratio) + ceil * ratio

      const fraction = active
        ? dx /
          Math.abs(
            (optimisticNextEl?.offsetLeft ?? 0) - (activeEl?.offsetLeft ?? 0),
          )
        : 0

      api.start({
        width: lerp(
          activeEl?.offsetWidth ?? 0,
          optimisticNextEl?.offsetWidth ?? 0,
          fraction,
        ),
        x: (activeEl?.offsetLeft ?? 0) - (active ? mx : 0),
        onResolve: () => {
          currentIdx.current = nextIdxRef.current
        },
      })
    },
  )

  useIsomorphicLayoutEffect(() => {
    const activeEl = itemsRefs.current.get(getItemId(currentIdx.current))

    api.set({
      width: activeEl?.offsetWidth ?? 0,
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
          style={{
            x: style.x,
            width: style.width,
          }}
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
