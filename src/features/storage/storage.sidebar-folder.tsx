import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useState, useMemo } from 'preact/hooks'

import { deleteFolder, setActiveFolder } from '~/core/actions'
import { useTexts, useFolder } from '~/core/hooks'
import { SidebarItem } from '~/ui/elements/sidebar-item'

type Props = {
  id: number
  index?: number
  toggleSidebarsVisibility?: (sidebar: 'folder', params: object) => void
}

export const StorageSidebarFolder: FC<Props> = ({
  id,
  index,
  toggleSidebarsVisibility
}) => {
  const { texts } = useTexts('storage')
  const { folder } = useFolder(id)
  const [confirmation, setConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    setActiveFolder(id)
  }, [folder])

  const handleEdit = useCallback(() => {
    toggleSidebarsVisibility?.('folder', {
      title: folder.title,
      category: folder.category,
      isEditFolder: true
    })
  }, [folder, toggleSidebarsVisibility])

  const handleDelete = useCallback((ev) => {
    if (confirmation) {
      setLoading(true)
      deleteFolder(folder).catch(() => {
        setLoading(false)
      })
      return
    }
    ev.stopPropagation()
    setConfirmation(true)
  }, [confirmation, setLoading])

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const menu = useMemo(() => ({
    items: index ? [{
      title: texts.folderEditTitle,
      onClick: handleEdit
    }, {
      title: confirmation ? texts.confirmDeleteButton : texts.folderDeleteTitle,
      warning: !confirmation,
      danger: confirmation,
      onClick: handleDelete
    }] : [],
    onClose: resetConfirmation
  }), [index, confirmation, handleEdit, handleDelete, resetConfirmation])

  return (
    <SidebarItem
      title={folder.title}
      description=""
      index={index}
      disabled={loading}
      menu={menu}
      onClick={handleClick}
    />
  )
}
