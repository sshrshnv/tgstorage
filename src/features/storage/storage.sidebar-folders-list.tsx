import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useState, useCallback } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { useTexts, useFolders, useActiveFolder, useSettings } from '~/core/hooks'
import { Layout } from '~/ui/elements/layout'
import { Text } from '~/ui/elements/text'

import type { FoldersFormPopupParams } from './storage'
import { StorageSidebarFoldersListCategory } from './storage.sidebar-folders-list-category'
import { StorageSidebarFoldersListGroup } from './storage.sidebar-folders-list-group'
import { StorageSidebarFoldersListFolder } from './storage.sidebar-folders-list-folder'

type Props = {
  loadingDisabled?: boolean
  withoutMenu?: boolean
  withoutMessage?: boolean
  filterActiveFolder?: boolean
  setFoldersFormPopupParams?: (params: FoldersFormPopupParams) => void
  onFolderSelect?: (folder: Folder) => void
}

type Groups = {
  [key: string]: {
    expanded: boolean
    toggling: boolean
  } | undefined
}

const initialGroups = {}
const groupIndexes = {}

export const StorageSidebarFoldersList: FC<Props> = memo(({
  loadingDisabled,
  withoutMenu,
  withoutMessage,
  filterActiveFolder,
  setFoldersFormPopupParams,
  onFolderSelect
}) => {
  const { texts } = useTexts('storage')
  const { folders } = useFolders()
  const { folder } = useActiveFolder()
  const filterGeneralFolder = !useSettings().generalFolderEnabled
  const [groups, setGroups] = useState<Groups>(initialGroups)

  const filteredFolders = useMemo(() => {
    if (filterActiveFolder) {
      return folders.filter(({ id }) => id !== folder.id)
    }
    if (filterGeneralFolder) {
      return folders.filter(({ general }) => !general)
    }
    return folders
  }, [filterActiveFolder, filterGeneralFolder, folders, folder.id])

  const toggleGroup = useCallback((group, category, _index) => {
    const groupKey = generateGroupKey(group, category)
    setGroups(state => ({
      ...state,
      [groupKey]: {
        expanded: !state[groupKey]?.expanded,
        toggling: true
      }
    }))
    setTimeout(() => {
      setGroups(state => ({
        ...state,
        [groupKey]: {
          expanded: !!state[groupKey]?.expanded,
          toggling: false
        }
      }))
    }, 250)
  }, [])

  return (
    <Fragment>
      {filteredFolders.map((folder, index) => {
        const isGroup = folder.group && folder.group !== filteredFolders[index - 1]?.group
        const groupKey = generateGroupKey(folder.group, folder.category)
        const group = groups[groupKey]

        if (isGroup) {
          groupIndexes[groupKey] = index
        }

        return (
          <Fragment key={folder.id}>
            {(!index || folder.category !== filteredFolders[index - 1].category) && (
              <StorageSidebarFoldersListCategory
                folder={folder as Folder}
                index={index}
                withoutMenu={withoutMenu}
                setFoldersFormPopupParams={setFoldersFormPopupParams}
              />
            )}

            {isGroup && (
              <StorageSidebarFoldersListGroup
                group={folder.group}
                category={folder.category}
                index={index}
                withoutMenu={withoutMenu}
                expanded={group?.expanded}
                setFoldersFormPopupParams={setFoldersFormPopupParams}
                onGroupSelect={toggleGroup}
              />
            )}

            <StorageSidebarFoldersListFolder
              id={folder.id}
              index={folder.group ? groupIndexes[groupKey] : index}
              loadingDisabled={loadingDisabled}
              withoutMenu={withoutMenu}
              withoutMessage={withoutMessage}
              grouped={!!folder.group}
              expanded={!!(folder.group && group?.expanded)}
              toggling={!!(folder.group && group?.toggling)}
              setFoldersFormPopupParams={setFoldersFormPopupParams}
              onFolderSelect={onFolderSelect}
            />
          </Fragment>
        )
      })}
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

const generateGroupKey = (
  group: string,
  category: string
) => {
  return `${group}::${category}`
}
