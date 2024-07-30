import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import styles from './text.styl'

type Props = {
  class?: string
  withLink?: boolean
  mCenter?: boolean
  large?: boolean
  small?: boolean
  medium?: boolean
  uppercase?: boolean
  ellipsis?: boolean
  capitalize?: boolean
  bold?: boolean
  italic?: boolean
  center?: boolean
  justify?: boolean
  grey?: boolean
  brand?: boolean
  transparent?: boolean
  icon?: h.JSX.Element | null
}

export const Text: FC<Props> = memo(({
  children,
  class: outerStyles,
  withLink,
  mCenter,
  large,
  small,
  medium,
  uppercase,
  ellipsis,
  capitalize,
  bold,
  italic,
  center,
  justify,
  grey,
  brand,
  transparent,
  icon
}) => {
  return (
    <span class={cn(
      outerStyles,
      styles.root,
      withLink && styles._withLink,
      mCenter && styles._mCenter,
      large && styles._large,
      small && styles._small,
      medium && styles._medium,
      uppercase && styles._uppercase,
      ellipsis && styles._ellipsis,
      capitalize && styles._capitalize,
      bold && styles._bold,
      italic && styles._italic,
      center && styles._center,
      justify && styles._justify,
      grey && styles._grey,
      brand && styles._brand,
      transparent && styles._transparent
    )}>
      {children}
      {icon}
    </span>
  )
})
