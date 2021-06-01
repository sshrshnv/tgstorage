import { api } from '~/api'
import type { InputMessage, Updates } from '~/api'

import { FoldersMessages, store } from './store'
import type { User, Folder, Folders, Locales, Texts, Message } from './store'

export const getLocale = () =>
  store.getState().settings.locale

export const getUser = () =>
  store.getState().user

export const setTexts = (
  locale: Locales,
  texts: Texts[Locales]
) => {
  const storeTexts = store.getState().texts
  store.setState({
    texts: {
      ...storeTexts,
      [locale]: {
        ...storeTexts[locale],
        ...texts
      }
    }
  })
}

export const setUser = (
  user: User
) => {
  store.setState({
    user,
    userLoading: false
  })
}

export const waitFolders = (
  foldersLoading: boolean
) => {
  store.setState({
    foldersLoading
  })
}

export const setFolders = (
  folders: Folders
) => {
  store.setState({
    folders,
    foldersLoading: false
  })
}

export const setActiveFolder = (
  id: number
) => {
  store.setState({
    activeFolderId: id
  })
}

export const setLoadingFolderIds = (
  id: number,
  value: boolean
) => {
  const loadingFolderIds = new Map(store.getState().loadingFolderIds)
  loadingFolderIds.set(id, value)
  store.setState({
    loadingFolderIds
  })
}

export const setFoldersMessages = (
  foldersMessages: FoldersMessages
) => {
  store.setState({
    foldersMessages
  })
}

export const setUpdates = ({
  folders,
  foldersMessages
}: Updates) => {
  if (folders) {
    setFolders(folders)
  }
  if (foldersMessages) {
    setFoldersMessages(foldersMessages)
  }
}

export const logOut = async () => {
  await api.logOut()
}

export const loadFolders = async () => {
  waitFolders(true)

  const updates = await api.getFolders()
    .catch(({ code }) => {
      if (code === 401) {
        logOut()
      }
      return null
    })

  if (updates?.folders) {
    setUpdates(updates)
  } else {
    waitFolders(false)
  }
}

export const createFolder = async (
  name: string
) => {
  waitFolders(true)

  const updates = await api.createFolder(
    name
  )

  setUpdates(updates)
  return true
}

export const editFolder = async (
  name: string,
  folder: Folder
) => {
  waitFolders(true)

  const updates = await api.editFolder(
    name,
    folder
  )

  setUpdates(updates)
  return true
}

export const editCategory = async (
  newCategory: string,
  category: string
) => {
  waitFolders(true)

  const updates = await api.editCategory(
    newCategory,
    category
  )

  setUpdates(updates)
  return true
}

export const deleteFolder = async (
  folder: Folder
) => {
  waitFolders(true)

  const updates = await api.deleteFolder(
    folder
  )

  setUpdates(updates)
  return true
}

export const loadFolderMessages = async (
  folder: Folder,
  offsetId?: number
) => {
  setLoadingFolderIds(folder.id, true)
  const updates = await api.getMessages(
    folder,
    offsetId
  )

  if (!updates) {
    setLoadingFolderIds(folder.id, false)
    return false
  }

  setUpdates(updates)
  setLoadingFolderIds(folder.id, false)
  return true
}

export const createMessage = async (
  message: InputMessage,
  folder: Folder
) => {
  const updates = await api.createMessage(
    message,
    folder
  ).catch(() => null)

  if (!updates) return false

  setUpdates(updates)
  return true
}

export const editMessage = async (
  message: InputMessage,
  folder: Folder
) => {
  const updates = await api.editMessage(
    message,
    folder
  ).catch(() => null)
  //MESSAGE_NOT_MODIFIED

  if (!updates) return false

  setUpdates(updates)
  return true
}

export const deleteMessage = async (
  message: Message,
  folder: Folder
) => {
  const updates = await api.deleteMessage(
    message,
    folder
  ).catch(() => null)

  if (!updates) return false

  setUpdates(updates)
  return true
}
