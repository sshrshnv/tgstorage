import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo } from 'preact/hooks'

import type { Folders } from '~/core/store'
import { useFolders } from '~/core/hooks'

import { StorageSidebarCategory } from './storage.sidebar-category'
import { StorageSidebarFolder } from './storage.sidebar-folder'

type Props = {
  toggleSidebarsVisibility?: (sidebar: 'folder', params: object) => void
}

export const StorageSidebarList: FC<Props> = ({
  toggleSidebarsVisibility
}) => {
  const { folders } = useFolders()

  return useMemo(() => (
    <Fragment>
      {folders.map((folder, index) => (
        <Fragment key={folder.id}>
          {(!index || folder.category !== folders[index - 1].category) && (
            <StorageSidebarCategory
              folder={folder as Folders[0]}
              index={index}
              toggleSidebarsVisibility={toggleSidebarsVisibility}
            />
          )}

          <StorageSidebarFolder
            id={folder.id as number}
            index={index}
            toggleSidebarsVisibility={toggleSidebarsVisibility}
          />
        </Fragment>
      ))}
    </Fragment>
  ), [folders])
}
