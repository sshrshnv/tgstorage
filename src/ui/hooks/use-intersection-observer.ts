import type { RefObject } from 'preact'
import { useMemo, useEffect, useState, useCallback } from 'preact/hooks'

import { useRAFCallback, useMemoRef } from '~/tools/hooks'

export const useIntersectionObserver = (
  handleElRef: RefObject<(el: IntersectionObserverEntry) => void>
) => {
  const [intersectionEl, setIntersectionEl] = useState<HTMLDivElement|null>(null)

  const intersectionRef = useCallback(el => {
    setIntersectionEl(el)
  }, [])

  const [_handleElements, handleElementsRef] = useRAFCallback(elements => {
    for (const el of elements) {
      handleElRef.current?.(el)
    }
  }, [handleElRef])

  const [intersectionObserver, intersectionObserverRef] = useMemoRef(() => {
    return intersectionEl ? new IntersectionObserver(handleElementsRef.current, {
      root: intersectionEl
    }) : undefined
  }, [intersectionEl, handleElementsRef])

  useEffect(() => () => {
    intersectionObserverRef.current?.disconnect()
  }, [])

  return useMemo(() => ({
    intersectionRef,
    intersectionObserver
  }), [intersectionRef, intersectionObserver])
}
