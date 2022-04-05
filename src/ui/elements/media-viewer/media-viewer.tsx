import type { FunctionComponent as FC, RefObject } from 'preact'
import { h } from 'preact'
import { memo, createPortal } from 'preact/compat'
import { useCallback, useEffect, useRef } from 'preact/hooks'
import cn from 'classnames'
import PointerTracker from 'pointer-tracker'

import type { DisplaySize } from '~/ui/hooks'
import { useRAFCallback } from '~/tools/hooks'
import { Slide, useSlide } from '~/ui/elements/slide'
import { Fullscreen } from '~/ui/elements/fullscreen'
import { Button } from '~/ui/elements/button'
import { Text } from '~/ui/elements/text'

import styles from './media-viewer.styl'

type Props = {
  name?: string
  size: number
  displaySize: DisplaySize
  mediaElRef?: RefObject<HTMLImageElement>
  isFirst?: boolean
  isLast?: boolean
  isFullscreen: boolean
  isFakeFullscreen?: boolean
  transformRef: RefObject<Transform>
  setTransformRef: RefObject<(transform: Transform) => void>
  setTransitionRef: RefObject<(transition: boolean) => void>
  showNextRef: RefObject<() => void>
  showPrevRef: RefObject<() => void>
  onFullscreenChange: (value: boolean, fake?: boolean) => void
  onClose: () => void
}

export type Transform = {
  x: number
  y: number
  scale: number
}

export const INITIAL_TRANSFORM: Transform = {
  x: 0,
  y: 0,
  scale: 1
}

type IntitialCenter = {
  x: number
  y: number
} | null

const bodyEl = self.document.body

const MIN_SCALE = 0.1
const MAX_SCALE = 10

