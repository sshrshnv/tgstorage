import type { Folder, InputMessage } from '~/core/store'
import { api } from '~/api'

import { setUpdates } from './set-updates'
import { resetSendingMessage } from './reset-sending-message'

export const editMessage = async (
  message: InputMessage,
  folder: Folder,
  final = true
) => {
  if (message.files) {
    //message = await uploadFiles(message, folder)
  }
  const updates = await api.editMessage(message, folder)
    .catch(({ message }) => {
      return message === 'MESSAGE_NOT_MODIFIED'
    })

  if (final) {
    resetSendingMessage(folder.id)
  }

  if (typeof updates === 'boolean') {
    return updates
  }

  setUpdates(updates)
  return true
}
