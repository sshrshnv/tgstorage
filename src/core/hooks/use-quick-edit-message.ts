import { useMemo, useCallback, useState } from 'preact/hooks'

import type { Message } from '~/core/store'
import { editMessage } from '~/core/actions'
import { useActiveFolder } from '~/core/hooks'

export const useQuickEditMessage = (message: Message) => {
  const { folder } = useActiveFolder()
  const [loading, setLoading] = useState(false)

  const editText = useCallback(async (text: string) => {
    setLoading(true)
    await editMessage({ ...message, text }, folder)
    setLoading(false)
  }, [message, setLoading])

  return useMemo(() => ({
    editing: loading,
    editText
  }), [
    loading,
    editText
  ])
}
