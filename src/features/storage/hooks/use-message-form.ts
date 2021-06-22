import { useMemo, useCallback, useState, useRef, useEffect } from 'preact/hooks'

import type { InputFile, Message } from '~/core/store'
import { createMessage, editMessage, setSendingMessage, resetSendingMessage } from '~/core/actions'
import { useActiveFolder, useSendingMessage } from '~/core/hooks'
import { stringifyParentFilesMessage } from '~/tools/handle-content'

const initialMessage = {
  key: 0,
  id: 0,
  text: '',
  files: [] as InputFile[]
}

export const useMessageForm = () => {
  const { folder } = useActiveFolder()
  const { sendingMessage } = useSendingMessage(folder.id)
  const [loading, setLoading] = useState(!!sendingMessage)
  const [message, setMessage] = useState({ ...initialMessage, ...sendingMessage})
  const messageKeyRef = useRef(0)
  const initialEditingMessage = useRef<Message | null>(null)

  const updateForm = useCallback((message) => {
    messageKeyRef.current += 1
    setMessage({ ...message, key: messageKeyRef.current })
  }, [messageKeyRef, setMessage])

  const handleSubmit = useCallback(async () => {
    setLoading(true)
    setSendingMessage(folder.id, message)

    const sendingMessage = message.files ? {
      ...message,
      text: stringifyParentFilesMessage(message.text)
    } : message

    const success = message.id ?
      await editMessage(
        sendingMessage,
        folder,
        initialEditingMessage.current?.text !== sendingMessage.text
      ) :
      await createMessage(
        sendingMessage,
        folder
      )

    setLoading(false)
    if (success) {
      updateForm(initialMessage)
    }
  }, [message, setLoading, updateForm])

  const handleEditMessage = useCallback((message: Message) => {
    initialEditingMessage.current = message
    updateForm(message)
  }, [updateForm])

  const handleCancelEditMessage = useCallback(() => {
    updateForm(initialMessage)
    resetSendingMessage(folder.id)
  }, [updateForm, folder.id])

  const handleChangeText = useCallback((text: string) => {
    setMessage({ ...message, text })
  }, [message])

  const handleAddFiles = useCallback((files: File[]) => {
    const uniqFiles = files
      .map(file => ({ key: `${file.name}${file.type}${file.lastModified}${file.size}`, file }))
      .filter(file => (message.files || []).every(({ key }) => key !== file.key))

    setMessage({
      ...message,
      files: [
        ...(message.files || []),
        ...uniqFiles.map(({ key, file }) => ({ id: '', progress: 0, key, file }))
      ]
    })
  }, [message])

  const handleRemoveFile = useCallback((inputFile: InputFile) => {
    const updatedMessage = {
      ...message,
      files: (sendingMessage || message).files?.filter(({ key }) => key !== inputFile.key) || []
    }
    setMessage(updatedMessage)
    setSendingMessage(folder.id, updatedMessage)
  }, [message, sendingMessage, folder.id])

  useEffect(() => {
    if (sendingMessage) {
      setMessage({ ...message, ...sendingMessage })
    }
  }, [sendingMessage?.files])

  useEffect(() => {
    updateForm(initialMessage)
  }, [folder.id])

  return useMemo(() => ({
    message,
    loading,
    handleSubmit,
    handleEditMessage,
    handleCancelEditMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  }), [
    message,
    loading,
    handleSubmit,
    handleEditMessage,
    handleCancelEditMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  ])
}
