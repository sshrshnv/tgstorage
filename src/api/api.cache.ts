import { get, set, update } from 'idb-keyval'

import type {
  User,
  Folders,
  FolderMessages,
  FoldersMessages,
  Message,
  Settings
} from '~/core/store'

import { META_KEY } from './api.helpers'

const cache = {}

const setData = async (key: string, data, dbData?) => {
  dbData = typeof dbData !== 'undefined' ? dbData : data
  if (cache[key]) {
    update(key, () => dbData).catch(() => {/*nothing*/})
  } else {
    set(key, dbData).catch(() => {/*nothing*/})
  }
  cache[key] = data
  return data
}
const getData = async (key: string, fallback: any = null) => {
  if (!cache[key]) {
    cache[key] = await get(key).catch(() => fallback) || fallback
  }
  return cache[key]
}

export const apiCache = {
  setQueryTime: (queryName: string) => setData(`query-${queryName}`, Date.now()),
  getQueryTime: (queryName: string) => getData(`query-${queryName}`, 0),

  setMeta: (meta) => setData(META_KEY, meta),
  getMeta: (initialMeta) => getData(META_KEY, initialMeta),
  resetMeta: () => apiCache.setMeta(null),

  setUser: (user: User) => setData('user', user),
  getUser: (): Promise<User> => getData('user', null),
  resetUser: () => apiCache.setUser(null),

  setSettings: (settings: Settings) => setData('settings', settings),
  getSettings: (): Promise<Settings> => getData('settings', null),

  setFolders: (folders: Folders) => setData('folders', folders),
  getFolders: (): Promise<Folders> => getData('folders', new Map()),
  resetFolders: () => apiCache.setFolders(new Map()),

  setFolderMessages: (folderId, messages) => setData(`messages-${folderId}`, messages, new Map([...messages].slice(0, 20))),
  getFolderMessages: (folderId): Promise<FolderMessages> => getData(`messages-${folderId}`, new Map()),
  resetFolderMessages: (folderId) => apiCache.setFolderMessages(folderId, new Map()),

  getFoldersMessages: async (): Promise<FoldersMessages> => {
    const cachedFolders = await apiCache.getFolders()
    const foldersMessages = new Map()
    await Promise.all([...cachedFolders.values()].map(({ id }) =>
      apiCache.getFolderMessages(id).then(folderMessages => foldersMessages.set(id, folderMessages))
    ))
    return foldersMessages
  },
  resetFoldersMessages: async () => {
    const cachedFolders = await apiCache.getFolders()
    return Promise.all([...cachedFolders.values()].map(({ id }) =>
      apiCache.resetFolderMessages(id)
    ))
  },

  setFile: (fileKey, fileData) => setData(`file-${fileKey}`, fileData, null),
  getFile: (fileKey) => getData(`file-${fileKey}`),
  resetFile: (fileKey) => apiCache.setFile(fileKey, null),

  setSearchMessages: (messages) => setData('searchMessages', messages, null),
  getSearchMessages: (): Promise<Map<number, Message>> => getData('searchMessages', new Map()),
  resetSearchMessages: () => setData('searchMessages', null),
}
