import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useState, useMemo, useEffect } from 'preact/hooks'

import { deleteFolder, setActiveFolder, loadFolderMessages } from '~/core/actions'
import { useTexts, useFolder } from '~/core/hooks'
import { SidebarItem } from '~/ui/elements/sidebar-item'
import { EditIcon, DeleteIcon } from '~/ui/icons'

import type { FolderPopupParams } from './storage.sidebar'

type Props = {
  id: number
  index?: number
  disabled?: boolean
  setFolderPopupParams?: (params: FolderPopupParams) => void
}

export const StorageSidebarFolderItem: FC<Props> = memo(({
  id,
  index,
  disabled,
  setFolderPopupParams
}) => {
  const { texts } = useTexts('storage')
  const { folder, messages } = useFolder(id)
  const [confirmation, setConfirmation] = useState(false)

  const handleClick = useCallback(() => {
    setActiveFolder(id)
  }, [folder])

  const handleEdit = useCallback(() => {
    setFolderPopupParams?.({
      folder: folder,
      isEditFolder: true
    })
  }, [folder, setFolderPopupParams])

  const handleDelete = useCallback((ev) => {
    if (confirmation) {
      deleteFolder(folder).catch()
      return
    }
    ev.stopPropagation()
    setConfirmation(true)
  }, [confirmation])

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const menu = useMemo(() => ({
    items: index ? [{
      title: texts.folderEditTitle,
      icon: <EditIcon/>,
      onClick: handleEdit
    }, {
      title: confirmation ? texts.confirmDeleteButton : texts.folderDeleteTitle,
      icon: <DeleteIcon/>,
      warning: !confirmation,
      danger: confirmation,
      onClick: handleDelete
    }] : [],
    onClose: resetConfirmation
  }), [index, confirmation, handleEdit, handleDelete, resetConfirmation])

  useEffect(() => {
    loadFolderMessages(folder, 0)
  }, [])

  return (
    <SidebarItem
      title={folder.title}
      description={messages?.[0]?.text}
      index={index}
      disabled={disabled}
      menu={menu}
      onClick={handleClick}
    />
  )
})
