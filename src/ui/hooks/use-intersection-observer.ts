import { useMemo, useEffect, useRef } from 'preact/hooks'
import rafSchedule from 'raf-schd'

export const useIntersectionObserver = (handleEl) => {
  const intersectionElRef = useRef<HTMLDivElement>(null)

  const intersectionObserver = useMemo(() =>
    intersectionElRef.current ? new IntersectionObserver(rafSchedule(elements => {
      for (const el of elements) {
        handleEl(el)
      }
    }), {
      root: intersectionElRef.current
    }) : undefined,
  [intersectionElRef.current])

  useEffect(() => {
    return () => intersectionObserver?.disconnect()
  }, [intersectionObserver])

  return useMemo(() => ({
    intersectionElRef,
    intersectionObserver
  }), [intersectionObserver])
}
