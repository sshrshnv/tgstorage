import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import cn from 'classnames'

import styles from './content-item-media-list.styl'

type Props = {
  grid?: boolean
}

export const ContentItemMediaList: FC<Props> = ({
  children,
  grid
}) => {
  return (
    <div class={cn(
      styles.root,
      grid && styles._grid
    )}>
      {children}
    </div>
  )
}
