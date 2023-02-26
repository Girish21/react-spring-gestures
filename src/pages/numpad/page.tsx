import { useSpring, animated, useTransition } from '@react-spring/web'
import React, { ElementType } from 'react'
import { AriaButtonProps, useButton, FocusRing } from 'react-aria'
import { useForkRef } from '../../hooks'

const NUMPAD_BUTTONS = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
].flatMap(row => [...row])

const NumpadButton = React.forwardRef<
  HTMLButtonElement,
  AriaButtonProps<ElementType<HTMLButtonElement>> & { zero?: boolean }
>(({ children, onPress, onPressStart, onPressEnd, zero, ...props }, ref) => {
  const internalRef = React.useRef<HTMLButtonElement>(null)
  const forkedRef = useForkRef(ref, internalRef)

  const [style, api] = useSpring(() => ({
    borderRadius: zero ? '24px' : '50%',
    backgroundColor: '#e0f2fe',
    config: {
      tension: 300,
      friction: 30,
    },
  }))

  const { buttonProps } = useButton(
    {
      ...props,
      onPressStart: e => {
        onPressStart?.(e)

        api.stop()
        api.start({
          backgroundColor: '#3bf7a3',
          borderRadius: zero ? '24px' : '30%',
        })
      },
      onPressEnd: e => {
        onPressEnd?.(e)

        api.start({
          backgroundColor: '#e0f2fe',
          borderRadius: zero ? '24px' : '50%',
        })
      },
      onPress: async e => {
        onPress?.(e)

        api.start({
          to: async next => {
            await next({
              backgroundColor: '#3bf7a3',
              borderRadius: zero ? '24px' : '30%',
              config: {
                tension: 400,
              },
            })
            // await sleep(100)
            await next({
              backgroundColor: '#e0f2fe',
              borderRadius: zero ? '24px' : '50%',
            })
          },
        })
      },
    },
    internalRef,
  )

  return (
    <FocusRing
      focusClass='outline-none'
      focusRingClass='ring ring-offset-2 ring-blue-200 ring-offset-white'
    >
      <animated.button
        {...buttonProps}
        ref={forkedRef}
        className={`h-16 ${
          zero ? 'col-span-2' : 'w-16'
        } ring-offset touch-none select-none text-4xl font-thin text-slate-900`}
        style={style}
      >
        {children}
      </animated.button>
    </FocusRing>
  )
})
NumpadButton.displayName = 'NumpadButton'

const NumpadGrid = React.memo(
  ({ handleClick }: { handleClick: (number: number) => void }) => {
    return (
      <div className='grid grid-cols-3 gap-4'>
        {NUMPAD_BUTTONS.map(number => (
          <NumpadButton key={number} onPress={() => handleClick(number)}>
            {number}
          </NumpadButton>
        ))}
        <NumpadButton zero onPress={() => handleClick(0)}>
          0
        </NumpadButton>
        <NumpadButton onPress={() => handleClick(-1)}>C</NumpadButton>
      </div>
    )
  },
)
NumpadGrid.displayName = 'NumpadGrid'

const NumberDisplay = ({ number }: { number: string }) => {
  const formatted = new Intl.NumberFormat('en-IN').format(parseInt(number, 10))
  const transition = useTransition(
    formatted.split('').map((str, i) => ({ value: str, i })),
    {
      from: { opacity: 0, transform: 'translateY(10px)' },
      enter: { opacity: 1, transform: 'translateY(0px)' },
      leave: {
        opacity: 0,
        transform: 'translateY(-10px)',
        position: 'absolute',
      },
      keys: item => {
        if (item.value === ',') {
          return `${item.i}-comma`
        }

        let index = 0
        for (let i = 0; i < item.i; i++) {
          if (formatted[i] === ',') {
            continue
          }
          index++
        }

        return `${item.value}-${index}`
      },
      config: {
        tension: 150,
        friction: 33,
      },
    },
  )

  return (
    <div className='text-right text-5xl font-thin text-slate-900'>
      {transition((style, item) => (
        <animated.span className='inline-block' style={style}>
          {item.value}
        </animated.span>
      ))}
    </div>
  )
}

function Numpad() {
  const [number, setNumber] = React.useState<string>('0')

  const handleClick = React.useCallback((number: number) => {
    if (number === -1) {
      setNumber('0')
      return
    }

    setNumber(prevNumber => `${prevNumber}${number}`)
  }, [])

  return (
    <div className='mx-auto grid h-full w-app-content place-content-center gap-4'>
      <NumberDisplay number={number} />
      <NumpadGrid handleClick={handleClick} />
    </div>
  )
}

export default Numpad
