import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Message } from '~/core/store'
import { groupMessages } from '~/tools/handle-content'

export const useSearchMessages = () => {
  const {
    searchMessages
  }: {
    searchMessages: State['searchMessages']
  } = useStoreState(state => ({
    searchMessages: state.searchMessages
  }))

  return useMemo(() => {
    const messages = [...searchMessages.values()] as Message[]
    const groupedMessages = groupMessages(messages) as Message[]
    return {
      messages: groupedMessages,
      lastMessageId: messages[messages.length - 1]?.id
    }
  }, [searchMessages])
}
