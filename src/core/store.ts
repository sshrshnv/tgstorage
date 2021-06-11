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

export type MessageMedia = {
  id: string
  access_hash: string
  file_reference: ArrayBuffer
  name?: string
  type: string
  size?: number
  dc_id: number
  attributes?: any
  thumbSUrl?: string
  thumbM?: {
    size: number
    location: {
      local_id: number
      volume_id: string
    }
  }
  thumbMUrl?: string
  thumbVideo?: {
    size: number
    location: {
      local_id: number
      volume_id: string
    }
  }
}

export type Message = {
  id: number
  parentId?: number
  text: string
  date: string
  media?: MessageMedia
  views?: number
  editDate?: number
  fileMessages?: Message[]
}

export type FolderMessages =
  Map<number, Message>

export type FoldersMessages =
  Map<number, FolderMessages>

export type InputFile = {
  id: string
  key: string
  progress: number
  data?: Uint8Array
  file?: File
}

export type InputMessage = {
  id?: number
  text: string
  inputMedia?: {
    fileId: string
    fileName: string
    fileType: string
    isLarge: boolean
    partsCount: number
  }
  files?: InputFile[]
}

export type SendingMessages =
  Map<number, InputMessage | undefined>

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
  sendingMessages: SendingMessages
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
  sendingMessages: new Map(),
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
