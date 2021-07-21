import { useMemo, useCallback, useState, useRef, useEffect } from 'preact/hooks'

import type { Folder, InputFile, Message } from '~/core/store'
import { useStateRef, useCallbackRef } from '~/tools/hooks'
import { getFileMeta } from '~/core/cache'
import {
  createMessage,
  editMessage,
  setSendingMessage,
  resetSendingMessage,
  resetUploadingFiles
} from '~/core/actions'
import { useSendingMessage } from '~/core/hooks'
import { checkIsParentFilesMessage, stringifyParentFilesMessage } from '~/tools/handle-content'
import { processImageFile } from '~/tools/process-image-file'
import { processVideoFile } from '~/tools/process-video-file'

const initialMessage = {
  key: 0,
  id: 0,
  text: '',
  inputFiles: [] as InputFile[]
}

export const useMessageForm = (folder: Folder) => {
  const { sendingMessage, sendingMessageRef } = useSendingMessage(folder.id)
  const [loading, setLoading] = useState(!!sendingMessageRef.current)
  const [message, setMessage, messageRef, setMessageRef] = useStateRef(() => ({ ...initialMessage, ...sendingMessageRef.current }))
  const messageKeyRef = useRef(0)
  const initialEditingMessage = useRef<Message | null>(null)
  const isEditing = !!initialEditingMessage.current

  const [updateForm, updateFormRef] = useCallbackRef((newMessage, checkInputFiles = true) => {
    if (
      checkInputFiles &&
      !sendingMessageRef.current &&
      message.inputFiles?.length &&
      !newMessage.inputFiles?.length
    ) {
      resetUploadingFiles(message.inputFiles)
    }

    messageKeyRef.current += 1
    setMessage({ ...newMessage, key: messageKeyRef.current })
  }, [message.inputFiles, sendingMessageRef, setMessage])

  const [handleCancelMessage, handleCancelMessageRef] = useCallbackRef(() => {
    initialEditingMessage.current = null
    updateFormRef.current(initialMessage)
    resetSendingMessage(folder.id)
  }, [folder.id, updateForm])

  const handleSubmit = useCallback(async () => {
    const message = messageRef.current
    let sendingMessage = message

    setLoading(true)
    setSendingMessage(folder.id, message)

    if (
      message.inputFiles?.length || (
        initialEditingMessage.current &&
        checkIsParentFilesMessage(initialEditingMessage.current.text)
      )
    ) {
      sendingMessage = {
        ...message,
        text: stringifyParentFilesMessage(message.text)
      }
    }

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
      handleCancelMessage()
    }
  }, [folder, messageRef, handleCancelMessage, setLoading])

  const handleEditMessage = useCallback((message: Message) => {
    if (sendingMessageRef.current) return
    initialEditingMessage.current = message
    updateForm(message)
  }, [sendingMessageRef, updateForm])

  const handleChangeText = useCallback((text: string) => {
    const message = messageRef.current
    setMessage({ ...message, text })
  }, [messageRef, setMessage])

  const handleAddFiles = useCallback(async (fileKeys: string[]) => {
    const message = messageRef.current
    const uniqFileKeys = fileKeys
      .filter(fileKey => (message.inputFiles || []).every(inputFile => inputFile.fileKey !== fileKey))

    const uniqInputFiles = await Promise.all(uniqFileKeys.map(fileKey => new Promise(async (resolve) => {
      const fileMeta = getFileMeta(fileKey)
      const params =
        fileMeta?.type.startsWith('image') ? await processImageFile(fileKey) :
          fileMeta?.type.startsWith('video') ? await processVideoFile(fileKey) :
            undefined

      resolve({
        fileKey,
        name: fileMeta?.name,
        size: fileMeta?.size,
        ...params
      })
    }))) as InputFile[]

    setMessage({
      ...message,
      inputFiles: [
        ...(message.inputFiles || []),
        ...uniqInputFiles.map((uniqFile) => ({ ...uniqFile, id: '', progress: 0 }))
      ]
    })
  }, [messageRef, setMessage])

  const handleRemoveFile = useCallback((inputFile: InputFile) => {
    const message = messageRef.current
    const updatedMessage = {
      ...message,
      inputFiles: (sendingMessageRef.current || message).inputFiles?.filter(({ fileKey }) =>
        fileKey !== inputFile.fileKey
      ) || []
    }
    if (sendingMessageRef.current && !updatedMessage.inputFiles.length) {
      handleCancelMessage()
    } else {
      setMessage(updatedMessage)
      setSendingMessage(folder.id, updatedMessage)
      resetUploadingFiles([inputFile])
    }
  }, [messageRef, sendingMessageRef, folder.id, setMessage, handleCancelMessage])

  useEffect(() => {
    if (sendingMessage) {
      setMessageRef.current({ ...messageRef.current, ...sendingMessage })
    } else if (messageRef.current) {
      handleCancelMessageRef.current()
    }
  }, [sendingMessage, messageRef, setMessageRef, handleCancelMessageRef])

  useEffect(() => {
    initialEditingMessage.current = null
    updateFormRef.current(initialMessage)
  }, [folder.id, updateFormRef])

  return useMemo(() => ({
    message,
    loading,
    editing: isEditing,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  }), [
    message,
    loading,
    isEditing,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  ])
}
