import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'

import { loadFolders } from '~/core/actions'
import { useTexts, useFolders, useUser } from '~/core/hooks'
import { Layout } from '~/ui/elements/layout'
import { Avatar } from '~/ui/elements/avatar'
import { Button } from '~/ui/elements/button'
import { Sidebar, SidebarHeader, SidebarTitle, SidebarItem, SidebarActionButton } from '~/ui/elements/sidebar'
import { BellIcon, SettingsIcon, FolderPlusIcon } from '~/ui/icons'

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
  const { texts } = useTexts('storage')
  const { user } = useUser()
  const { folders } = useFolders()
  const [sidebarsVisibility, setSidebarsVisibility] = useState(sidebarsVisibilityInitialState)

  const toggleSidebarsVisibility = useCallback((sidebar: keyof typeof sidebarsVisibilityInitialState) => {
    setSidebarsVisibility({ ...sidebarsVisibility, [sidebar]: !sidebarsVisibility[sidebar] })
  }, [sidebarsVisibility])

  useEffect(() => {
    //loadFolders()
  }, [])

  return (
    <Layout sidebar animationFallbackCheck>
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

        <SidebarTitle>{texts.generalGroupTitle}</SidebarTitle>
        <SidebarItem
          title={texts.generalFolderTitle}
          description="Tratata tata tata"
        />

        <SidebarTitle>Books</SidebarTitle>
        <SidebarItem
          title="Fiction"
          description="The Guest Sidebar by Lucy Foley"
          index={0}
        />
        <SidebarItem
          title="Non fiction"
          description="Clanlands: Whisky, Warfare, and a Scottish Adventure Like No Other"
          index={1}
        />

        <SidebarTitle>Movies</SidebarTitle>
        <SidebarItem
          title="To watch"
          description="Zack Snyder's Justice League"
          index={2}
        />
        <SidebarItem
          title="Watched"
          description="The Avengers"
          index={3}
        />

        <SidebarTitle>Job</SidebarTitle>
        <SidebarItem
          title="Articles"
          description="Lalal lalal lslsl sls"
          index={4}
        />
        { [...Array(51).keys()].map(i => (
          <SidebarItem
            key={i}
            title="Vacancies"
            description="Senior frontend developer"
            index={i+5}
          />
        )) }
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
