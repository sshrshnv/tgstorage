import { useCallback, useMemo, useState, useEffect } from 'preact/hooks'

let isDragDropTouchImported = false

export const useDragReorder = (items, onReorder) => {
  const [currentIndex, setCurrentIndex] = useState<number|null>(null)
  const [nextIndex, setNextIndex] = useState<number|null>(null)

  const handleDragStart = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [setCurrentIndex])

  const handleDragEnter = useCallback((index: number) => {
    setNextIndex(index)
  }, [setNextIndex])

  const handleDragEnd = useCallback(() => {
    if (
      currentIndex === nextIndex ||
      currentIndex === null ||
      nextIndex === null
    ) {
      setCurrentIndex(null)
      setNextIndex(null)
      return
    }

    const currentItem = items[currentIndex]
    const reorderedItems = items.filter((_item, index) => index !== currentIndex)
    reorderedItems.splice(nextIndex, 0, currentItem)

    setCurrentIndex(null)
    setNextIndex(null)
    onReorder(reorderedItems)
  }, [items, onReorder, currentIndex, nextIndex])

  useEffect(() => {
    if (navigator.maxTouchPoints && !isDragDropTouchImported) {
      isDragDropTouchImported = true
      import('drag-drop-touch')
    }
  }, [])

  return useMemo(() => ({
    draggingIndex: currentIndex,
    enteringIndex: nextIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd
  }), [
    currentIndex,
    nextIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd
  ])
}
