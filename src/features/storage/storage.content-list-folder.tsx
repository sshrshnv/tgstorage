import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import { setActiveFolder, sendMessage } from '~/core/actions'
import { useTexts, useActiveFolder } from '~/core/hooks'
import { Content } from '~/ui/elements/content'
import { ContentHeader } from '~/ui/elements/content-header'
import { ContentForm } from '~/ui/elements/content-form'
import { Button } from '~/ui/elements/button'
import { SearchIcon } from '~/ui/icons'

import { StorageContentList } from './storage.content-list'

type Props = {
  dropAvailable: boolean
  toggleSearch: () => void
}

export const StorageContentListFolder: FC<Props> = ({
  dropAvailable,
  toggleSearch
}) => {
  const { texts } = useTexts('storage')
  const { folder, messages } = useActiveFolder()
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')

  const handleClose = useCallback(() => {
    setActiveFolder(0)
  }, [])

  const handleSubmit = useCallback(() => {
    if (text) {
      sendMessage(text, folder)
    }
  }, [text])

  const handleChangeText = useCallback(value => {
    setText(value)
  }, [setText])

  const handleAddFiles = useCallback(files => {
    console.log(files)
  }, [])

  return (
    <Content
      name="content-folder"
      dropAvailable={dropAvailable && !loading}
      onClose={handleClose}
      onAddFiles={handleAddFiles}
    >
      <ContentHeader
        title={folder.title}
        button={(
          <Button
            icon={<SearchIcon/>}
            square
            onClick={toggleSearch}
          />
        )}
        withoutDesktopBack
      />
      <StorageContentList
        messages={messages}
      />
      <ContentForm
        placeholder={texts.notePlaceholder}
        text={text}
        onSubmit={handleSubmit}
        onChangeText={handleChangeText}
        onAddFiles={handleAddFiles}
      />
    </Content>
  )
}
