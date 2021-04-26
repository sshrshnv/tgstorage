import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback } from 'preact/hooks'

import { setActiveFolder } from '~/core/actions'
import { useTexts, useActiveFolder } from '~/core/hooks'
import { Text } from '~/ui/elements/text'
import { ContentWrapper } from '~/ui/elements/content-wrapper'
import { Content } from '~/ui/elements/content'
import { ContentHeader } from '~/ui/elements/content-header'
import { ContentForm } from '~/ui/elements/content-form'

export const StorageContent: FC = () => {
  const { texts } = useTexts('storage')
  const { folder } = useActiveFolder()

  const handleClose = useCallback(() => {
    setActiveFolder(0)
  }, [])

  const handleAddFiles = useCallback(files => {
    console.log(files)
  }, [])

  return (
    <ContentWrapper active={!!folder.id}>
      { folder.id ? (
        <Content
          name="content-list"
          onClose={handleClose}
          onAddFiles={handleAddFiles}
        >
          <ContentHeader title={folder.title}/>
          <ContentForm
            placeholder={texts.contentPlaceholder}
            onAddFiles={handleAddFiles}
          />
        </Content>
      ) : (
        <Text grey>
          {texts.emptyActiveFolder}
        </Text>
      )}
    </ContentWrapper>
  )
}
