import type { StateUpdater, Ref } from 'preact/hooks'
import { useRef, useState, useEffect, useMemo } from 'preact/hooks'

export const useStateRef = <T>(initialValue: T | (() => T)): [
  T,
  StateUpdater<T>,
  Ref<T>,
  Ref<StateUpdater<T>>,
  T
] => {
  const [value, setValue] = useState<T>(initialValue)
  const valueRef = useRef(value)
  const setValueRef = useRef(setValue)

  useEffect(() => {
    valueRef.current = value
    setValueRef.current = setValue
  }, [value])

  return useMemo(() => [
    value,
    setValue,
    valueRef,
    setValueRef,
    valueRef.current
  ], [value])
}
