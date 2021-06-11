import type { Folder, InputMessage } from '~/core/store'
import { api } from '~/api'

import { uploadFiles } from './upload-files'
import { setUpdates } from './set-updates'
import { resetSendingMessage } from './reset-sending-message'

export const createMessage = async (
  message: InputMessage,
  folder: Folder,
  final = true
) => {
  const updates = await api.createMessage(message, folder)
    .catch((error) => {
      console.log(error)
      return null
    })

  if (!updates) return false
  setUpdates(updates)

  if (message.files) {
    const [[parentId]] = updates.foldersMessages?.get(folder.id) || new Map()
    await uploadFiles(message, folder, parentId)
  }

  if (final && !message.files?.length) {
    resetSendingMessage(folder.id)
  }

  return true
}
