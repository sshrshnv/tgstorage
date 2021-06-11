import { store } from '~/core/store'

export const getSendingMessage = (folderId: number) =>
  store.getState().sendingMessages.get(folderId)
