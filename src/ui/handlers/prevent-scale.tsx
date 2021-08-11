import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

export const PreventScale: FC = () => {
  useEffect(() => {
    const handleGestureStart = ev => {
      ev.preventDefault()
    }
    const handleTouchMove = ev => {
      if (ev.scale > 1) {
        ev.preventDefault()
      }
    }

    self.document.addEventListener('gesturestart', handleGestureStart, { passive: true })
    self.document.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      self.document.removeEventListener('gesturestart', handleGestureStart)
      self.document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null
}
