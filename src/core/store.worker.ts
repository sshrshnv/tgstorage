import { get, set } from 'idb-keyval'

import type { User, Folders, Folder } from './store'

const setData = (key: string, data) =>
  set(key, data).catch(() => {/*nothing*/})

const getData = async (key: string, fallback: any = null) => {
  const data = await get(key).catch(() => fallback)
  return data || fallback
}

export const persistUser = (user: User) => setData('user', user)
export const rehydrateUser = (): Promise<User> => getData('user', null)

export const persistFolders = (folders: string[]) => set('folders', folders)
export const rehydrateFolders = (): Promise<Folders> => getData('folders', [])

export const persistFolder = (folder: Folder) => setData(`folder-${folder.id}`, folder)
export const rehydrateFolder = (folder: Folders[0]) => getData(`folder-${folder.id}`, { ...folder })
