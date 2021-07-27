import { Inputs, Ref } from 'preact/hooks'
import { useCallback, useRef, useMemo, useEffect } from 'preact/hooks'

export const useRAFCallback = <T extends Function>(fn: T, inputs: Inputs): [
  (...args: any[]) => void,
  Ref<(...args: any[]) => void>,
  Ref<() => void>
] => {
  const lastArgsRef = useRef<any[]>([])
  const frameIdRef = useRef(0)

  const callback = useCallback((...args) => {
    lastArgsRef.current = args
    if (frameIdRef.current) return

    frameIdRef.current = self.requestAnimationFrame(() => {
      frameIdRef.current = 0
      fn(...lastArgsRef.current)
    })
  }, inputs)

  const cancelCallback = useCallback(() => {
    self.cancelAnimationFrame(frameIdRef.current)
    frameIdRef.current = 0
  }, [frameIdRef])

  const callbackRef = useRef(callback)
  const cancelCallbackRef = useRef(cancelCallback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    cancelCallbackRef.current = cancelCallback
  }, [cancelCallback])

  return useMemo(() => [
    callback,
    callbackRef,
    cancelCallbackRef
  ], [callback, cancelCallbackRef])
}
