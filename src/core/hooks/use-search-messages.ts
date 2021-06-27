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
    return {
      messages: groupMessages(messages) as Message[],
      lastMessageId: messages[messages.length - 1]?.id
    }
  }, [searchMessages])
}
