import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useRef } from 'preact/hooks'
import cn from 'classnames'

import type { Props as MenuProps } from '~/ui/elements/menu'
import { Menu } from '~/ui/elements/menu'
import { Loader } from '~/ui/elements/loader'
import { FolderIcon } from '~/ui/icons'
import { getColor } from '~/ui/styles/colors'

import styles from './sidebar-item.styl'

type Props = {
  title: string
  description: string
  emptyDescription: string
  index?: number
  menu?: MenuProps | null
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

export const SidebarItem: FC<Props> = memo(({
  title,
  description,
  emptyDescription,
  index,
  menu,
  disabled,
  loading,
  onClick
}) => {
  const elRef = useRef<HTMLDivElement>(null)
  const color = getColor(index)

  return (
    <div
      class={cn(
        styles.root,
        disabled && styles._disabled
      )}
      ref={elRef}
      onClick={onClick}
    >
      <div
        class={styles.icon}
        style={{ borderColor: color }}
      >
        <FolderIcon style={{ fill: color }}/>
      </div>
      <div class={styles.content}>
        <div class={styles.title}>
          {title}
        </div>
        {(description || emptyDescription) && (
          <div class={styles.description}>
            {description || emptyDescription}
          </div>
        )}
      </div>
      {(menu && !disabled && !loading) && (
        <Menu
          {...menu}
          class={styles.menu}
          parentRef={elRef}
        />
      )}
      {loading && (
        <Loader class={styles.loader} grey/>
      )}
    </div>
  )
})
