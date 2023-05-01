import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import * as React from 'react'

const operationsMap = {
  up: Math.floor,
  down: Math.ceil,
} as const

function Page() {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='grid h-[400px] w-[min(95%,500px)] touch-none place-content-center rounded-xl bg-gray-100'>
        <WheelContainer>
          <WheelLane>
            <WheelInput>{i => i}</WheelInput>
          </WheelLane>
          <WheelLane>
            <WheelInput>{i => i}</WheelInput>
          </WheelLane>
        </WheelContainer>
      </div>
    </div>
  )
}

function WheelContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex w-max gap-4'>
      <div className='pointer-events-none absolute -left-2 -right-2 top-[calc(50%-20px)] z-20 h-10 rounded-md bg-black mix-blend-overlay' />
      {children}
    </div>
  )
}

function WheelLane({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative w-16'>
      <div className='pointer-events-none absolute left-0 right-0 top-0 z-10 h-10 bg-gradient-to-b from-gray-100/80 to-gray-100/0 backdrop-blur-[0.3px]' />
      <div className='pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-10 bg-gradient-to-t from-gray-100/80 to-gray-100/0 backdrop-blur-[0.3px]' />
      {children}
    </div>
  )
}

function WheelInput({
  children,
}: {
  children: (i: number) => React.ReactNode
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const currentIndex = React.useRef(0)
  const [{ i }, spring] = useSpring(() => ({
    i: 0,
    config: { tension: 200, damping: 30, mass: 2 },
  }))
  const bind = useDrag(
    ({
      active,
      direction: [, yDir],
      last,
      velocity: [, vy],
      cancel,
      distance: [, dy],
    }) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          'cursor',
          active ? 'grabbing' : 'grab',
        )
      }
      if (last) {
        return
      }

      if (active && yDir !== 0 && vy > 0) {
        const op = operationsMap[yDir === 1 ? 'up' : 'down']
        if (dy < 5 && vy < 1) {
          currentIndex.current = op(currentIndex.current - yDir)
        } else {
          currentIndex.current = op(currentIndex.current - yDir * (dy * 0.1))
        }
        cancel()
        spring.start({
          i: currentIndex.current,
        })
      }
    },
    { filterTaps: true },
  )

  return (
    <animated.div
      className='transform-perspective relative h-[300px] cursor-grab touch-none select-none overflow-hidden rounded-md p-8 [perspective:1200px]'
      style={{ '--d': i } as React.CSSProperties}
      ref={containerRef}
      {...bind()}
    >
      {[...Array(36)].map((_, i) => (
        <div
          key={i}
          className='absolute left-1/2 top-[calc(50%-20px)] z-10 grid h-10 w-8 place-content-center bg-gray-100 text-gray-400 [backface-visibility:hidden]'
          style={
            {
              transform: `rotateX(calc(-5 * 2deg * calc(var(--i) - var(--d)))) translateZ(200px) translateX(-50%)`,
              '--i': i,
            } as React.CSSProperties
          }
        >
          {children(i)}
        </div>
      ))}
    </animated.div>
  )
}

export default Page
