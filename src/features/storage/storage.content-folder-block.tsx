import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback } from 'preact/hooks'

import type { Message } from '~/core/store'
import { setActiveFolder, loadFolderMessages } from '~/core/actions'
import { useTexts, useActiveFolder, useMessageForm } from '~/core/hooks'
import { Content } from '~/ui/elements/content'
import { ContentHeader } from '~/ui/elements/content-header'
import { ContentForm } from '~/ui/elements/content-form'
import { Button } from '~/ui/elements/button'
import { SearchIcon } from '~/ui/icons'

import { StorageContentMessagesList } from './storage.content-messages-list'

type Props = {
  dropAvailable: boolean
  toggleSearch: () => void
  setMovingMessage: (message: Message) => void
}

export const StorageContentFolderBlock: FC<Props> = memo(({
  dropAvailable,
  toggleSearch,
  setMovingMessage
}) => {
  const { texts } = useTexts('storage')
  const {
    folder,
    messages,
    messagesLoading,
    lastMessageId
  } = useActiveFolder()
  const {
    message,
    loading,
    handleSubmit,
    handleEditMessage,
    handleCancelMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  } = useMessageForm()

  const loadMessages = useCallback((offsetId) => {
    loadFolderMessages(folder, offsetId)
  }, [folder])

  const handleClose = useCallback(() => {
    setActiveFolder(0)
  }, [])

  return (
    <Content
      name="content-folder"
      dropAvailable={dropAvailable && !loading}
      onClose={handleClose}
      onAddFiles={handleAddFiles}
    >
      <ContentHeader
        key={folder.id}
        title={folder.title}
        button={(
          <Button
            icon={<SearchIcon/>}
            square
            onClick={toggleSearch}
          />
        )}
        loading={messagesLoading}
        withoutDesktopBack
      />

      <StorageContentMessagesList
        key={folder.id}
        folder={folder}
        messages={messages}
        messagesLoading={messagesLoading}
        lastMessageId={lastMessageId}
        loadMessages={loadMessages}
        onEditMessage={handleEditMessage}
        onMoveMessage={setMovingMessage}
      />

      <ContentForm
        key={message.key}
        texts={texts}
        message={message}
        loading={loading}
        onSubmit={handleSubmit}
        onChangeText={handleChangeText}
        onAddFiles={handleAddFiles}
        onRemoveFile={handleRemoveFile}
        onCancel={handleCancelMessage}
      />
    </Content>
  )
})
