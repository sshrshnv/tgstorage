import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Folder, Message } from '~/core/store'
import { useTexts } from '~/core/hooks'
import { useUpdatableRef } from '~/tools/hooks'
import { groupMessages } from '~/tools/handle-content'

export const useFolder = (id = '') => {
  const { texts } = useTexts('storage')
  const {
    folders,
    foldersMessages
  }: {
    folders: State['folders']
    foldersMessages: State['foldersMessages']
  } = useStoreState(state => ({
    folders: state.folders,
    foldersMessages: state.foldersMessages
  }))

  const folder = folders?.get(id) as Folder
  const folderRef = useUpdatableRef(folder)
  const folderMessages = foldersMessages?.get(id)

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
