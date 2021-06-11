import type { Folder, Message } from '~/core/store'
import { api } from '~/api'

import { setUpdates } from './set-updates'

export const deleteMessage = async (
  message: Message,
  folder: Folder
) => {
  const updates = await api.deleteMessage(message, folder)
    .catch(() => null)

  if (!updates) return false

  setUpdates(updates)
  return true
}
