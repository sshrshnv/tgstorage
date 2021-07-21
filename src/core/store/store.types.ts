import type { AvailableLocales } from '~/tools/detect-locale'

export type Locales = AvailableLocales

export type Texts = {
  [key in Locales]: {
    [k: string]: string
  }
}

export type Viewport = {
  height: number
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
  country: string
} | null

export type Folder = {
  id: number
  access_hash: string
  title: string
  category: string
  general?: boolean
}

export type Folders =
  Map<number, Folder>

export type MessageMedia = {
  id: string
  access_hash: string
  file_reference: ArrayBuffer
  name?: string
  description?: {
    performer?: string
    title?: string
  }
  duration?: number
  type: string
  originalSize?: number
  dc_id: number
  attributes?: any
  thumbSUrl?: string
  thumbM?: {
    size: number
    sizeType: string
  }
  thumbVideo?: {
    size: number
  }
  originalSizeType: string
}

export type Message = {
  id: number
  parentId?: number
  text: string
  date: string
  media?: MessageMedia
  views?: number
  editDate?: number
  mediaMessages?: Message[]
}

export type FolderMessages =
  Map<number, Message>

export type FoldersMessages =
  Map<number, FolderMessages>

export type SearchMessages =
  Map<number, Message>

export type InputFile = {
  id: string
  progress: number
  name: string
  size: number
  w?: number
  h?: number
  duration?: number
  thumbFileKey?: string
  fileKey?: string
}

export type InputMedia = {
  fileId: string
  fileName: string
  fileType: string
  isLarge: boolean
  partsCount: number
  imageParams?: {
    w: number
    h: number
  }
  videoParams?: {
    duration: number
    w: number
    h: number
  }
  thumb?: {
    fileId: string
    fileName: string
    fileType: string
    isLarge: boolean
    partsCount: number
  }
}

export type InputMessage = {
  id?: number
  text: string
  inputMedia?: InputMedia
  inputFiles?: InputFile[]
}

export type SendingMessages =
  Map<number, InputMessage | undefined>

export type DownloadingFile = {
  id: string
  fileKey?: string
  partSize?: number
  lastPartSize?: number
  partsCount?: number
  lastPart?: number
  name?: string
  size: number
  description?: {
    performer?: string
    title?: string
  }
  duration?: number
  type: string
  ext?: string
  dc_id: number
  access_hash: string
  file_reference: ArrayBuffer
  thumb?: boolean
  sizeType: string
  downloading?: boolean
  progress?: number
  originalSizeType: string
}

export type DownloadingFiles =
  Map<string, DownloadingFile>

export type StreamingFile = {
  folder: Folder
  messageId: number
  id: string
  streamKey?: string
  size: number
  duration?: number
  type: string
  streaming?: boolean
  dc_id: number
  access_hash: string
  file_reference: ArrayBuffer
}

export type StreamingFiles =
  Map<string, StreamingFile>

export type State = {
  user: User
  userLoading: boolean
  folders: Folders
  foldersLoading: boolean
  foldersMessages: FoldersMessages
  activeFolderId: number
  loadingFolderIds: Map<number, boolean>
  sendingMessages: SendingMessages
  searchMessages: SearchMessages
  downloadingFiles: DownloadingFiles
  streamingFiles: StreamingFiles
  settings: Settings
  texts: Texts
  appUpdateExist: boolean
  appUpdateAccepted: boolean
}
