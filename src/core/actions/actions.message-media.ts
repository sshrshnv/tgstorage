import { transfer } from 'comlink'
import createSyncTaskQueue from 'sync-task-queue'

import type { Folder, InputMessage, InputFile, DownloadingFile, StreamingFile } from '~/core/store'
import { store } from '~/core/store'
import { getFilePart, getFileMeta, deleteFile, setBytes, createFile } from '~/core/cache'
import { api } from '~/api'
import { timer } from '~/tools/timer'
import { parseVideoFile } from '~/tools/parse-video-file'
import { generateFileMessageMark } from '~/tools/handle-content'
import {
  transformToBytes, generateFileKey,
  generateFileStreamUrl, generateSaveFileStreamUrl
} from '~/tools/handle-file'

import { getActiveFolder } from './actions.folders'
import { getSendingMessage, setSendingMessage, createMessage, refreshMessage } from './actions.messages'

const UPLOAD_THREAD_COUNT = 4

export const uploadFiles = async (
  message: InputMessage,
  folder: Folder,
  parentId: number
) => {
  const { inputFiles = [] } = message

  for (let i = inputFiles.length - 1; i >= 0; i--) {
    const sendingMessage = getSendingMessage(folder.id)
    if (!sendingMessage) return

    const inputFile = inputFiles[i]
    const final = i === 0

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
        inputFiles: sendingMessage.inputFiles?.filter(({ fileKey }) => fileKey !== inputFile.fileKey)
      }
      setSendingMessage(folder.id, updatedMessage)
    }
  }

  return message
}

const uploadFile = async (folder: Folder, inputFile: InputFile) => {
  if (!inputFile?.fileKey) return

  const [mainFileParams, thumbFileParams] = await Promise.all([
    inputFile.fileKey, inputFile.thumbFileKey
  ].map(async (fileKey) => {
    if (!fileKey) return

    const isMainFile = fileKey === inputFile.fileKey
    const fileMeta = getFileMeta(fileKey)

    if (!fileMeta || !checkIsUploading(folder, fileKey)) return

    const fileParams = await api.prepareUploadingFile(fileMeta)
    const { partsCount } = fileParams
    const threadCount = Math.min(UPLOAD_THREAD_COUNT, partsCount)

    const uploadPart = async (part: number, thread: number) => {
      if (part > partsCount - 1) return

      await uploadFilePart(folder, fileKey, fileParams, isMainFile, part, thread)
      return uploadPart(part + threadCount, thread)
    }

    await Promise.all([...Array(threadCount).keys()].map(index =>
      uploadPart(index, index)
    ))

    return fileParams
  }));

  [inputFile.fileKey, inputFile.thumbFileKey].forEach(fileKey => {
    if (!fileKey) return
    deleteFile(fileKey)
  })

  if (!mainFileParams) return
  const { w, h, duration } = inputFile

  return {
    fileId: mainFileParams.fileId,
    fileName: mainFileParams.fileName,
    fileType: mainFileParams.fileType,
    isLarge: mainFileParams.isLarge,
    partsCount: mainFileParams.partsCount,
    imageParams: (w && h && !duration) ? { w, h } : undefined,
    videoParams: (w && h && duration) ? { w, h, duration } : undefined,
    thumb: thumbFileParams ? {
      fileId: thumbFileParams.fileId,
      fileName: thumbFileParams.fileName,
      fileType: thumbFileParams.fileType,
      isLarge: thumbFileParams.isLarge,
      partsCount: thumbFileParams.partsCount
    } : undefined
  }
}

const uploadFilePart = async (
  folder: Folder,
  fileKey: string,
  fileParams: {
    fileId: string
    fileName: string
    fileType: string
    isLarge: boolean
    partSize: number
    lastPartSize: number
    partsCount: number
  },
  isMainFile: boolean,
  part: number,
  thread: number
) => {
  if (!checkIsUploading(folder, fileKey)) return
  const { partSize, lastPartSize, partsCount } = fileParams
  const isLastPart = part === partsCount - 1

  let filePart = getFilePart(fileKey, {
    start: part * partSize,
    end: part * partSize + (isLastPart ? lastPartSize : partSize)
  })

  let filePartBytes = await transformToBytes(filePart) as ArrayBuffer|undefined
  filePart = undefined

  if (!filePartBytes) return

  await api.uploadFilePart(transfer(filePartBytes, [filePartBytes]), {
    ...fileParams,
    part,
    thread
  })

  filePartBytes = undefined

  if (isMainFile) {
    onUploadPart(folder, fileKey, isLastPart ? lastPartSize : partSize)
  }
}

