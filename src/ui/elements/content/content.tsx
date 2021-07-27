import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'

import { useCallbackRef } from '~/tools/hooks'
import { setFile } from '~/core/cache'
import { Slide } from '~/ui/elements/slide'

import styles from './content.styl'

type Props = {
  name: string
  dropAvailable?: boolean
  onClose?: () => void
  onAddFiles?: (fileKeys: string[]) => void
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
  }, [dropAvailable])

  const handleDrop = useCallback((ev: DragEvent) => {
    if (!dropAvailable) return

    ev.stopPropagation()
    ev.preventDefault()

    const fileList = ev.dataTransfer?.files
    const fileKeys: string[] = []

    for (let i = 0; i < (fileList?.length || 0); i++) {
      const fileKey = setFile(fileList?.item(i))
      if (fileKey && !fileKeys.includes(fileKey)) {
        fileKeys.push(fileKey)
      }
    }

    if (fileKeys.length) {
      onAddFiles?.(fileKeys)
    }
  }, [dropAvailable, onAddFiles])

  const [_, handlePasteRef] = useCallbackRef((ev: ClipboardEvent) => {
    if (!dropAvailable) return

    const fileList = ev.clipboardData?.files
    const fileKeys: string[] = []
    const text = fileList?.length ? '' : ev.clipboardData?.getData('text')

    for (let i = 0; i < (fileList?.length || 0); i++) {
      const fileKey = setFile(fileList?.item(i))
      if (fileKey && !fileKeys.includes(fileKey)) {
        fileKeys.push(fileKey)
      }
    }

    if (fileKeys?.length) {
      onAddFiles?.(fileKeys)
    }
    if (text?.length) {
      onAddMessage?.(text)
    }
  }, [dropAvailable, onAddFiles, onAddMessage])

  useEffect(() => {
    const handlePaste = handlePasteRef.current
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