export const MediaViewer: FC<Props> = memo(({
  children,
  name,
  displaySize,
  mediaElRef,
  isFirst,
  isLast,
  isFullscreen,
  isFakeFullscreen,
  transformRef,
  setTransformRef,
  setTransitionRef,
  showNextRef,
  showPrevRef,
  onFullscreenChange,
  onClose
}) => {
  const { closeSlide, closeSlideRef } = useSlide()
  const mediaViewerElRef = useRef<HTMLDivElement>(null)
  const sliderElRef = useRef<HTMLDivElement>(null)
  const pointerTrackerRef = useRef<PointerTracker|null>(null)
  const startCenterRef = useRef<IntitialCenter|null>(null)
  const startTransformRef = useRef<Transform|null>(null)
  const currentTransformRef = useRef<Transform|null>(null)
  const currentScaleRef = useRef(1)
  const isCurrentScaleRef = useRef(false)
  const isTranslationAvailableRef = useRef(true)

  const [_updateTransform, updateTransformRef, cancelUpdateTransformRef] = useRAFCallback((
    transform: Transform,
    { correct = false, cache = false } = {}
  ) => {
    if (correct) {
      transform = {
        ...transform,
        ...correctTranslation(transform, displaySize, mediaElRef)
      }
    }
    transform = {
      x: +transform.x.toFixed(2),
      y: +transform.y.toFixed(2),
      scale: Math.max(Math.min(+transform.scale.toFixed(3), MAX_SCALE), MIN_SCALE)
    }
    if (cache) {
      currentTransformRef.current = transform
    }
    setTransformRef.current?.(transform)
  }, [])

  const reset = useCallback(({ timeout = false } = {}) => {
    updateTransformRef.current?.(INITIAL_TRANSFORM)
    currentTransformRef.current = null
    startTransformRef.current = null
    currentScaleRef.current = 1
    isCurrentScaleRef.current = false
    if (timeout) {
      setTimeout(() => {
        isTranslationAvailableRef.current = true
      }, 300)
    } else {
      isTranslationAvailableRef.current = true
    }
  }, [])

  const showNext = useCallback(() => {
    isTranslationAvailableRef.current = false
    setTransitionRef.current?.(true)
    showNextRef.current?.()
    reset({ timeout: true })
  }, [])

  const showPrev = useCallback(() => {
    isTranslationAvailableRef.current = false
    setTransitionRef.current?.(true)
    showPrevRef.current?.()
    reset({ timeout: true })
  }, [])

  useEffect(() => {
    const sliderEl = sliderElRef.current
    if (!sliderEl) return

    pointerTrackerRef.current = new PointerTracker(sliderEl, {
      start: (_pointer, ev) => {
        setTransitionRef.current?.(false)
        currentTransformRef.current = null
        startTransformRef.current = transformRef.current || INITIAL_TRANSFORM
        ev.stopPropagation()
        ev.preventDefault()
        return true
      },
      move: () => {
        if (checkIsScale(pointerTrackerRef)) {
          if (!mediaElRef?.current) return
          if (!isCurrentScaleRef.current) {
            isCurrentScaleRef.current = true
          }
          if (!startCenterRef.current) {
            startCenterRef.current = calcStartCenter(pointerTrackerRef)
          }
          const scaleK = calcScale(pointerTrackerRef)
          const startTransform = startTransformRef.current || INITIAL_TRANSFORM
          currentScaleRef.current = startTransform.scale * scaleK
          updateTransformRef.current?.({
            x: startTransform.x + (displaySize.width / 2 - startCenterRef.current.x) * scaleK,
            y: startTransform.y + (displaySize.height / 2 - startCenterRef.current.y) * scaleK,
            scale: startTransform.scale * scaleK
          }, {
            correct: true,
            cache: true
          })
          return
        }
        if (!isTranslationAvailableRef.current) return
        if (checkIsTranslation(pointerTrackerRef)) {
          const { x, y } = calcTranslation(pointerTrackerRef)
          const startTransform = currentTransformRef.current || startTransformRef.current || INITIAL_TRANSFORM
          if (isCurrentScaleRef.current && (startTransform.scale > 1 || currentScaleRef.current > 1)) {
            updateTransformRef.current?.({
              x: startTransform.x + x,
              y: startTransform.y + y,
              scale: currentScaleRef.current || startTransform.scale
            }, {
              correct: true
            })
          } else {
            updateTransformRef.current?.({ ...INITIAL_TRANSFORM, x })
          }
          return
        }
      },
      end: () => {
        if (startCenterRef.current) {
          startCenterRef.current = null
        }
        if (isCurrentScaleRef.current) {
          if (currentScaleRef.current <= 1) {
            isTranslationAvailableRef.current = false
            setTransitionRef.current?.(true)
            reset({ timeout: true })
          }
        } else if (isTranslationAvailableRef.current) {
          const { x = 0 } = transformRef.current || {}
          if (Math.abs(x) > 50) {
            x < 0 ? showNext() : showPrev()
          } else {
            setTransitionRef.current?.(true)
            reset()
          }
        } else {
          setTransitionRef.current?.(true)
          reset()
        }
      }
    })

    const handleWheel = ev => {
      ev.preventDefault()
      if (!mediaElRef?.current) return
      setTransitionRef.current?.(false)
      if (!isCurrentScaleRef.current) {
        isCurrentScaleRef.current = true
      }
      const { ctrlKey, deltaMode } = ev
      let { deltaY } = ev
      if (deltaMode === 1) {
        deltaY *= 15
      }
      const divisor = ctrlKey ? 100 : 300
      const scaleK = 1 - deltaY / divisor
      const startTransform = transformRef.current || INITIAL_TRANSFORM
      currentScaleRef.current = startTransform.scale * scaleK
      updateTransformRef.current?.(currentScaleRef.current <= 1 ? INITIAL_TRANSFORM : {
        x: startTransform.x,
        y: startTransform.y,
        scale: startTransform.scale * scaleK
      })
      if (currentScaleRef.current <= 1) {
        setTransitionRef.current?.(true)
      }
    }

    const handleKeyDown = ev => {
      if (ev.defaultPrevented) return
      switch(ev.key) {
        case 'ArrowLeft':
          showPrev()
          break
        case 'ArrowRight':
          showNext()
          break
        case 'Escape':
          closeSlideRef.current?.()
          break
      }
      //ev.preventDefault()
    }

    self.document.addEventListener('keydown', handleKeyDown)
    sliderEl.addEventListener('wheel', handleWheel)

    return () => {
      self.document.removeEventListener('keydown', handleKeyDown)
      sliderEl.removeEventListener('wheel', handleWheel)
      pointerTrackerRef.current?.stop()
      cancelUpdateTransformRef.current?.()
    }
  }, [])

  return createPortal((
    <Slide
      name="mediaViewer"
      class={cn(
        styles.root,
        isFullscreen && 'fullscreen',
        (isFullscreen && isFakeFullscreen) && 'fakeFullscreen'
      )}
      forwardedRef={mediaViewerElRef}
      onClose={onClose}
    >
      <div
        class={cn(
          styles.slider
        )}
        ref={sliderElRef}
      >
        {children}
      </div>

      <div class={styles.header}>
        <Button
          class={styles.backButton}
          icon="back"
          square
          onClick={closeSlide}
        />
        <Text ellipsis>
          {name}
        </Text>
        <Button
          class={styles.closeButton}
          icon="cross"
          square
          onClick={closeSlide}
        />
      </div>

      {!isFirst && (
        <Button
          class={cn(styles.navButton, styles._left)}
          icon="arrow"
          square
          onClick={showPrev}
        />
      )}
      {!isLast && (
        <Button
          class={cn(styles.navButton, styles._right)}
          icon="arrow"
          square
          onClick={showNext}
        />
      )}

      <Fullscreen
        isFullscreen={isFullscreen}
        forwardedRef={mediaViewerElRef}
        onChange={onFullscreenChange}
      />
    </Slide>
  ), bodyEl)
})

