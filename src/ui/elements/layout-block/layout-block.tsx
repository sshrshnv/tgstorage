import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import styles from './layout-block.styl'

type Props = {
  narrow?: boolean
  group?: boolean
  reverse?: boolean
}

export const LayoutBlock: FC<Props> = memo(({
  children,
  narrow,
  group,
  reverse,
}) => {
  return (
    <div class={cn(
      styles.root,
      narrow && styles._narrow,
      group && styles._group,
      reverse && styles._reverse
    )}>
      {children}
    </div>
  )
})
