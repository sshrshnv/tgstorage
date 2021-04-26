import { api } from '~/api'

import { database } from './database'
import { store } from './store'
import type { User, Folders, Locales, Texts } from './store'

export const getLocale = () =>
  store.getState().settings.locale

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
  database.setUser(user)
}

export const setFolders = (
  folders: Folders
) => {
  store.setState({
    folders,
    foldersLoading: false
  })
  database.setFolders(folders)
}

export const setActiveFolder = (
  id: number
) => {
  store.setState({
    activeFolderId: id
  })
}

export const loadUser = async () => {
  const user = await api.getUser()
    .catch(({ code }) => {
      if (code === 401) {
        return null
      }
    })

  if (user) {
    setUser(user)
  }
}

export const logOut = async () => {
  await api.logOut()
  setUser(null)
  setFolders([])
}

export const loadFolders = async () => {
  const folders = await api.getFolders()
    .catch(({ code }) => {
      if (code === 401) {
        logOut()
      }
      return null
    })

  if (folders) {
    setFolders(folders)
  }
}

export const createFolder = async (
  title: string
) => {
  return api.createFolder(
    title,
    store.getState().folders
  ).then(folders => {
    setFolders(folders)
    return true
  })
}

export const editFolder = async (
  newTitle: string,
  title: string,
  category: string
) => {
  return api.editFolder(
    newTitle,
    title,
    category,
    store.getState().folders
  ).then(folders => {
    setFolders(folders)
    return true
  })
}

export const editCategory = async (
  newCategory: string,
  category: string
) => {
  return api.editCategory(
    newCategory,
    category,
    store.getState().folders
  ).then(folders => {
    setFolders(folders)
    return true
  })
}

export const deleteFolder = async (
  folder: Folders[0]
) => {
  return api.deleteFolder(
    folder,
    store.getState().folders
  ).then(folders => {
    setFolders(folders)
    return true
  })
}
