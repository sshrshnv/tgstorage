import type { Ref } from 'preact/hooks'
import { useRef, useEffect, useMemo } from 'preact/hooks'

export const useUpdatableRef = <T>(value: T): Ref<T> => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return useMemo(() =>
    ref, [ref]
  )
}
