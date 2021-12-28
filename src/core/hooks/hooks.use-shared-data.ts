import { useCallback, useMemo, useState, useEffect } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Folder } from '~/core/store'
import { setActiveFolder, setSharedData } from '~/core/actions'

type Params = {
  setFoldersPopupVisible: (value: boolean) => void
}

export const useSharedData = ({
  setFoldersPopupVisible
}: Params) => {
  const {
    sharedData,
    activeFolderId
  } : {
    sharedData: State['sharedData']
    activeFolderId: State['activeFolderId']
  } = useStoreState(state => ({
    sharedData: state.sharedData,
    activeFolderId: state.activeFolderId
  }))
  const active = !!sharedData
  const [selectedFolderId, setSelectedFolderId] = useState('')

  const selectSharedDataFolder = useCallback(async (folder: Folder) => {
    self.history.back()
    setActiveFolder(folder.id)
    setSelectedFolderId(folder.id)
  }, [setSelectedFolderId])

  const cancelSharedData = useCallback(() => {
    setFoldersPopupVisible(false)
    setSharedData(null)
  }, [setFoldersPopupVisible, setSelectedFolderId])

  useEffect(() => {
    setSelectedFolderId('')
  }, [sharedData])

  return useMemo(() => ({
    sharedData: selectedFolderId === activeFolderId ? sharedData : null,
    active,
    selectSharedDataFolder,
    cancelSharedData
  }), [
    sharedData,
    active,
    selectedFolderId,
    activeFolderId,
    selectSharedDataFolder,
    cancelSharedData
  ])
}
