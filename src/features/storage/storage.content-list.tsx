import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useMemo } from 'preact/hooks'

import type { FolderMessages } from '~/core/store'
import { ContentList, useVirtualList } from '~/ui/elements/content-list'

import { StorageContentItemMessage } from './storage.content-item-message'

type Props = {
  messages: FolderMessages
}

export const StorageContentList: FC<Props> = ({
  messages
}) => {
  const {
    offsets,
    visibility,
    resizeObserver,
    intersectionObserver,
    intersectionElRef,
    countRef
  } = useVirtualList()

  useEffect(() => {
    countRef.current = messages.length
  }, [messages.length])

  return (
    <ContentList
      forwardedRef={intersectionElRef}
    >
      {messages.map((message, index) => {
        const count = messages.length
        const offset = offsets[index]
        const visible = index >= visibility.firstIndex && index <= visibility.lastIndex

        return useMemo(() => (
          <StorageContentItemMessage
            key={message.id}
            message={message}
            index={index}
            offset={offset}
            visible={visible}
            resizeObserver={resizeObserver}
            intersectionObserver={intersectionObserver}
          />
        ), [message, index, count, offset, visible, resizeObserver, intersectionObserver])
      })}
    </ContentList>
  )
}
