import * as React from 'react'

export const getItemId = (index: number) => `item-${index}`

export const useItemRefs = () => {
  const itemsRefs = React.useRef<Map<string, HTMLElement | null>>(new Map())

  const getItemProps = React.useCallback(
    ({
      index,
      ...props
    }: React.HTMLAttributes<HTMLElement> & { index: number }) => {
      return {
        ref: (el: HTMLElement | null) => {
          itemsRefs.current.set(getItemId(index), el)
        },
        id: getItemId(index),
        ...props,
      }
    },
    [],
  )

  return { itemsRefs, getItemProps }
}
