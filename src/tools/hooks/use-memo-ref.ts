import { Ref, Inputs } from 'preact/hooks'
import { useMemo, useEffect, useRef } from 'preact/hooks'

export const useMemoRef = <T>(factory: () => T, inputs: Inputs): [
  T,
  Ref<T>
] => {
  const value = useMemo(factory, inputs)
  const valueRef = useRef(value)

  useEffect(() => {
    valueRef.current = value
  }, [value])

  return useMemo(() => [
    value,
    valueRef
  ], [value])
}