const checkIsUploading = (folder, fileKey) => {
  const sendingMessage = getSendingMessage(folder.id)
  return !!sendingMessage?.inputFiles?.some(inputFile =>
    [inputFile.fileKey, inputFile.thumbFileKey].includes(fileKey)
  )
}

const onUploadPart = (folder, fileKey, partSize) => {
  const sendingMessage = getSendingMessage(folder.id)
  if (!sendingMessage) return

  setSendingMessage(folder.id, {
    ...sendingMessage,
    inputFiles: sendingMessage.inputFiles?.map(inputFile => {
      if (inputFile.fileKey !== fileKey) return inputFile

      const progressSize = (inputFile.progressSize || 0) + partSize
      return {
        ...inputFile,
        progressSize,
        progress: Math.round(progressSize / inputFile.size * 10000) / 100
      }
    })
  })
}

export const resetUploadingFiles = (inputFiles: InputFile[]) => {
  inputFiles.forEach(({ fileKey, thumbFileKey }) => {
    if (fileKey) deleteFile(fileKey)
    if (thumbFileKey) deleteFile(thumbFileKey)
  })
}

export const getDownloadingFile = (file: {
  id: string
  size: number
}) => {
  const fileKey = generateFileKey(file)
  return store.getState().downloadingFiles.get(fileKey)
}

export const setDownloadingFile = (
  file: DownloadingFile
) => {
  const downloadingFiles = new Map(store.getState().downloadingFiles)
  const fileKey = generateFileKey(file)
  downloadingFiles.set(fileKey, file)
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
  const fileKey = generateFileKey(file)

  if (!downloadingFiles.has(fileKey)) return
  downloadingFiles.delete(fileKey)

  store.setState({
    downloadingFiles
  })
}

const DOWNLOADING_PART_SIZE = 1024 * 1024
const DOWNLOADING_TIMEOUT = 400
const DOWNLOADING_THREAD_COUNT = 2
const MAX_DOWNLOADING_COUNT = 8

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
      return timer(DOWNLOADING_TIMEOUT)
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
    downloadingFile.fileKey ||
    downloadingFile.downloading
  ) return

  downloadingFile = {
    ...downloadingFile,
    file_reference: file.file_reference,
    dc_id: file.dc_id,
    access_hash: file.access_hash,
    sizeType: file.sizeType,
    downloading: true,
    ...(!downloadingFile.partsCount ? {
      partSize: DOWNLOADING_PART_SIZE,
      partsCount: Math.ceil(file.size / DOWNLOADING_PART_SIZE)
    } : {})
  }

  setDownloadingFile(downloadingFile)

  downloadingQueue.add(async () => {
    const downloadingFile = getDownloadingFile(file)
    if (!downloadingFile?.downloading) return

    const { partsCount = 0 } = downloadingFile
    const threadCount = Math.min(DOWNLOADING_THREAD_COUNT, partsCount)

    const downloadPart = async (part: number, thread: number) => {
      const downloadingFile = getDownloadingFile(file)
      if (!downloadingFile?.downloading || part > partsCount - 1) return

      await downloadFilePart(messageId, folder, file, part, thread)
      return downloadPart(part + threadCount, thread)
    }

    await Promise.all([...Array(threadCount).keys()].map(index =>
      downloadPart((downloadingFile[`lastDownloadedPart${index}`] || (index - 1)) + 1, index)
    ))
  })
}

const DONWLOADED_PARTS_COUNT: {
  [fileKey: string]: number
} = {}

