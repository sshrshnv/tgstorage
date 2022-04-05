import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import type {  Folder, Message } from '~/core/store'
import { ContentItemMediaList } from '~/ui/elements/content-item-media-list'

import { StorageContentMessageMediaItem } from './storage.content-message-media-item'

type Props = {
  folder: Folder
  mediaMessages?: Message[]
  mediaLoadAvailable: boolean
  onViewMedia?: (id: string) => void
}

export const StorageContentMessageMediaList: FC<Props> = memo(({
  folder,
  mediaMessages,
  mediaLoadAvailable,
  onViewMedia
}) => {
  return (
    <ContentItemMediaList>
      {mediaMessages?.map((mediaMessage) => !mediaMessage.media ? null : (
        <StorageContentMessageMediaItem
          key={mediaMessage.id}
          folder={folder}
          message={mediaMessage}
          mediaLoadAvailable={mediaLoadAvailable}
          onViewMedia={onViewMedia}
        />
      ))}
    </ContentItemMediaList>
  )
})
