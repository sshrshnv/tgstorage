import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useMemo, useRef } from 'preact/hooks'

import type { Folder, Message } from '~/core/store'
import { ContentList, useVirtualList } from '~/ui/elements/content-list'

import { StorageContentItemMessage } from './storage.content-item-message'

type Props = {
  folder: Folder
  messages: Message[]
  messagesLoading: boolean
  loadMessages?: (offsetId: number) => void
  onEditMessage?: (message: Message) => void
}

export const StorageContentListMessages: FC<Props> = ({
  folder,
  messages,
  messagesLoading,
  loadMessages,
  onEditMessage
}) => {
  const {
    offsets,
    heights,
    resizeObserver,
    visibility,
    intersectionObserver,
    intersectionElRef,
    countRef,
    onDeleteMessage
  } = useVirtualList()
  const lastOffsetIdRef = useRef(0)

  useEffect(() => {
    countRef.current = messages.length
  }, [messages.length])

  useEffect(() => {
    const offsetId = messages[messages.length - 1]?.id
    if (
      !messagesLoading &&
      typeof offsetId !== 'undefined' &&
      lastOffsetIdRef.current !== offsetId &&
      visibility.lastIndex === messages.length - 1
    ) {
      lastOffsetIdRef.current = offsetId
      loadMessages?.(offsetId)
    }
  }, [visibility.lastIndex])

  return (
    <ContentList
      forwardedRef={intersectionElRef}
    >
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1]
        const count = messages?.length || 0
        const offset = offsets.get(message.id)
        const height = heights.get(message.id)
        const visible = (
          (index >= visibility.firstIndex && index <= visibility.lastIndex) ||
          index === offsets.size - 1
        )

        return useMemo(() => (
          <StorageContentItemMessage
            key={message.id}
            folder={folder}
            message={message}
            offset={offset}
            height={height}
            visible={visible}
            resizeObserver={resizeObserver}
            intersectionObserver={intersectionObserver}
            onEdit={onEditMessage}
            onDelete={onDeleteMessage}
          />
        ), [
          message,
          index,
          count,
          offset,
          visible,
          resizeObserver,
          intersectionObserver,
          prevMessage?.parentId,
          onEditMessage,
          onDeleteMessage
        ])
      })}
    </ContentList>
  )
}
