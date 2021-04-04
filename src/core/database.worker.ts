import { expose } from 'comlink'
import { get, set } from 'idb-keyval'

const setData = (key: string, data) =>
  set(key, data).catch(() => {/*nothing*/})

const getData = async (key: string, fallback: any = null) => {
  const data = await get(key).catch(() => fallback)
  return data || fallback
}

class Database {
  constructor() {
    //
  }

  setUser(user) {
    return setData('user', user)
  }
  getUser() {
    return getData('user', null)
  }

  setSettings(settings) {
    return setData('settings', settings)
  }
  getSettings() {
    return getData('settings', null)
  }

  setFolders(folders) {
    return set('folders', folders)
  }
  getFolders() {
    return getData('folders', [])
  }

  setFolder(folder) {
    return setData(`folder-${folder.id}`, folder)
  }
  getFolder(folder) {
    return getData(`folder-${folder.id}`, { ...folder })
  }
}

expose(Database)
