import type { Updates } from '~/api'

import { setFolders } from './set-folders'
import { setFoldersMessages } from './set-folders-messages'

export const setUpdates = ({
  folders,
  foldersMessages
}: Updates) => {
  if (folders) {
    setFolders(folders)
  }
  if (foldersMessages) {
    setFoldersMessages(foldersMessages)
  }
}
