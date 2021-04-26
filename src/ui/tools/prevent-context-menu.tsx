import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

export const PreventContextMenu: FC = () => {
  useEffect(() => {
    const handleContextMenu = ev => {
      ev.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu, { passive: false })
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  return null
}
