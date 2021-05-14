import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useMemo } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { useTexts } from '~/core/hooks'
import { SidebarTitle } from '~/ui/elements/sidebar-title'
import { EditIcon, FolderPlusIcon } from '~/ui/icons'

type Props = {
  folder: Folder
  index: number
  disabled?: boolean
  toggleSidebarsVisibility?: (sidebar: 'folder', params: object) => void
}

export const StorageSidebarItemCategory: FC<Props> = ({
  folder,
  index,
  disabled,
  toggleSidebarsVisibility
}) => {
  const { texts } = useTexts('storage')

  const editCategory = useCallback(() => {
    toggleSidebarsVisibility?.('folder', {
      category: folder.category,
      isEditCategory: true
    })
  }, [folder, toggleSidebarsVisibility])

  const addFolder = useCallback(() => {
    toggleSidebarsVisibility?.('folder', {
      category: folder.category,
    })
  }, [folder, toggleSidebarsVisibility])

  const menu = useMemo(() => ({
    items: [index ? {
      title: texts.categoryEditTitle,
      icon: <EditIcon/>,
      onClick: editCategory
    } : null, {
      title: texts.folderAddTitle,
      icon: <FolderPlusIcon/>,
      onClick: addFolder
    }]
  }), [index, editCategory, addFolder])

  return (
    <SidebarTitle
      menu={menu}
      disabled={disabled}
    >
      {folder.category || texts.generalCategoryTitle}
    </SidebarTitle>
  )
}
