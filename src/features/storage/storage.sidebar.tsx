import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'

import { loadFolders } from '~/core/actions'
import type { Folder } from '~/core/store'
import { SidebarWrapper } from '~/ui/elements/sidebar-wrapper'

import { StorageSidebarBlockFolders } from './storage.sidebar-block-folders'
import { StorageSidebarPopupFolder } from './storage.sidebar-popup-folder'
import { StorageSidebarPopupSettings } from './storage.sidebar-popup-settings'
import { StorageSidebarPopupProfile } from './storage.sidebar-popup-profile'

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
      <StorageSidebarBlockFolders
        setFolderPopupParams={setFolderPopupParams}
        setProfilePopupVisible={setProfilePopupVisible}
        setSettingsPopupVisible={setSettingsPopupVisible}
      />

      {!!folderPopupParams && (
        <StorageSidebarPopupFolder
          params={folderPopupParams}
          onClose={closeFolderPopup}
        />
      )}

      {profilePopupVisible && (
        <StorageSidebarPopupProfile
          onClose={closeProfilePopup}
        />
      )}

      {settingsPopupVisible && (
        <StorageSidebarPopupSettings
          onClose={closeSettingsPopup}
        />
      )}
    </SidebarWrapper>
  )
}
