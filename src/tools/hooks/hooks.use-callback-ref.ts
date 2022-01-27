import type { Inputs, MutableRef } from 'preact/hooks'
import { useRef, useCallback, useMemo } from 'preact/hooks'

import { usePrevious } from './hooks.use-previous'

export const useCallbackRef = <T extends Function>(fn: T, inputs: Inputs): [
  T,
  MutableRef<T>
] => {
  const callback = useCallback(fn, inputs)
  const callbackRef = useRef(callback)
  const prevCallback = usePrevious(callback)

  if (prevCallback !== callback) {
    callbackRef.current = callback
  }

  return useMemo(() => [
    callback,
    callbackRef
  ], [callback])
}
