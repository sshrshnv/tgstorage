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

    document.addEventListener('gesturestart', handleGestureStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      document.removeEventListener('gesturestart', handleGestureStart)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null
}
