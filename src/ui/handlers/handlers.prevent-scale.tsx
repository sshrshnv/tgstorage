import type { FunctionComponent as FC } from 'preact'
import { useEffect, useMemo } from 'preact/hooks'

import { checkIsIOS } from '~/tools/detect-platform'

export const PreventScale: FC = () => {
  const passive = useMemo(() => {
    return !checkIsIOS()
  }, [])

  useEffect(() => {
    const handleGestureStart = ev => {
      ev.preventDefault()
    }
    const handleTouchMove = ev => {
      if (ev.scale > 1) {
        ev.preventDefault()
      }
    }

    self.document.addEventListener('gesturestart', handleGestureStart, { passive })
    self.document.addEventListener('touchmove', handleTouchMove, { passive })
    return () => {
      self.document.removeEventListener('gesturestart', handleGestureStart)
      self.document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null
}
