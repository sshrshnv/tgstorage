import { createStore, getMany, set, clear, } from 'idb-keyval'

import {
  MAX_FILE_SIZE,
  generateLocalFileKey
} from '~/tools/handle-file'

export type FileMeta = {
  name: string
  size: number
  type: string
  lastModified: number
}

const database = createStore('tgstorage-files', 'data')
const fileCache = new Map<string, File|Blob>()
const fileMetaCache = new Map<string, FileMeta>()

export const setFile = (file: File|null|undefined, fileId = '') => {
  if (!file) return

  if (fileId) {
    fileCache.set(fileId, file)
    return fileId
  }

  const { name, size, type, lastModified } = file

  if (size > MAX_FILE_SIZE) return

  const fileMeta = { name, size, type, lastModified }
  const fileKey = generateLocalFileKey(fileMeta)

  fileCache.set(fileKey, file)
  fileMetaCache.set(fileKey, fileMeta)

  return fileKey
}

export const getFile = (fileKey: string) =>
  fileCache.get(fileKey)

export const getFileUrl = (fileKey: string) => {
  let file = fileCache.get(fileKey)
  if (!file) return ''

  const fileUrl = URL.createObjectURL(file)
  file = undefined

  return fileUrl
}

export const getFilePart = (fileKey: string, { start = 0, end }) => {
  let file = getFile(fileKey)
  if (!file) return

  const filePart = file.slice(start, end)
  file = undefined
  return filePart
}

export const getFileMeta = (fileKey: string) =>
  fileMetaCache.get(fileKey)

export const deleteFile = (fileKey: string) => {
  fileCache.delete(fileKey)
  fileMetaCache.delete(fileKey)
}

export const setBytes = (fileId: string, part: number, bytes: Uint8Array) =>
  set(`${fileId}-${part}`, bytes, database)

export const createFile = async (fileId: string, partsCount: number, type) => {
  let bytes: Uint8Array[]|undefined = await getMany(
    [...Array(partsCount).keys()].map(part => `${fileId}-${part}`),
    database
  )
  if (!bytes?.length) return ''

  let file = new Blob(bytes, { type }) as File|undefined
  const fileKey = setFile(file, fileId)
  file = undefined
  bytes = undefined

  return fileKey
}

export const resetFiles = () => {
  fileCache.clear()
  fileMetaCache.clear()
  clear(database)
}
