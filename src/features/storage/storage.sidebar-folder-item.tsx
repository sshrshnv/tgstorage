import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useState, useMemo, useEffect } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { deleteFolder, setActiveFolder, loadFolderMessages } from '~/core/actions'
import { useTexts, useFolder, useSendingMessage } from '~/core/hooks'
import { useUpdatableRef } from '~/tools/hooks'
import { normalizeMessagePreview } from '~/tools/handle-content'
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
  const { folder, folderRef, messages } = useFolder(id)
  const [confirmation, setConfirmation] = useState(false)
  const loadingDisabledRef = useUpdatableRef(loadingDisabled)
  const { isSendingMessageExist } = useSendingMessage(id)

  const messagePreview = useMemo(() => {
    return normalizeMessagePreview(messages?.[0])
  }, [messages?.[0]])

  const handleClick = useCallback(() => {
    if (onFolderSelect) {
      onFolderSelect(folder)
    } else {
      setActiveFolder(id)
    }
  }, [id, folder, onFolderSelect])

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
  }, [folder, confirmation])

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const menu = useMemo(() => ({
    items: folder.general ? [] : [{
      title: texts.folderEditTitle,
      icon: <EditIcon/>,
      onClick: handleEdit
    }, {
      title: confirmation ? texts.confirmDeleteButton : texts.folderDeleteTitle,
      icon: <DeleteIcon/>,
      warning: !confirmation,
      danger: confirmation,
      onClick: handleDelete
    }],
    onClose: resetConfirmation
  }), [
    folder.general,
    confirmation,
    texts.folderEditTitle,
    texts.confirmDeleteButton,
    texts.folderDeleteTitle,
    handleEdit,
    handleDelete,
    resetConfirmation
  ])

  useEffect(() => {
    if (loadingDisabledRef.current) return
    loadFolderMessages(folderRef.current)
  }, [])

  return (
    <SidebarItem
      title={folder.title}
      description={withoutMessage ? '' : messagePreview}
      emptyDescription={withoutMessage ? '' : texts.folderEmptyDescription}
      index={index}
      disabled={disabled}
      menu={withoutMenu ? null : menu}
      loading={isSendingMessageExist}
      onClick={handleClick}
    />
  )
})
