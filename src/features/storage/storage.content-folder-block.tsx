import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'

import type { Message, SharedData } from '~/core/store'
import { setActiveFolder, loadFolderMessages, loadFolderSponsoredMessage, setSharedData } from '~/core/actions'
import { useTexts, useActiveFolder, useMessageForm } from '~/core/hooks'
import { Content } from '~/ui/elements/content'
import { ContentHeader } from '~/ui/elements/content-header'
import { ContentForm } from '~/ui/elements/content-form'
import { Layout } from '~/ui/elements/layout'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'

import { StorageContentMessagesList } from './storage.content-messages-list'

type Props = {
  sharedData: SharedData
  dropAvailable: boolean
  toggleSearch: () => void
  setMovingMessage: (message: Message) => void
}

export const StorageContentFolderBlock: FC<Props> = memo(({
  sharedData,
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
    handleRemoveFile,
    handleReoderFiles
  } = useMessageForm(folder)

  const loadMessages = useCallback(() => {
    loadFolderMessages(folder, lastMessageId)
  }, [folder, lastMessageId])

  const handleClose = useCallback(() => {
    setActiveFolder('')
  }, [])

  useEffect(() => {
    if (!sharedData) return
    handleChangeText(sharedData.text || '')
    if (sharedData.fileKeys?.length) {
      handleAddFiles(sharedData.fileKeys)
    }
    setSharedData(null)
  }, [sharedData])

  useEffect(() => {
    if (!folder?.id) return
    loadFolderSponsoredMessage(folder);
    (self as any).gtag?.('event', 'folder_view')
  }, [folder?.id])

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
            icon="search"
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

      {(!messagesLoading && !messages.length) && (
        <Layout row center fullHeight>
          <Text small grey>
            {texts.folderInitial}
          </Text>
        </Layout>
      )}

      <ContentForm
        key={`${folder.id}-${message.key}`}
        texts={texts}
        message={message}
        loading={loading}
        onSubmit={handleSubmit}
        onChangeText={handleChangeText}
        onAddFiles={handleAddFiles}
        onRemoveFile={handleRemoveFile}
        onReoderFiles={handleReoderFiles}
        onCancel={handleCancelMessage}
      />
    </Content>
  )
})
