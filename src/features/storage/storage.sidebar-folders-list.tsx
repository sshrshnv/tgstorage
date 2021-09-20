import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useMemo } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { useTexts, useFolders, useActiveFolder, useSettings } from '~/core/hooks'
import { Layout } from '~/ui/elements/layout'
import { Text } from '~/ui/elements/text'

import type { FolderPopupParams } from './storage'
import { StorageSidebarFoldersCategoryItem } from './storage.sidebar-folders-category-item'
import { StorageSidebarFoldersItem } from './storage.sidebar-folders-item'

type Props = {
  loadingDisabled?: boolean
  withoutMenu?: boolean
  withoutMessage?: boolean
  filterActiveFolder?: boolean
  setFolderPopupParams?: (params: FolderPopupParams) => void
  onFolderSelect?: (folder: Folder) => void
}

export const StorageSidebarFoldersList: FC<Props> = memo(({
  loadingDisabled,
  withoutMenu,
  withoutMessage,
  filterActiveFolder,
  setFolderPopupParams,
  onFolderSelect
}) => {
  const { texts } = useTexts('storage')
  const { folders } = useFolders()
  const { folder } = useActiveFolder()
  const filterGeneralFolder = !useSettings().generalFolderEnabled

  const filteredFolders = useMemo(() => {
    if (filterActiveFolder) {
      return folders.filter(({ id }) => id !== folder.id)
    }
    if (filterGeneralFolder) {
      return folders.filter(({ general }) => !general)
    }
    return folders
  }, [filterActiveFolder, filterGeneralFolder, folders, folder.id])

  return (
    <Fragment>
      {filteredFolders.map((folder, index) => (
        <Fragment key={folder.id}>
          {(!index || folder.category !== filteredFolders[index - 1].category) && (
            <StorageSidebarFoldersCategoryItem
              folder={folder as Folder}
              index={index}
              withoutMenu={withoutMenu}
              setFolderPopupParams={setFolderPopupParams}
            />
          )}

          <StorageSidebarFoldersItem
            id={folder.id as number}
            index={index}
            loadingDisabled={loadingDisabled}
            withoutMenu={withoutMenu}
            withoutMessage={withoutMessage}
            setFolderPopupParams={setFolderPopupParams}
            onFolderSelect={onFolderSelect}
          />
        </Fragment>
      ))}
      {!filteredFolders.length && (
        <Layout
          center
          paddingTop={!filterGeneralFolder}
        >
          <Text small grey>
            {texts.folderEmptyDescription}
          </Text>
        </Layout>
      )}
    </Fragment>
  )
})
