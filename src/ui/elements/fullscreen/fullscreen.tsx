import type { FunctionComponent as FC, RefObject } from 'preact'
import { h } from 'preact'
import { useRef, useEffect, useMemo } from 'preact/hooks'
import cn from 'classnames'

import { checkIsLandscape } from '~/tools/detect-screen'
import { Button } from '~/ui/elements/button'
import { FullscreenIcon, FullscreenExitIcon } from '~/ui/icons'

import styles from './fullscreen.styl'

type Props = {
  class?: string
  isFullscreen: boolean
  forwardedRef: RefObject<HTMLDivElement>
  onChange: (value: boolean, fake?: boolean) => void
}

export const Fullscreen: FC<Props> = ({
  class: className,
  isFullscreen,
  forwardedRef,
  onChange
}) => {
  const isFullscreenRef = useRef(isFullscreen)

  const { requestFullscreen, exitFullscreen } = useMemo(() => {
    const requestFullscreen = () => {
      const el = forwardedRef?.current || {} as any

      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if (el.webkitEnterFullscreen) {
        el.webkitEnterFullscreen()
      } else if (el.webkitEnterFullScreen) {
        el.webkitEnterFullScreen()
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
      } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen()
      } else {
        isFullscreenRef.current = true
        onChange(true)
      }
    }

    const exitFullscreen = () => {
      const el = self.document as any

      if (el.exitFullscreen) {
        el.exitFullscreen()
      } else if (el.webkitExitFullscreen) {
        el.webkitExitFullscreen()
      } else if (el.webkitExitFullScreen) {
        el.webkitExitFullScreen()
      } else if (el.webkitCancelFullscreen) {
        el.webkitCancelFullscreen()
      } else if (el.webkitCancelFullScreen) {
        el.webkitCancelFullScreen()
      } else {
        isFullscreenRef.current = false
        onChange(false)
      }
    }

    return { requestFullscreen, exitFullscreen }
  }, [forwardedRef?.current, isFullscreenRef, onChange])

  useEffect(() => {
    const el = forwardedRef?.current as any
    if (!el) return

    if (forwardedRef?.current) {
      const el = forwardedRef.current as any
      if (
        !el.requestFullscreen &&
        !el.webkitEnterFullscreen && !el.webkitEnterFullScreen &&
        !el.webkitRequestFullscreen && !el.webkitRequestFullScreen
      ) {
        onChange(false, true)
      }
    }

    const handleFullscreenChange = () => {
      const el = self.document as any
      const value = !!(el.fullscreenElement || el.webkitFullscreenElement)
      isFullscreenRef.current = value
      onChange(value)
    }

    el.addEventListener('fullscreenchange', handleFullscreenChange)
    el.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    return () => {
      el.removeEventListener('fullscreenchange', handleFullscreenChange)
      el.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [forwardedRef?.current])

  useEffect(() => {
    const handleOrientationChange = () => {
      if (checkIsLandscape() && !isFullscreenRef.current) {
        requestFullscreen()
      }
    }

    if (screen?.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange)
    } else {
      self.addEventListener('orientationchange', handleOrientationChange)
    }
    return () => {
      if (screen?.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange)
      } else {
        self.removeEventListener('orientationchange', handleOrientationChange)
      }
    }
  }, [])

  return (
    <Button
      class={cn(
        className,
        styles.root
      )}
      icon={isFullscreen? <FullscreenExitIcon/> : <FullscreenIcon/>}
      square
      onClick={isFullscreen ? exitFullscreen : requestFullscreen}
    />
  )
}
