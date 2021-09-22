import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

const AVAILABLE_TAGS = [
  'img', 'video', 'audio', 'textarea', 'input'
]

export const PreventContextMenu: FC = () => {
  useEffect(() => {
    const handleContextMenu = ev => {
      if (!AVAILABLE_TAGS.includes(ev.target.tagName.toLowerCase())) {
        ev.preventDefault()
      }
    }

    self.document.addEventListener('contextmenu', handleContextMenu, { passive: false })
    return () => self.document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  return null
}
