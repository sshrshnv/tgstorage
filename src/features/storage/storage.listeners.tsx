import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useEffect } from 'preact/hooks'

import { useTexts, useSendingMessages } from '~/core/hooks'

export const StorageListeners: FC = memo(() => {
  const { texts } = useTexts('storage')
  const { sendingMessages } = useSendingMessages()

  useEffect(() => {
    if (!sendingMessages?.size) return

    const handleUnload = (ev) => {
      ev.returnValue = texts.sendingMessagesWarning
      return texts.sendingMessagesWarning
    }

    self.addEventListener('beforeunload', handleUnload)
    return () => self.removeEventListener('beforeunload', handleUnload)
  }, [sendingMessages?.size])

  return null
})
