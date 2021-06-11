import type { InputMessage } from '~/core/store'
import { store } from '~/core/store'

export const setSendingMessage = (
  folderId: number,
  message: InputMessage | undefined
) => {
  const sendingMessages = new Map(store.getState().sendingMessages)
  sendingMessages.set(folderId, message)
  store.setState({
    sendingMessages
  })
}
