import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useState, useCallback, useEffect, useRef } from 'preact/hooks'

import { searchMessages, resetSearchMessages } from '~/core/actions'
import { useTexts, useActiveFolder, useSearchMessages } from '~/core/hooks'
import { Content } from '~/ui/elements/content'
import { ContentHeader } from '~/ui/elements/content-header'
import { Layout } from '~/ui/elements/layout'
import { Text } from '~/ui/elements/text'

import { StorageContentMessagesList } from './storage.content-messages-list'

type Props = {
  toggleSearch: () => void
}

export const StorageContentSearchPopup: FC<Props> = ({
  toggleSearch
}) => {
  const { texts } = useTexts('storage')
  const { folder } = useActiveFolder()
  const { messages, lastMessageId } = useSearchMessages()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [offsetLoading, setOffsetLoading] = useState(false)
  const searchTimeout = useRef(0)

  const loadOffsetMessages = useCallback(async (offsetId) => {
    setOffsetLoading(true)
    await searchMessages(query, folder, offsetId)
    setOffsetLoading(false)
  }, [query, folder.id])

  const loadMessages = useCallback(async (query) => {
    setLoading(true)
    await searchMessages(query, folder, 0)
    setLoading(false)
  }, [folder.id])

  useEffect(() => {
    if (searchTimeout.current) {
      self.clearTimeout(searchTimeout.current)
      searchTimeout.current = 0
    }

    if (messages.length) {
      resetSearchMessages()
    }

    if (query.length < 3) return

    searchTimeout.current = self.setTimeout(() => {
      loadMessages(query)
    }, 300)
  }, [query])

  useEffect(() => () => {
    resetSearchMessages()
  }, [])

  return (
    <Content
      name="content-search"
      onClose={toggleSearch}
    >
      <ContentHeader
        loading={loading || offsetLoading}
        inputPlaceholder={texts.searchPlaceholder}
        inputValue={query}
        onInput={setQuery}
      />

      <StorageContentMessagesList
        key={folder.id}
        folder={folder}
        messages={(query.length < 3 || loading) ? [] : messages}
        messagesLoading={loading}
        loadMessages={loadOffsetMessages}
        //onEditMessage={handleEditMessage}
        lastMessageId={lastMessageId}
      />

      {query.length < 3 && (
        <Layout center>
          <Text grey>
            {texts.searchInitial} {folder.title}
          </Text>
        </Layout>
      )}

      {(query.length >= 3 && !loading && !messages.length) && (
        <Layout center>
          <Text grey>
            {texts.searchEmpty}
          </Text>
        </Layout>
      )}
    </Content>
  )
}
