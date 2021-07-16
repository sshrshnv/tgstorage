import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { loadFolders } from '~/core/actions'
import { SidebarWrapper } from '~/ui/elements/sidebar-wrapper'

import type { FolderPopupParams } from './storage'
import { StorageSidebarFoldersBlock } from './storage.sidebar-folders-block'
import { StorageSidebarFolderPopup } from './storage.sidebar-folder-popup'
import { StorageSidebarFoldersPopup } from './storage.sidebar-folders-popup'
import { StorageSidebarSettingsPopup } from './storage.sidebar-settings-popup'
import { StorageSidebarProfilePopup } from './storage.sidebar-profile-popup'

type Props = {
  folderPopupParams: FolderPopupParams
  profilePopupVisible: boolean
  settingsPopupVisible: boolean
  movingMessageActive: boolean
  movingMessageLoading: boolean
  setFolderPopupParams: (params: FolderPopupParams) => void
  setProfilePopupVisible: (value: boolean) => void
  setSettingsPopupVisible: (value: boolean) => void
  closeFolderPopup: () => void
  closeProfilePopup: () => void
  closeSettingsPopup: () => void
  selectMovingMessageFolder: (folder: Folder) => void
  cancelMovingMessage: () => void
}

export const StorageSidebar: FC<Props> = memo(({
  folderPopupParams,
  profilePopupVisible,
  settingsPopupVisible,
  movingMessageActive,
  movingMessageLoading,
  setFolderPopupParams,
  setProfilePopupVisible,
  setSettingsPopupVisible,
  closeFolderPopup,
  closeProfilePopup,
  closeSettingsPopup,
  selectMovingMessageFolder,
  cancelMovingMessage
}) => {
  useEffect(() => {
    loadFolders()
  }, [])

  return (
    <SidebarWrapper
      mobileTransparent={movingMessageActive}
    >
      <StorageSidebarFoldersBlock
        mobileTransparent={movingMessageActive}
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

      {movingMessageActive && (
        <StorageSidebarFoldersPopup
          loading={movingMessageLoading}
          onFolderSelect={selectMovingMessageFolder}
          onClose={cancelMovingMessage}
        />
      )}
    </SidebarWrapper>
  )
})
