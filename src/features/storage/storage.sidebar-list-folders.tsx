import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { useFolders } from '~/core/hooks'

import { StorageSidebarItemCategory } from './storage.sidebar-item-category'
import { StorageSidebarItemFolder } from './storage.sidebar-item-folder'
import type { FolderPopupParams } from './storage.sidebar'

type Props = {
  setFolderPopupParams?: (params: FolderPopupParams) => void
}

export const StorageSidebarListFolders: FC<Props> = ({
  setFolderPopupParams
}) => {
  const { folders } = useFolders()

  return useMemo(() => (
    <Fragment>
      {folders.map((folder, index) => (
        <Fragment key={folder.id}>
          {(!index || folder.category !== folders[index - 1].category) && (
            <StorageSidebarItemCategory
              folder={folder as Folder}
              index={index}
              setFolderPopupParams={setFolderPopupParams}
            />
          )}

          <StorageSidebarItemFolder
            id={folder.id as number}
            index={index}
            setFolderPopupParams={setFolderPopupParams}
          />
        </Fragment>
      ))}
    </Fragment>
  ), [folders, setFolderPopupParams])
}