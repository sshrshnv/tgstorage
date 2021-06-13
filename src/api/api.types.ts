import type { ProxyMarked } from 'comlink'

import type {
  User,
  Folders,
  Folder,
  FoldersMessages,
  Message,
  InputMessage
} from '~/core/store'

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

export type UploadedFile = {
  fileId: string
  isLarge: boolean
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

  refreshMessages: (
    folder: Folder,
    ids: number[]
  ) => Promise<Updates>

  createMessage: (
    message: InputMessage,
    folder: Folder
  ) => Promise<Updates>

  editMessage: (
    message: InputMessage,
    folder: Folder
  ) => Promise<Updates>

  deleteMessage: (
    message: Message,
    folder: Folder
  ) => Promise<Updates>

  parseUploadingFile: (
    file: File
  ) => Promise<{
    fileId: string
    fileData: Uint8Array
    fileName: string
    fileType: string
    isLarge: boolean
    partSize: number
    lastPartSize: number
    partsCount: number
  }>

  parseDownloadingFile: (
    fileSize: number
  ) => Promise<{
    partSize: number
    lastPartSize: number
    partsCount: number
    precise: boolean
  }>

  uploadFilePart: (fileParams: {
    fileId: string
    fileData: Uint8Array
    isLarge: boolean
    part: number
    partSize: number
    lastPartSize: number
    partsCount: number
  }) => Promise<boolean>

  downloadFilePart: (fileParams: {
    id: string
    partSize: number
    offsetSize: number
    location?: {
      local_id: number
      volume_id: string
    }
    dc_id: number
    access_hash: string
    file_reference: ArrayBuffer
    thumb_size: string
    isPhoto: boolean
  }) => Promise<{ bytes: Uint8Array, ext: string }>
}