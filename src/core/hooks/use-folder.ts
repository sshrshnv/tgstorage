import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Locales, Folder, Message } from '~/core/store'

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

  return useMemo(() => ({
    folder: {
      ...folder,
      title: folder?.general ? texts.generalFolderTitle : folder?.title
    },
    messages: [...(folderMessages || new Map()).values()] as Message[]
  }), [folder, folderMessages])
}
