import type { ProxyMarked } from 'comlink'

import type {
  User,
  Folders,
  Folder,
  FoldersMessages,
  SearchMessages,
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
  searchMessages?: SearchMessages
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
    message: {
      id: number
      mediaMessages?: { id: number }[]
    },
    folder: Folder
  ) => Promise<Updates>

  moveMessage: (
    message: Message,
    fromFolder: Folder,
    toFolder: Folder
  ) => Promise<Updates>

  prepareUploadingFile: (
    fileKey: string,
    file: File
  ) => Promise<{
    fileId: string
    fileName: string
    fileType: string
    isLarge: boolean
    partSize: number
    lastPartSize: number
    partsCount: number
  }>

  resetUploadingFile: (
    fileKey: string
  ) => Promise<void>

  uploadFilePart: (
    fileParams: {
      fileKey: string
      fileId: string
      isLarge: boolean
      part: number
      partSize: number
      lastPartSize: number
      partsCount: number
    }
  ) => Promise<boolean>

  parseDownloadingFile: (
    fileSize: number
  ) => Promise<{
    partSize: number
    lastPartSize: number
    partsCount: number
    precise: boolean
  }>

  downloadFilePart: (fileParams: {
    id: string
    partSize: number
    offsetSize: number
    dc_id: number
    access_hash: string
    file_reference: ArrayBuffer
    sizeType: string
    originalSizeType: string
  }) => Promise<{ bytes: Uint8Array, ext: string }>

  searchMessages: (
    query: string,
    folder: Folder,
    offsetId: number
  ) => Promise<SearchMessages>

  resetSearchMessages: () => void
}
