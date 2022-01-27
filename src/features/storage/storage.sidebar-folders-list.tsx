import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useState, useCallback } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { useTexts, useFolders, useActiveFolder, useSettings } from '~/core/hooks'
import { Layout } from '~/ui/elements/layout'
import { Text } from '~/ui/elements/text'
import { Break } from '~/ui/elements/break'

import type { FoldersFormPopupParams } from './storage'
import { StorageSidebarFoldersListCategory } from './storage.sidebar-folders-list-category'
import { StorageSidebarFoldersListGroup } from './storage.sidebar-folders-list-group'
import { StorageSidebarFoldersListFolder } from './storage.sidebar-folders-list-folder'

type Props = {
  loadingDisabled?: boolean
  withoutMenu?: boolean
  withoutMessage?: boolean
  filterActiveFolder?: boolean
  fakeExample?: boolean
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
  fakeExample,
  setFoldersFormPopupParams,
  onFolderSelect
}) => {
  const { texts } = useTexts('storage')
  const { folders } = useFolders()
  const { folder } = useActiveFolder()
  const filterGeneralFolder = !useSettings().generalFolderEnabled
  const [groups, setGroups] = useState<Groups>(initialGroups)

  const filteredFolders = useMemo(() => {
    let filteredFolders = folders

    if (fakeExample) {
      filteredFolders = addFakeExample(filteredFolders, texts)
    }
    if (filterActiveFolder) {
      return filteredFolders.filter(({ id }) => id !== folder.id)
    }
    if (filterGeneralFolder) {
      return filteredFolders.filter(({ general }) => !general)
    }
    return filteredFolders
  }, [fakeExample, filterActiveFolder, filterGeneralFolder, folders, folder.id])

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
          <Fragment key={folder.id || folder.title}>
            {fakeExample && index === 1 - +filterGeneralFolder && (
              <Fragment>
                {index > 0 && (
                  <Break size={32} px/>
                )}
                <Text center small transparent>
                  {texts.fakeExample}
                </Text>
                <Break size={4} px/>
              </Fragment>
            )}

            {(!index || folder.category !== filteredFolders[index - 1].category) && (
              <StorageSidebarFoldersListCategory
                folder={folder as Folder}
                index={index}
                withoutMenu={withoutMenu || folder.fake}
                disabled={folder.fake}
                offset={!!index && !folder.fake}
                setFoldersFormPopupParams={setFoldersFormPopupParams}
              />
            )}

            {isGroup && (
              <StorageSidebarFoldersListGroup
                group={folder.group}
                category={folder.category}
                index={index}
                withoutMenu={withoutMenu || folder.fake}
                expanded={group?.expanded}
                disabled={folder.fake}
                setFoldersFormPopupParams={setFoldersFormPopupParams}
                onGroupSelect={toggleGroup}
              />
            )}

            <StorageSidebarFoldersListFolder
              id={folder.id}
              title={folder.title}
              index={folder.group ? groupIndexes[groupKey] : index}
              loadingDisabled={loadingDisabled || folder.fake}
              withoutMenu={withoutMenu || folder.fake}
              withoutMessage={withoutMessage || folder.fake}
              grouped={!!folder.group}
              expanded={!!(folder.group && group?.expanded)}
              toggling={!!(folder.group && group?.toggling)}
              disabled={folder.fake}
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

const addFakeExample = (
  folders: Folder[],
  texts: Record<string, string>
) => {
  return [
    ...folders,
    { id: '', access_hash: '', category: texts.fakeCategory, group: texts.fakeGroup, title: `${texts.fakeTitle} #1`, fake: true },
    { id: '', access_hash: '', category: texts.fakeCategory, group: texts.fakeGroup, title: `${texts.fakeTitle} #2`, fake: true },
    { id: '', access_hash: '', category: texts.fakeCategory, group: '', title: `${texts.fakeTitle} #3`, fake: true }
  ]
}
