import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo, useState, useCallback } from 'preact/hooks'

import { deleteMessage } from '~/core/actions'
import { useTexts } from '~/core/hooks'
import type { Folder, Message } from '~/core/store'
import { ContentItem } from '~/ui/elements/content-item'
import { EditIcon, MoveIcon, CopyIcon, ShareIcon, DeleteIcon } from '~/ui/icons'

import { useQuickEditMessage } from './hooks'

type Props = {
  folder: Folder
  message: Message
  offset: number | undefined
  height: number | undefined
  visible: boolean
  mediaLoadAvailable: boolean
  resizeObserver: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
  onEdit?: (message: Message) => void
  onDelete?: (id: number) => void
}

export const StorageContentItemMessage: FC<Props> = ({
  folder,
  message,
  offset,
  height,
  visible,
  mediaLoadAvailable,
  resizeObserver,
  intersectionObserver,
  onEdit,
  onDelete
}) => {
  const { texts } = useTexts('storage')
  const { editing, editText } = useQuickEditMessage(message)
  const [confirmation, setConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEdit = useCallback(() => {
    onEdit?.(message)
  }, [message, onEdit])

  const handleMove = useCallback(() => {
    //move
  }, [])

  const handleCopy = useCallback(() => {
    //copy
  }, [])

  const handleShare = useCallback(() => {
    //share
  }, [])

  const handleDelete = useCallback(async (ev) => {
    if (confirmation) {
      setLoading(true)
      const success = await deleteMessage(message, folder)
      if (!success) {
        setLoading(false)
      }
      return
    }
    ev.stopPropagation()
    setConfirmation(true)
  }, [confirmation, message, folder])

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const menu = useMemo(() => ({
    items: [{
      title: texts.messageEditTitle,
      icon: <EditIcon/>,
      onClick: handleEdit
    }, {
      title: texts.messageMoveTitle,
      icon: <MoveIcon/>,
      onClick: handleMove
    }, {
      title: texts.messageCopyTitle,
      icon: <CopyIcon/>,
      onClick: handleCopy
    }, {
      title: texts.messageShareTitle,
      icon: <ShareIcon/>,
      onClick: handleShare
    }, {
      title: confirmation ? texts.confirmDeleteButton : texts.messageDeleteTitle,
      icon: <DeleteIcon/>,
      warning: !confirmation,
      danger: confirmation,
      onClick: handleDelete
    },],
    onClose: resetConfirmation
  }), [
    confirmation,
    handleEdit,
    handleMove,
    handleCopy,
    handleShare,
    handleDelete,
    resetConfirmation
  ])

  return (
    <ContentItem
      message={message}
      offset={offset}
      height={height}
      visible={visible}
      mediaLoadAvailable={mediaLoadAvailable}
      resizeObserver={resizeObserver}
      intersectionObserver={intersectionObserver}
      loading={loading || editing}
      menu={menu}
      onDelete={onDelete}
      editText={editText}
    />
  )
}
