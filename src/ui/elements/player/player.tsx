import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import cn from 'classnames'
import rafSchedule from 'raf-schd'

import { getFile } from '~/core/cache'
import { formatDuration } from '~/tools/format-time'
import { Button } from '~/ui/elements/button'
import { Range } from '~/ui/elements/range'
import { PlayIcon, PauseIcon } from '~/ui/icons'

import styles from './player.styl'

type Props = {
  class?: string
  thumbFileKey?: string
  fileKey?: string
  duration?: number
  description?: {
    performer?: string
    title?: string
  }
  type: string
  active?: boolean
  isFullscreen?: boolean
  isFakeFullscreen?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export const Player: FC<Props> = memo(({
  class: className,
  thumbFileKey,
  fileKey,
  duration,
  description,
  active,
  isFullscreen,
  isFakeFullscreen,
  isVideo,
  isAudio
}) => {
  const playerRef = useRef<any>(null)
  const firstRenderRef = useRef(true)
  const controlsHideTimeoutRef = useRef(0)
  const [controlsHidden, setControlsHidden] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [thumbUrl, setThumbUrl] = useState('')
  const [url, setUrl] = useState('')
  const [hidden, setHidden] = useState(false)

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

  const togglePlay = useCallback(() => {
    if (playerRef.current.paused || playerRef.current.ended) {
      playerRef.current.play()
    } else {
      playerRef.current.pause()
    }
  }, [isFullscreen, playerRef])

  const changeProgress = useCallback(value => {
    playerRef.current.currentTime = value
    setProgress(value)
  }, [playerRef, setProgress])

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
  }, [controlsHidden])

  const handlePlayStart = useCallback(() => {
    syncProgress()
    setPlaying(true)
    if (isFullscreen) {
      hideControlsAfterTimeout()
    }
  }, [isFullscreen, syncProgress, setPlaying, hideControlsAfterTimeout])

  const handleContentClick = useCallback(() => {
    if (!url) {
      return
    } else if (isFullscreen && playing) {
      toggleControls()
    } else if (!isFullscreen) {
      togglePlay()
    }
  }, [isFullscreen, url, playing, togglePlay, toggleControls])

  const prevent = useCallback(ev => {
    ev.stopPropagation()
  }, [])

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
    playerRef.current.play()
  }, [url])

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
  }, [thumbFileKey])

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
  }, [isFullscreen])

  useEffect(() => {
    if (!active && playing) {
      togglePlay()
    }
  }, [active])

  useEffect(() => {
    firstRenderRef.current = false
    return () => {
      syncProgress.cancel()
      self.clearTimeout(controlsHideTimeoutRef.current)
    }
  }, [])

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
          onClick={handleContentClick}
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
          onClick={handleContentClick}
        />
      ) : null}

      {isAudio && (
        <div
          class={cn(
            styles.description,
            (!fileKey || (isFullscreen && !controlsHidden)) && styles._transparent
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

      {(isVideo || isAudio) && !!url && isFullscreen && (
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

      <div
        class={cn(
          styles.controls,
          !url && styles._disabled,
          controlsHidden && styles._hidden,
          isFullscreen && styles._padding
        )}
        onMouseMove={prevent}
        onTouchStart={prevent}
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
