import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import styles from './content-wrapper.styl'

type Props = {
  active: boolean
}

export const ContentWrapper: FC<Props> = ({
  children,
  active
}) => {
  return (
    <div class={cn(
      styles.root,
      active && styles._active
    )}>
      { children }
    </div>
  )
}
