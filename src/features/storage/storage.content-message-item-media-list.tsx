import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import type {  Folder, Message } from '~/core/store'
import { ContentItemMediaList } from '~/ui/elements/content-item-media-list'

import { StorageContentMessageItemMediaItem } from './storage.content-message-item-media-item'

type Props = {
  folder: Folder
  mediaMessages?: Message[]
  mediaLoadAvailable: boolean
  onPreviewClick?: (id: string) => void
}

export const StorageContentMessageItemMediaList: FC<Props> = memo(({
  folder,
  mediaMessages,
  mediaLoadAvailable,
  onPreviewClick
}) => {
  return (
    <ContentItemMediaList>
      {mediaMessages?.map((mediaMessage) => !mediaMessage.media ? null : (
        <StorageContentMessageItemMediaItem
          key={mediaMessage.id}
          folder={folder}
          message={mediaMessage}
          mediaLoadAvailable={mediaLoadAvailable}
          onPreviewClick={onPreviewClick}
        />
      ))}
    </ContentItemMediaList>
  )
})
