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

const initialSettings: Settings = {
  theme: 'system',
  locale: detectLocale(),
  generalFolder: true
}

const initialDataState = {
  user: null,
  userLoading: false,
  folders: new Map(),
  foldersLoading: false,
  foldersMessages: new Map(),
  activeFolderId: 0,
  loadingFolderIds: new Map(),
  sendingMessages: new Map(),
  searchMessages: new Map(),
  downloadingFiles: new Map(),
  streamingFiles: new Map(),
}

const state: State = {
  ...initialDataState,
  user,
  folders,
  foldersMessages,
  settings: {
    ...initialSettings,
    ...settings
  },
  texts: {
    en,
    ru
  },
  appUpdateExist: false,
  appUpdateAccepted: false
}

const store = process.env.NODE_ENV === 'production' ?
  createStore(state) :
  devtools(createStore(state))

const resetStore = () => store.setState({
  ...initialDataState
})

export { store, resetStore }
