import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useFolder } from '~/core/hooks'

export const useActiveFolder = () => {
  const {
    activeFolderId,
    loadingFolderIds
  }: {
    activeFolderId: State['activeFolderId']
    loadingFolderIds: State['loadingFolderIds']
  } = useStoreState(state => ({
    activeFolderId: state.activeFolderId,
    loadingFolderIds: state.loadingFolderIds
  }))
  const { folder, messages, lastMessageId } = useFolder(activeFolderId)
  const messagesLoading = useMemo(() => {
    return loadingFolderIds.get(activeFolderId) || false
  }, [activeFolderId, loadingFolderIds])

  return useMemo(() => ({
    folder,
    messages,
    messagesLoading,
    lastMessageId
  }), [folder, messages, messagesLoading, lastMessageId])
}
