import { setSendingMessage } from './set-sending-message'

export const resetSendingMessage = (
  folderId: number
) => {
  setSendingMessage(folderId, undefined)
}
