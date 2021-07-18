import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import { FilePreviewImage } from '~/ui/elements/file-preview-image'
import { Player } from '~/ui/elements/player'
import { Loader } from '~/ui/elements/loader'

import styles from './gallery-item.styl'

type Props = {
  thumbFileKey?: string
  fileKey?: string
  type: string
  name?: string
  description?: {
    performer?: string
    title?: string
  }
  duration?: number
  progress?: number
  active?: boolean
  isFullscreen?: boolean
  isFakeFullscreen?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export const GalleryItem: FC<Props> = memo(({
  thumbFileKey,
  fileKey,
  type,
  description,
  duration,
  progress,
  active,
  isFullscreen,
  isFakeFullscreen,
  isVideo,
  isAudio
}) => {
  return (
    <div class={cn(
      styles.root,
      'keen-slider__slide',
      active && styles._active
    )}>
      {(isVideo || isAudio) ? (
        <Player
          class={styles.player}
          fileKey={fileKey}
          thumbFileKey={thumbFileKey}
          duration={duration}
          description={description}
          type={type}
          active={active}
          isFullscreen={isFullscreen}
          isFakeFullscreen={isFakeFullscreen}
          isVideo={isVideo}
          isAudio={isAudio}
        />
      ) : (
        <FilePreviewImage
          class={styles.image}
          fileKey={fileKey}
          timeout={150}
          isFullscreen={isFullscreen}
        />
      )}
      {(active && !fileKey) && (
        <Loader
          class={styles.loader}
          progress={progress}
          contrast={isVideo || isFullscreen}
          white={isVideo || isFullscreen}
          big
        />
      )}
    </div>
  )
})
