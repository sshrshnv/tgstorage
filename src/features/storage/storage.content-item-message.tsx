import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { useUser } from '~/core/hooks'
import type { Message } from '~/core/store'
import { ContentItem } from '~/ui/elements/content-item'

type Props = {
  message: Message
  index: number
  offset: number
  visible: boolean
  resizeObserver: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
}

export const StorageContentItemMessage: FC<Props> = ({
  message,
  index,
  offset,
  visible,
  resizeObserver,
  intersectionObserver
}) => {
  return (
    <ContentItem
      message={message}
      index={index}
      offset={offset}
      visible={visible}
      resizeObserver={resizeObserver}
      intersectionObserver={intersectionObserver}
    />
  )
}
