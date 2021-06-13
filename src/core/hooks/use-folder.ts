import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Locales, Folder, Message } from '~/core/store'
import { groupMessages } from '~/tools/handle-content'

export const useFolder = (id = 0) => {
  const {
    folders,
    foldersMessages,
    texts
  }: {
    folders: State['folders']
    foldersMessages: State['foldersMessages']
    texts: State['texts'][Locales]
  } = useStoreState(state => ({
    folders: state.folders,
    foldersMessages: state.foldersMessages,
    texts: state.texts[state.settings.locale].storage
  }))

  const folder = folders.get(id) as Folder
  const folderMessages = foldersMessages.get(id)

  return useMemo(() => {
    const messages = [...(folderMessages || new Map()).values()] as Message[]
    return {
      folder: {
        ...folder,
        title: folder?.general ? texts.generalFolderTitle : folder?.title
      },
      messages: groupMessages(messages) as Message[],
      lastMessageId: messages[messages.length - 1]?.id
    }
  }, [folder, folderMessages])
}
