import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { useTexts } from '~/core/hooks'
import { SidebarTitle } from '~/ui/elements/sidebar-title'

import type { FoldersFormPopupParams } from './storage'

type Props = {
  folder: Folder
  index: number
  disabled?: boolean
  withoutMenu?: boolean
  offset?: boolean
  setFoldersFormPopupParams?: (params: FoldersFormPopupParams) => void
}

export const StorageSidebarFoldersListCategory: FC<Props> = memo(({
  folder,
  disabled,
  withoutMenu,
  offset,
  setFoldersFormPopupParams
}) => {
  const { texts } = useTexts('storage')

  const editCategory = useCallback(() => {
    setFoldersFormPopupParams?.({
      category: folder.category,
      isEditCategory: true
    })
  }, [folder, setFoldersFormPopupParams])

  const addFolder = useCallback(() => {
    setFoldersFormPopupParams?.({
      category: folder.category,
    })
  }, [folder, setFoldersFormPopupParams])

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
      offset={offset}
    >
      {folder.category || texts.generalCategoryTitle}
    </SidebarTitle>
  )
})
