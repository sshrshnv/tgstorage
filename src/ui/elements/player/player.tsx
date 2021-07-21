import type { FunctionComponent as FC, RefObject } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import cn from 'classnames'
import rafSchedule from 'raf-schd'

import { getFile } from '~/core/cache'
import { formatDuration } from '~/tools/format-time'
import { Button } from '~/ui/elements/button'
import { Range } from '~/ui/elements/range'
import { Loader } from '~/ui/elements/loader'
import { PlayIcon, PauseIcon } from '~/ui/icons'

import styles from './player.styl'

type Props = {
  class?: string
  streamFileUrl?: string
  thumbFileKey?: string
  fileKey?: string
  duration?: number
  description?: {
    performer?: string
    title?: string
  }
  type: string
  active?: boolean
  parentRef: RefObject<HTMLDivElement>
  isFullscreen?: boolean
  isFakeFullscreen?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export const Player: FC<Props> = memo(({
  class: className,
  streamFileUrl,
  thumbFileKey,
  fileKey,
  duration,
  description,
  active,
  parentRef,
  isFullscreen,
  isFakeFullscreen,
  isVideo,
  isAudio
}) => {
  const playerRef = useRef<any>(null)
  const firstRenderRef = useRef(true)
  const controlsHideTimeoutRef = useRef(0)
  const progressChangeTimeoutRef = useRef(0)
  const [controlsHidden, setControlsHidden] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [thumbUrl, setThumbUrl] = useState('')
  const [url, setUrl] = useState('')
  const [hidden, setHidden] = useState(false)
  const [streamLoading, setStreamLoading] = useState(!!streamFileUrl)

  const syncProgress = useCallback(rafSchedule(() => {
    if (!playerRef?.current) return
    setProgress(playerRef.current.currentTime)

    if (playerRef.current.paused || playerRef.current.ended) {
      syncProgress.cancel()
      setPlaying(false)
    } else {
      syncProgress()
    }
  }), [])

  const togglePlay = useCallback((ev: Event|undefined = undefined) => {
    ev?.stopPropagation()
    if (playerRef.current.paused || playerRef.current.ended) {
      playerRef.current.play()
    } else {
      playerRef.current.pause()
    }
  }, [])

  const changeProgress = useCallback(value => {
    syncProgress.cancel()
    setProgress(value)
    self.clearTimeout(progressChangeTimeoutRef.current)
    progressChangeTimeoutRef.current = self.setTimeout(() => {
      playerRef.current.currentTime = value
    }, 100)
  }, [setProgress])

  const hideControlsAfterTimeout = useCallback(() => {
    self.clearTimeout(controlsHideTimeoutRef.current)
    controlsHideTimeoutRef.current = self.setTimeout(() => {
      if (playerRef.current.paused || playerRef.current.ended) return
      setControlsHidden(true)
    }, 2500)
  }, [controlsHideTimeoutRef, setControlsHidden])

  const toggleControls = useCallback(() => {
    if (controlsHidden) {
      hideControlsAfterTimeout()
    }
    setControlsHidden(!controlsHidden)
  }, [controlsHidden, hideControlsAfterTimeout])

  const handlePlayStart = useCallback((ev) => {
    ev.stopPropagation()
    syncProgress()
    setPlaying(true)
    if (isFullscreen) {
      hideControlsAfterTimeout()
    }
    if (streamLoading) {
      setStreamLoading(false)
    }
  }, [isFullscreen, streamLoading, syncProgress, setPlaying, hideControlsAfterTimeout])

  const handleContentClick = useCallback((ev) => {
    if (!url) {
      return
    } else if (isFullscreen) {
      if (ev.type === 'click') {
        togglePlay()
      } else if (playing) {
        toggleControls()
      }
    } else {
      togglePlay()
    }
  }, [isFullscreen, url, playing, togglePlay, toggleControls])

  const handleCanPlay = useCallback(() => {
    if (playing) {
      playerRef.current.play()
    }
    if (streamLoading) {
      setStreamLoading(false)
    }
  }, [playerRef, streamLoading, playing])

  const handleWaiting = useCallback(() => {
    setStreamLoading(true)
  }, [setStreamLoading])

  const prevent = useCallback(ev => {
    ev.stopPropagation()
    if (controlsHidden) {
      setControlsHidden(false)
    }
    if (isFullscreen) {
      hideControlsAfterTimeout()
    }
  }, [isFullscreen, controlsHidden, hideControlsAfterTimeout])

  useEffect(() => {
    if (!streamFileUrl) return
    setUrl(streamFileUrl)
    setStreamLoading(true)
  }, [streamFileUrl])

  useEffect(() => {
    if (!fileKey) return

    let file = getFile(fileKey)
    if (!file) return

    const url = URL.createObjectURL(file)
    file = undefined
    setUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [fileKey])

  useEffect(() => {
    if (!url) return
    if (fileKey) {
      playerRef.current.play()
    }
  }, [fileKey, url])

  useEffect(() => {
    if (playing) return
    self.clearTimeout(controlsHideTimeoutRef.current)
    setControlsHidden(false)
  }, [playing])

  useEffect(() => {
    if (!thumbFileKey || thumbUrl) return

    let thumbFile = getFile(thumbFileKey)
    if (!thumbFile) return

    const url = URL.createObjectURL(thumbFile)
    thumbFile = undefined
    setThumbUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [thumbFileKey, thumbUrl])

  useEffect(() => {
    if (firstRenderRef.current) return

    if (!isFullscreen) {
      self.clearTimeout(controlsHideTimeoutRef.current)
      setControlsHidden(false)
    } else {
      hideControlsAfterTimeout()
    }

    if (isVideo && !isFakeFullscreen) {
      setHidden(true)
      setTimeout(() => setHidden(false), 50)
    }
  }, [isFullscreen, isFakeFullscreen, isVideo, hideControlsAfterTimeout])

  useEffect(() => {
    if (!active && playing) {
      togglePlay()
    }
  }, [active, playing, togglePlay])

  useEffect(() => {
    const parentEl = parentRef.current
    parentEl?.addEventListener('click', handleContentClick)
    return () => {
      parentEl?.removeEventListener('click', handleContentClick)
    }
  }, [parentRef, handleContentClick])

  useEffect(() => {
    firstRenderRef.current = false
    return () => {
      syncProgress.cancel()
      self.clearTimeout(controlsHideTimeoutRef.current)
    }
  }, [syncProgress])

  return (
    <Fragment>
      {isVideo ? (
        <video
          ref={playerRef}
          class={cn(
            className,
            styles.video,
            hidden && styles._hidden
          )}
          src={url || undefined}
          poster={thumbUrl}
          controls={false}
          autoPlay={false}
          playsInline
          onPlay={handlePlayStart}
          onPlaying={handlePlayStart}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
        />
      ) : isAudio ? (
        <audio
          ref={playerRef}
          class={cn(
            className,
            styles.audio,
            hidden && styles._hidden
          )}
          src={url || undefined}
          controls={false}
          autoPlay={false}
          playsInline
          onPlay={handlePlayStart}
          onPlaying={handlePlayStart}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
        />
      ) : null}

      {isAudio && (
        <div
          class={cn(
            styles.description,
            (!url || streamLoading || (isFullscreen && !controlsHidden)) && styles._transparent
          )}
          onClick={handleContentClick}
        >
          {[description?.performer, description?.title].map(text => (
            <div class={styles.descriptionText} key={text}>
              {text}
            </div>
          ))}
        </div>
      )}

      {!!url && !streamLoading && isFullscreen && (
        <Button
          class={cn(
            styles.playButton,
            controlsHidden && styles._hidden,
            isAudio && styles._border
          )}
          icon={playing ? <PauseIcon/> : <PlayIcon/>}
          square
          onClick={togglePlay}
        />
      )}

      {streamLoading && (
        <Loader
          class={styles.loader}
          white={isVideo || isFullscreen}
          big
        />
      )}

      <div
        class={cn(
          styles.controls,
          !url && styles._disabled,
          controlsHidden && styles._hidden,
          isFullscreen && styles._fullscreen
        )}
        onClick={prevent}
        onMouseMove={prevent}
        onTouchMove={prevent}
      >
        {!isFullscreen && (
          <Button
            icon={playing ? <PauseIcon/> : <PlayIcon/>}
            square
            onClick={togglePlay}
          />
        )}

        <Range
          class={styles.progress}
          value={progress}
          min={0}
          max={duration || 0}
          step={0.001}
          onChange={changeProgress}
        />

        {isFullscreen && (
          <div class={styles.time}>
            {progress ? formatDuration(progress) : '00:00'}
            {' / '}
            {duration ? formatDuration(duration) : '00:00'}
          </div>
        )}
      </div>
    </Fragment>
  )
})
