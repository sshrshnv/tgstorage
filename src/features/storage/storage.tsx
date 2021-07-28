import { proxy } from 'comlink'
import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useState, useCallback, useEffect } from 'preact/hooks'

import type { Folder } from '~/core/store'
import { setUpdates } from '~/core/actions'
import { useMoveMessage } from '~/core/hooks'
import { api } from '~/api'
import { Layout } from '~/ui/elements/layout'

import { StorageSidebar } from './storage.sidebar'
import { StorageContent } from './storage.content'

export type FolderPopupParams = {
  folder?: Folder
  category?: string
  isInitialFolder?: boolean
  isEditFolder?: boolean
  isEditCategory?: boolean
} | null

const Storage: FC = () => {
  const [folderPopupParams, setFolderPopupParams] = useState<FolderPopupParams>(null)
  const [foldersPopupVisible, setFoldersPopupVisible] = useState(false)
  const [profilePopupVisible, setProfilePopupVisible] = useState(false)
  const [settingsPopupVisible, setSettingsPopupVisible] = useState(false)

  const {
    loading: movingMessageLoading,
    setMovingMessage,
    selectMovingMessageFolder,
    cancelMovingMessage
  } = useMoveMessage({
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

  useEffect(() => {
    api.listenUpdates(proxy(setUpdates))
  }, [])

  return (
    <Layout>
      <StorageSidebar
        folderPopupParams={folderPopupParams}
        profilePopupVisible={profilePopupVisible}
        settingsPopupVisible={settingsPopupVisible}
        setFolderPopupParams={setFolderPopupParams}
        setProfilePopupVisible={setProfilePopupVisible}
        setSettingsPopupVisible={setSettingsPopupVisible}
        closeFolderPopup={closeFolderPopup}
        closeProfilePopup={closeProfilePopup}
        closeSettingsPopup={closeSettingsPopup}
        movingMessageActive={foldersPopupVisible}
        movingMessageLoading={movingMessageLoading}
        selectMovingMessageFolder={selectMovingMessageFolder}
        cancelMovingMessage={cancelMovingMessage}
      />
      <StorageContent
        movingMessageActive={foldersPopupVisible}
        setMovingMessage={setMovingMessage}
      />
    </Layout>
  )
}

export default Storage
