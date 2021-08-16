import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect } from 'preact/hooks'

import type { Message } from '~/core/store'
import { useTexts, useActiveFolder } from '~/core/hooks'
import { useStateRef, useCallbackRef } from '~/tools/hooks'
import { Text } from '~/ui/elements/text'
import { ContentWrapper } from '~/ui/elements/content-wrapper'

import { StorageContentFolderBlock } from './storage.content-folder-block'
import { StorageContentSearchPopup } from './storage.content-search-popup'

type Props = {
  movingMessageActive: boolean
  setMovingMessage: (message: Message) => void
}

export const StorageContent: FC<Props> = memo(({
  movingMessageActive,
  setMovingMessage
}) => {
  const { texts } = useTexts('storage')
  const { folder } = useActiveFolder()
  const [search, setSearch, searchRef] = useStateRef(false)

  const [toggleSearch, toggleSearchRef] = useCallbackRef(() => {
    setSearch(!search)
  }, [search])

  useEffect(() => {
    if (searchRef.current) {
      toggleSearchRef.current()
    }
  }, [folder.id])

  return (
    <ContentWrapper
      active={!!folder.id}
      secondary={movingMessageActive}
      overlayText={movingMessageActive ? texts.folderSelectTitle : ''}
    >
      {!!folder.id && (
        <StorageContentFolderBlock
          dropAvailable={!search}
          toggleSearch={toggleSearch}
          setMovingMessage={setMovingMessage}
        />
      )}
      {!!folder.id && search && (
        <StorageContentSearchPopup
          toggleSearch={toggleSearch}
          setMovingMessage={setMovingMessage}
        />
      )}
      {!folder.id && (
        <Text small grey>
          {texts.emptyActiveFolder}
        </Text>
      )}
    </ContentWrapper>
  )
})
