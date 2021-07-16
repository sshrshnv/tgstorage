import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import cn from 'classnames'

import styles from './text.styl'

type Props = {
  class?: string
  large?: boolean
  small?: boolean
  uppercase?: boolean
  ellipsis?: boolean
  bold?: boolean
  center?: boolean
  grey?: boolean
  icon?: h.JSX.Element | null
}

export const Text: FC<Props> = ({
  children,
  class: className,
  large,
  small,
  uppercase,
  ellipsis,
  bold,
  center,
  grey,
  icon
}) => {
  return (
    <span class={cn(
      className,
      styles.root,
      large && styles._large,
      small && styles._small,
      uppercase && styles._uppercase,
      ellipsis && styles._ellipsis,
      bold && styles._bold,
      center && styles._center,
      grey && styles._grey
    )}>
      {children}
      {icon}
    </span>
  )
}
