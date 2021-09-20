import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback } from 'preact/hooks'
import cn from 'classnames'

import { Text } from '~/ui/elements/text'

import styles from './switch.styl'

type Props = {
  text: string
  active?: boolean
  onChange?: (value: boolean) => void
}

export const Switch: FC<Props> = memo(({
  text,
  active,
  onChange
}) => {
  const handleChange = useCallback(() => {
    onChange?.(!active)
  }, [active, onChange])

  return (
    <div class={cn(
      styles.root,
      active && styles._active
    )}>
      <Text class={styles.text}>
        {text}
      </Text>
      <div
        class={styles.control}
        onClick={handleChange}
      />
    </div>
  )
})
