import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'

import type { Folder, Message } from '~/core/store'
import { ContentList, useVirtualList } from '~/ui/elements/content-list'

import { StorageContentItemMessage } from './storage.content-item-message'

type Props = {
  folder: Folder
  messages: Message[]
  messagesLoading: boolean
  lastMessageId: number
  loadMessages?: (offsetId: number) => void
  onEditMessage?: (message: Message) => void
}

export const StorageContentListMessages: FC<Props> = ({
  folder,
  messages,
  messagesLoading,
  lastMessageId,
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
    if (
      !messagesLoading &&
      typeof lastMessageId !== 'undefined' &&
      lastOffsetIdRef.current !== lastMessageId &&
      visibility.lastIndex === messages.length - 1
    ) {
      lastOffsetIdRef.current = lastMessageId
      loadMessages?.(lastMessageId)
    }
  }, [visibility.lastIndex])

  return useMemo(() => (
    <ContentList
      forwardedRef={intersectionElRef}
    >
      {messages.map((message, index) => {
        const offset = useMemo(() => {
          return offsets.get(message.id)
        }, [offsets, message.id])
        const height = useMemo(() => {
          return heights.get(message.id)
        }, [heights, message.id])
        const visible = (
          (index >= visibility.firstIndex && index <= visibility.lastIndex) ||
          index === offsets.size - 1
        )

        return useMemo(() => (
          <StorageContentItemMessage
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
          />
        ), [
          message,
          index,
          offset,
          visible,
          resizeObserver,
          intersectionObserver,
          onEditMessage,
          onDeleteMessage
        ])
      })}
    </ContentList>
  ), [
    messages,
    heights,
    offsets,
    visibility.firstIndex,
    visibility.lastIndex,
    resizeObserver,
    intersectionObserver,
    intersectionElRef,
    onEditMessage,
    onDeleteMessage
  ])
}
