import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useRef } from 'preact/hooks'
import cn from 'classnames'

import { Menu } from '~/ui/elements/menu'
import type { Props as MenuProps } from '~/ui/elements/menu'

import styles from './sidebar-title.styl'

type Props = {
  menu?: MenuProps | null
  disabled?: boolean
  offset?: boolean
}

export const SidebarTitle: FC<Props> = memo(({
  children,
  menu,
  disabled,
  offset
}) => {
  const parentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      class={cn(
        styles.root,
        disabled && styles._disabled,
        offset && styles._offset
      )}
      ref={parentRef}
    >
      <h2 class={styles.title}>
        {children}
      </h2>
      {(menu && !disabled) && (
        <Menu
          {...menu}
          class={styles.menu}
          parentRef={parentRef}
          horizontal
          withEvent
        />
      )}
    </div>
  )
})
