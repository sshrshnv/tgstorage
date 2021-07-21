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
const offsetsCache = new Map<number, number | 'end'>()

const setData = async (
  key: string, {
    data,
    dbData,
    db = true
  }: {
    data: any
    dbData?: any
    db?: boolean
  }
) => {
  cache[key] = data

  if (!db) return data
  dbData = typeof dbData !== 'undefined' ? dbData : data

  if (cache[key]) {
    update(key, () => dbData).catch(() => {/*nothing*/})
  } else {
    set(key, dbData).catch(() => {/*nothing*/})
  }
  return data
}

const getData = async (key: string, fallback: any = null) => {
  if (!cache[key]) {
    cache[key] = await get(key).catch(() => fallback) || fallback
  }
  return cache[key]
}

export const apiCache = {
  setQueryTime: (queryName: string) => setData(`query-${queryName}`, {
    data: Date.now()
  }),
  getQueryTime: (queryName: string) => getData(`query-${queryName}`, 0),

  setMeta: (meta) => setData(META_KEY, {
    data: meta
  }),
  getMeta: (initialMeta) => getData(META_KEY, initialMeta),
  resetMeta: () => apiCache.setMeta(null),

  setUser: (user: User) => setData('user', {
    data: user
  }),
  getUser: (): Promise<User> => getData('user', null),
  resetUser: () => apiCache.setUser(null),

  setSettings: (settings: Settings) => setData('settings', {
    data: settings
  }),
  getSettings: (): Promise<Settings> => getData('settings', null),

  setFolders: (folders: Folders) => setData('folders', {
    data: folders
  }),
  getFolders: (): Promise<Folders> => getData('folders', new Map()),
  resetFolders: () => apiCache.setFolders(new Map()),

  setFolderMessages: (folderId, messages) => setData(`messages-${folderId}`, {
    data: messages,
    dbData: new Map([...messages].slice(0, 20))
  }),
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

  setSearchMessages: (messages) => setData('searchMessages', {
    data: messages,
    db: false
  }),
  getSearchMessages: (): Promise<Map<number, Message>> => getData('searchMessages', new Map()),
  setSearchOffsetId: (offsetId: number | 'end') => setData('searchOffsetId', {
    data: offsetId
  }),
  getSearchOffsetId: () => getData('searchOffsetId', 0),
  resetSearch: () => {
    apiCache.setSearchMessages(null)
    apiCache.setSearchOffsetId(0)
  },

  setFolderOffsetId: (folderId: number, offsetId: number | 'end') => offsetsCache.set(folderId, offsetId),
  getFolderOffsetId: (folderId: number) => offsetsCache.get(folderId)
}
