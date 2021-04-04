import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'

import { loadFolders } from '~/core/actions'
import { useUser } from '~/core/hooks'
import { Layout } from '~/ui/elements/layout'
import { Avatar } from '~/ui/elements/avatar'
import { Button } from '~/ui/elements/button'
import { Sidebar, SidebarHeader, SidebarActionButton } from '~/ui/elements/sidebar'
import { BellIcon, SettingsIcon, FolderPlusIcon } from '~/ui/icons'

import { StorageFolderList } from './storage.folder-list'
import { StorageSidebarFolder } from './storage.sidebar-folder'
import { StorageSidebarCategory } from './storage.sidebar-category'
import { StorageSidebarSettings } from './storage.sidebar-settings'
import { StorageSidebarNotifications } from './storage.sidebar-notifications'
import { StorageSidebarProfile } from './storage.sidebar-profile'

const sidebarsVisibilityInitialState = {
  folder: false,
  category: false,
  settings: false,
  notifications: false,
  profile: false
}

export const StorageSidebar: FC = () => {
  const { user } = useUser()
  const [sidebarsVisibility, setSidebarsVisibility] = useState(sidebarsVisibilityInitialState)

  const toggleSidebarsVisibility = useCallback((sidebar: keyof typeof sidebarsVisibilityInitialState) => {
    setSidebarsVisibility({ ...sidebarsVisibility, [sidebar]: !sidebarsVisibility[sidebar] })
  }, [sidebarsVisibility])

  useEffect(() => {
    //loadFolders()
  }, [])

  return (
    <Layout sidebar>
      <Sidebar>
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
          icon={<FolderPlusIcon/>}
          onClick={() => toggleSidebarsVisibility('folder')}
        />

        <StorageFolderList/>
      </Sidebar>

      { sidebarsVisibility.folder && (
        <StorageSidebarFolder
          onClose={() => toggleSidebarsVisibility('folder')}
        />
      )}
      { sidebarsVisibility.category && (
        <StorageSidebarCategory
          onClose={() => toggleSidebarsVisibility('category')}
        />
      )}
      { sidebarsVisibility.settings && (
        <StorageSidebarSettings
          onClose={() => toggleSidebarsVisibility('settings')}
        />
      )}
      { sidebarsVisibility.notifications && (
        <StorageSidebarNotifications
          onClose={() => toggleSidebarsVisibility('notifications')}
        />
      )}
      { sidebarsVisibility.profile && (
        <StorageSidebarProfile
          onClose={() => toggleSidebarsVisibility('profile')}
        />
      )}
    </Layout>
  )
}
