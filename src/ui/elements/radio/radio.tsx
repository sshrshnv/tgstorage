import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback } from 'preact/hooks'
import cn from 'classnames'

import styles from './radio.styl'

type Props = {
  name?: string
  value?: string
  options: {
    text: string
    value: string
  }[]
  disabled?: boolean
  onChange?: (value: string) => void
}

export const Radio: FC<Props> = ({
  name,
  value = '',
  options,
  disabled,
  onChange
}) => {
  const handleChange = useCallback(value => {
    if (disabled) return
    onChange?.(value)
  }, [disabled, onChange])

  return (
    <div class={styles.root}>
      {options.map(option => (
        <label
          class={cn(
            styles.option,
            value === option.value && styles._active
          )}
          key={option.value}
          onClick={() => handleChange(option.value)}
        >
          <input
            class={styles.input}
            name={name}
            type="radio"
            checked={value === option.value}
          />
          {option.text}
        </label>
      ))}
    </div>
  )
}
