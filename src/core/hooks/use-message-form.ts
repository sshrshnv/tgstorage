import { useMemo, useCallback, useState, useRef, useEffect } from 'preact/hooks'

import type { InputFile, Message } from '~/core/store'
import {
  createMessage,
  editMessage,
  setSendingMessage,
  resetSendingMessage,
  resetUploadingFiles
} from '~/core/actions'
import { useActiveFolder, useSendingMessage } from '~/core/hooks'
import { checkIsParentFilesMessage, stringifyParentFilesMessage } from '~/tools/handle-content'
import { uiTools } from '~/ui/tools'

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

  const updateForm = useCallback((message) => {
    messageKeyRef.current += 1
    setMessage({ ...message, key: messageKeyRef.current })
  }, [messageKeyRef, setMessage])

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
      updateForm(initialMessage)
    }
  }, [message, setLoading, updateForm])

  const handleEditMessage = useCallback((message: Message) => {
    if (sendingMessage) return
    initialEditingMessage.current = message
    updateForm(message)
  }, [sendingMessage, updateForm])

  const handleCancelMessage = useCallback(() => {
    updateForm(initialMessage)
    resetSendingMessage(folder.id)
  }, [updateForm, folder.id])

  const handleChangeText = useCallback((text: string) => {
    setMessage({ ...message, text })
  }, [message])

  const handleAddFiles = useCallback(async (files: File[]) => {
    const uniqFiles = files
      .map(file => ({ key: `${file.name}${file.type}${file.lastModified}${file.size}`, file }))
      .filter(file => (message.inputFiles || []).every(({ key }) => key !== file.key))

    const uniqInputFiles = await Promise.all(uniqFiles.map(inputFile => new Promise(async (resolve) => {
      const params =
        inputFile.file.type.startsWith('image') ? await uiTools.processImageFile(inputFile.file) :
          inputFile.file.type.startsWith('video') ? await uiTools.processVideoFile(inputFile.file) :
            undefined

      resolve({
        ...inputFile,
        ...params,
        name: inputFile.file.name,
        size: inputFile.file.size
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
      inputFiles: (sendingMessage || message).inputFiles?.filter(({ key }) => key !== inputFile.key) || []
    }
    if (sendingMessage && !updatedMessage.inputFiles.length) {
      handleCancelMessage()
    } else {
      setMessage(updatedMessage)
      setSendingMessage(folder.id, updatedMessage)
      resetUploadingFiles([inputFile])
    }
  }, [message, sendingMessage, folder.id])

  useEffect(() => {
    if (sendingMessage) {
      setMessage({ ...message, ...sendingMessage })
    }
  }, [sendingMessage?.inputFiles])

  useEffect(() => {
    updateForm(initialMessage)
  }, [folder.id])

  return useMemo(() => ({
    message,
    loading,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  }), [
    message,
    loading,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  ])
}
