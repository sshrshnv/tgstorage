import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import cn from 'classnames'

import styles from './text.styl'

type Props = {
  class?: string
  withLink?: boolean
  large?: boolean
  small?: boolean
  uppercase?: boolean
  ellipsis?: boolean
  capitalize?: boolean
  bold?: boolean
  center?: boolean
  grey?: boolean
  icon?: h.JSX.Element | null
}

export const Text: FC<Props> = ({
  children,
  class: className,
  withLink,
  large,
  small,
  uppercase,
  ellipsis,
  capitalize,
  bold,
  center,
  grey,
  icon
}) => {
  return (
    <span class={cn(
      className,
      styles.root,
      withLink && styles._withLink,
      large && styles._large,
      small && styles._small,
      uppercase && styles._uppercase,
      ellipsis && styles._ellipsis,
      capitalize && styles._capitalize,
      bold && styles._bold,
      center && styles._center,
      grey && styles._grey
    )}>
      {children}
      {icon}
    </span>
  )
}
