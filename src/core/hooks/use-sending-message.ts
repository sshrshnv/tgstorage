import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useSendingMessage = (folderId: number) => {
  const {
    sendingMessages
  }: {
    sendingMessages: State['sendingMessages']
  } = useStoreState(state => ({
    sendingMessages: state.sendingMessages
  }))
  const sendingMessage = sendingMessages.get(folderId)

  return useMemo(() => ({
    sendingMessage
  }), [sendingMessage?.inputFiles])
}
