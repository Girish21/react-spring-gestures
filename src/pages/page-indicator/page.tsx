import * as React from 'react'
import { useSpring, a, useTransition } from '@react-spring/web'

import { usePrevious } from '../../hooks'
import { getItemId, useItemRefs } from '../../hooks/use-items-ref'

const MAX = 10

function PageIndicator() {
  const [indicatorType, setIndicatorType] = React.useState<Indicators>('square')
  const transition = useTransition(indicatorType, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
  })

  return (
    <div className='flex h-full flex-col'>
      <div className='flex justify-center'>
        <select
          value={indicatorType}
          onChange={e => {
            setIndicatorType(e.currentTarget.value as Indicators)
          }}
        >
          <option value='square'>Square</option>
          <option value='circle'>Circle</option>
          <option value='circle-line'>Circle-Line</option>
        </select>
      </div>
      <div className='grid h-full place-content-center'>
        {transition((style, item) => (
          <a.div style={style} className='flex h-full flex-col gap-6'>
            {item === 'square' && <SquareIndicator />}
            {item === 'circle' && <CircleIndicator />}
            {item === 'circle-line' && <CircleLineIndicator />}
          </a.div>
        ))}
      </div>
    </div>
  )
}

const SquareIndicator = () => {
  const { current, previousPage, setCurrent } = useSlectionState()
  const { getItemProps, itemsRefs } = useItemRefs()

  const { x } = useSpring({
    x: itemsRefs.current.get(getItemId(current))?.offsetLeft ?? 0,
  })

  return (
    <>
      <ButtonsContainer>
        <Buttons
          current={current}
          getItemProps={getItemProps}
          setCurrent={setCurrent}
        />
        <a.div
          style={{
            x,
            rotateZ: x
              .to(
                [
                  itemsRefs.current.get(getItemId(previousPage ?? 0))
                    ?.offsetLeft ?? 0,
                  itemsRefs.current.get(getItemId(current))?.offsetLeft ?? 0,
                ],
                (previousPage ?? 0) > current ? [360, 0] : [0, 360],
              )
              .to(x => x),
          }}
          className='absolute left-0 -z-10 h-8 w-8 rounded-md bg-slate-900'
        />
      </ButtonsContainer>
      <NavigationButtons setCurrent={setCurrent} />
    </>
  )
}

const CircleIndicator = () => {
  const { current, setCurrent } = useSlectionState()
  const { getItemProps, itemsRefs } = useItemRefs()

  const { x } = useSpring({
    x: itemsRefs.current.get(getItemId(current))?.offsetLeft ?? 0,
  })

  return (
    <>
      <ButtonsContainer>
        <Buttons
          current={current}
          getItemProps={getItemProps}
          setCurrent={setCurrent}
        />
        <a.div
          style={{ x }}
          className='pointer-events-auto absolute left-2 h-4 w-4 rounded-full bg-blue-600'
        />
      </ButtonsContainer>
      <NavigationButtons setCurrent={setCurrent} />
    </>
  )
}

const CircleLineIndicator = () => {
  const { current, previousPage, setCurrent } = useSlectionState()
  const { getItemProps, itemsRefs } = useItemRefs()

  const { x } = useSpring({
    x: itemsRefs.current.get(getItemId(current))?.offsetLeft ?? 0,
  })

  const previousOffsetLeft =
    itemsRefs.current.get(getItemId(previousPage ?? 0))?.offsetLeft ?? 0
  const currentOffsetLeft =
    itemsRefs.current.get(getItemId(current))?.offsetLeft ?? 0

  return (
    <>
      <ButtonsContainer>
        <Buttons
          current={current}
          getItemProps={getItemProps}
          setCurrent={setCurrent}
        />
        <a.div
          style={{
            x,
            width: x
              .to(
                (previousPage ?? 0) < current
                  ? [
                      previousOffsetLeft,
                      (previousOffsetLeft + currentOffsetLeft) / 2,
                      currentOffsetLeft,
                    ]
                  : [
                      currentOffsetLeft,
                      (previousOffsetLeft + currentOffsetLeft) / 2,
                      previousOffsetLeft,
                    ],
                [16, 32, 16],
              )
              .to(x => x),
          }}
          className='pointer-events-auto absolute left-2 h-4 w-4 rounded-full bg-blue-600'
        />
      </ButtonsContainer>
      <NavigationButtons setCurrent={setCurrent} />
    </>
  )
}

const NavigationButtons = React.memo(({ setCurrent }: SetStateProp) => {
  return (
    <div className='flex justify-center gap-6 self-center'>
      <button
        className='rounded bg-blue-500 py-2 px-4 font-bold text-white transition-colors hover:bg-blue-700'
        onClick={() => setCurrent(prev => (prev === 0 ? 0 : prev - 1))}
      >
        -
      </button>
      <button
        className='rounded bg-blue-500 py-2 px-4 font-bold text-white transition-colors hover:bg-blue-700'
        onClick={() =>
          setCurrent(prev => (prev === MAX - 1 ? MAX - 1 : prev + 1))
        }
      >
        +
      </button>
    </div>
  )
})

const Buttons = ({ getItemProps, setCurrent, current }: ButtonsProps) => {
  return (
    <>
      {Array.from({ length: MAX }).map((_, index) => (
        <button
          key={index}
          {...getItemProps({ index, onClick: () => setCurrent(index) })}
          className={`relative touch-none select-none p-4 mix-blend-plus-lighter before:absolute before:inset-2 before:rounded-full before:bg-gray-200 before:transition-colors ${
            current === index ? '' : 'before:hover:bg-gray-300'
          }`}
        />
      ))}
    </>
  )
}

const ButtonsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='relative flex items-center gap-6'>{children}</div>
}

const useSlectionState = () => {
  const [current, setCurrent] = React.useState(0)

  const previousPage = usePrevious(current)

  return { current, setCurrent, previousPage }
}

type SetStateProp = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}

type ButtonsProps = {
  current: number
  getItemProps: (
    props: React.HTMLAttributes<HTMLElement> & { index: number },
  ) => React.HTMLAttributes<HTMLElement> & { ref: (el: any) => void }
} & SetStateProp

type Indicators = 'square' | 'circle' | 'circle-line'

export default PageIndicator
