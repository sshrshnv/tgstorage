import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import type { Folder } from '~/core/store'
import { useTexts } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Break } from '~/ui/elements/break'

import { StorageSidebarFoldersList } from './storage.sidebar-folders-list'

type Props = {
  filterActiveFolder?: boolean
  loading?: boolean
  onFolderSelect: (folder: Folder) => void
  onClose: () => void
}

export const StorageSidebarFoldersPopup: FC<Props> = memo(({
  filterActiveFolder,
  loading,
  onFolderSelect,
  onClose
}) => {
  const { texts } = useTexts('storage')

  return (
    <SidebarPopup
      title={texts.folderSelectTitle}
      loading={loading}
      withoutPaddings
      onClose={onClose}
    >
      <Break size={24} px/>
      <StorageSidebarFoldersList
        onFolderSelect={onFolderSelect}
        filterActiveFolder={filterActiveFolder}
        loadingDisabled
        withoutMenu
        withoutMessage
      />
    </SidebarPopup>
  )
})
