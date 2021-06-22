import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'

import type { Folder } from '~/core/store'
import { useFolders } from '~/core/hooks'

import { StorageSidebarFolderCategoryItem } from './storage.sidebar-folder-category-item'
import { StorageSidebarFolderItem } from './storage.sidebar-folder-item'
import type { FolderPopupParams } from './storage.sidebar'

type Props = {
  setFolderPopupParams?: (params: FolderPopupParams) => void
}

export const StorageSidebarFoldersList: FC<Props> = memo(({
  setFolderPopupParams
}) => {
  const { folders } = useFolders()

  return (
    <Fragment>
      {folders.map((folder, index) => (
        <Fragment key={folder.id}>
          {(!index || folder.category !== folders[index - 1].category) && (
            <StorageSidebarFolderCategoryItem
              folder={folder as Folder}
              index={index}
              setFolderPopupParams={setFolderPopupParams}
            />
          )}

          <StorageSidebarFolderItem
            id={folder.id as number}
            index={index}
            setFolderPopupParams={setFolderPopupParams}
          />
        </Fragment>
      ))}
    </Fragment>
  )
})
