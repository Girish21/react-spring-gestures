import * as React from 'react'

export const useForkRef = <T extends any>(
  refA: React.Ref<T> | undefined,
  refB: React.Ref<T> | undefined,
) => {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null
    }
    return (refValue: T) => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref != null) {
    ;(ref as React.MutableRefObject<T>).current = value
  }
}
