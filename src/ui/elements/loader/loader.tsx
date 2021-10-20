import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import styles from './loader.styl'

type Props = {
  class?: string
  brand?: boolean
  grey?: boolean
  white?: boolean
  big?: boolean
  small?: boolean
  progress?: number
  contrast?: boolean
}

export const Loader: FC<Props> = memo(({
  class: className,
  brand,
  grey,
  white,
  big,
  small,
  progress,
  contrast
}) => {
  return (
    <div class={cn(
      className,
      styles.root,
      big && styles._big,
      small && styles._small,
      contrast && styles._contrast
    )}>
      <div class={cn(
        styles.icon,
        brand && styles._brand,
        grey && styles._grey,
        white && styles._white
      )}/>
      {typeof progress === 'number' && (
        <div class={styles.progress}>
          {progress}%
        </div>
      )}
    </div>
  )
})
