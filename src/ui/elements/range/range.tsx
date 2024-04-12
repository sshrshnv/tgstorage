import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback } from 'preact/hooks'
import cn from 'classnames'

import { useRAFCallback } from '~/tools/hooks'

import styles from './range.styl'

type Props = {
  class?: string
  value: number
  min: number
  max: number
  step: number
  onChange?: (value: number, type: string) => void
}

export const Range: FC<Props> = memo(({
  class: outerStyles,
  value,
  min,
  max,
  step,
  onChange
}) => {
  const stopPropagation = useCallback(ev => {
    ev.stopImmediatePropagation()
  }, [])

  const [handleTouch, _handleTouchRef, cancelHandleTouchRef] = useRAFCallback((ev) => {
    ev.stopImmediatePropagation()
    const { type, pointerType, pressure, target, clientX } = ev
    if (type === 'pointermove' && pointerType === 'mouse' && !pressure) return

    const { width, left } = target.getBoundingClientRect()
    const valuePercent = Math.min(1, Math.max(0, (clientX - left) / width))
    const value = min + (max - min) * valuePercent
    onChange?.(value, type)

    return () => cancelHandleTouchRef.current?.()
  }, [onChange])

  return (
    <div class={cn(
      outerStyles,
      styles.root
    )}>
      <progress
        class={styles.progress}
        value={value}
        min={min}
        max={max}
        step={step}
      />
      <input
        class={styles.input}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onPointerDown={stopPropagation}
        onPointerUp={handleTouch}
        onPointerMove={handleTouch}
      />
    </div>
  )
})
