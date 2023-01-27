import * as React from 'react'

export const usePrevious = <T>(value: T) => {
  const [prev, setPrev] = React.useState<[T | null, T | null]>([null, value])

  if (prev[1] !== value) {
    setPrev([prev[1], value])
  }

  return prev[0]
}
