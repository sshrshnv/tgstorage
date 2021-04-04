import { wrap, proxy } from 'comlink'
import type { ProxyMarked } from 'comlink'

import type { User, Folders } from '~/core/store'

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
    phone: string
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
    phoneCodeHash: string
  ) => Promise<{
    user?: User
    terms_of_service?: any
  }>

  signUp: (
    phone: string,
    phoneCodeHash: string,
    name
  ) => Promise<{
    user: User
    terms_of_service?: any
  }>

  checkPassword: (
    password: string
  ) => Promise<{
    user: User
    terms_of_service?: any
  }>

  logOut: () => Promise<boolean>

  getUser: () => Promise<User>

  getSavedMessages: () => Promise<any>

  getFolders: () => Promise<Folders>

  createFolder: (
    title: string,
    folders: Folders
  ) => Promise<Folders>
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
