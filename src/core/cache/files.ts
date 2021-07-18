import {
  MAX_FILE_SIZE,
  generateLocalFileKey
} from '~/tools/handle-file'

type FileMeta = {
  name: string
  size: number
  type: string
  lastModified: number
}

const fileCache = new Map<string, File|Blob>()
const fileMetaCache = new Map<string, FileMeta>()
const bytesCache = new Map<string, Uint8Array>()

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

export const setBytes = (fileId: string, bytes: Uint8Array) =>
  bytesCache.set(fileId, bytes)

export const addBytes = (fileId: string, nextBytes: Uint8Array|any) => {
  let prevBytes = getBytes(fileId) || new Uint8Array() as any
  let bytes = new Uint8Array(prevBytes.length + nextBytes.length) as any
  bytes.set(prevBytes)
  bytes.set(nextBytes, prevBytes.length)
  setBytes(fileId, bytes)
  prevBytes = undefined
  nextBytes = undefined
  bytes = undefined
}

export const getBytes = (fileId: string) =>
  bytesCache.get(fileId)

export const deleteBytes = (fileId: string) =>
  bytesCache.delete(fileId)

export const transferBytesToFile = (fileId: string, type) => {
  let bytes = getBytes(fileId)
  if (!bytes) return ''

  let file = new Blob([bytes], { type }) as File|undefined
  deleteBytes(fileId)
  const fileKey = setFile(file, fileId)
  file = undefined
  bytes = undefined

  return fileKey
}
