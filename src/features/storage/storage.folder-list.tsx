import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo } from 'preact/hooks'

import { useTexts, useFolders } from '~/core/hooks'
import { SidebarTitle } from '~/ui/elements/sidebar'

import { StorageFolderItem } from './storage.folder-item'

export const StorageFolderList: FC = () => {
  const { texts } = useTexts('storage')
  const { folders } = useFolders()

  return useMemo(() => (
    <Fragment>
      {folders.map((folder, index) => (
        <Fragment key={folder.id}>
          {(!index || folder.category !== folders[index - 1].category) && (
            <SidebarTitle>{folder.category || texts.generalCategoryTitle}</SidebarTitle>
          )}
          <StorageFolderItem
            id={folder.id}
            title={folder.title}
            index={index}
          />
        </Fragment>
      ))}
    </Fragment>
  ), [folders])
}
