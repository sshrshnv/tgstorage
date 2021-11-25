import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useState, useCallback, useEffect } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { resetFiles } from '~/core/cache'
import { loadFolders, listenUpdates, listenApiErrors, checkAnncChannelJoining } from '~/core/actions'
import { useMoveMessage, useSharedData } from '~/core/hooks'
import { Layout } from '~/ui/elements/layout'

import { StorageSidebar } from './storage.sidebar'
import { StorageContent } from './storage.content'
import { StorageListeners } from './storage.listeners'

export type FolderPopupParams = {
  folder?: Folder
  category?: string
  isInitialFolder?: boolean
  isEditFolder?: boolean
  isEditCategory?: boolean
} | null

const Storage: FC = memo(() => {
  const [folderPopupParams, setFolderPopupParams] = useState<FolderPopupParams>(null)
  const [foldersPopupVisible, setFoldersPopupVisible] = useState(false)
  const [profilePopupVisible, setProfilePopupVisible] = useState(false)
  const [settingsPopupVisible, setSettingsPopupVisible] = useState(false)
  const [installPopupVisible, setInstallPopupVisible] = useState(false)

  const {
    active: movingMessageActive,
    loading: movingMessageLoading,
    setMovingMessage,
    selectMovingMessageFolder,
    cancelMovingMessage
  } = useMoveMessage({
    setFoldersPopupVisible
  })

  const {
    sharedData,
    active: sharedDataActive,
    selectSharedDataFolder,
    cancelSharedData
  } = useSharedData({
    setFoldersPopupVisible
  })

  const closeFolderPopup = useCallback(() => {
    setFolderPopupParams(null)
  }, [setFolderPopupParams])

  const closeProfilePopup = useCallback(() => {
    setProfilePopupVisible(false)
  }, [setProfilePopupVisible])

  const closeSettingsPopup = useCallback(() => {
    setSettingsPopupVisible(false)
  }, [setSettingsPopupVisible])

  const closeInstallPopup = useCallback(() => {
    setInstallPopupVisible(false)
  }, [setInstallPopupVisible])

  useEffect(() => {
    listenApiErrors()
    loadFolders()
    listenUpdates()
    checkAnncChannelJoining({ timeout: true })
    self.addEventListener('unload', resetFiles, { passive: true })
    return () => self.removeEventListener('unload', resetFiles)
  }, [])

  return (
    <Layout outer>
      <StorageSidebar
        folderPopupParams={folderPopupParams}
        profilePopupVisible={profilePopupVisible}
        settingsPopupVisible={settingsPopupVisible}
        installPopupVisible={installPopupVisible}
        foldersPopupVisible={foldersPopupVisible}
        setFolderPopupParams={setFolderPopupParams}
        setProfilePopupVisible={setProfilePopupVisible}
        setSettingsPopupVisible={setSettingsPopupVisible}
        setInstallPopupVisible={setInstallPopupVisible}
        closeFolderPopup={closeFolderPopup}
        closeProfilePopup={closeProfilePopup}
        closeSettingsPopup={closeSettingsPopup}
        closeInstallPopup={closeInstallPopup}
        movingMessageActive={movingMessageActive}
        movingMessageLoading={movingMessageLoading}
        selectMovingMessageFolder={selectMovingMessageFolder}
        cancelMovingMessage={cancelMovingMessage}
        sharedDataActive={sharedDataActive}
        selectSharedDataFolder={selectSharedDataFolder}
        cancelSharedData={cancelSharedData}
      />
      <StorageContent
        movingMessageActive={movingMessageActive}
        setMovingMessage={setMovingMessage}
        sharedData={sharedData}
        sharedDataActive={sharedDataActive}
      />

      <StorageListeners/>
    </Layout>
  )
})

export default Storage
