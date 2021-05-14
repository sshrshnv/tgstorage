import createSyncTaskQueue from 'sync-task-queue'

import type { Folder, Folders, FolderMessages, FoldersMessages } from '~/core/store'

import {
  FOLDER_POSTFIX,
  convertChatToFolder,
  sortFolders,
  normalizeMessage
} from './api.helpers'
import { apiCache } from './api.cache'

export const updatesQueue = createSyncTaskQueue()

export const handleUpdates = async (
  data: {
    chats?
    messages?
    update?
    updates?
  },
  options?
): Promise<{
  folders?: Folders
}> => {
  return updatesQueue.enqueue(async () => {
    const { chats, messages, update, updates } = data
    let folders
    let foldersMessages

    if (chats?.length) {
      folders = await handleChats(chats)
    }
    if (messages?.length) {
      foldersMessages = await handleMessages(messages, options)
    }
    if (update) {
      foldersMessages = await handleMessagesUpdates([update])
    }
    if (updates?.length) {
      foldersMessages = await handleMessagesUpdates(updates)
    }

    return { folders, foldersMessages }
  })
}

const handleMessagesUpdates = async (messagesUpdates) => {
  let foldersMessages

  for (let i = 0; i < messagesUpdates.length; i++) {
    const { _, message, messages } = messagesUpdates[i]

    if (['updateNewMessage', 'updateNewChannelMessage'].includes(_)) {
      foldersMessages = await handleMessages([message], { new: true }) || foldersMessages
    }

    if (['updateDeleteMessages', 'updateDeleteChannelMessages'].includes(_)) {
      foldersMessages = await handleMessages(messages, { deleted: true }) || foldersMessages
    }

    if (['updateEditMessage', 'updateEditChannelMessage'].includes(_)) {
      foldersMessages = await handleMessages([message], { edited: true }) || foldersMessages
    }
  }

  return foldersMessages
}

const handleChats = async (chats): Promise<Folders> => {
  const cachedFolders = await apiCache.getFolders()
  const updatedFolders: Folder[] = []
  const updatedFolderIds: number[] = []

  chats.forEach(chat => {
    const { _, title, left, general } = chat
    if (general || title.endsWith(FOLDER_POSTFIX)) {
      updatedFolderIds.push(chat.id)

      if (!left && !_?.endsWith('Forbidden')) {
        updatedFolders.push(convertChatToFolder(chat))
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

  await apiCache.setFolders(folders)

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
  const user = await apiCache.getUser()
  const [cachedFolders, cachedFoldersMessages] = await Promise.all([
    apiCache.getFolders(),
    apiCache.getFoldersMessages()
  ])
  const newFoldersMessages: FoldersMessages = new Map()
  const editedFoldersMessages: FoldersMessages = new Map()
  const addedFoldersMessages: FoldersMessages = new Map()
  const deletedFoldersMessageIds: Map<number, number[]> = new Map()
  const updatedFolderIds: number[] = []

  messages.forEach(async (message) => {
    const { _, peer_id } = message
    const { channel_id, user_id, chat_id } = peer_id
    const folderId: number = channel_id || user_id || chat_id

    if (_ === 'message' && cachedFolders.has(folderId)) {
      message = normalizeMessage(message, user)
      updatedFolderIds.push(folderId)

      if (options?.new) {
        newFoldersMessages.set(folderId, [message, ...(newFoldersMessages.get(folderId) || [])])
      }

      if (options?.edited) {
        editedFoldersMessages.set(folderId, [...(editedFoldersMessages.get(folderId) || []), message])
      }

      if (typeof options?.offsetId === 'number') {
        addedFoldersMessages.set(folderId, [...(addedFoldersMessages.get(folderId) || []), message])
      }

      if (options?.deleted) {
        deletedFoldersMessageIds.set(folderId, [...(deletedFoldersMessageIds.get(folderId) || []), message.id])
      }
    }
  })

  let foldersMessages: FoldersMessages = new Map()

  if (newFoldersMessages.size) {
    foldersMessages = new Map([
      ...[...cachedFoldersMessages.entries()].filter(([folderId]) =>
        !updatedFolderIds.includes(folderId)
      ),
      ...[...newFoldersMessages.entries()].map(([folderId, newMessages]) =>
        <[number, FolderMessages]>[
          folderId,
          [...newMessages, ...(cachedFoldersMessages.get(folderId) || [])]
        ]
      )
    ])
  }

  if (editedFoldersMessages.size) {
    foldersMessages = new Map([
      ...[...cachedFoldersMessages.entries()].filter(([folderId]) =>
        !updatedFolderIds.includes(folderId)
      ),
      ...[...editedFoldersMessages.entries()].map(([folderId, editedMessages]) =>
        <[number, FolderMessages]>[
          folderId,
          [...(cachedFoldersMessages.get(folderId) || []).map(message =>
            editedMessages.find(({ id }) => id === message.id) || message
          )]
        ]
      )
    ])
  }

  if (deletedFoldersMessageIds.size) {
    foldersMessages = new Map([
      ...[...cachedFoldersMessages.entries()].filter(([folderId]) =>
        !updatedFolderIds.includes(folderId)
      ),
      ...[...deletedFoldersMessageIds.entries()].map(([folderId, deletedMessageIds]) =>
        <[number, FolderMessages]>[
          folderId,
          [...(cachedFoldersMessages.get(folderId) || []).filter(message =>
            !deletedMessageIds.includes(message.id)
          )]
        ]
      )
    ])
  }

  if (addedFoldersMessages.size) {
    foldersMessages = new Map([
      ...[...cachedFoldersMessages.entries()].filter(([folderId]) =>
        !updatedFolderIds.includes(folderId)
      ),
      ...[...addedFoldersMessages.entries()].map(([folderId, addedMessages]) =>
      <[number, FolderMessages]>[
        folderId,
        !options?.offsetId ? addedMessages : [...(cachedFoldersMessages.get(folderId) || []), ...addedMessages]
      ]
      )
    ])
  }

  if (!foldersMessages.size) return

  await Promise.all([...foldersMessages.entries()].map(([folderId, folderMessages]) =>
    apiCache.setFolderMessages(folderId, folderMessages)
  ))

  return foldersMessages
}
