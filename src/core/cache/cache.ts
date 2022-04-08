import { createStore, get, set, update, clear, keys, delMany } from 'idb-keyval'

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
let offsetsCache = new Map<string, number | 'end'>()

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
  if (typeof cache[key] === 'undefined') {
    cache[key] = await get(key, database).catch(() => fallback) || fallback
  }
  return cache[key] || fallback
}

export const dataCache = {
  setQueryTime: (queryName: string) => setData(`query-${queryName}`, {
    data: Date.now()
  }),
  getQueryTime: (queryName: string) => getData(`query-${queryName}`, 0),
  resetQueryTime: async () => {
    const allKeys = await keys(database)
    const queryKeys = allKeys.filter(key => `${key}`.startsWith('query-'))
    delMany(queryKeys, database)
    queryKeys.forEach(key => cache[`${key}`] = 0)
  },

  setMeta: (metaKey, meta) => setData(metaKey, {
    data: meta
  }),
  getMeta: (metaKey, initialMeta) => getData(metaKey, initialMeta),

  setUser: (user: User) => setData('user', {
    data: user
  }),
  getUser: async (): Promise<User> => getData('user', null),

  setSettings: (settings: Settings) => setData('settings', {
    data: settings
  }),
  getSettings: async (): Promise<Settings> => {
    const settings = await getData('settings', null)
    if (settings?.locale && !settings.lang) {
      settings.lang = settings.locale
    }
    return settings
  },

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

  setFolderSponsoredMessage: (folderId, message) => setData(`sponsored-message-${folderId}`, {
    data: message
  }),
  getFolderSponsoredMessage: (folderId) => getData(`sponsored-message-${folderId}`, null),

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

  setFolderOffsetId: (folderId: string, offsetId: number | 'end') => offsetsCache.set(folderId, offsetId),
  getFolderOffsetId: (folderId: string) => offsetsCache.get(folderId)
}

export const resetQueryCache = async () => {
  await dataCache.resetQueryTime()
}

export const resetDataCache = async () => {
  const settings = await dataCache.getSettings()

  cache = {}
  offsetsCache = new Map()
  await clear(database)
  dataCache.setSettings(settings)
}
