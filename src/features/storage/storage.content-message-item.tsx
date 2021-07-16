import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useState, useCallback } from 'preact/hooks'

import type { Folder, Message } from '~/core/store'
import { deleteMessage } from '~/core/actions'
import { useTexts, useQuickEditMessage } from '~/core/hooks'
import {
  checkIsChecklistMessage,
  checkIsParentFilesMessage,
  parseParentFilesMessage
} from '~/tools/handle-content'
import { ContentItem } from '~/ui/elements/content-item'
import { ContentItemHeader } from '~/ui/elements/content-item-header'
import { ContentItemText } from '~/ui/elements/content-item-text'
import { ContentItemChecklist } from '~/ui/elements/content-item-checklist'
import { EditIcon, MoveIcon, CopyIcon, ShareIcon, DeleteIcon } from '~/ui/icons'

import { StorageContentMessageItemMediaList } from './storage.content-message-item-media-list'
import { StorageContentMessageItemMediaItem } from './storage.content-message-item-media-item'
import { StorageContentMessageItemGallery } from './storage.content-message-item-gallery'

type Props = {
  folder: Folder
  message: Message
  offset: number | undefined
  height: number | undefined
  visible: boolean
  resizeObserver: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
  onEdit?: (message: Message) => void
  onDelete?: (id: number) => void
  onMove?: (message: Message) => void
}

export const StorageContentMessageItem: FC<Props> = memo(({
  folder,
  message,
  offset,
  height,
  visible,
  resizeObserver,
  intersectionObserver,
  onEdit,
  onDelete,
  onMove
}) => {
  const { texts } = useTexts('storage')
  const { editing, editText } = useQuickEditMessage(message)
  const [confirmation, setConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [galleryInitialId, setGalleryInitialId] = useState('')

  const isChecklist = useMemo(() => {
    return checkIsChecklistMessage(message.text)
  }, [message.text])

  const hasMedia = useMemo(() => {
    return !!message.media || !!message.mediaMessages?.length
  }, [message.media, message.mediaMessages?.length])

  const normalizedText = useMemo(() => {
    return checkIsParentFilesMessage(message.text) ?
      parseParentFilesMessage(message.text).text :
      message.text
  }, [message.text])

  const handleEdit = useCallback(() => {
    onEdit?.(message)
  }, [message, onEdit])

  const handleMove = useCallback(() => {
    onMove?.(message)
  }, [message, onMove])

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

  const openGallery = useCallback((id: string) => {
    setGalleryInitialId(id)
  }, [setGalleryInitialId])

  const closeGallery = useCallback(() => {
    setGalleryInitialId('')
  }, [setGalleryInitialId])

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
    }],
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
      resizeObserver={resizeObserver}
      intersectionObserver={intersectionObserver}
      loading={loading || editing}
      menu={menu}
      emptyText={texts.emptyMessage}
      onDelete={onDelete}
    >
      <ContentItemHeader
        date={message.date}
      />

      {isChecklist ? (
        <ContentItemChecklist
          text={normalizedText}
          loading={loading || editing}
          editText={editText}
        />
      ) : (
        <ContentItemText
          text={normalizedText}
          emptyText={texts.emptyMessage}
          empty={!normalizedText && !hasMedia}
        />
      )}

      {!!message.media && (
        <StorageContentMessageItemMediaItem
          folder={folder}
          message={message}
          mediaLoadAvailable={visible}
          onPreviewClick={openGallery}
        />
      )}

      {message.mediaMessages?.length && (
        <StorageContentMessageItemMediaList
          folder={folder}
          mediaMessages={message.mediaMessages}
          mediaLoadAvailable={visible}
          onPreviewClick={openGallery}
        />
      )}

      {galleryInitialId && (
        <StorageContentMessageItemGallery
          initialId={galleryInitialId}
          mediaMessage={message.media ? message : undefined}
          mediaMessages={message.mediaMessages}
          onClose={closeGallery}
        />
      )}
    </ContentItem>
  )
})
