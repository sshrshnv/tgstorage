import type { StateUpdater, Ref, MutableRef } from 'preact/hooks'
import { useRef, useState, useMemo } from 'preact/hooks'

import { usePrevious } from './hooks.use-previous'

export const useStateRef = <T>(initialValue: T | (() => T)): [
  T,
  StateUpdater<T>,
  MutableRef<T>,
  Ref<StateUpdater<T>>,
  T
] => {
  const [value, setValue] = useState<T>(initialValue)
  const valueRef = useRef(value)
  const setValueRef = useRef(setValue)
  const prevValue = usePrevious(value)

  if (prevValue !== value) {
    valueRef.current = value
    setValueRef.current = setValue
  }

  return useMemo(() => [
    value,
    setValue,
    valueRef,
    setValueRef,
    valueRef.current
  ], [value])
}
