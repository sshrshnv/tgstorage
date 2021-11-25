import createSyncTaskQueue from 'sync-task-queue'

import type { Folder, Folders, FolderMessages, FoldersMessages, SearchMessages } from '~/core/store'
import { dataCache } from '~/core/cache'
import { FOLDER_POSTFIX } from '~/tools/handle-content'

import {
  transformFolder,
  sortFolders,
  sortMessages,
  transformMessage,
  findFolderIdByMessageId
} from './api.helpers'

export const updatesQueue = createSyncTaskQueue()

export const handleUpdates = async (
  data: {
    chats?
    messages?
    update?
    updates?
  },
  options?: {
    new?: boolean
    deleted?: boolean
    edited?: boolean
    offsetId?: number
  }
): Promise<{
  folders?: Folders
  foldersMessages?: FoldersMessages
  searchMessages?: SearchMessages
}> => updatesQueue.enqueue(async () => {
  const { chats, messages, update, updates } = data
  let folders
  let foldersMessages
  let searchMessages

  if (chats?.length) {
    folders = await handleChats(chats, options)
  }
  if (messages?.length) {
    [foldersMessages, searchMessages] = await Promise.all([
      handleMessages(messages, options),
      handleSearchMessages(messages, options),
    ])
  }
  if (update) {
    [foldersMessages, searchMessages] = await handleMessagesUpdates([update])
  }
  if (updates?.length) {
    [foldersMessages, searchMessages] = await handleMessagesUpdates(updates)
  }

  return {
    folders,
    foldersMessages,
    searchMessages
  }
})

const handleMessagesUpdates = async (messagesUpdates) => {
  let foldersMessages
  let searchMessages

  for (let i = 0; i < messagesUpdates.length; i++) {
    const { _, message, messages } = messagesUpdates[i]

    if (['updateNewMessage', 'updateNewChannelMessage'].includes(_)) {
      [foldersMessages = foldersMessages, searchMessages] = await Promise.all([
        handleMessages([message], { new: true }),
        handleSearchMessages([message], { new: true })
      ])
    }

    if (['updateDeleteMessages', 'updateDeleteChannelMessages'].includes(_)) {
      [foldersMessages = foldersMessages, searchMessages] = await Promise.all([
        handleMessages(messages, { deleted: true }),
        handleSearchMessages(messages, { deleted: true })
      ])
    }

    if (['updateEditMessage', 'updateEditChannelMessage'].includes(_)) {
      [foldersMessages = foldersMessages, searchMessages] = await Promise.all([
        handleMessages([message], { edited: true }),
        handleSearchMessages([message], { edited: true })
      ])
    }
  }

  return [foldersMessages, searchMessages]
}

const handleChats = async (chats, options?): Promise<Folders> => {
  const cachedFolders = options?.offsetId === 0 ? new Map() : await dataCache.getFolders()
  const updatedFolders: Folder[] = []
  const updatedFolderIds: number[] = []

  chats.forEach(chat => {
    const { _, id, title, left, creator, general } = chat
    if (general || (creator && title.endsWith(FOLDER_POSTFIX)) || cachedFolders.has(id)) {
      updatedFolderIds.push(chat.id)

      if (!left && !_?.endsWith('Forbidden')) {
        updatedFolders.push(transformFolder(chat))
      }
    }
  })

  const sortedFolders: Folder[] = sortFolders([
    ...[...cachedFolders.values()].filter(({ id }) =>
      !updatedFolderIds.includes(id)
    ),
    ...updatedFolders
  ])
  const folders = new Map(sortedFolders.map(folder => [folder.id, folder]))

  await dataCache.setFolders(folders)

  return folders
}

const handleMessages = async (
  messages,
  options?: {
    new?: boolean
    deleted?: boolean
    edited?: boolean
    offsetId?: number
  }
) => {
  const user = await dataCache.getUser()
  const [folders, foldersMessages] = await Promise.all([
    dataCache.getFolders(),
    dataCache.getFoldersMessages()
  ])
  const updates: Map<string, { folderMessages: FolderMessages, isSorted: boolean }> = new Map()

  messages.forEach(async (message, index) => {
    if (typeof message === 'number') {
      message = { _: 'message', id: message }
    }
    const { _, peer_id } = message
    const { channel_id, user_id, chat_id } = peer_id || {}
    const folderId: string = channel_id || user_id || chat_id || findFolderIdByMessageId(foldersMessages, message.id)

    const folderMessages: FolderMessages =
      (options?.offsetId === 0 && index === 0) ? new Map() :
        (foldersMessages.get(folderId) || new Map())

    let isUpdated = false
    let isSorted = true

    if (options?.offsetId === 0 && index === 0) {
      isUpdated = true
      isSorted = false
    }

    if (_ === 'message' && folders.has(folderId)) {
      message = !options?.deleted ? transformMessage(message, user) : message
      if (!message) {
        return
      } else if (options?.deleted && folderMessages.has(message.id)) {
        folderMessages.delete(message.id)
        isUpdated = true
      } else if (options?.edited && folderMessages.has(message.id)) {
        folderMessages.set(message.id, message)
        isUpdated = true
      } else if (typeof options?.offsetId === 'number') {
        folderMessages.set(message.id, message)
        isUpdated = true
        isSorted = false
      } else if (options?.new) {
        folderMessages.set(message.id, message)
        isUpdated = true
        isSorted = false
      }
    }

    if (isUpdated) {
      foldersMessages.set(folderId, folderMessages)
      updates.set(folderId, {
        folderMessages,
        isSorted: isSorted ? (updates.get(folderId)?.isSorted ?? true) : false
      })
    }
  })

  if (!updates.size) return

  await Promise.all([...updates].map(([folderId, { folderMessages, isSorted }]) => {
    if (!isSorted) {
      folderMessages = new Map(sortMessages([...folderMessages]))
      foldersMessages.set(folderId, folderMessages)
    }
    return dataCache.setFolderMessages(folderId, folderMessages)
  }))

  return foldersMessages
}

const handleSearchMessages = async (
  messages,
  options?: {
    new?: boolean
    deleted?: boolean
    edited?: boolean
  }
) => {
  let updated = false
  let sorted = true
  let searchMessages = await dataCache.getSearchMessages()
  const user = await dataCache.getUser()

  messages.forEach(message => {
    if (searchMessages.has(message.id)) {
      if (options?.deleted) {
        searchMessages.delete(message.id)
        updated = true
      }

      if (options?.edited) {
        message = transformMessage(message, user)
        searchMessages.set(message.id, message)
        updated = true
      }
    }

    if (options?.new) {
      message = transformMessage(message, user)
      if (!message) return

      if (message.parentId && searchMessages.has(message.parentId)) {
        searchMessages.set(message.id, message)
        updated = true
        sorted = false
      }
    }
  })

  if (updated) {
    if (!sorted) {
      searchMessages = new Map(sortMessages([...searchMessages]))
    }

    dataCache.setSearchMessages(searchMessages)
    return new Map(searchMessages)
  } else {
    return undefined
  }
}
