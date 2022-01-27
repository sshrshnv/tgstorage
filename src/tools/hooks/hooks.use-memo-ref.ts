import type { MutableRef, Inputs } from 'preact/hooks'
import { useMemo, useRef } from 'preact/hooks'

import { usePrevious } from './hooks.use-previous'

export const useMemoRef = <T>(factory: () => T, inputs: Inputs): [
  T,
  MutableRef<T>
] => {
  const value = useMemo(factory, inputs)
  const valueRef = useRef(value)
  const prevValue = usePrevious(value)

  if (prevValue !== value) {
    valueRef.current = value
  }

  return useMemo(() => [
    value,
    valueRef
  ], [value])
}
