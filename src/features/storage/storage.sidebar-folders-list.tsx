import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useMemo } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { useFolders, useActiveFolder } from '~/core/hooks'

import type { FolderPopupParams } from './storage'
import { StorageSidebarFolderCategoryItem } from './storage.sidebar-folder-category-item'
import { StorageSidebarFolderItem } from './storage.sidebar-folder-item'

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
  const { folders } = useFolders()
  const { folder } = useActiveFolder()

  const filteredFolders = useMemo(() => {
    if (filterActiveFolder) {
      return folders.filter(({ id }) => id !== folder.id)
    }
    return folders
  }, [filterActiveFolder, folders, folder.id])

  return (
    <Fragment>
      {filteredFolders.map((folder, index) => (
        <Fragment key={folder.id}>
          {(!index || folder.category !== folders[index - 1].category) && (
            <StorageSidebarFolderCategoryItem
              folder={folder as Folder}
              index={index}
              withoutMenu={withoutMenu}
              setFolderPopupParams={setFolderPopupParams}
            />
          )}

          <StorageSidebarFolderItem
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
    </Fragment>
  )
})
