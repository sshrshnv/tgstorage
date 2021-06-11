import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo, useEffect } from 'preact/hooks'
import cn from 'classnames'

import type { MessageMedia } from '~/core/store'

import styles from './content-item-media.styl'

type Props = {
  media: MessageMedia
  mediaLoadAvailable: boolean
}

export const ContentItemMediaItem: FC<Props> = ({
  media,
  mediaLoadAvailable
}) => {
  const previewUrl = media.thumbMUrl || media.thumbSUrl

  const isImage = useMemo(() => {
    return media.type.startsWith('image')
  }, [media.type])

  useEffect(() => {
    //
  }, [mediaLoadAvailable])

  return (
    <div class={cn(
      styles.mediaItem,
      isImage && styles._image
    )}>
      {previewUrl && (
        <img src={previewUrl}/>
      )}
    </div>
  )
}
