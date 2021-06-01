import createStore from 'unistore'
import devtools from 'unistore/devtools'

import { apiCache } from '~/api'
import { detectLocale } from '~/tools/detect-locale'
import type { AvailableLocales } from '~/tools/detect-locale'

import en from './app.texts.en.json'
import ru from './app.texts.ru.json'

export type Locales = AvailableLocales

export type Texts = {
  [key in Locales]: {
    [k: string]: string
  }
}

export type Viewport = {
  height: number
}

export type Settings = {
  locale: Locales
}

export type User = {
  id: number
  access_hash: string
  first_name: string
  photo?: {
    bytes: Uint8Array
    type: string
  } | null
  country: string
} | null

export type Folder = {
  id: number
  access_hash: string
  title: string
  category: string
  general?: boolean
}

export type Folders =
  Map<number, Folder>

export type Message = {
  id: number
  text: string
  date: string
  media?: any
  views?: number
  editDate?: number
}

export type FolderMessages =
  Map<number, Message>

export type FoldersMessages =
  Map<number, FolderMessages>

const [
  user,
  folders,
  foldersMessages,
  settings
]: [
  User,
  Folders,
  FoldersMessages,
  Settings
] = await Promise.all([
  apiCache.getUser(),
  apiCache.getFolders(),
  apiCache.getFoldersMessages(),
  apiCache.getSettings()
])

export type State = {
  user: User
  userLoading: boolean
  folders: Folders
  foldersLoading: boolean
  foldersMessages: FoldersMessages
  activeFolderId: number
  loadingFolderIds: Map<number, boolean>
  settings: Settings
  texts: Texts
}

const state: State = {
  user,
  userLoading: true,
  folders,
  foldersLoading: true,
  foldersMessages,
  activeFolderId: 0,
  loadingFolderIds: new Map(),
  settings: settings || {
    locale: detectLocale()
  },
  texts: {
    en,
    ru
  }
}

const store = process.env.NODE_ENV === 'production' ?
  createStore(state) :
  devtools(createStore(state))

export { store }
