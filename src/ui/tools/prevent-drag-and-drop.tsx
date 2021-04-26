import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

export const PreventDragAndDrop: FC = () => {
  useEffect(() => {
    const handleDrag = ev => {
      ev.stopPropagation()
      ev.preventDefault()

      if (!ev.dataTransfer) return

      try {
        ev.dataTransfer.dropEffect = 'none'
      } catch (err) {}
    }

    const handleDrop = ev => {
      ev.stopPropagation()
      ev.preventDefault()
    }

    document.addEventListener('dragover', handleDrag, { passive: false })
    document.addEventListener('drop', handleDrop, { passive: false })
    return () => {
      document.removeEventListener('dragover', handleDrag)
      document.removeEventListener('drop', handleDrop)
    }
  }, [])

  return null
}
