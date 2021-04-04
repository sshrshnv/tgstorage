import { wrap } from 'comlink'

import type { User, Settings, Folders, Folder } from './store'

import DatabaseWorker from './database.worker.ts'

export type Database = {
  setUser: (user: User) => Promise<void>
  getUser: () => Promise<User>

  setSettings: (settings: Settings) => Promise<void>
  getSettings: () => Promise<Settings>

  setFolders: (folders: Folders) => Promise<void>
  getFolders: () => Promise<Folders>

  setFolder: (folder: Folder) => Promise<void>
  getFolder: (folder: Folders[0]) => Promise<Folder>
}

const databaseWorker = new DatabaseWorker();
(self as any)._dw = databaseWorker

const DatabaseW: any = wrap(databaseWorker)
const database: Database = await new DatabaseW()

export { database }
