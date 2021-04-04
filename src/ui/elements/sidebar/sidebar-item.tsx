import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { Menu } from '~/ui/elements/menu'
import { FolderIcon } from '~/ui/icons'
import { getColor } from '~/ui/styles/colors'

import styles from './sidebar-item.styl'

type Props = {
  title: string
  description: string
  index?: number
}

export const SidebarItem: FC<Props> = ({
  title,
  description,
  index
}) => {
  const color = getColor(index)

  return (
    <div class={styles.root}>
      <div class={styles.icon} style={{ borderColor: color }}>
        <FolderIcon style={{ fill: color }}/>
      </div>
      <div class={styles.content}>
        <div class={styles.title}>{title}</div>
        <div class={styles.description}>{description || 'Empty'}</div>
      </div>
      <Menu/>
    </div>
  )
}
