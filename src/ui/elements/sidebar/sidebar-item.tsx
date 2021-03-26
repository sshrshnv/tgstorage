import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { getColor } from '~/ui/styles/colors'
import { FolderIcon } from '~/ui/icons'

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
  return (
    <div class={styles.root}>
      <div class={styles.icon}>
        <FolderIcon style={{ fill: getColor(index) }}/>
      </div>
      <div class={styles.content}>
        <div class={styles.title}>{title}</div>
        <div class={styles.description}>{description}</div>
      </div>
    </div>
  )
}
