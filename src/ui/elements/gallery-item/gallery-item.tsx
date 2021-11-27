import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useRef } from 'preact/hooks'
import cn from 'classnames'

import { checkIsIOS } from '~/tools/detect-device'
import { FilePreviewImage } from '~/ui/elements/file-preview-image'
import { Player } from '~/ui/elements/player'
import { Loader } from '~/ui/elements/loader'

import styles from './gallery-item.styl'

type Props = {
  thumbFileKey?: string
  fileKey?: string
  fileStreamUrl?: string
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
  fileStreamUrl,
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
  const elRef = useRef<HTMLDivElement>(null)
  const isPerformance = useMemo(() => checkIsIOS(), [])

  return (
    <div
      class={cn(
        styles.root,
        'keen-slider__slide',
        isPerformance && styles._performance
      )}
      ref={elRef}
    >
      {(isVideo || isAudio) ? (
        <Player
          class={styles.player}
          fileStreamUrl={fileStreamUrl}
          fileKey={fileKey}
          thumbFileKey={thumbFileKey}
          duration={duration}
          description={description}
          type={type}
          active={active}
          parentRef={elRef}
          isFullscreen={isFullscreen}
          isFakeFullscreen={isFakeFullscreen}
          isVideo={isVideo}
          isAudio={isAudio}
        />
      ) : (
        <FilePreviewImage
          class={styles.image}
          fileKey={fileKey}
          timeout={50}
          isFullscreen={isFullscreen}
        />
      )}
      {(active && !fileKey && !fileStreamUrl) && (
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
