import { useMemo, useCallback, useState } from 'preact/hooks'

import type { Message } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'
import { editMessage } from '~/core/actions'
import { useActiveFolder } from '~/core/hooks'

export const useQuickEditMessage = (message: Message) => {
  const messageRef = useUpdatableRef(message)
  const { folder } = useActiveFolder()
  const [loading, setLoading] = useState(false)

  const editText = useCallback(async (text: string) => {
    setLoading(true)
    await editMessage({ ...messageRef.current, text }, folder)
    setLoading(false)
  }, [folder, messageRef, setLoading])

  return useMemo(() => ({
    editing: loading,
    editText
  }), [
    loading,
    editText
  ])
}
