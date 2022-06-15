import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useState, useCallback } from 'preact/hooks'

import type { Folder, Message } from '~/core/store'
import { deleteMessage } from '~/core/actions'
import { useTexts, useQuickEditMessage } from '~/core/hooks'
import { COPY_TIMEOUT, copyText } from '~/tools/copy-text'
import { shareText, checkIsSharingSupported } from '~/tools/share-data'
import { checkIsChecklistMessage, checkIsParentFilesMessage, parseParentFilesMessage } from '~/tools/handle-content'
import { normalizeMessageText } from '~/tools/handle-content-text'
import { ContentItem } from '~/ui/elements/content-item'
import { ContentItemHeader } from '~/ui/elements/content-item-header'
import { ContentItemText } from '~/ui/elements/content-item-text'
import { ContentItemChecklist } from '~/ui/elements/content-item-checklist'

import { StorageContentMessageMediaList } from './storage.content-message-media-list'
import { StorageContentMessageMediaItem } from './storage.content-message-media-item'
import { StorageContentMessageWebpage } from './storage.content-message-webpage'

type Props = {
  folder: Folder
  message: Message
  offset: number | undefined
  visible: boolean
  last: boolean
  resizeObserver?: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
  onViewMedia?: (id: string) => void
  onEdit?: (message: Message) => void
  onDelete?: (id: number) => void
  onMove?: (message: Message) => void
}

export const StorageContentMessageItem: FC<Props> = memo(({
  folder,
  message,
  offset,
  visible,
  last,
  resizeObserver,
  intersectionObserver,
  onViewMedia,
  onEdit,
  onDelete,
  onMove
}) => {
  const { texts } = useTexts('storage')
  const { editing, editText } = useQuickEditMessage(message)
  const [confirmation, setConfirmation] = useState(false)
  const [coping, setCoping] = useState(false)
  const [loading, setLoading] = useState(false)

  const isChecklist = useMemo(() => {
    return checkIsChecklistMessage(message.text)
  }, [message.text])

  const hasMedia = useMemo(() => {
    return !!message.media || !!message.mediaMessages?.length
  }, [message.media, message.mediaMessages?.length])

  const hasWebpage = useMemo(() => {
    return !!message.webpage
  }, [message.webpage])

  const normalizedText = useMemo(() => {
    const text = normalizeMessageText(message.text, message.entities)
    return checkIsParentFilesMessage(text) ?
      parseParentFilesMessage(text).text :
      text
  }, [message.text, message.entities])

  const copingText = useMemo(() => {
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

  const handleCopy = useCallback(async () => {
    setCoping(true)
    copyText(copingText)
  }, [copingText, setCoping])

  const handleShare = useCallback(() => {
    shareText(copingText)
  }, [copingText])

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

  const resetCoping = useCallback(() => {
    setCoping(false)
  }, [setCoping])

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const menu = useMemo(() => ({
    items: [!message.fwd ? {
      title: texts.messageEditTitle,
      icon: 'edit',
      onClick: handleEdit
    } : null, {
      title: texts.messageMoveTitle,
      icon: 'move',
      onClick: handleMove
    }, copingText.length ? {
      title: coping ? texts.messageCopiedTitle : texts.messageCopyTitle,
      icon: coping ? 'check' : 'copy',
      onClick: handleCopy
    } : null, (copingText.length && checkIsSharingSupported()) ? {
      title: texts.messageShareTitle,
      icon: 'share',
      onClick: handleShare
    }: null, {
      title: confirmation ? texts.confirmDeleteButton : texts.messageDeleteTitle,
      hiddenTitle: confirmation ? texts.messageDeleteTitle : texts.confirmDeleteButton,
      icon: 'delete',
      warning: !confirmation,
      danger: confirmation,
      onClick: handleDelete
    }],
    closeTimeout: coping ? COPY_TIMEOUT : 0,
    onClose: confirmation ? resetConfirmation : coping ? resetCoping : undefined
  }), [
    confirmation,
    coping,
    copingText.length,
    texts.messageEditTitle,
    texts.messageMoveTitle,
    texts.messageCopyTitle,
    texts.messageCopiedTitle,
    texts.messageShareTitle,
    texts.confirmDeleteButton,
    texts.messageDeleteTitle,
    handleEdit,
    handleMove,
    handleCopy,
    handleShare,
    handleDelete,
    resetConfirmation,
    resetCoping
  ])

  return (
    <ContentItem
      message={message}
      offset={offset}
      visible={visible}
      last={last}
      resizeObserver={resizeObserver}
      intersectionObserver={intersectionObserver}
      loading={loading || editing}
      menu={menu}
      emptyText={texts.emptyMessage}
      onDelete={onDelete}
    >
      <ContentItemHeader
        date={message.date}
        fwd={message.fwd}
        fwdTitle={texts.messageFwdTitle}
        fwdFromTitle={texts.messageFwdFromTitle}
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
          empty={!normalizedText && !hasMedia && !hasWebpage}
        />
      )}

      {hasWebpage && (
        <StorageContentMessageWebpage
          folder={folder}
          message={message}
          mediaLoadAvailable={visible}
        />
      )}

      {!!message.media && (
        <StorageContentMessageMediaItem
          folder={folder}
          message={message}
          mediaLoadAvailable={visible}
          onViewMedia={onViewMedia}
          single
        />
      )}

      {!!message.mediaMessages?.length && (
        <StorageContentMessageMediaList
          folder={folder}
          mediaMessages={message.mediaMessages}
          mediaLoadAvailable={visible}
          onViewMedia={onViewMedia}
        />
      )}
    </ContentItem>
  )
})
