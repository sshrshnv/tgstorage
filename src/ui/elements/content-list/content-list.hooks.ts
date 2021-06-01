import type { RefObject } from 'preact'
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
  const firstHeightIdRef = useRef(0)
  const secondHeightIdRef = useRef(0)
  const firstIntersectingIdRef = useRef(0)
  const secondIntersectingIdRef = useRef(0)

  const setHeight = useCallback((value: number, id: number, index: number) => {
    const isUnshift = checkIsUnshift(id, index, firstHeightIdRef, secondHeightIdRef)
    if (!value || (!isUnshift && heightsRef.current[index] === value)) return
    if (isUnshift) {
      unshift(heightsRef, value)
    } else {
      heightsRef.current[index] = value
    }
    resetOffsets()
  }, [])

  const calcOffsets = useCallback(() => {
    return heightsRef.current.map((_, index) => {
      const heightsSum = heightsRef.current
        .slice(0, index)
        .reduce((sum, value) => sum + value, 0)
      return heightsSum + (index + 1) * PADDING - PADDING
    })
  }, [])

  const resetOffsets = useCallback(() => {
    const offsets = offsetsRef.current
    const newOffsets = calcOffsets()
    if (offsets.length !== newOffsets.length || newOffsets.some((value, index) => value !== offsets[index])) {
      offsetsRef.current = newOffsets
      setOffsets(newOffsets)
    }
  }, [])

  const setIntersecting = useCallback((value: boolean, id: number, index: number) => {
    if (value) {
      const firstTrueIndex = intersectingsRef.current.indexOf(true)
      const firstFalseIndex = intersectingsRef.current.indexOf(false)

      if (
        firstTrueIndex >=0 &&
        firstFalseIndex >=0 &&
        firstTrueIndex < firstFalseIndex &&
        index > firstFalseIndex
      ) {
        value = false
      }
    }
    const isUnshift = checkIsUnshift(id, index, firstIntersectingIdRef, secondIntersectingIdRef)
    if (!isUnshift && intersectingsRef.current[index] === value) return
    if (isUnshift) {
      unshift(intersectingsRef, value)
    } else {
      intersectingsRef.current[index] = value
    }
    resetVisibility()
  }, [])

  const calcVisibility = useCallback(() => {
    const firstIntersectingIndex = intersectingsRef.current.indexOf(true)
    const lastIntersectingIndex = intersectingsRef.current.lastIndexOf(true)
    return {
      firstIndex: Math.max(0, firstIntersectingIndex - PREVISIBILE_COUNT),
      lastIndex: Math.min(lastIntersectingIndex + PREVISIBILE_COUNT, countRef.current - 1)
    }
  }, [])

  const resetVisibility = useCallback(() => {
    const visibility = visibilityRef.current
    const newVisibility = calcVisibility()
    if (visibility.firstIndex !== newVisibility.firstIndex || visibility.lastIndex !== newVisibility.lastIndex) {
      visibilityRef.current = newVisibility
      setVisibility(newVisibility)
    }
  }, [])

  const onDeleteMessage = useCallback((index: number) => {
    heightsRef.current.splice(index, 1)
    resetOffsets()

    intersectingsRef.current.splice(index, 1)
    resetVisibility()
  }, [])

  const { resizeObserver } = useResizeObserver((el: ResizeObserverEntry) => {
    const height = (el.contentBoxSize?.[0] || el.contentBoxSize)?.blockSize || el.contentRect.height
    const [id, index] = (el.target.getAttribute('data-id-index') || '').split('-')
    setHeight(height, +id, +index)
  })

  const { intersectionObserver, intersectionElRef } = useIntersectionObserver((el: IntersectionObserverEntry) => {
    const [id, index] = (el.target.getAttribute('data-id-index') || '').split('-')
    setIntersecting(el.isIntersecting, +id, +index)
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

const checkIsUnshift = (
  id: number,
  index: number,
  ref0: RefObject<number>,
  ref1: RefObject<number>
) => {
  const isUnshift =
    !!ref0.current &&
    index === 0 &&
    ref0.current !== id &&
    ref1.current !== id

  if (index === 0 && ref0.current !== id) {
    ref0.current = id
  }
  if (index === 1 && ref1.current !== id) {
    ref1.current = id
  }

  return isUnshift
}

const unshift = (ref: RefObject<number[]|boolean[]>, value: number|boolean) => {
  const array = ref.current || []

  for (let i = array.length; i > 0; i--) {
    array[i] = array[i - 1]
  }

  array[0] = value
}
