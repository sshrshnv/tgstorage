import { useCallback, useMemo, useRef, useState } from 'preact/hooks'

import type { Folder, Message } from '~/core/store'
import { moveMessage } from '~/core/actions'

type Params = {
  setFoldersPopupVisible: (value: boolean) => void
}

export const useMoveMessage = ({
  setFoldersPopupVisible
}: Params) => {
  const movingMessageRef = useRef<Message | null>(null)
  const [loading, setLoading] = useState(false)

  const setMovingMessage = useCallback((message: Message) => {
    movingMessageRef.current = message
    setLoading(false)
    setFoldersPopupVisible(true)
  }, [movingMessageRef, setFoldersPopupVisible])

  const selectMovingMessageFolder = useCallback(async (folder: Folder) => {
    if (!movingMessageRef.current) return
    setLoading(true)
    await moveMessage(movingMessageRef.current, folder)
    setLoading(false)
    self.history.back()
  }, [movingMessageRef])

  const cancelMovingMessage = useCallback(() => {
    movingMessageRef.current = null
    setFoldersPopupVisible(false)
  }, [movingMessageRef, setFoldersPopupVisible])

  return useMemo(() => ({
    loading,
    setMovingMessage,
    selectMovingMessageFolder,
    cancelMovingMessage
  }), [
    loading,
    setMovingMessage,
    selectMovingMessageFolder,
    cancelMovingMessage
  ])
}
