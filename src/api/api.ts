import { proxy } from 'comlink'
import type { ProxyMarked } from 'comlink'

import ApiWorker from './api.worker.ts'

export type Country = {
  country: string
}

export type Countries = {
  countries: {
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

export type User = {
  id: number
  access_hash: string
  photo: {
    bytes: Uint8Array
    type: string
  } | null
}

export type Api = {
  listenUpdates: (
    arg: ProxyMarked
  ) => void

  getCountry: () => Promise<Country>

  getCountries: () => Promise<Countries>

  sendCode: (
    phone: string
  ) => Promise<{
    phone_code_hash: string
    timeout: number
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
    user?: User
    terms_of_service?: any
  }>

  checkPassword: (
    password: string
  ) => Promise<{
    user?: User
    terms_of_service?: any
  }>

  logOut: () => Promise<boolean>

  getUser: () => Promise<{
    id: number
    access_hash: string
  }>

  getSavedMessages: () => Promise<any>

  getFolders: () => Promise<{
    id: number
    access_hash: string
    title: string
    group: string
  }[]>
}

const apiWorker = new ApiWorker()
const api: Api = await new apiWorker.Api()

const listenUpdates = (handler: (message: any) => void) =>
  api.listenUpdates(proxy(handler))

export { api, listenUpdates }
