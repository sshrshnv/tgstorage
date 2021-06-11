import type { Folder, InputMessage, InputFile } from '~/core/store'
import { api } from '~/api'
import { generateFileMessageMark } from '~/tools/handle-content'

import { getSendingMessage } from './get-sending-message'
import { setSendingMessage } from './set-sending-message'
import { createMessage } from './create-message'

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
      files: files.map(file => file.key === fileKey ? ({ ...file, progress }) : file)
    })
  }

  const uploadFile = async (inputFile: InputFile) => {
    if (!inputFile.file || !checkIsUploading(inputFile.key)) return

    const fileParams = await api.parseFile(inputFile.file)

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
    const sendingMessage = getSendingMessage(folder.id)
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
      const updatedMessage = {
        ...sendingMessage,
        files: sendingMessage?.files?.filter(({ key }) => key !== inputFile.key)
      }
      setSendingMessage(folder.id, updatedMessage)
    }
  }

  return message
}
