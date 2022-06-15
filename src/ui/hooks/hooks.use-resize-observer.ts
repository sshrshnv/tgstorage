import type { RefObject } from 'preact'
import { useMemo, useEffect } from 'preact/hooks'

import { useRAFCallback, useMemoRef, useStateRef } from '~/tools/hooks'

let ResizeObserver = self.ResizeObserver

export const useResizeObserver = (
  handleElRef: RefObject<(el: ResizeObserverEntry) => void>
) => {
  const [RO, _setRO, _RORef, setRORef] = useStateRef({ ResizeObserver })

  const [_handleElements, handleElementsRef] = useRAFCallback(elements => {
    for (const el of elements) {
      handleElRef.current?.(el)
    }
  }, [handleElRef])

  const [resizeObserver, resizeObserverRef] = useMemoRef(() => {
    if (!RO.ResizeObserver) return
    return new RO.ResizeObserver(handleElementsRef.current!)
  }, [RO, handleElementsRef])

  useEffect(() => {
    if (!_RORef.current?.ResizeObserver) {
      import('resize-observer-polyfill').then((module) => {
        ResizeObserver = module.default
        setRORef.current?.({ ResizeObserver : module.default })
      })
    }

    return () => resizeObserverRef.current?.disconnect()
  }, [])

  return useMemo(() => ({
    resizeObserver
  }), [resizeObserver])
}
