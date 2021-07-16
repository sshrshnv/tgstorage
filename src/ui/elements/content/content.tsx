import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'

import { Slide } from '~/ui/elements/slide'

import styles from './content.styl'

type Props = {
  name: string
  dropAvailable?: boolean
  onClose?: () => void
  onAddFiles?: (files: File[]) => void
  onAddMessage?: (text: string) => void
}

export const Content: FC<Props> = memo(({
  children,
  name,
  dropAvailable,
  onClose,
  onAddFiles,
  onAddMessage
}) => {
  const handleDrag = useCallback(ev => {
    if (!dropAvailable) return

    ev.stopPropagation()
    ev.preventDefault()
  }, [])

  const handleDrop = useCallback((ev: DragEvent) => {
    if (!dropAvailable) return

    ev.stopPropagation()
    ev.preventDefault()

    const files = ev.dataTransfer?.files

    if (files?.length) {
      onAddFiles?.(Array.from(files))
    }
  }, [onAddFiles])

  useEffect(() => {
    const handlePaste = (ev: ClipboardEvent) => {
      if (!dropAvailable) return

      const files = ev.clipboardData?.files
      const text = files?.length ? '' : ev.clipboardData?.getData('text')

      if (files?.length) {
        onAddFiles?.(Array.from(files))
      }
      if (text?.length) {
        onAddMessage?.(text)
      }
    }

    document.addEventListener('paste', handlePaste, { passive: true })
    return () => document.removeEventListener('paste', handlePaste)
  }, [])

  return (
    <Slide
      class={styles.root}
      name={name}
      onClose={onClose}
    >
      <div
        class={styles.content}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {children}
      </div>
    </Slide>
  )
})
