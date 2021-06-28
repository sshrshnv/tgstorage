import { useCallback, useMemo, useRef, useState } from 'preact/hooks'

import type { Folder, Message } from '~/core/store'
import { moveMessage } from '~/core/actions'

type Params = {
  setFoldersPopupVisible: (value: boolean) => void
}

export const useMoveMessage = ({
  setFoldersPopupVisible
}: Params) => {
  const movingMessage = useRef<Message | null>(null)
  const [loading, setLoading] = useState(false)

  const setMovingMessage = useCallback((message: Message) => {
    movingMessage.current = message
    setLoading(false)
    setFoldersPopupVisible(true)
  }, [movingMessage, setFoldersPopupVisible])

  const selectMovingMessageFolder = useCallback(async (folder: Folder) => {
    if (!movingMessage.current) return
    setLoading(true)
    await moveMessage(movingMessage.current, folder)
    setLoading(false)
    self.history.back()
  }, [])

  const cancelMovingMessage = useCallback(() => {
    movingMessage.current = null
    setFoldersPopupVisible(false)
  }, [setFoldersPopupVisible])

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
