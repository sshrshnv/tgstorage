import type { Folder, Folders } from '~/core/store'
import { store } from '~/core/store'
import { api } from '~/api'

import { setUpdates } from './actions.updates'

export const loadFolders = async () => {
  waitFolders(true)

  const updates = await api.getFolders()
    .catch(() => null)

  if (updates?.folders) {
    setUpdates(updates)
  } else {
    waitFolders(false)
  }
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

export const setLoadingFolderId = (
  id: string,
  value: boolean
) => {
  const loadingFolderIds = new Map(store.getState().loadingFolderIds)
  loadingFolderIds.set(id, value)
  store.setState({
    loadingFolderIds
  })
}

export const getActiveFolder = () => {
  const state = store.getState()
  const activeFolderId = state.activeFolderId
  return state.folders.get(activeFolderId)
}

export const setActiveFolder = (
  id: string
) => {
  store.setState({
    activeFolderId: id
  })
}

export const createFolder = async (
  name: string
) => {
  waitFolders(true)
  const updates = await api.createFolder(name)

  setUpdates(updates)
  return true
}

export const deleteFolder = async (
  folder: Folder
) => {
  waitFolders(true)
  const updates = await api.deleteFolder(folder)

  setUpdates(updates)
  return true
}

export const editFolder = async (
  name: string,
  folder: Folder
) => {
  waitFolders(true)
  const updates = await api.editFolder(name, folder)

  setUpdates(updates)
  return true
}

export const editGroup = async (
  newGroup: string,
  group: string,
  category: string
) => {
  waitFolders(true)
  const updates = await api.editGroup(newGroup, group, category)

  setUpdates(updates)
  return true
}

export const editCategory = async (
  newCategory: string,
  category: string
) => {
  waitFolders(true)
  const updates = await api.editCategory(newCategory, category)

  setUpdates(updates)
  return true
}
