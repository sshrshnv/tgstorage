import { useMemo, useCallback, useRef, useEffect } from 'preact/hooks'

import type { Folder, InputFile, Message } from '~/core/store'
import { getFileMeta } from '~/core/cache'
import {
  createMessage,
  editMessage,
  setSendingMessage,
  resetSendingMessage,
  resetUploadingFiles
} from '~/core/actions'
import { useSendingMessage } from '~/core/hooks'
import { useStateRef, useCallbackRef, useUpdatableRef } from '~/tools/hooks'
import { checkIsParentFilesMessage, stringifyParentFilesMessage } from '~/tools/handle-content'
import { parseInputText, normalizeInputText } from '~/tools/handle-content-text'
import { parseImageFile } from '~/tools/parse-image-file'
import { parseVideoFile } from '~/tools/parse-video-file'

const initialMessage = {
  key: 0,
  id: 0,
  text: '',
  inputFiles: [] as InputFile[]
}

export const useMessageForm = (folder: Folder) => {
  const folderRef = useUpdatableRef(folder)
  const { sendingMessage, sendingMessageRef } = useSendingMessage(folder.id)
  const [loading, setLoading, _loadingRef, setLoadingRef] = useStateRef(!!sendingMessageRef.current)
  const [message, setMessage, messageRef, setMessageRef] = useStateRef(() => ({
    ...initialMessage,
    ...sendingMessageRef.current,
    folderId: folder.id
  }))
  const messageKeyRef = useRef(0)
  const initialEditingMessageRef = useRef<Message | null>(null)
  const isEditing = !!initialEditingMessageRef.current

  const [updateForm, updateFormRef] = useCallbackRef((newMessage, checkInputsFiles = true) => {
    const message = messageRef.current
    const sendingMessage = sendingMessageRef.current
    const folderId = folderRef.current.id
    if (
      checkInputsFiles &&
      !sendingMessage &&
      message.folderId === folderId &&
      message.inputFiles?.length &&
      !newMessage.inputFiles?.length
    ) {
      resetUploadingFiles(message.inputFiles)
    }

    messageKeyRef.current += 1
    setMessage({
      ...newMessage,
      key: messageKeyRef.current,
      folderId
    })
  }, [message.inputFiles, setMessage])

  const handleCancelMessage = useCallback(() => {
    initialEditingMessageRef.current = null
    updateForm(initialMessage)
    resetSendingMessage(folder.id)
    setLoading(false)
  }, [folder.id, updateForm, setLoading])

  const handleSubmit = useCallback(async () => {
    const message = messageRef.current
    const initialEditingMessage = initialEditingMessageRef.current
    let sendingMessage = { ...message }

    setLoading(true)
    setSendingMessage(folder.id, message)

    const { text, entities } = parseInputText(message.text)

    if (entities?.length) {
      sendingMessage = {
        ...sendingMessage,
        text,
        entities
      }
    }

    if (
      message.inputFiles?.length || (
        initialEditingMessage &&
        checkIsParentFilesMessage(initialEditingMessage?.text)
      )
    ) {
      sendingMessage = {
        ...sendingMessage,
        text: stringifyParentFilesMessage(sendingMessage.text)
      }
    }

    const success = message.id ?
      await editMessage(
        sendingMessage,
        folder,
        initialEditingMessage?.text !== sendingMessage.text
      ) :
      await createMessage(
        sendingMessage,
        folder
      )

    setLoading(false)
    if (success && sendingMessage.folderId === folderRef.current.id) {
      handleCancelMessage()
    }
  }, [folder, messageRef, handleCancelMessage, setLoading])

  const handleEditMessage = useCallback((message: Message) => {
    if (sendingMessageRef.current) return
    message = {
      ...message,
      text: normalizeInputText(message.text, message.entities)
    }
    initialEditingMessageRef.current = message
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

    let inputFiles = [
      ...uniqFileKeys.map(fileKey => {
        const fileMeta = getFileMeta(fileKey)
        return {
          id: '',
          progress: 0,
          progressSize: 0,
          fileKey,
          name: fileMeta?.name || '',
          size: fileMeta?.size || 0,
          parsing: true
        }
      }),
      ...(message.inputFiles || [])
    ]

    setMessage({
      ...message,
      inputFiles
    })

    for (let i = 0; i < uniqFileKeys.length; i++) {
      const fileKey = uniqFileKeys[i]
      const fileMeta = getFileMeta(fileKey)
      const params =
        fileMeta?.type.startsWith('image') ? await parseImageFile(fileKey) :
          fileMeta?.type.startsWith('video') ? await parseVideoFile(fileKey, fileMeta) :
            undefined

      inputFiles = inputFiles.map(inputFile => inputFile.fileKey === fileKey ? ({
        ...inputFile,
        ...params,
        parsing: false
      }) : inputFile)

      setMessage({
        ...message,
        inputFiles
      })
    }
  }, [messageRef, setMessage])

  const handleRemoveFile = useCallback((inputFile: InputFile) => {
    const message = messageRef.current
    const sendingMessage = sendingMessageRef.current
    const updatedMessage = {
      ...message,
      inputFiles: (sendingMessage || message).inputFiles?.filter(({ fileKey }) =>
        fileKey !== inputFile.fileKey
      ) || []
    }
    if (sendingMessage && !updatedMessage.inputFiles.length) {
      handleCancelMessage()
    } else {
      setMessage(updatedMessage)
      if (sendingMessage) {
        setSendingMessage(folder.id, updatedMessage)
      }
      resetUploadingFiles([inputFile])
    }
  }, [messageRef, sendingMessageRef, folder.id, setMessage, handleCancelMessage])

  const handleReoderFiles = useCallback(() => {
    const message = messageRef.current
    const updatedMessage = {
      ...message,
      inputFiles: message.inputFiles?.reverse()
    }
    setMessage(updatedMessage)
  }, [messageRef, setMessage])

  useEffect(() => {
    if (sendingMessage && sendingMessage.folderId === folderRef.current.id) {
      setMessageRef.current?.({ ...messageRef.current, ...sendingMessage })
    }
  }, [sendingMessage])

  useEffect(() => {
    if (!folder.id) return

    initialEditingMessageRef.current = null
    updateFormRef.current({
      ...initialMessage,
      ...sendingMessageRef.current,
      folderId: folder.id
    }, false)
    setLoadingRef.current?.(!!sendingMessageRef.current)
  }, [folder.id])

  return useMemo(() => ({
    message,
    loading,
    editing: isEditing,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile,
    handleReoderFiles
  }), [
    message,
    loading,
    isEditing,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile,
    handleReoderFiles
  ])
}
