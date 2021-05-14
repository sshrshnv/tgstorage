import { wrap, proxy } from 'comlink'
import type { ProxyMarked } from 'comlink'

import type { User, Folders, Folder, FoldersMessages } from '~/core/store'

import ApiWorker from './api.worker.ts'

export type Country = {
  country: string
}

export type Countries = {
  countries: {
    name?: string
    default_name: string
    hidden: boolean
    iso2: string
    country_codes: {
      country_code: string
      prefixes?: string[]
      patterns?: string[]
    }[]
  }[]
}

export type Updates = {
  folders?: Folders
  foldersMessages?: FoldersMessages
}

export type Api = {
  init: () => Promise<void>

  listenUpdates: (
    arg: ProxyMarked
  ) => void

  getCountry: () => Promise<Country>

  getCountries: (
    locale: string
  ) => Promise<Countries>

  sendCode: (
    phone: string,
    country: string
  ) => Promise<{
    phone_code_hash: string
    timeout: number
    type: { _: string }
    next_type?: { _: string }
  }>

  resendCode: (
    phone: string,
    phoneCodeHash: string
  ) => Promise<{
    phone_code_hash: string
    timeout: number
    type: { _: string }
    next_type?: { _: string }
  }>

  signIn: (
    phone: string,
    code: string,
    phoneCodeHash: string,
    country: string
  ) => Promise<{
    user?: User
    terms_of_service?: any
  }>

  checkPassword: (
    password: string,
    country: string
  ) => Promise<{
    user: User
    terms_of_service?: any
  }>

  logOut: () => Promise<boolean>

  getFolders: () => Promise<Updates>

  createFolder: (
    name: string
  ) => Promise<Updates>

  editFolder: (
    name: string,
    folder: Folder
  ) => Promise<Updates>

  editCategory: (
    newCategory: string,
    category: string,
  ) => Promise<Updates>

  deleteFolder: (
    folder: Folder
  ) => Promise<Updates>

  getMessages: (
    folder: Folder,
    offsetId?: number
  ) => Promise<Updates>

  sendMessage: (
    note: string,
    folder: Folder
  ) => Promise<Updates>
}

const apiWorker = new ApiWorker();
(self as any)._aw = apiWorker

const Api: any = wrap(apiWorker)
const api: Api = await new Api()

await api.init()

//const listenUpdates = (handler: (message: any) => void) =>
//  api.listenUpdates(proxy(handler))

const listenUpdates = () => {
  //
}

export { api, listenUpdates }
