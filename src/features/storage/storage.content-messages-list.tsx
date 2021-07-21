import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect } from 'preact/hooks'

import type { Folder, Message } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'
import { ContentList } from '~/ui/elements/content-list'
import { useVirtualList } from '~/ui/hooks'

import { StorageContentMessageItem } from './storage.content-message-item'

type Props = {
  folder: Folder
  messages: Message[]
  messagesLoading: boolean
  lastMessageId: number
  fullHeight?: boolean
  loadMessages?: () => void
  onEditMessage?: (message: Message) => void
  onMoveMessage?: (message: Message) => void
}

export const StorageContentMessagesList: FC<Props> = memo(({
  folder,
  messages,
  messagesLoading,
  lastMessageId,
  fullHeight,
  loadMessages,
  onEditMessage,
  onMoveMessage
}) => {
  const {
    offsets,
    heights,
    resizeObserver,
    visibility,
    intersectionObserver,
    countRef,
    intersectionRef,
    onDeleteMessage
  } = useVirtualList()
  const lastMessageIdRef = useUpdatableRef(lastMessageId)
  const messagesLoadingRef = useUpdatableRef(messagesLoading)
  const loadMessagesRef = useUpdatableRef(loadMessages)

  useEffect(() => {
    countRef.current = messages.length
  }, [messages.length, countRef])

  useEffect(() => {
    const lastMessageId = lastMessageIdRef.current
    const messagesLoading = messagesLoadingRef.current
    const loadMessages = loadMessagesRef.current
    if (
      !messagesLoading &&
      typeof lastMessageId !== 'undefined' &&
      visibility.lastIndex === messages.length - 1
    ) {
      loadMessages?.()
    }
  }, [messages.length, visibility.lastIndex, messagesLoadingRef, lastMessageIdRef, loadMessagesRef])

  return (
    <ContentList
      intersectionRef={intersectionRef}
      fullHeight={fullHeight}
    >
      {messages.map((message, index) => {
        const offset = offsets.get(message.id)
        const height = heights.get(message.id)
        const visible = (
          (index >= visibility.firstIndex && index <= visibility.lastIndex) ||
          index === offsets.size - 1
        )

        return (
          <StorageContentMessageItem
            key={`${message.id}-${message.parentId}`}
            folder={folder}
            message={message}
            offset={offset}
            height={height}
            visible={visible}
            resizeObserver={resizeObserver}
            intersectionObserver={intersectionObserver}
            onEdit={onEditMessage}
            onDelete={onDeleteMessage}
            onMove={onMoveMessage}
          />
        )
      })}
    </ContentList>
  )
})
