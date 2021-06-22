import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useState, useCallback, useEffect } from 'preact/hooks'

import { useTexts, useActiveFolder } from '~/core/hooks'
import { Text } from '~/ui/elements/text'
import { ContentWrapper } from '~/ui/elements/content-wrapper'

import { StorageContentFolderBlock } from './storage.content-folder-block'
import { StorageContentSearchPopup } from './storage.content-search-popup'

export const StorageContent: FC = () => {
  const { texts } = useTexts('storage')
  const { folder } = useActiveFolder()
  const [search, setSearch] = useState(false)

  const toggleSearch = useCallback(() => {
    setSearch(!search)
  }, [search])

  useEffect(() => {
    if (search) {
      toggleSearch()
    }
  }, [folder.id])

  return (
    <ContentWrapper active={!!folder.id}>
      {!folder.id && (
        <Text grey>
          {texts.emptyActiveFolder}
        </Text>
      )}
      {!!folder.id && (
        <StorageContentFolderBlock
          toggleSearch={toggleSearch}
          dropAvailable={!search}
        />
      )}
      {!!folder.id && search && (
        <StorageContentSearchPopup
          toggleSearch={toggleSearch}
        />
      )}
    </ContentWrapper>
  )
}
