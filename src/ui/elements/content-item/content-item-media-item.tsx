import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo } from 'preact/hooks'
import cn from 'classnames'

import type { MessageMedia } from '~/core/store'
import { FilePreview } from '~/ui/elements/file-preview'

import styles from './content-item-media.styl'

type Props = {
  messageId: number
  media: MessageMedia
  mediaLoadAvailable: boolean
}

export const ContentItemMediaItem: FC<Props> = ({
  messageId,
  media,
  mediaLoadAvailable
}) => {
  const previewUrl = media.thumbMUrl || media.thumbSUrl

  const isImage = useMemo(() => {
    return media.type.startsWith('image')
  }, [media.type])

  const isVideo = useMemo(() => {
    return media.type.startsWith('video')
  }, [media.type])

  const thumbFile = useMemo(() => {
    return media.thumbM ? { ...media, ...media.thumbM } : null
  }, [media.thumbM])

  return (
    <div class={cn(
      styles.mediaItem,
      isImage && styles._image,
      isVideo && styles._image
    )}>
      <div class={styles.preview}>
        {previewUrl && (
          <img src={previewUrl}/>
        )}
        {!!thumbFile && (
          <FilePreview
            messageId={messageId}
            file={thumbFile}
            mediaLoadAvailable={mediaLoadAvailable}
          />
        )}
      </div>
    </div>
  )
}
