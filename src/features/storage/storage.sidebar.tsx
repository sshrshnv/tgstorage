import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'

import { loadFolders } from '~/core/actions'
import type { Folder } from '~/core/store'
import { SidebarWrapper } from '~/ui/elements/sidebar-wrapper'

import { StorageSidebarFoldersBlock } from './storage.sidebar-folders-block'
import { StorageSidebarFolderPopup } from './storage.sidebar-folder-popup'
import { StorageSidebarSettingsPopup } from './storage.sidebar-settings-popup'
import { StorageSidebarProfilePopup } from './storage.sidebar-profile-popup'

export type FolderPopupParams = {
  folder?: Folder
  category?: string
  isInitialFolder?: boolean
  isEditFolder?: boolean
  isEditCategory?: boolean
} | null

export const StorageSidebar: FC = () => {
  const [folderPopupParams, setFolderPopupParams] = useState<FolderPopupParams>(null)
  const [profilePopupVisible, setProfilePopupVisible] = useState(false)
  const [settingsPopupVisible, setSettingsPopupVisible] = useState(false)

  const closeFolderPopup = useCallback(() => {
    setFolderPopupParams(null)
  }, [setFolderPopupParams])

  const closeProfilePopup = useCallback(() => {
    setProfilePopupVisible(false)
  }, [setProfilePopupVisible])

  const closeSettingsPopup = useCallback(() => {
    setSettingsPopupVisible(false)
  }, [setSettingsPopupVisible])

  useEffect(() => {
    loadFolders()
  }, [])

  return (
    <SidebarWrapper>
      <StorageSidebarFoldersBlock
        setFolderPopupParams={setFolderPopupParams}
        setProfilePopupVisible={setProfilePopupVisible}
        setSettingsPopupVisible={setSettingsPopupVisible}
      />

      {!!folderPopupParams && (
        <StorageSidebarFolderPopup
          params={folderPopupParams}
          onClose={closeFolderPopup}
        />
      )}

      {profilePopupVisible && (
        <StorageSidebarProfilePopup
          onClose={closeProfilePopup}
        />
      )}

      {settingsPopupVisible && (
        <StorageSidebarSettingsPopup
          onClose={closeSettingsPopup}
        />
      )}
    </SidebarWrapper>
  )
}
