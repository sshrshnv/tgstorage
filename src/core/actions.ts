import { api } from '~/api'
import type { Updates } from '~/api'

import { FoldersMessages, store } from './store'
import type { User, Folder, Folders, Locales, Texts } from './store'

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
  const updates = await api.getMessages(
    folder,
    offsetId
  )

  setUpdates(updates)
  return true
}

export const sendMessage = async (
  note: string,
  folder: Folder
) => {
  const updates = await api.sendMessage(
    note,
    folder
  )

  setUpdates(updates)
  return true
}
