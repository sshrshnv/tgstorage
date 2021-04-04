import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { SidebarItem } from '~/ui/elements/sidebar'

type Props = {
  id?: number
  index?: number
  title: string
}

export const StorageFolderItem: FC<Props> = ({
  id,
  index,
  title
}) => {
  return (
    <SidebarItem
      title={title}
      description=""
      index={index}
    />
  )
}
