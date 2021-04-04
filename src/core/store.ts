import createStore from 'unistore'
import devtools from 'unistore/devtools'

import { detectLocale } from '~/tools/detect-locale'
import type { AvailableLocales } from '~/tools/detect-locale'

import { database } from './database'
import texts from './global.texts.json'

export type Locales = AvailableLocales

export type Texts = {
  [key in Locales]: {
    [k: string]: string
  }
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
} | null

export type Folders = {
  id: number
  access_hash: string
  title: string
  category: string
}[]

export type Folder = {
  id: string
  title: string
  items: string[]
}

const [user, folders, settings]: [User, Folders, Settings] = await Promise.all([
  database.getUser(),
  database.getFolders(),
  database.getSettings()
])

export type State = {
  user: User
  userLoading: boolean
  folders: Folders
  foldersLoading: boolean
  settings: Settings
  texts: Texts
}

const state: State = {
  user,
  userLoading: true,
  folders,
  foldersLoading: true,
  settings: settings || {
    locale: detectLocale()
  },
  texts
}

const store = process.env.NODE_ENV === 'production' ?
  createStore(state) :
  devtools(createStore(state))

export { store }
