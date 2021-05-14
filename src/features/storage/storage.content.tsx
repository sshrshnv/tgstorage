import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useState, useCallback } from 'preact/hooks'

import { useTexts, useActiveFolder } from '~/core/hooks'
import { Text } from '~/ui/elements/text'
import { ContentWrapper } from '~/ui/elements/content-wrapper'

import { StorageContentListFolder } from './storage.content-list-folder'
import { StorageContentListSearch } from './storage.content-list-search'

export const StorageContent: FC = () => {
  const { texts } = useTexts('storage')
  const { folder } = useActiveFolder()
  const [search, setSearch] = useState(false)

  const toggleSearch = useCallback(() => {
    setSearch(!search)
  }, [search])

  return (
    <ContentWrapper active={!!folder.id}>
      {!folder.id && (
        <Text grey>
          {texts.emptyActiveFolder}
        </Text>
      )}
      {!!folder.id && (
        <StorageContentListFolder
          toggleSearch={toggleSearch}
          dropAvailable={!search}
        />
      )}
      {!!folder.id && search && (
        <StorageContentListSearch
          toggleSearch={toggleSearch}
        />
      )}
    </ContentWrapper>
  )
}
