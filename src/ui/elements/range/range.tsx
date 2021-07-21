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
  onChange?: (value: number) => void
}

export const Range: FC<Props> = memo(({
  class: className,
  value,
  min,
  max,
  step,
  onChange
}) => {

  const handleChange = useCallback(ev => {
    const value = +ev.target.value
    onChange?.(value)
  }, [onChange])

  const [handleTouch, _handleTouchRef, cancelHandleTouchRef] = useRAFCallback((ev) => {
    const { width, left } = ev.target.getBoundingClientRect()
    const { clientX } = ev.touches[0]
    const valuePercent = Math.min(1, Math.max(0, (clientX - left) / width))
    const value = min + (max - min) * valuePercent
    onChange?.(value)
    return () => cancelHandleTouchRef.current?.()
  }, [onChange])

  return (
    <div class={cn(
      className,
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
        onChange={handleChange}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
      />
    </div>
  )
})
