import { useCallback, useMemo, useRef } from 'preact/hooks'

import { useStateRef, useCallbackRef } from '~/tools/hooks'
import { useResizeObserver, useIntersectionObserver } from '~/ui/hooks'

export const PADDING = 20
export const PREVISIBILE_COUNT = 10

const initialVisibility = {
  firstIndex: 0,
  lastIndex: PREVISIBILE_COUNT,
}

export const useVirtualList = () => {
  const [offsets, _setOffsets, offsetsRef, setOffsetsRef] = useStateRef<Map<number, number>>(new Map())
  const [visibility, _setVisibility, visibilityRef, setVisibilityRef] = useStateRef(initialVisibility)
  const [finished, _setFinished, _finishedRef, setFinishedRef] = useStateRef(false)
  const heightsRef = useRef<Map<number, number>>(new Map())
  const intersectingsRef = useRef<Map<number, boolean>>(new Map())
  const countRef = useRef(PREVISIBILE_COUNT)

  const [_calcOffsets, calcOffsetsRef] = useCallbackRef(() => {
    let heightsSum = 0

    return new Map([...heightsRef.current].map(([id, height], index) => {
      const offset = heightsSum + (index + 1) * PADDING - PADDING
      heightsSum += height
      return [id, offset]
    }))
  }, [heightsRef])

  const [_resetOffsets, resetOffsetsRef] = useCallbackRef(() => {
    const offsets = offsetsRef.current
    const newOffsets = calcOffsetsRef.current()

    if (
      offsets.size !== newOffsets.size ||
      [...newOffsets].some(([id, value]) => value !== offsets.get(id))
    ) {
      offsetsRef.current = newOffsets
      setOffsetsRef.current?.(newOffsets)
    }
  }, [offsetsRef, calcOffsetsRef, setOffsetsRef])

  const [_setHeight, setHeightRef] = useCallbackRef((value: number, id: number) => {
    if (!value || value === heightsRef.current.get(id)) return

    heightsRef.current.set(id, value)
    heightsRef.current = new Map([...heightsRef.current].sort((a, b) => b[0] - a[0]))

    resetOffsetsRef.current()
  }, [heightsRef, resetOffsetsRef])

  const [_calcVisibility, calcVisibilityRef] = useCallbackRef(() => {
    const intersectingValues = [...intersectingsRef.current.values()]
    const firstIntersectingIndex = intersectingValues.indexOf(true)
    const lastIntersectingIndex = intersectingValues.lastIndexOf(true)

    return {
      firstIndex: Math.max(0, firstIntersectingIndex - PREVISIBILE_COUNT),
      lastIndex: Math.min(lastIntersectingIndex + PREVISIBILE_COUNT, countRef.current - 1)
    }
  }, [])

  const [_resetVisibility, resetVisibilityRef] = useCallbackRef(() => {
    const visibility = visibilityRef.current
    const newVisibility = calcVisibilityRef.current()

    if (
      visibility.firstIndex !== newVisibility.firstIndex ||
      visibility.lastIndex !== newVisibility.lastIndex
    ) {
      visibilityRef.current = newVisibility
      setVisibilityRef.current?.(newVisibility)
    }
  }, [visibilityRef, setVisibilityRef, calcVisibilityRef])

  const [_setIntersecting, setIntersectingRef] = useCallbackRef((value: boolean, id: number) => {
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

    resetVisibilityRef.current()
  }, [intersectingsRef, resetVisibilityRef])

  const onDeleteMessage = useCallback((id: number) => {
    heightsRef.current.delete(id)
    resetOffsetsRef.current()

    intersectingsRef.current.delete(id)
    resetVisibilityRef.current()
  }, [resetOffsetsRef, resetVisibilityRef])

  const [_handleResizeObserver, handleResizeObserverRef] = useCallbackRef((el: ResizeObserverEntry) => {
    const height = (el.contentBoxSize?.[0] || el.contentBoxSize)?.blockSize || el.contentRect.height
    const id = +el.target.id
    setHeightRef.current(height, id)
  }, [setHeightRef])

  const [_handleIntersectionObserver, handleIntersectionObserverRef] = useCallbackRef((el: IntersectionObserverEntry) => {
    const id = +el.target.id
    if (id) {
      setIntersectingRef.current(el.isIntersecting, id)
    } else {
      setFinishedRef.current?.(el.isIntersecting)
    }
  }, [setIntersectingRef, setFinishedRef])

  const { resizeObserver } = useResizeObserver(handleResizeObserverRef)
  const { intersectionRef, intersectionObserver } = useIntersectionObserver(handleIntersectionObserverRef)

  return useMemo(() => ({
    offsets,
    visibility,
    finished,
    resizeObserver,
    intersectionObserver,
    countRef,
    intersectionRef,
    onDeleteMessage
  }), [offsets, visibility, finished, resizeObserver, intersectionObserver, intersectionRef, onDeleteMessage])
}
