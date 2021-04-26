import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useMemo } from 'preact/hooks'

import type { Folders } from '~/core/store'
import { useTexts } from '~/core/hooks'
import { SidebarTitle } from '~/ui/elements/sidebar-title'

type Props = {
  folder: Folders[0]
  index: number
  toggleSidebarsVisibility?: (sidebar: 'folder', params: object) => void
}

export const StorageSidebarCategory: FC<Props> = ({
  folder,
  index,
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
      onClick: editCategory
    } : null, {
      title: texts.folderAddTitle,
      onClick: addFolder
    }]
  }), [index, editCategory, addFolder])

  return (
    <SidebarTitle
      menu={menu}
    >
      {folder.category || texts.generalCategoryTitle}
    </SidebarTitle>
  )
}