export const downloadFilePart = async (
  messageId: number,
  folder: Folder,
  file: DownloadingFile,
  part: number,
  thread: number
) => {
  let downloadingFile = getDownloadingFile(file)
  if (!downloadingFile?.downloading) return

  const {
    id,
    partSize = 0,
    dc_id,
    access_hash,
    file_reference,
    sizeType,
    originalSizeType
  } = downloadingFile

  const offsetSize = part * partSize

  let bytes = await api.downloadFilePart({
    id,
    partSize,
    offsetSize,
    dc_id,
    access_hash,
    file_reference,
    sizeType,
    originalSizeType,
    thread
  }).catch(({ message }) => {
    if (downloadingFile && message === 'FILE_REFERENCE_EXPIRED') {
      pauseDownloadingFile(downloadingFile)
      refreshMessage(folder, messageId)
    }
  })

  if (!bytes) return

  downloadingFile = getDownloadingFile(file)
  if (!downloadingFile) return

  let fileKey: string|undefined = generateFileKey(downloadingFile)

  DONWLOADED_PARTS_COUNT[fileKey] = (DONWLOADED_PARTS_COUNT[fileKey] || 0) + 1
  const downloadedPartsCount = DONWLOADED_PARTS_COUNT[fileKey]

  const { type, partsCount = 0 } = downloadingFile
  const isLastPart = downloadedPartsCount === partsCount

  await setBytes(fileKey, part, bytes)
  bytes = undefined

  fileKey = isLastPart ?
    await createFile(fileKey, partsCount, sizeType ? 'image/jpeg' : type === 'v' ? 'video/mp4' : type) :
    undefined

  if (isLastPart && type === 'v') {
    const videoParams = await parseVideoFile(fileKey)
    fileKey = videoParams?.thumbFileKey
  }

  downloadingFile = getDownloadingFile(file)
  if (!downloadingFile) return

  setDownloadingFile({
    ...downloadingFile,
    ...(fileKey ? {
      fileKey,
      downloading: false
    } : {}),
    downloadedPartsCount,
    [`lastDownloadedPart${thread}`]: part,
    progress: Math.round(downloadedPartsCount / partsCount * 100)
  })
}

export const getStreamingFile = (
  fileKey: string
) => {
  return store.getState().streamingFiles.get(fileKey)
}

export const setStreamingFile = (
  file: StreamingFile
) => {
  const streamingFiles = new Map(store.getState().streamingFiles)
  const fileKey = generateFileKey(file)
  streamingFiles.set(fileKey, file)
  store.setState({
    streamingFiles
  })
}

export const streamFile = (
  messageId: number,
  file: DownloadingFile,
  save?: boolean
) => {
  const folder = getActiveFolder() as Folder
  const fileKey = generateFileKey(file)
  let streamingFile: StreamingFile | undefined =
    getStreamingFile(fileKey) ||
    { ...file, folder, messageId }

  streamingFile = {
    ...streamingFile,
    file_reference: file.file_reference,
    dc_id: file.dc_id,
    access_hash: file.access_hash,
    streaming: true,
    folder,
    messageId
  }
  setStreamingFile(streamingFile)

  return save ?
    generateSaveFileStreamUrl(streamingFile) :
    generateFileStreamUrl(streamingFile)
}

export const downloadStreamFilePart = async ({
  fileKey,
  offsetSize,
  partSize,
  file_reference
}: {
  fileKey: string
  offsetSize: number
  partSize: number
  file_reference?: ArrayBuffer
}): Promise<Uint8Array|undefined> => {
  let streamingFile = getStreamingFile(fileKey) as StreamingFile
  if (!streamingFile) return

  if (file_reference) {
    streamingFile = {
      ...streamingFile,
      file_reference
    }
    setStreamingFile(streamingFile)
  }

  const bytes = await api.downloadFilePart({
    ...streamingFile,
    offsetSize,
    partSize,
    precise: false
  }).catch(({ message }) => {
    if (message === 'FILE_REFERENCE_EXPIRED') {
      const { folder, messageId } = streamingFile
      if (!folder || !messageId) return

      return refreshMessage(folder, messageId, 0, () => {
        const file_reference = getFileReference(streamingFile)
        return downloadStreamFilePart({ fileKey, offsetSize, partSize, file_reference })
      }) as Promise<Uint8Array|undefined>
    }
  })

  return bytes
}

export const getFileReference = ({
  folder,
  messageId,
  id
}: {
  folder: Folder
  messageId: number
  id: string
}) => {
  const state = store.getState()
  const folderMessages = state.foldersMessages.get(folder.id)
  const message = folderMessages?.get(messageId)
  const media = [
    message?.media,
    ...(message?.mediaMessages?.map(({ media }) => media) || [])
  ].find(media => media?.id === id)
  return media?.file_reference
}
