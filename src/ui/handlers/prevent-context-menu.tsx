import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

export const PreventContextMenu: FC = () => {
  useEffect(() => {
    const handleContextMenu = ev => {
      ev.preventDefault()
    }

    self.document.addEventListener('contextmenu', handleContextMenu, { passive: false })
    return () => self.document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  return null
}
