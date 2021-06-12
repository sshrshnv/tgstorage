import createStore from 'unistore'
import devtools from 'unistore/devtools'

import { apiCache } from '~/api'
import { detectLocale } from '~/tools/detect-locale'

import en from '~/core/app.texts.en.json'
import ru from '~/core/app.texts.ru.json'

import type { State, Settings, User, Folders, FoldersMessages } from './store.types'

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

const state: State = {
  user,
  userLoading: true,
  folders,
  foldersLoading: true,
  foldersMessages,
  activeFolderId: 0,
  loadingFolderIds: new Map(),
  sendingMessages: new Map(),
  downloadingFiles: new Map(),
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
