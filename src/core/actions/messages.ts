import type { Folder, FoldersMessages, SearchMessages, InputMessage } from '~/core/store'
import { store } from '~/core/store'
import { api } from '~/api'

import { setLoadingFolderId } from './folders'
import { uploadFiles, resetUploadingFiles } from './message-media'
import { setUpdates } from './updates'

export const loadFolderMessages = async (
  folder: Folder,
  offsetId?: number
) => {
  setLoadingFolderId(folder.id, true)
  const updates = await api.getMessages(folder, offsetId)

  if (!updates) {
    setLoadingFolderId(folder.id, false)
    return false
  }

  setUpdates(updates)
  setLoadingFolderId(folder.id, false)
  return true
}

export const setFoldersMessages = (
  foldersMessages: FoldersMessages
) => {
  store.setState({
    foldersMessages
  })
}

export const setSearchMessages = (
  searchMessages: SearchMessages
) => {
  store.setState({
    searchMessages
  })
}

export const createMessage = async (
  message: InputMessage,
  folder: Folder,
  final = true
) => {
  const updates = await api.createMessage(message, folder)
    .catch((error) => {
      console.log(error)
      return null
    })

  if (!updates) return false
  setUpdates(updates)

  if (message.inputFiles) {
    const [[parentId]] = updates.foldersMessages?.get(folder.id) || new Map()
    if (parentId) {
      await uploadFiles(message, folder, parentId)
    }
  }

  if (final && !message.inputFiles?.length) {
    resetSendingMessage(folder.id)
  }

  return true
}

export const editMessage = async (
  message: InputMessage,
  folder: Folder,
  updated = true
) => {
  const updates = updated ? await api.editMessage(message, folder)
    .catch(({ message }) => {
      return message === 'MESSAGE_NOT_MODIFIED'
    }) : true

  if (updates && typeof updates !== 'boolean') {
    setUpdates(updates)
  }

  if (message.inputFiles && message.id) {
    await uploadFiles(message, folder, message.id)
  }

  resetSendingMessage(folder.id)
  return !!updates
}

export const deleteMessage = async (
  message: {
    id: number
    mediaMessages?: { id: number }[]
  },
  folder: Folder
) => {
  const updates = await api.deleteMessage(message, folder)
    .catch(() => null)

  if (!updates) return false

  setUpdates(updates)
  return true
}

export const getSendingMessage = (folderId: number) =>
  store.getState().sendingMessages.get(folderId)

export const setSendingMessage = (
  folderId: number,
  message: InputMessage | undefined
) => {
  const sendingMessages = new Map(store.getState().sendingMessages)
  sendingMessages.set(folderId, message)
  store.setState({
    sendingMessages
  })
}

export const resetSendingMessage = (
  folderId: number
) => {
  const sendingMessage = getSendingMessage(folderId)
  if (sendingMessage?.inputFiles) {
    resetUploadingFiles(sendingMessage.inputFiles)
  }
  setSendingMessage(folderId, undefined)
}

const refreshMessages: {
  [folderId: number]: {
    timeoutId: number
    waitIds: number[]
    sendingIds: number[]
  }
} = {}

export const refreshMessage = (
  folder: Folder,
  id: number
) => {
  if (
    refreshMessages[folder.id]?.waitIds?.includes(id) ||
    refreshMessages[folder.id]?.sendingIds?.includes(id)
  ) return

  if (refreshMessages[folder.id]?.timeoutId) {
    self.clearTimeout(refreshMessages[folder.id].timeoutId)
    refreshMessages[folder.id].timeoutId = 0
  }

  const timeoutId = self.setTimeout(async () => {
    if (!refreshMessages[folder.id].waitIds?.length) return

    refreshMessages[folder.id] = {
      timeoutId: 0,
      sendingIds: refreshMessages[folder.id].waitIds,
      waitIds: []
    }

    const updates = await api.refreshMessages(
      folder,
      refreshMessages[folder.id].sendingIds
    )

    if (updates) {
      setUpdates(updates)
    }

    refreshMessages[folder.id] = {
      ...refreshMessages[folder.id],
      sendingIds: []
    }
  }, 1000)

  refreshMessages[folder.id] = {
    ...refreshMessages[folder.id],
    timeoutId,
    waitIds: [...(refreshMessages[folder.id]?.waitIds || []), id]
  }
}

export const searchMessages = async (
  query: string,
  folder: Folder,
  offsetId: number
) => {
  const searchMessages = await api.searchMessages(
    query,
    folder,
    offsetId || 0
  )

  setSearchMessages(searchMessages)
}

export const resetSearchMessages = () => {
  api.resetSearchMessages()
  setSearchMessages(new Map())
}
