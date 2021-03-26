import createStore from 'unistore'
import devtools from 'unistore/devtools'

import { detectLocale } from '~/tools/detect-locale'

import StoreWorker from './store.worker.ts'
import texts from './app.texts.json'

export type Texts = {
  [k: string]: string
}

export type User = {
  id: number
  access_hash: string
  photo: {
    bytes: Uint8Array
    type: string
  } | null
} | null

export type Folders = {
  id: string
  title: string
}[]

export type Folder = {
  id: string
  title: string
  items: string[]
}

export type State = {
  user: User
  userLoading: boolean
  folders: Folders
  foldersLoading: boolean
  texts: Texts
}

const storeWorker = new StoreWorker()

const [user, folders]: [User, Folders] = await Promise.all([
  storeWorker.rehydrateUser(),
  storeWorker.rehydrateFolders()
])

const state: State = {
  user,
  userLoading: true,
  folders,
  foldersLoading: true,
  texts: texts[detectLocale()]
}

const store = process.env.NODE_ENV === 'production' ?
  createStore(state) :
  devtools(createStore(state))

export { store, storeWorker }
