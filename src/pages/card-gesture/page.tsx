import { animated, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'

const ACTIVE_SHADOW =
  '7.8px 16px 5.9px rgba(0, 0, 0, 0.021), 14.1px 28.8px 13.4px rgba(0, 0, 0, 0.032), 19px 38.7px 23.9px rgba(0, 0, 0, 0.038), 22.9px 46.8px 40.5px rgba(0, 0, 0, 0.042), 28.1px 57.4px 73.1px rgba(0, 0, 0, 0.048), 49px 100px 151px rgba(0, 0, 0, 0.07)'

function CardGesture() {
  const [style, api] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  }))

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my], last }) => {
      api.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        scale: down ? 1.1 : 1,
      })
    },
    onMove: ({ xy: [x, y], currentTarget, dragging, memo }) => {
      const { left, top, width, height } = (
        currentTarget as HTMLDivElement
      ).getBoundingClientRect()

      const dx = x - left - width / 2
      const dy = y - top - height / 2

      if (!dragging && memo?.dragging) {
        api.start({
          rotateX: 0,
          rotateY: 0,
        })
        return
      }

      api.start({
        rotateX: !dragging ? dy / 10 : 0,
        rotateY: !dragging ? -dx / 10 : 0,
      })

      return { dragging }
    },
    onHover: ({ hovering: hoverGesture }) => {
      if (!hoverGesture) {
        api.start({
          rotateX: 0,
          rotateY: 0,
        })
      }
    },
  })

  return (
    <div
      style={{ perspective: 600 }}
      className='mx-auto grid w-app-content flex-1 place-content-center'
    >
      <animated.div
        {...bind()}
        style={{ ...style, boxShadow: ACTIVE_SHADOW }}
        className='h-80 w-80 touch-none select-none rounded-3xl bg-gradient-to-r from-teal-200 to-cyan-300'
      />
    </div>
  )
}

export default CardGesture
