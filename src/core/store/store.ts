import createStore from 'unistore'
import devtools from 'unistore/devtools'

import { dataCache } from '~/core/cache'
import { checkIsStandalone } from '~/tools/detect-standalone'
import { LANGS, detectLang } from '~/tools/detect-lang'

import type { State, Texts, Settings, User, Folders, FoldersMessages } from './store.types'

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
  dataCache.getUser(),
  dataCache.getFolders(),
  dataCache.getFoldersMessages(),
  dataCache.getSettings()
])

const initialSettings: Settings = {
  theme: 'system',
  lang: detectLang(),
  generalFolderEnabled: true,
  errorWidgetEnabled: false,
  errorSendingEnabled: false,
  installWidgetEnabled: true
}

const initialDataState = {
  user: null,
  userLoading: false,
  folders: new Map(),
  foldersLoading: false,
  foldersMessages: new Map(),
  activeFolderId: '',
  loadingFolderIds: new Map(),
  sendingMessages: new Map(),
  searchMessages: new Map(),
  downloadingFiles: new Map(),
  streamingFiles: new Map(),
  sharedData: null
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
  texts: LANGS.reduce((obj, lang) => ({ ...obj, [lang]: {} }), {} as Texts),
  appRoute: self.location.pathname,
  appFeatureRendered: false,
  appUpdateExists: false,
  appUpdateAccepted: false,
  appInstallAvailable: false,
  appInstalled: checkIsStandalone(),
  appErrorExists: false,
  newsChannelAvailable: false,
  sponsorshipAvailable: false,
}

const store = process.env.NODE_ENV === 'production' ?
  createStore(state) :
  devtools(createStore(state))

const resetStore = () => store.setState({
  ...initialDataState
})

export { store, resetStore }
