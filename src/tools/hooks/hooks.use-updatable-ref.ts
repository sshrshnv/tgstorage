import type { MutableRef } from 'preact/hooks'
import { useRef, useMemo } from 'preact/hooks'

import { usePrevious } from './hooks.use-previous'

export const useUpdatableRef = <T>(value: T): MutableRef<T> => {
  const ref = useRef(value)
  const prevValue = usePrevious(value)

  if (prevValue !== value) {
    ref.current = value
  }

  return useMemo(() =>
    ref, [ref]
  )
}
