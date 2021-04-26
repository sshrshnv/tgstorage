import { expose } from 'comlink'
import { get, set } from 'idb-keyval'

class Database {
  async set(key: string, data) {
    return set(key, data).catch(() => {/*nothing*/})
  }

  async get(key: string, fallback: any = null) {
    const data = await get(key).catch(() => fallback)
    return data || fallback
  }

  setUser(user) {
    return this.set('user', user)
  }
  getUser() {
    return this.get('user', null)
  }

  setSettings(settings) {
    return this.set('settings', settings)
  }
  getSettings() {
    return this.get('settings', null)
  }

  setFolders(folders) {
    return this.set('folders', folders)
  }
  getFolders() {
    return this.get('folders', [])
  }

  setFolder(folder) {
    return this.set(`folder-${folder.id}`, folder)
  }
  getFolder(folder) {
    return this.get(`folder-${folder.id}`, { ...folder })
  }
}

expose(Database)
