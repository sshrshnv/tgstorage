import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Locales, Folder, Message } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'
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
  const folderRef = useUpdatableRef(folder)
  const folderMessages = foldersMessages.get(id)

  return useMemo(() => {
    const messages = [...(folderMessages || new Map()).values()] as Message[]
    const groupedMessages = groupMessages(messages) as Message[]
    return {
      folder: {
        ...folder,
        title: folder?.general ? texts.generalFolderTitle : folder?.title
      },
      folderRef,
      messages: groupedMessages,
      lastMessageId: messages[messages.length - 1]?.id
    }
  }, [folder, folderRef, folderMessages, texts.generalFolderTitle])
}
