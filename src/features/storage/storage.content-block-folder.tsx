import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback } from 'preact/hooks'

import { setActiveFolder, loadFolderMessages } from '~/core/actions'
import { useTexts, useActiveFolder } from '~/core/hooks'
import { Content } from '~/ui/elements/content'
import { ContentHeader } from '~/ui/elements/content-header'
import { ContentForm } from '~/ui/elements/content-form'
import { Button } from '~/ui/elements/button'
import { SearchIcon } from '~/ui/icons'

import { StorageContentListMessages } from './storage.content-list-messages'
import { useMessageForm } from './hooks'

type Props = {
  dropAvailable: boolean
  toggleSearch: () => void
}

export const StorageContentBlockFolder: FC<Props> = ({
  dropAvailable,
  toggleSearch
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
    handleCancelEditMessage,
    handleChangeText,
    handleAddFiles,
    handleRemoveFile
  } = useMessageForm()

  const loadMessages = useCallback((offsetId) => {
    loadFolderMessages(folder, offsetId)
  }, [folder, messages, messagesLoading])

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
      <StorageContentListMessages
        key={folder.id}
        folder={folder}
        messages={messages}
        messagesLoading={messagesLoading}
        loadMessages={loadMessages}
        onEditMessage={handleEditMessage}
        lastMessageId={lastMessageId}
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
        onCancelEdit={handleCancelEditMessage}
      />
    </Content>
  )
}
