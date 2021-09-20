import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'

export const useSendingMessages = () => {
  const {
    sendingMessages
  }: {
    sendingMessages: State['sendingMessages']
  } = useStoreState(state => ({
    sendingMessages: state.sendingMessages
  }))
  const sendingMessagesRef = useUpdatableRef(sendingMessages)

  return useMemo(() => ({
    sendingMessages,
    sendingMessagesRef
  }), [sendingMessages, sendingMessagesRef])
}
