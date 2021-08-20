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
  const active = !!movingMessageRef.current
  const [loading, setLoading] = useState(false)

  const setMovingMessage = useCallback((message: Message) => {
    movingMessageRef.current = message
    setLoading(false)
    setFoldersPopupVisible(true)
  }, [setLoading, setFoldersPopupVisible])

  const selectMovingMessageFolder = useCallback(async (folder: Folder) => {
    if (!movingMessageRef.current) return
    setLoading(true)
    await moveMessage(movingMessageRef.current, folder)
    setLoading(false)
    self.history.back()
  }, [setLoading])

  const cancelMovingMessage = useCallback(() => {
    movingMessageRef.current = null
    setFoldersPopupVisible(false)
  }, [setFoldersPopupVisible])

  return useMemo(() => ({
    active,
    loading,
    setMovingMessage,
    selectMovingMessageFolder,
    cancelMovingMessage
  }), [
    active,
    loading,
    setMovingMessage,
    selectMovingMessageFolder,
    cancelMovingMessage
  ])
}
