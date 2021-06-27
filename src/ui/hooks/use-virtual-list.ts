import { useCallback, useMemo, useRef, useState } from 'preact/hooks'

import { useResizeObserver } from '~/ui/hooks/use-resize-observer'
import { useIntersectionObserver } from '~/ui/hooks/use-intersection-observer'

export const PADDING = 20
export const PREVISIBILE_COUNT = 10

const initialVisibility = {
  firstIndex: 0,
  lastIndex: PREVISIBILE_COUNT,
}

export const useVirtualList = () => {
  const [offsets, setOffsets] = useState<Map<number, number>>(new Map())
  const offsetsRef = useRef<Map<number, number>>(new Map())
  const heightsRef = useRef<Map<number, number>>(new Map())
  const [visibility, setVisibility] = useState(initialVisibility)
  const visibilityRef = useRef(initialVisibility)
  const intersectingsRef = useRef<Map<number, boolean>>(new Map())
  const countRef = useRef(PREVISIBILE_COUNT)

  const setHeight = useCallback((value: number, id: number) => {
    if (!value || value === heightsRef.current.get(id)) return

    heightsRef.current.set(id, value)
    heightsRef.current = new Map([...heightsRef.current].sort((a, b) => b[0] - a[0]))

    resetOffsets()
  }, [])

  const calcOffsets = useCallback(() => {
    let heightsSum = 0

    return new Map([...heightsRef.current].map(([id, height], index) => {
      const offset = heightsSum + (index + 1) * PADDING - PADDING
      heightsSum += height
      return [id, offset]
    }))
  }, [])

  const resetOffsets = useCallback(() => {
    const offsets = offsetsRef.current
    const newOffsets = calcOffsets()

    if (
      offsets.size !== newOffsets.size ||
      [...newOffsets].some(([id, value]) => value !== offsets.get(id))
    ) {
      offsetsRef.current = newOffsets
      setOffsets(newOffsets)
    }
  }, [])

  const setIntersecting = useCallback((value: boolean, id: number) => {
    if (value) {
      const intersectings = [...intersectingsRef.current]
      const firstTrueIndex = intersectings.findIndex(([, value]) => !!value)
      const firstFalseIndex = intersectings.findIndex(([, value]) => !value)

      if (
        firstTrueIndex >=0 &&
        firstFalseIndex >=0 &&
        firstTrueIndex < firstFalseIndex &&
        id < intersectings[firstFalseIndex][0]
      ) {
        value = false
      }
    }

    intersectingsRef.current.set(id, value)
    intersectingsRef.current = new Map([...intersectingsRef.current].sort((a, b) => b[0] - a[0]))

    resetVisibility()
  }, [])

  const calcVisibility = useCallback(() => {
    const intersectingValues = [...intersectingsRef.current.values()]
    const firstIntersectingIndex = intersectingValues.indexOf(true)
    const lastIntersectingIndex = intersectingValues.lastIndexOf(true)

    return {
      firstIndex: Math.max(0, firstIntersectingIndex - PREVISIBILE_COUNT),
      lastIndex: Math.min(lastIntersectingIndex + PREVISIBILE_COUNT, countRef.current - 1)
    }
  }, [])

  const resetVisibility = useCallback(() => {
    const visibility = visibilityRef.current
    const newVisibility = calcVisibility()

    if (
      visibility.firstIndex !== newVisibility.firstIndex ||
      visibility.lastIndex !== newVisibility.lastIndex
    ) {
      visibilityRef.current = newVisibility
      setVisibility(newVisibility)
    }
  }, [])

  const onDeleteMessage = useCallback((id: number) => {
    heightsRef.current.delete(id)
    resetOffsets()

    intersectingsRef.current.delete(id)
    resetVisibility()
  }, [])

  const { resizeObserver } = useResizeObserver((el: ResizeObserverEntry) => {
    const height = (el.contentBoxSize?.[0] || el.contentBoxSize)?.blockSize || el.contentRect.height
    const id = +el.target.id
    setHeight(height, id)
  })

  const { intersectionObserver, intersectionElRef } = useIntersectionObserver((el: IntersectionObserverEntry) => {
    const id = +el.target.id
    setIntersecting(el.isIntersecting, id)
  })

  return useMemo(() => ({
    offsets,
    heights: heightsRef.current,
    visibility,
    resizeObserver,
    intersectionObserver,
    intersectionElRef,
    countRef,
    onDeleteMessage
  }), [offsets, visibility, resizeObserver, intersectionObserver, onDeleteMessage])
}
