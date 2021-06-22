import createSyncTaskQueue from 'sync-task-queue'

import type { Folder, InputMessage, InputFile, DownloadingFile, MessageMedia } from '~/core/store'
import { store } from '~/core/store'
import { api } from '~/api'
import { wait } from '~/tools/wait'
import { generateFileMessageMark } from '~/tools/handle-content'

import { getActiveFolder } from './folders'
import {
  getSendingMessage,
  setSendingMessage,
  createMessage,
  refreshMessage
} from './messages'

export const uploadFiles = async (
  message: InputMessage,
  folder: Folder,
  parentId: number
) => {
  const { files = [] } = message

  const checkIsUploading = (fileKey) => {
    const sendingMessage = getSendingMessage(folder.id)
    return !!sendingMessage?.files?.some(({ key }) => key === fileKey)
  }

  const onUploadPart = (fileKey, progress) => {
    const sendingMessage = getSendingMessage(folder.id)
    if (!sendingMessage) return

    setSendingMessage(folder.id, {
      ...sendingMessage,
      files: sendingMessage.files?.map(file => file.key === fileKey ? ({ ...file, progress }) : file)
    })
  }

  const uploadFile = async (inputFile: InputFile) => {
    if (!inputFile?.file || !checkIsUploading(inputFile.key)) return

    const fileParams = await api.parseUploadingFile(inputFile.file)

    for (let part = 0; part < fileParams.partsCount; part++) {
      if (!checkIsUploading(inputFile.key)) return

      await api.uploadFilePart({ part, ...fileParams })
      const progress = Math.round((part + 1) / fileParams.partsCount * 100)
      onUploadPart(inputFile.key, progress)
    }

    return {
      fileId: fileParams.fileId,
      fileName: fileParams.fileName,
      fileType: fileParams.fileType,
      isLarge: fileParams.isLarge,
      partsCount: fileParams.partsCount
    }
  }

  for (let i = 0; i < files.length; i++) {
    let sendingMessage = getSendingMessage(folder.id)
    if (!sendingMessage) return

    const inputFile = files[i]
    const final = i === files.length - 1
    const uploadedFile = await uploadFile(inputFile)

    if (!uploadedFile) continue

    const success = await createMessage({
      text: generateFileMessageMark(parentId),
      inputMedia: uploadedFile
    }, folder, final)

    if (success && !final) {
      sendingMessage = getSendingMessage(folder.id)
      if (!sendingMessage) return

      const updatedMessage = {
        ...sendingMessage,
        files: sendingMessage.files?.filter(({ key }) => key !== inputFile.key)
      }
      setSendingMessage(folder.id, updatedMessage)
    }
  }

  return message
}

export const getDownloadingFile = (file: {
  id: string
  size: number
}) => {
  return store.getState().downloadingFiles.get(`${file.id}-${file.size}`)
}

export const setDownloadingFile = (
  file: DownloadingFile
) => {
  const downloadingFiles = new Map(store.getState().downloadingFiles)
  downloadingFiles.set(`${file.id}-${file.size}`, file)
  store.setState({
    downloadingFiles
  })
}

export const pauseDownloadingFile = (file: {
  id: string
  size: number
}) => {
  const downloadingFile = getDownloadingFile(file)
  if (downloadingFile?.downloading) {
    setDownloadingFile({
      ...downloadingFile,
      downloading: false
    })
  }
}

const DOWNLOADING_TIMEOUT = 400
const MAX_DOWNLOADING_COUNT = 4

const downloadingQueue = {
  nextIndex: 0,

  queues: [...Array(MAX_DOWNLOADING_COUNT).keys()].reduce((queue, index) => ({
    ...queue,
    [index]: createSyncTaskQueue()
  }), {}),

  add(fn) {
    const currentIndex = this.nextIndex
    this.queues[currentIndex].enqueue(async () => {
      await fn()
      return wait(DOWNLOADING_TIMEOUT)
    })
    this.nextIndex = currentIndex === MAX_DOWNLOADING_COUNT - 1 ? 0 : currentIndex + 1
  }
}

export const downloadFile = async (
  messageId: number,
  file: DownloadingFile
) => {
  const folder = getActiveFolder() as Folder
  let downloadingFile = getDownloadingFile(file) || file

  if (
    downloadingFile.url ||
    downloadingFile.blob ||
    downloadingFile.downloading
  ) return

  downloadingFile = {
    ...downloadingFile,
    file_reference: file.file_reference,
    dc_id: file.dc_id,
    access_hash: file.access_hash,
    thumb_size: file.thumb_size,
    downloading: true
  }

  if (!downloadingFile.lastPart) {
    const fileParams = await api.parseDownloadingFile(file.size)
    downloadingFile = {
      ...downloadingFile,
      ...fileParams
    }
  }

  setDownloadingFile(downloadingFile)

  downloadingQueue.add(async () => {
    const {
      id,
      lastPart = -1,
      partsCount = 0,
      partSize = 0,
      dc_id,
      access_hash,
      file_reference,
      thumb_size,
      isPhoto
    } = getDownloadingFile(file) || downloadingFile

    for (let part = lastPart + 1; part < partsCount; part++ ) {
      downloadingFile = getDownloadingFile(file) || downloadingFile
      if (downloadingFile.downloading === false) return

      const offsetSize = part * partSize
      const isLastPart = part === partsCount - 1

      const filePart = await api.downloadFilePart({
        id,
        partSize,
        offsetSize,
        dc_id,
        access_hash,
        file_reference,
        thumb_size,
        isPhoto
      }).catch(({ message }) => {
        if (message === 'FILE_REFERENCE_EXPIRED') {
          pauseDownloadingFile(downloadingFile)
          refreshMessage(folder, messageId)
        }
      })

      if (!filePart) return

      const { bytes: nextBytes, ext } = filePart
      downloadingFile = getDownloadingFile(file) || downloadingFile
      const prevBytes = downloadingFile.bytes || new Uint8Array()
      const bytes = new Uint8Array(prevBytes.length + nextBytes.length)
      bytes.set(prevBytes)
      bytes.set(nextBytes, prevBytes.length)
      const typeParts = downloadingFile.type.split('/')
      const type = `${typeParts[0]}/${typeParts[1] || ext}`
      const blob = isLastPart ? new Blob([new Uint8Array(bytes)], { type }) : null
      const isImage = type.startsWith('image') || !!thumb_size
      const progress = Math.round((part + 1) / partsCount * 100)

      setDownloadingFile({
        ...downloadingFile,
        ...(blob ? {
          url: isImage ? URL.createObjectURL(blob) : undefined,
          blob: isImage ? undefined : blob,
          bytes: undefined,
          downloading: false
        } : {
          bytes
        }),
        lastPart: part,
        ext,
        progress
      })
    }
  })
}
