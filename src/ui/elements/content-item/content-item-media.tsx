import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import type { Message } from '~/core/store'

import { ContentItemMediaItem } from './content-item-media-item'
import styles from './content-item-media.styl'

type Props = {
  message: Message
  mediaLoadAvailable: boolean
}

export const ContentItemMedia: FC<Props> = ({
  message,
  mediaLoadAvailable
}) => {
  return (
    <div class={styles.mediaWrapper}>
      {message.fileMessages?.map(fileMessage => !fileMessage.media ? null : (
        <ContentItemMediaItem
          key={fileMessage.id}
          media={fileMessage.media}
          mediaLoadAvailable={mediaLoadAvailable}
        />
      ))}
    </div>
  )
}
