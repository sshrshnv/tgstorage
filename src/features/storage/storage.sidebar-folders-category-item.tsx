import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { useTexts } from '~/core/hooks'
import { SidebarTitle } from '~/ui/elements/sidebar-title'

import type { FolderPopupParams } from './storage'

type Props = {
  folder: Folder
  index: number
  disabled?: boolean
  withoutMenu?: boolean
  setFolderPopupParams?: (params: FolderPopupParams) => void
}

export const StorageSidebarFoldersCategoryItem: FC<Props> = memo(({
  folder,
  disabled,
  withoutMenu,
  setFolderPopupParams
}) => {
  const { texts } = useTexts('storage')

  const editCategory = useCallback(() => {
    setFolderPopupParams?.({
      category: folder.category,
      isEditCategory: true
    })
  }, [folder, setFolderPopupParams])

  const addFolder = useCallback(() => {
    setFolderPopupParams?.({
      category: folder.category,
    })
  }, [folder, setFolderPopupParams])

  const menu = useMemo(() => ({
    items: [folder.category ? {
      title: texts.categoryEditTitle,
      icon: 'edit',
      onClick: editCategory
    } : null, {
      title: texts.folderAddTitle,
      icon: 'folder-plus',
      onClick: addFolder
    }]
  }), [
    folder.category,
    texts.categoryEditTitle,
    texts.folderAddTitle,
    editCategory,
    addFolder
  ])

  return (
    <SidebarTitle
      menu={withoutMenu ? null : menu}
      disabled={disabled}
    >
      {folder.category || texts.generalCategoryTitle}
    </SidebarTitle>
  )
})
