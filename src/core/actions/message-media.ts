import createSyncTaskQueue from 'sync-task-queue'

import type { Folder, InputMessage, InputFile, DownloadingFile } from '~/core/store'
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
  const { inputFiles = [] } = message

  for (let i = 0; i < inputFiles.length; i++) {
    const sendingMessage = getSendingMessage(folder.id)
    if (!sendingMessage) return

    const inputFile = inputFiles[i]
    const final = i === inputFiles.length - 1
    const uploadedFile = await uploadFile(folder, inputFile)

    if (!uploadedFile) continue

    const success = await createMessage({
      text: generateFileMessageMark(parentId),
      inputMedia: uploadedFile
    }, folder, final)

    if (success && !final) {
      const sendingMessage = getSendingMessage(folder.id)
      if (!sendingMessage) return

      const updatedMessage = {
        ...sendingMessage,
        inputFiles: sendingMessage.inputFiles?.filter(({ key }) => key !== inputFile.key)
      }
      setSendingMessage(folder.id, updatedMessage)
    }
  }

  return message
}

const uploadFile = async (folder: Folder, inputFile: InputFile) => {
  if (!inputFile?.file || !checkIsUploading(folder, inputFile.key)) return

  const fileParams = await api.prepareUploadingFile(inputFile.key, inputFile.file)
  delete inputFile.file

  for (let part = 0; part < fileParams.partsCount; part++) {
    if (!checkIsUploading(folder, inputFile.key)) return

    await api.uploadFilePart({
      ...fileParams,
      fileKey: inputFile.key,
      part
    })
    const progress = Math.round((part + 1) / fileParams.partsCount * 100)
    onUploadPart(folder, inputFile.key, progress)
  }

  let thumbParams
  const { w, h, duration } = inputFile

  if (inputFile.thumb) {
    const thumbKey = `thumb${inputFile.thumb.type}${inputFile.thumb.lastModified}${inputFile.thumb.size}`
    thumbParams = await api.prepareUploadingFile(thumbKey, inputFile.thumb)
    delete inputFile.thumb

    for (let part = 0; part < thumbParams.partsCount; part++) {
      if (!checkIsUploading(folder, inputFile.key)) return

      await api.uploadFilePart({
        ...thumbParams,
        fileKey: thumbKey,
        part
      })
    }
  }

  return {
    fileId: fileParams.fileId,
    fileName: fileParams.fileName,
    fileType: fileParams.fileType,
    isLarge: fileParams.isLarge,
    partsCount: fileParams.partsCount,
    imageParams: (w && h && !duration) ? { w, h } : undefined,
    videoParams: (w && h && duration) ? { w, h, duration } : undefined,
    thumb: thumbParams ? {
      fileId: thumbParams.fileId,
      fileName: thumbParams.fileName,
      fileType: thumbParams.fileType,
      isLarge: thumbParams.isLarge,
      partsCount: thumbParams.partsCount
    } : undefined
  }
}

const checkIsUploading = (folder, fileKey) => {
  const sendingMessage = getSendingMessage(folder.id)
  return !!sendingMessage?.inputFiles?.some(({ key }) => key === fileKey)
}

const onUploadPart = (folder, fileKey, progress) => {
  const sendingMessage = getSendingMessage(folder.id)
  if (!sendingMessage) return

  setSendingMessage(folder.id, {
    ...sendingMessage,
    inputFiles: sendingMessage.inputFiles?.map(inputFile =>
      inputFile.key === fileKey ? ({ ...inputFile, progress }) : inputFile
    )
  })
}

export const resetUploadingFiles = (inputFiles: InputFile[]) => {
  inputFiles.forEach(inputFile => {
    api.resetUploadingFile(inputFile.key)
  })
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

export const resetDownloadingFile = (file: {
  id: string
  size: number
}) => {
  const downloadingFiles = new Map(store.getState().downloadingFiles)

  if (!downloadingFiles.has(`${file.id}-${file.size}`)) return
  downloadingFiles.delete(`${file.id}-${file.size}`)

  store.setState({
    downloadingFiles
  })
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
  let downloadingFile: DownloadingFile | undefined = getDownloadingFile(file) || file

  if (
    downloadingFile.blob ||
    downloadingFile.downloading
  ) return

  downloadingFile = {
    ...downloadingFile,
    file_reference: file.file_reference,
    dc_id: file.dc_id,
    access_hash: file.access_hash,
    sizeType: file.sizeType,
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
    const downloadingFile = getDownloadingFile(file)
    if (!downloadingFile) return
    const {
      id,
      lastPart = -1,
      partsCount = 0,
      partSize = 0,
      dc_id,
      access_hash,
      file_reference,
      sizeType,
      originalSizeType
    } = downloadingFile

    for (let part = lastPart + 1; part < partsCount; part++ ) {
      let downloadingFile = getDownloadingFile(file)
      if (!downloadingFile || downloadingFile.downloading === false) return

      const offsetSize = part * partSize
      const isLastPart = part === partsCount - 1

      const filePart = await api.downloadFilePart({
        id,
        partSize,
        offsetSize,
        dc_id,
        access_hash,
        file_reference,
        sizeType,
        originalSizeType
      }).catch(({ message }) => {
        if (downloadingFile && message === 'FILE_REFERENCE_EXPIRED') {
          pauseDownloadingFile(downloadingFile)
          refreshMessage(folder, messageId)
        }
      })

      if (!filePart) return
      const { bytes: nextBytes, ext } = filePart

      downloadingFile = getDownloadingFile(file)
      if (!downloadingFile) return

      const prevBytes = downloadingFile.bytes || new Uint8Array()
      const bytes = new Uint8Array(prevBytes.length + nextBytes.length)
      bytes.set(prevBytes)
      bytes.set(nextBytes, prevBytes.length)
      const typeParts = downloadingFile.type.split('/')
      const type = `${typeParts[0]}/${typeParts[1] || ext}`
      const isImage = type.startsWith('image') || !!sizeType
      const blob = isLastPart ?
        new Blob([new Uint8Array(bytes)], { type: isImage ? 'image/jpeg' : type }) :
        null
      const progress = Math.round((part + 1) / partsCount * 100)

      setDownloadingFile({
        ...downloadingFile,
        ...(blob ? {
          blob,
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