const getPointers = (pointerTrackerRef: RefObject<PointerTracker>): PointerTracker =>
  pointerTrackerRef.current! || {}

const checkIsScale = (pointerTrackerRef: RefObject<PointerTracker>) => {
  const { startPointers, currentPointers } = getPointers(pointerTrackerRef)
  return startPointers?.length === 2 && currentPointers?.length === 2
}

const checkIsTranslation = (pointerTrackerRef: RefObject<PointerTracker>) => {
  const { startPointers, currentPointers } = getPointers(pointerTrackerRef)
  return startPointers?.length === 1 && currentPointers?.length === 1
}

const calcScale = (pointerTrackerRef: RefObject<PointerTracker>) => {
  const { startPointers, currentPointers } = getPointers(pointerTrackerRef)
  const [startDistance, currentDistance] = [startPointers, currentPointers].map(pointers => {
    const [p0, p1] = pointers
    if (!p0 || !p1) return 0
    return Math.sqrt((p1.clientX - p0.clientX) ** 2 + (p1.clientY - p0.clientY) ** 2)
  })
  if (!startDistance || !currentDistance) return 1
  return currentDistance / startDistance
}

const calcTranslation = (pointerTrackerRef: RefObject<PointerTracker>) => {
  const { startPointers, currentPointers } = getPointers(pointerTrackerRef)
  let x = 0
  let y = 0

  startPointers?.forEach(pointer => {
    const currentPointer = currentPointers?.find(({ id }) => id === pointer.id)
    if (!currentPointer) return

    x = currentPointer.clientX - pointer.clientX
    y = currentPointer.clientY - pointer.clientY
  })

  return { x, y }
}

const calcStartCenter = (pointerTrackerRef: RefObject<PointerTracker>) => {
  const { startPointers } = getPointers(pointerTrackerRef)
  return {
    x: startPointers.length !== 2 ? 0 : startPointers[0].clientX + (startPointers[1].clientX - startPointers[0].clientX) / 2,
    y: startPointers.length !== 2 ? 0 : startPointers[0].clientY + (startPointers[1].clientY - startPointers[0].clientY) / 2
  }
}

const correctTranslation = (
  transform: Transform,
  displaySize: DisplaySize,
  mediaElRef?: RefObject<HTMLImageElement>
) => {
  const mediaEl = mediaElRef?.current
  if (!mediaEl) return transform

  const { width, height } = mediaEl.getBoundingClientRect()
  let { x, y } = transform
  x = width <= displaySize.width ? 0 : x / Math.abs(x) * Math.min(Math.abs(x), (width - displaySize.width) / 2)
  y = height <= displaySize.height ? 0 : y / Math.abs(y) * Math.min(Math.abs(y), (height - displaySize.height) / 2)

  return { x, y }
}
