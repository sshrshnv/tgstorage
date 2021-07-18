import { useMemo, useCallback, useState, useRef, useEffect } from 'preact/hooks'

import type { InputFile, Message } from '~/core/store'
import { getFileMeta } from '~/core/cache'
import {
  createMessage,
  editMessage,
  setSendingMessage,
  resetSendingMessage,
  resetUploadingFiles
} from '~/core/actions'
import { useActiveFolder, useSendingMessage } from '~/core/hooks'
import { checkIsParentFilesMessage, stringifyParentFilesMessage } from '~/tools/handle-content'
import { processImageFile } from '~/tools/process-image-file'
import { processVideoFile } from '~/tools/process-video-file'

const initialMessage = {
  key: 0,
  id: 0,
  text: '',
  inputFiles: [] as InputFile[]
}

export const useMessageForm = () => {
  const { folder } = useActiveFolder()
  const { sendingMessage } = useSendingMessage(folder.id)
  const [loading, setLoading] = useState(!!sendingMessage)
  const [message, setMessage] = useState({ ...initialMessage, ...sendingMessage })
  const messageKeyRef = useRef(0)
  const initialEditingMessage = useRef<Message | null>(null)

  const updateForm = useCallback((newMessage) => {
    if (!sendingMessage && message.inputFiles.length && !newMessage.inputFiles.length) {
      resetUploadingFiles(message.inputFiles)
    }

    messageKeyRef.current += 1
    setMessage({ ...newMessage, key: messageKeyRef.current })
  }, [message.inputFiles.length, !!sendingMessage, messageKeyRef, setMessage])

  const handleCancelMessage = useCallback(() => {
    initialEditingMessage.current = null
    updateForm(initialMessage)
    resetSendingMessage(folder.id)
  }, [folder.id, updateForm])

  const handleSubmit = useCallback(async () => {
    setLoading(true)
    setSendingMessage(folder.id, message)

    let sendingMessage = message

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
  }, [message, setLoading, handleCancelMessage])

  const handleEditMessage = useCallback((message: Message) => {
    if (sendingMessage) return
    initialEditingMessage.current = message
    updateForm(message)
  }, [sendingMessage, updateForm])

  const handleChangeText = useCallback((text: string) => {
    setMessage({ ...message, text })
  }, [message])

  const handleAddFiles = useCallback(async (fileKeys: string[]) => {
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
  }, [message])

  const handleRemoveFile = useCallback((inputFile: InputFile) => {
    const updatedMessage = {
      ...message,
      inputFiles: (sendingMessage || message).inputFiles?.filter(({ fileKey }) => fileKey !== inputFile.fileKey) || []
    }
    if (sendingMessage && !updatedMessage.inputFiles.length) {
      handleCancelMessage()
    } else {
      setMessage(updatedMessage)
      setSendingMessage(folder.id, updatedMessage)
      resetUploadingFiles([inputFile])
    }
  }, [message, sendingMessage, folder.id, handleCancelMessage])

  useEffect(() => {
    if (sendingMessage) {
      setMessage({ ...message, ...sendingMessage })
    } else if (message) {
      handleCancelMessage()
    }
  }, [sendingMessage])

  useEffect(() => {
    initialEditingMessage.current = null
    updateForm(initialMessage)
  }, [folder.id])

  return useMemo(() => ({
    message,
    loading,
    editing: !!initialEditingMessage.current,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  }), [
    message,
    loading,
    initialEditingMessage.current,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  ])
}
