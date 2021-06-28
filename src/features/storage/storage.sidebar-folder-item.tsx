import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useState, useMemo, useEffect } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { deleteFolder, setActiveFolder, loadFolderMessages } from '~/core/actions'
import { useTexts, useFolder } from '~/core/hooks'
import { SidebarItem } from '~/ui/elements/sidebar-item'
import { EditIcon, DeleteIcon } from '~/ui/icons'

import type { FolderPopupParams } from './storage'

type Props = {
  id: number
  index?: number
  disabled?: boolean
  loadingDisabled?: boolean
  withoutMenu?: boolean
  withoutMessage?: boolean
  setFolderPopupParams?: (params: FolderPopupParams) => void
  onFolderSelect?: (folder: Folder) => void
}

export const StorageSidebarFolderItem: FC<Props> = memo(({
  id,
  index,
  disabled,
  loadingDisabled,
  withoutMenu,
  withoutMessage,
  setFolderPopupParams,
  onFolderSelect
}) => {
  const { texts } = useTexts('storage')
  const { folder, messages } = useFolder(id)
  const [confirmation, setConfirmation] = useState(false)

  const handleClick = useCallback(() => {
    if (onFolderSelect) {
      onFolderSelect(folder)
    } else {
      setActiveFolder(id)
    }
  }, [folder, onFolderSelect])

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
    if (loadingDisabled) return
    loadFolderMessages(folder, 0)
  }, [])

  return (
    <SidebarItem
      title={folder.title}
      description={withoutMessage ? '' : messages?.[0]?.text}
      emptyDescription={withoutMessage ? '' : texts.folderEmptyDescription}
      index={index}
      disabled={disabled}
      menu={withoutMenu ? null : menu}
      onClick={handleClick}
    />
  )
})
