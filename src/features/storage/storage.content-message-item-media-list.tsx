import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'

import type {  Folder, Message } from '~/core/store'
import { ContentItemMediaList } from '~/ui/elements/content-item-media-list'

import { StorageContentMessageItemMediaItem } from './storage.content-message-item-media-item'

type Props = {
  folder: Folder
  mediaMessages?: Message[]
  mediaLoadAvailable: boolean
}

export const StorageContentMessageItemMediaList: FC<Props> = memo(({
  folder,
  mediaMessages,
  mediaLoadAvailable
}) => {
  const compact = (mediaMessages?.length || 0) > 4

  return (
    <ContentItemMediaList>
      {mediaMessages?.map((mediaMessage) => !mediaMessage.media ? null : (
        <StorageContentMessageItemMediaItem
          key={mediaMessage.id}
          folder={folder}
          message={mediaMessage}
          mediaLoadAvailable={mediaLoadAvailable}
          compact={compact}
        />
      ))}
    </ContentItemMediaList>
  )
})
