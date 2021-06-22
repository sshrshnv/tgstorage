import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback } from 'preact/hooks'

import { useFolders } from '~/core/hooks'
import { Sidebar } from '~/ui/elements/sidebar'
import { SidebarHeader } from '~/ui/elements/sidebar-header'
import { SidebarActionButton } from '~/ui/elements/sidebar-action-button'
import { Button } from '~/ui/elements/button'
import { Loader } from '~/ui/elements/loader'
import { UserIcon, SettingsIcon, FolderPlusIcon } from '~/ui/icons'

import { StorageSidebarFoldersList } from './storage.sidebar-folders-list'
import type { FolderPopupParams } from './storage.sidebar'

type Props = {
  setFolderPopupParams?: (params: FolderPopupParams) => void
  setProfilePopupVisible?: (value: boolean) => void
  setSettingsPopupVisible?: (value: boolean) => void
}

export const StorageSidebarFoldersBlock: FC<Props> = memo(({
  setFolderPopupParams,
  setProfilePopupVisible,
  setSettingsPopupVisible
}) => {
  const { foldersLoading } = useFolders()

  const openFolderPopup = useCallback(() => {
    setFolderPopupParams?.({
      isInitialFolder: true
    })
  }, [setFolderPopupParams])

  const openProfilePopup = useCallback(() => {
    setProfilePopupVisible?.(true)
  }, [setProfilePopupVisible])

  const openSettingsPopup = useCallback(() => {
    setSettingsPopupVisible?.(true)
  }, [setSettingsPopupVisible])

  return (
    <Sidebar
      disabled={foldersLoading}
    >
      <SidebarHeader>
        <Button
          icon={<UserIcon/>}
          square
          onClick={openProfilePopup}
        />
        <Button
          icon={<SettingsIcon/>}
          square
          onClick={openSettingsPopup}
        />
      </SidebarHeader>

      <SidebarActionButton
        icon={foldersLoading ? <Loader/> : <FolderPlusIcon/>}
        onClick={foldersLoading ? undefined : openFolderPopup}
      />

      <StorageSidebarFoldersList
        setFolderPopupParams={setFolderPopupParams}
      />
    </Sidebar>
  )
})
