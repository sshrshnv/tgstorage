import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import type { Folder } from '~/core/store'
import { SidebarWrapper } from '~/ui/elements/sidebar-wrapper'

import type { FoldersFormPopupParams } from './storage'
import { StorageSidebarFoldersBlock } from './storage.sidebar-folders-block'
import { StorageSidebarFoldersFormPopup } from './storage.sidebar-folders-form-popup'
import { StorageSidebarFoldersPopup } from './storage.sidebar-folders-popup'
import { StorageSidebarSettingsPopup } from './storage.sidebar-settings-popup'
import { StorageSidebarInstallPopup } from './storage.sidebar-install-popup'
import { StorageSidebarProfilePopup } from './storage.sidebar-profile-popup'

type Props = {
  foldersFormPopupParams: FoldersFormPopupParams
  profilePopupVisible: boolean
  settingsPopupVisible: boolean
  installPopupVisible: boolean
  foldersPopupVisible: boolean
  movingMessageActive: boolean
  movingMessageLoading: boolean
  sharedDataActive: boolean
  setFoldersFormPopupParams: (params: FoldersFormPopupParams) => void
  setProfilePopupVisible: (value: boolean) => void
  setSettingsPopupVisible: (value: boolean) => void
  setInstallPopupVisible: (value: boolean) => void
  closeFoldersFormPopup: () => void
  closeProfilePopup: () => void
  closeSettingsPopup: () => void
  closeInstallPopup: () => void
  selectMovingMessageFolder: (folder: Folder) => void
  cancelMovingMessage: () => void
  selectSharedDataFolder: (folder: Folder) => void
  cancelSharedData: () => void
}

export const StorageSidebar: FC<Props> = memo(({
  foldersFormPopupParams,
  profilePopupVisible,
  settingsPopupVisible,
  installPopupVisible,
  movingMessageActive,
  movingMessageLoading,
  sharedDataActive,
  setFoldersFormPopupParams,
  setProfilePopupVisible,
  setSettingsPopupVisible,
  setInstallPopupVisible,
  closeFoldersFormPopup,
  closeProfilePopup,
  closeSettingsPopup,
  closeInstallPopup,
  selectMovingMessageFolder,
  cancelMovingMessage,
  selectSharedDataFolder,
  cancelSharedData
}) => {
  return (
    <SidebarWrapper
      mobileTransparent={movingMessageActive}
    >
      <StorageSidebarFoldersBlock
        transparent={sharedDataActive}
        mobileTransparent={movingMessageActive}
        setFoldersFormPopupParams={setFoldersFormPopupParams}
        setProfilePopupVisible={setProfilePopupVisible}
        setSettingsPopupVisible={setSettingsPopupVisible}
        setInstallPopupVisible={setInstallPopupVisible}
      />

      {!!foldersFormPopupParams && (
        <StorageSidebarFoldersFormPopup
          params={foldersFormPopupParams}
          onClose={closeFoldersFormPopup}
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

      {installPopupVisible && (
        <StorageSidebarInstallPopup
          onClose={closeInstallPopup}
        />
      )}

      {movingMessageActive && (
        <StorageSidebarFoldersPopup
          loading={movingMessageLoading}
          onFolderSelect={selectMovingMessageFolder}
          onClose={cancelMovingMessage}
          filterActiveFolder
        />
      )}

      {sharedDataActive && (
        <StorageSidebarFoldersPopup
          onFolderSelect={selectSharedDataFolder}
          onClose={cancelSharedData}
        />
      )}
    </SidebarWrapper>
  )
})
