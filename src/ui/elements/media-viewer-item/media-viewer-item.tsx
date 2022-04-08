import type { FunctionComponent as FC, RefObject } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useRef } from 'preact/hooks'
import cn from 'classnames'

import type { DisplaySize } from '~/ui/hooks'
import { checkIsIOS } from '~/tools/detect-platform'
import { FileViewImage } from '~/ui/elements/file-view-image'
import { FilePlayer } from '~/ui/elements/file-player'
import { Loader } from '~/ui/elements/loader'

import styles from './media-viewer-item.styl'

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
  k: number
  x: number
  y: number
  scale: number
  mediaElRef?: RefObject<HTMLImageElement>
  transition: boolean
  displaySize: DisplaySize
  isActive?: boolean
  isFullscreen?: boolean
  isFakeFullscreen?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export const MediaViewerItem: FC<Props> = memo(({
  thumbFileKey,
  fileKey,
  fileStreamUrl,
  type,
  description,
  duration,
  progress,
  k,
  x,
  y,
  scale,
  mediaElRef,
  transition,
  displaySize,
  isActive,
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
        isPerformance && styles._performance
      )}
      style={{
        transform: `translate3d(${x + k * displaySize.width}px, ${y}px, 0) scale(${scale})`,
        transition: `transform ${transition ? 300 : 50}ms ease-out`
      }}
      ref={elRef}
    >
      {(isVideo || isAudio) ? (
        <FilePlayer
          class={styles.player}
          fileStreamUrl={fileStreamUrl}
          fileKey={fileKey}
          thumbFileKey={thumbFileKey}
          duration={duration}
          description={description}
          type={type}
          parentRef={elRef}
          isActive={isActive}
          isFullscreen={isFullscreen}
          isFakeFullscreen={isFakeFullscreen}
          isVideo={isVideo}
          isAudio={isAudio}
        />
      ) : (
        <FileViewImage
          class={styles.image}
          fileKey={fileKey}
          timeout={50}
          mediaElRef={mediaElRef}
          isFullscreen={isFullscreen}
        />
      )}
      {(isActive && !fileKey && !fileStreamUrl) && (
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
