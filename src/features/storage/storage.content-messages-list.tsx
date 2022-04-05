import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useState, useCallback } from 'preact/hooks'

import type { Folder, Message } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'
import { ContentList } from '~/ui/elements/content-list'
import { useVirtualList } from '~/ui/hooks'

import { StorageContentMessageItem } from './storage.content-message-item'
import { StorageContentMessagesMediaViewer } from './storage.content-messages-media-viewer'

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

const RENDER_TIMEOUT = 100

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
    resizeObserver,
    visibility,
    finished,
    intersectionObserver,
    countRef,
    intersectionRef,
    onDeleteMessage
  } = useVirtualList()
  const lastMessageIdRef = useUpdatableRef(lastMessageId)
  const messagesLoadingRef = useUpdatableRef(messagesLoading)
  const loadMessagesRef = useUpdatableRef(loadMessages)
  const [renderAvailable, setRenderAvailable] = useState(false)
  const [mediaViewerInitialId, setMediaViewerInitialId] = useState('')

  const openMediaViewer = useCallback((id: string) => {
    setMediaViewerInitialId(id)
  }, [setMediaViewerInitialId])

  const closeMediaViewer = useCallback(() => {
    setMediaViewerInitialId('')
  }, [setMediaViewerInitialId])

  useEffect(() => {
    countRef.current = messages.length
  }, [messages.length])

  useEffect(() => {
    const loadMessages = () => loadMessagesRef.current?.()
    const checkIsLoadAvailable = () => (
      !messagesLoadingRef.current &&
      typeof lastMessageIdRef.current !== 'undefined' &&
      visibility.lastIndex === messages.length - 1
    )
    if (checkIsLoadAvailable()) {
      loadMessages()
    }
  }, [messages.length, visibility.lastIndex, finished])

  useEffect(() => {
    const timeoutId = self.setTimeout(() => {
      setRenderAvailable(true)
    }, RENDER_TIMEOUT)

    return () => self.clearTimeout(timeoutId)
  }, [])

  return renderAvailable && !!messages.length ? (
    <Fragment>
      <ContentList
        intersectionRef={intersectionRef}
        fullHeight={fullHeight}
      >
        {messages.map((message, index) => {
          const last = index === messages.length - 1
          const offset = offsets.get(message.id)
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
              visible={visible}
              last={last}
              resizeObserver={resizeObserver}
              intersectionObserver={intersectionObserver}
              onViewMedia={openMediaViewer}
              onEdit={onEditMessage}
              onDelete={onDeleteMessage}
              onMove={onMoveMessage}
            />
          )
        })}
      </ContentList>

      {mediaViewerInitialId && (
        <StorageContentMessagesMediaViewer
          initialId={mediaViewerInitialId}
          messages={messages}
          onClose={closeMediaViewer}
        />
      )}
    </Fragment>
  ) : null
})
