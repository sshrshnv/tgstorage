import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import styles from './layout-block.styl'

type Props = {
  header?: boolean
  wide?: boolean
  narrow?: boolean
  middle?: boolean
  group?: boolean
  reverse?: boolean
  icons?: boolean
}

export const LayoutBlock: FC<Props> = memo(({
  children,
  header,
  wide,
  narrow,
  middle,
  group,
  reverse,
  icons
}) => {
  return (
    <div class={cn(
      styles.root,
      header && styles._header,
      wide && styles._wide,
      narrow && styles._narrow,
      middle && styles._middle,
      group && styles._group,
      reverse && styles._reverse,
      icons && styles._icons
    )}>
      {children}
    </div>
  )
})
