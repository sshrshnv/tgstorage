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
  type: string
  originalSize?: number
  dc_id: number
  attributes?: any
  thumbSUrl?: string
  thumbM?: {
    size: number
    location: {
      local_id: number
      volume_id: string
    }
    thumb_size: string
  }
  thumbMUrl?: string
  thumbVideo?: {
    size: number
    location: {
      local_id: number
      volume_id: string
    }
  }
  isPhoto: boolean
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
  key: string
  progress: number
  name: string
  size: number
  w?: number
  h?: number
  duration?: number
  thumb?: File
  data?: Uint8Array
  file?: File
}

export type InputMessage = {
  id?: number
  text: string
  inputMedia?: {
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
  inputFiles?: InputFile[]
}

export type SendingMessages =
  Map<number, InputMessage | undefined>

export type DownloadingFile = {
  id: string
  url?: string
  blob?: Blob
  bytes?: Uint8Array
  partSize?: number
  lastPartSize?: number
  partsCount?: number
  lastPart?: number
  name?: string
  size: number
  type: string
  ext?: string
  dc_id: number
  access_hash: string
  file_reference: ArrayBuffer
  location?: {
    local_id: number
    volume_id: string
  }
  photo?: boolean
  thumb?: boolean
  thumb_size: string
  downloading?: boolean
  progress?: number
  isPhoto: boolean
}

export type DownloadingFiles =
  Map<string, DownloadingFile>

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
  settings: Settings
  texts: Texts
}
