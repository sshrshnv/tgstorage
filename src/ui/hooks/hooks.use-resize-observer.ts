import type { RefObject } from 'preact'
import { useMemo, useEffect } from 'preact/hooks'

import { useRAFCallback, useMemoRef } from '~/tools/hooks'

const ResizeObserver = self.ResizeObserver || (await import('resize-observer-polyfill')).default

export const useResizeObserver = (
  handleElRef: RefObject<(el: ResizeObserverEntry) => void>
) => {
  const [_handleElements, handleElementsRef] = useRAFCallback(elements => {
    for (const el of elements) {
      handleElRef.current?.(el)
    }
  }, [handleElRef])

  const [resizeObserver, resizeObserverRef] = useMemoRef(() => {
    return new ResizeObserver(handleElementsRef.current)
  }, [handleElementsRef])

  useEffect(() => () => {
    resizeObserverRef.current?.disconnect()
  }, [])

  return useMemo(() => ({
    resizeObserver
  }), [resizeObserver])
}
