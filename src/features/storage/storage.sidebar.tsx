import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'

import { loadFolders } from '~/core/actions'
import { useUser, useFolders } from '~/core/hooks'
import { Avatar } from '~/ui/elements/avatar'
import { Button } from '~/ui/elements/button'
import { SidebarWrapper } from '~/ui/elements/sidebar-wrapper'
import { Sidebar } from '~/ui/elements/sidebar'
import { SidebarHeader } from '~/ui/elements/sidebar-header'
import { SidebarActionButton } from '~/ui/elements/sidebar-action-button'
import { Loader } from '~/ui/elements/loader'
import { BellIcon, SettingsIcon, FolderPlusIcon } from '~/ui/icons'

import { StorageSidebarList } from './storage.sidebar-list'
import { StorageSidebarPopupFolder } from './storage.sidebar-popup-folder'
import { StorageSidebarPopupSettings } from './storage.sidebar-popup-settings'
import { StorageSidebarPopupNotifications } from './storage.sidebar-popup-notifications'
import { StorageSidebarPopupProfile } from './storage.sidebar-popup-profile'

const sidebarsVisibilityInitialState = {
  folder: false,
  category: false,
  settings: false,
  notifications: false,
  profile: false
}

export const StorageSidebar: FC = () => {
  const { user } = useUser()
  const { foldersLoading } = useFolders()
  const [sidebarsVisibility, setSidebarsVisibility] = useState(sidebarsVisibilityInitialState)

  const toggleSidebarsVisibility = useCallback((
    sidebar: keyof typeof sidebarsVisibilityInitialState,
    params?: object
  ) => {
    setSidebarsVisibility({
      ...sidebarsVisibility,
      [sidebar]: params || !sidebarsVisibility[sidebar]
    })
  }, [sidebarsVisibility])

  useEffect(() => {
    loadFolders()
  }, [])

  return (
    <SidebarWrapper>
      <Sidebar
        disabled={foldersLoading}
      >
        <SidebarHeader>
          <Avatar
            image={user?.photo}
            onClick={() => toggleSidebarsVisibility('profile')}
          />
          <Button
            icon={<SettingsIcon/>}
            round
            onClick={() => toggleSidebarsVisibility('settings')}
          />
          <Button
            icon={<BellIcon/>}
            round
            onClick={() => toggleSidebarsVisibility('notifications')}
          />
        </SidebarHeader>

        <SidebarActionButton
          icon={foldersLoading ? <Loader/> : <FolderPlusIcon/>}
          onClick={() => !foldersLoading && toggleSidebarsVisibility('folder')}
        />

        <StorageSidebarList
          toggleSidebarsVisibility={toggleSidebarsVisibility}
        />
      </Sidebar>

      {sidebarsVisibility.folder && (
        <StorageSidebarPopupFolder
          params={sidebarsVisibility.folder}
          onClose={() => toggleSidebarsVisibility('folder')}
        />
      )}
      {sidebarsVisibility.settings && (
        <StorageSidebarPopupSettings
          onClose={() => toggleSidebarsVisibility('settings')}
        />
      )}
      {sidebarsVisibility.notifications && (
        <StorageSidebarPopupNotifications
          onClose={() => toggleSidebarsVisibility('notifications')}
        />
      )}
      {sidebarsVisibility.profile && (
        <StorageSidebarPopupProfile
          onClose={() => toggleSidebarsVisibility('profile')}
        />
      )}
    </SidebarWrapper>
  )
}
