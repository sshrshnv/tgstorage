import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { useTexts, useActiveFolder } from '~/core/hooks'
import { Content } from '~/ui/elements/content'
import { ContentHeader } from '~/ui/elements/content-header'

type Props = {
  toggleSearch: () => void
}

export const StorageContentSearchPopup: FC<Props> = ({
  toggleSearch
}) => {
  const { texts } = useTexts('storage')
  const { folder } = useActiveFolder()

  return (
    <Content
      name="content-search"
      onClose={toggleSearch}
    >
      <ContentHeader
        placeholder={`${texts.searchPlaceholder} ${folder.title}`}
      />
    </Content>
  )
}
