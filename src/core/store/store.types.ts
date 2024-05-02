import type { Langs } from '~/tools/detect-lang'
import type { AvailableThemes } from '~/ui/styles'

export type Lang = Langs[number]
export type Theme = AvailableThemes

export type Texts = {
  [key in Lang]: {
    [k: string]: string
  }
}

export type Viewport = {
  height: number
}

export type Settings = {
  lang: Lang
  theme: Theme
  generalFolderEnabled: boolean
  errorWidgetEnabled: boolean
  errorSendingEnabled: boolean
  installWidgetEnabled: boolean
}

export type User = {
  id: string
  access_hash: string
  phone: string
  username?: string
  firstName: string
  lastName?: string
  photo?: {
    id: string
    dc_id: number
  }
  photoFile?: {
    bytes: Uint8Array
    type: string
  }
  country: string
} | null

export type Folder = {
  id: string
  access_hash: string
  title: string
  group: string
  category: string
  news?: boolean
  general?: boolean
  fake?: boolean
}

export type Folders =
  Map<string, Folder>

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
  ext: string
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

export type MessageWebpage = {
  id: number
  url?: string
  displayUrl?: string
  siteName?: string
  title?: string
  description?: string
  duration?: number
  type?: string
  author?: string
  embedUrl?: string
  embedType?: string
  embedWidth?: number
  embedHeight?: number
  file?: {
    id: string
    access_hash: string
    file_reference: ArrayBuffer
    thumbSUrl?: string
    thumbM?: {
      size: number
      sizeType: string
    }
  }
  pending: boolean
}

export type MessageEntity = {
  type: string
  offset: number
  length: number
  url?: string
}

export type MessageFwd = {
  name?: string
}

export type Message = {
  id: number
  parentId?: number
  text: string
  entities?: MessageEntity[]
  date: string
  media?: MessageMedia
  webpage?: MessageWebpage
  views?: number
  editDate?: number
  mediaMessages?: Message[]
  fwd?: MessageFwd
}

export type SponsoredMessage = {
  id: Uint8Array
  text: string
  entities?: MessageEntity[]
  title: string
  link: string
} | null

export type FolderMessages =
  Map<number, Message>

export type FoldersMessages =
  Map<string, FolderMessages>

export type SearchMessages =
  Map<number, Message>

export type InputFile = {
  id: string
  name: string
  progress: number
  progressSize: number
  size: number
  w?: number
  h?: number
  duration?: number
  thumbFileKey?: string
  fileKey?: string
  parsing?: boolean
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
  folderId?: string
  id?: number
  text: string
  entities?: MessageEntity[]
  inputMedia?: InputMedia
  inputFiles?: InputFile[]
}

export type SendingMessages =
  Map<string, InputMessage | undefined>

export type DownloadingFile = {
  id: string
  fileKey?: string
  partSize?: number
  lastPartSize?: number
  partsCount?: number
  downloadedPartsCount?: number
  lastDownloadedPart0?: number
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
  name?: string
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

export type SharedData = {
  text?: string
  fileKeys?: string[]
} | null

export type State = {
  user: User
  userLoading: boolean
  folders: Folders
  foldersLoading: boolean
  foldersMessages: FoldersMessages
  activeFolderId: string
  loadingFolderIds: Map<string, boolean>
  sendingMessages: SendingMessages
  searchMessages: SearchMessages
  downloadingFiles: DownloadingFiles
  streamingFiles: StreamingFiles
  settings: Settings
  texts: Texts
  sharedData: SharedData
  appRoute: string
  appFeatureRendered: boolean
  appUpdateExists: boolean
  appUpdateAccepted: boolean
  appInstallAvailable: boolean
  appInstalled: boolean
  appErrorExists: boolean
  newsChannelAvailable: boolean
  sponsorshipAvailable: boolean
}
