import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'

export const useSendingMessage = (folderId: number) => {
  const {
    sendingMessages
  }: {
    sendingMessages: State['sendingMessages']
  } = useStoreState(state => ({
    sendingMessages: state.sendingMessages
  }))
  const sendingMessage = sendingMessages.get(folderId)
  const sendingMessageRef = useUpdatableRef(sendingMessage)

  return useMemo(() => ({
    sendingMessage,
    sendingMessageRef
  }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [sendingMessage?.inputFiles, sendingMessageRef])
}
