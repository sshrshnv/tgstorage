import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import styles from './text.styl'

type Props = {
  large?: boolean
  small?: boolean
  uppercase?: boolean
  bold?: boolean
  center?: boolean
  grey?: boolean
  icon?: h.JSX.Element | null
}

export const Text: FC<Props> = ({
  children,
  large,
  small,
  uppercase,
  bold,
  center,
  grey,
  icon
}) => {
  return (
    <span class={cn(
      styles.root,
      large && styles._large,
      small && styles._small,
      uppercase && styles._uppercase,
      bold && styles._bold,
      center && styles._center,
      grey && styles._grey
    )}>
      { children }
      { icon }
    </span>
  )
}
