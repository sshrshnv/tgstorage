import { useMemo, useCallback, useState, useRef, useEffect } from 'preact/hooks'

import { createMessage, editMessage } from '~/core/actions'
import { useActiveFolder } from '~/core/hooks'
import type { Message } from '~/core/store'

const initialMessage = {
  key: 0,
  id: 0,
  text: ''
}

export const useMessageForm = () => {
  const { folder } = useActiveFolder()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(initialMessage)
  const messageKeyRef = useRef(0)

  const updateForm = useCallback((message) => {
    messageKeyRef.current += 1
    setMessage({ ...message, key: messageKeyRef.current })
  }, [messageKeyRef, setMessage])

  const handleSubmit = useCallback(async () => {
    setLoading(true)
    const success = message.id ?
      await editMessage(message, folder) :
      await createMessage(message, folder)

    setLoading(false)
    if (success) {
      updateForm(initialMessage)
    }
  }, [message, setLoading, updateForm])

  const handleEditMessage = useCallback((message: Message) => {
    updateForm(message)
  }, [updateForm])

  const handleCancelEditMessage = useCallback(() => {
    updateForm(initialMessage)
  }, [updateForm])

  const handleChangeText = useCallback((text: string) => {
    setMessage({ ...message, text })
  }, [message])

  const handleAddFiles = useCallback(files => {
    console.log(files)
  }, [])

  useEffect(() => {
    handleCancelEditMessage()
  }, [folder.id])

  return useMemo(() => ({
    message,
    loading,
    handleSubmit,
    handleEditMessage,
    handleCancelEditMessage,
    handleChangeText,
    handleAddFiles
  }), [
    message,
    loading,
    handleSubmit,
    handleEditMessage,
    handleCancelEditMessage,
    handleChangeText,
    handleAddFiles
  ])
}

export const useEditMessage = (message: Message) => {
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
