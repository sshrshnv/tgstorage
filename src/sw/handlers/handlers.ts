type MessageHandlers = Map<string, (data?: any) => void>

const messageHandlers: MessageHandlers = new Map()

export const addMessageHandler = (
  messageKey: string,
  handler: (data?: any) => void
) => {
  messageHandlers.set(messageKey, handler)
}

export const getMessageHandler = (
  messageKey: string
) => {
  return messageHandlers.get(messageKey)
}

export const deleteMessageHandler = (
  messageKey: string
) => {
  messageHandlers.delete(messageKey)
}
