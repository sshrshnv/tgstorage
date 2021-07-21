import type { Inputs, Ref } from 'preact/hooks'
import { useRef, useCallback, useEffect, useMemo } from 'preact/hooks'

export const useCallbackRef = <T extends Function>(fn: T, inputs: Inputs): [
  T,
  Ref<T>
] => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(fn, inputs)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useMemo(() => [
    callback,
    callbackRef
  ], [callback])
}
