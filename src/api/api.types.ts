import type { ProxyMarked } from 'comlink'

import type {
  User,
  Folders,
  Folder,
  FoldersMessages,
  SearchMessages,
  Message,
  SponsoredMessage,
  InputMessage
} from '~/core/store'

export type ApiError = {
  type: 'rpc' | 'network' | 'transport' | 'internal'
  code: number
  message?: string
  method: string
}

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

  listenErrors: (
    arg: ProxyMarked
  ) => void

  listenUpdates: (
    arg: ProxyMarked
  ) => void

  getCountry: () => Promise<Country>

  getCountries: (
    lang: string
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

  updateUser: () => Promise<{
    user: User
  }>

  downloadPhotoFile: (photoParams: {
    id: string
    dc_id: number
  }) => Promise<{ bytes: Uint8Array, type: string }>

  getFolders: () => Promise<Updates>

  createFolder: (
    name: string
  ) => Promise<Updates>

  editFolder: (
    name: string,
    folder: Folder
  ) => Promise<Updates>

  editGroup: (
    newGroup: string,
    group: string,
    category: string,
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
    lastMessageId?: number
  ) => Promise<Updates>

  getSponsoredMessage: (
    folder: Folder
  ) => Promise<SponsoredMessage>

  markSponsoredMessage: (
    message: SponsoredMessage,
    folder: Folder
  ) => Promise<void>

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
    fileMeta: {
      size: number
      name: string
      type: string
    }
  ) => Promise<{
    fileId: string
    fileName: string
    fileType: string
    isLarge: boolean
    partSize: number
    lastPartSize: number
    partsCount: number
  }>

  uploadFilePart: (
    filePartBytes: ArrayBuffer,
    fileParams: {
      fileId: string
      isLarge: boolean
      part: number
      partsCount: number
      thread: number
    }
  ) => Promise<boolean>

  downloadFilePart: (fileParams: {
    id: string
    partSize: number
    offsetSize: number
    dc_id: number
    access_hash: string
    file_reference: ArrayBuffer
    sizeType?: string
    originalSizeType?: string
    precise?: boolean
    thread?: number
  }) => Promise<Uint8Array>

  searchMessages: (
    query: string,
    folder: Folder
  ) => Promise<SearchMessages|undefined>

  resetSearch: () => void

  checkNewsChannelJoining: () => Promise<{
    joiningAvailable?: boolean
    joined?: boolean
  }>

  joinNewsChannel: () => Promise<void>

  checkSponsorshipJoining: () => Promise<{
    joiningAvailable?: boolean
    joined?: boolean
  }>
}
