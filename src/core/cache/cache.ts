import { createStore, get, set, update, clear } from 'idb-keyval'

import type {
  User,
  Folders,
  FolderMessages,
  FoldersMessages,
  Message,
  Settings
} from '~/core/store'

const database = createStore('tgstorage-data', 'data')
let cache = {}
let offsetsCache = new Map<number, number | 'end'>()

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
    update(key, () => dbData, database).catch(() => {/*nothing*/})
  } else {
    set(key, dbData, database).catch(() => {/*nothing*/})
  }
  return data
}

const getData = async (key: string, fallback: any = null) => {
  if (!cache[key]) {
    cache[key] = await get(key, database).catch(() => fallback) || fallback
  }
  return cache[key]
}

export const dataCache = {
  setQueryTime: (queryName: string) => setData(`query-${queryName}`, {
    data: Date.now()
  }),
  getQueryTime: (queryName: string) => getData(`query-${queryName}`, 0),

  setMeta: (metaKey, meta) => setData(metaKey, {
    data: meta
  }),
  getMeta: (metaKey, initialMeta) => getData(metaKey, initialMeta),

  setUser: (user: User) => setData('user', {
    data: user
  }),
  getUser: (): Promise<User> => getData('user', null),

  setSettings: (settings: Settings) => setData('settings', {
    data: settings
  }),
  getSettings: (): Promise<Settings> => getData('settings', null),

  setFolders: (folders: Folders) => setData('folders', {
    data: folders
  }),
  getFolders: (): Promise<Folders> => getData('folders', new Map()),

  setFolderMessages: (folderId, messages) => setData(`messages-${folderId}`, {
    data: messages,
    dbData: new Map([...messages].slice(0, 20))
  }),
  getFolderMessages: (folderId): Promise<FolderMessages> => getData(`messages-${folderId}`, new Map()),

  getFoldersMessages: async (): Promise<FoldersMessages> => {
    const cachedFolders = await dataCache.getFolders()
    const foldersMessages = new Map()
    await Promise.all([...cachedFolders.values()].map(({ id }) =>
      dataCache.getFolderMessages(id).then(folderMessages => foldersMessages.set(id, folderMessages))
    ))
    return foldersMessages
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
    dataCache.setSearchMessages(null)
    dataCache.setSearchOffsetId(0)
  },

  setFolderOffsetId: (folderId: number, offsetId: number | 'end') => offsetsCache.set(folderId, offsetId),
  getFolderOffsetId: (folderId: number) => offsetsCache.get(folderId)
}

export const resetDataCache = async () => {
  const settings = await dataCache.getSettings()

  cache = {}
  offsetsCache = new Map()
  await clear(database)
  dataCache.setSettings(settings)
}
