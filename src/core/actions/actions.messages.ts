import type { Folder, FoldersMessages, SearchMessages, Message, InputMessage } from '~/core/store'
import { store } from '~/core/store'
import { api } from '~/api'
import { timer } from '~/tools/timer'

import type { SharedData } from '~/core/store'
import { setLoadingFolderId, getActiveFolder } from './actions.folders'
import { uploadFiles, resetUploadingFiles } from './actions.message-media'
import { setUpdates } from './actions.updates'

export const loadFolderMessages = async (
  folder: Folder,
  lastMessageId?: number
) => {
  setLoadingFolderId(folder.id, true)
  const updates = await api.getMessages(folder, lastMessageId)
    .catch(() => null)

  if (!updates) {
    setLoadingFolderId(folder.id, false)
    return false
  }

  setUpdates(updates)
  setLoadingFolderId(folder.id, false)
  return true
}

export const loadFolderSponsoredMessage = async (
  folder: Folder
) => {
  const message = await api.getSponsoredMessage(folder)
  if (message) {
    (self as any).gtag?.('event', 'sponsored_message', {
      data: JSON.stringify(message)
    })
  }
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

export const setSharedData = (
  sharedData: SharedData
) => {
  store.setState({
    sharedData
  })
}

export const getMessageWebpage = (
  folder: Folder,
  messageId: number
) => {
  const state = store.getState()
  const folderMessages = state.foldersMessages.get(folder.id)
  const message = folderMessages?.get(messageId)
  return message?.webpage
}

export const createMessage = async (
  message: InputMessage,
  folder: Folder,
  final = true
) => {
  const updates = await api.createMessage(message, folder)
    .catch(() => {
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

export const getSendingMessage = (folderId: string) =>
  store.getState().sendingMessages.get(folderId)

export const setSendingMessage = (
  folderId: string,
  message: InputMessage | undefined
) => {
  const sendingMessages = new Map(store.getState().sendingMessages)

  if (message) {
    sendingMessages.set(folderId, message)
  } else {
    sendingMessages.delete(folderId)
  }

  store.setState({
    sendingMessages
  })
}

export const resetSendingMessage = (
  folderId: string
) => {
  const sendingMessage = getSendingMessage(folderId)
  if (sendingMessage?.inputFiles) {
    resetUploadingFiles(sendingMessage.inputFiles)
  }
  setSendingMessage(folderId, undefined)
}

const refreshMessages: {
  [folderId: string]: {
    timeoutId: number
    waitIds: number[]
    sendingIds: number[]
  }
} = {}

export const refreshMessage = (
  folder: Folder,
  id: number,
  timeout = 100,
  callback?: () => void
) => new Promise(resolve => {
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
      resolve(callback?.())
    }

    refreshMessages[folder.id] = {
      ...refreshMessages[folder.id],
      sendingIds: []
    }
  }, timeout)

  refreshMessages[folder.id] = {
    ...refreshMessages[folder.id],
    timeoutId,
    waitIds: [...(refreshMessages[folder.id]?.waitIds || []), id]
  }
})

export const refreshMessageWebpage = async (
  folder: Folder,
  id: number,
) => {
  refreshMessage(folder, id, 1000, async () => {
    const webpage = getMessageWebpage(folder, id)
    if (webpage?.pending) {
      await timer(500)
      refreshMessageWebpage(folder, id)
    }
  })
}

export const searchMessages = async (
  query: string,
  folder: Folder
) => {
  const searchMessages = await api.searchMessages(
    query,
    folder
  )
  if (!searchMessages) return
  setSearchMessages(searchMessages)
}

export const resetSearch = () => {
  api.resetSearch()
  setSearchMessages(new Map())
}

export const moveMessage = async (
  message: Message,
  toFolder: Folder
) => {
  const fromFolder = getActiveFolder()
  if (!fromFolder) return

  const updates = await api.moveMessage(
    message,
    fromFolder,
    toFolder
  )

  if (!updates) return
  setUpdates(updates)

  const success = await deleteMessage(
    message,
    fromFolder
  )

  return success
}
