import { useCallback, useMemo, useRef, useState } from 'preact/hooks'

import { useResizeObserver } from '~/ui/hooks/use-resize-observer'
import { useIntersectionObserver } from '~/ui/hooks/use-intersection-observer'

export const PADDING = 20
export const PREVISIBILE_COUNT = 10

const initialVisibility = {
  firstIndex: 0,
  lastIndex: PREVISIBILE_COUNT
}

export const useVirtualList = () => {
  const [offsets, setOffsets] = useState<number[]>([])
  const [visibility, setVisibility] = useState(initialVisibility)
  const countRef = useRef(PREVISIBILE_COUNT)
  const heightsRef = useRef<number[]>([])
  const offsetsRef = useRef<number[]>([])
  const intersectingsRef = useRef<boolean[]>([])
  const visibilityRef = useRef(initialVisibility)

  const setHeight = useCallback((value: number, index: number) => {
    if (!value || heightsRef.current[index] === value) return
    heightsRef.current[index] = value
    const offsets = offsetsRef.current
    const newOffsets = calcOffsets()
    if (offsets.length !== newOffsets.length || newOffsets.some((value, index) => value !== offsets[index])) {
      offsetsRef.current = newOffsets
      setOffsets(newOffsets)
    }
  }, [])

  const calcOffsets = useCallback(() => {
    return heightsRef.current.map((_, index) => {
      const heightsSum = heightsRef.current
        .slice(0, index)
        .reduce((sum, value) => sum + value, 0)
      return heightsSum + (index + 1) * PADDING - PADDING
    })
  }, [])

  const setIntersecting = useCallback((value: boolean, index: number) => {
    if (intersectingsRef.current[index] === value) return
    intersectingsRef.current[index] = value
    const visibility = visibilityRef.current
    const newVisibility = calcVisibility()
    if (visibility.firstIndex !== newVisibility.firstIndex || visibility.lastIndex !== newVisibility.lastIndex) {
      visibilityRef.current = newVisibility
      setVisibility(newVisibility)
    }
  }, [])

  const calcVisibility = useCallback(() => {
    const firstIntersectingIndex = intersectingsRef.current.indexOf(true)
    const lastIntersectingIndex = intersectingsRef.current.lastIndexOf(true)
    return {
      firstIndex: Math.max(0, firstIntersectingIndex - PREVISIBILE_COUNT),
      lastIndex: Math.min(lastIntersectingIndex + PREVISIBILE_COUNT, countRef.current)
    }
  }, [])

  const { resizeObserver } = useResizeObserver((el: ResizeObserverEntry) => {
    const height = (el.contentBoxSize?.[0] || el.contentBoxSize)?.blockSize || el.contentRect.height
    const index = +(el.target.getAttribute('data-index') || '')
    setHeight(height, index)
  })

  const { intersectionObserver, intersectionElRef } = useIntersectionObserver((el: IntersectionObserverEntry) => {
    const index = +(el.target.getAttribute('data-index') || '')
    setIntersecting(el.isIntersecting, index)
  })

  return useMemo(() => ({
    offsets,
    visibility,
    resizeObserver,
    intersectionObserver,
    intersectionElRef,
    countRef
  }), [offsets, visibility, resizeObserver, intersectionObserver])
}
