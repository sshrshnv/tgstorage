import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'

import { setAppFeatureRendered } from '~/core/actions'
import { useFolders, useAppInstall } from '~/core/hooks'
import { Sidebar } from '~/ui/elements/sidebar'
import { SidebarHeader } from '~/ui/elements/sidebar-header'
import { SidebarActionButton } from '~/ui/elements/sidebar-action-button'
import { Button } from '~/ui/elements/button'

import type { FoldersFormPopupParams } from './storage'
import { StorageSidebarFoldersList } from './storage.sidebar-folders-list'

type Props = {
  transparent?: boolean
  mobileTransparent?: boolean
  setFoldersFormPopupParams?: (params: FoldersFormPopupParams) => void
  setProfilePopupVisible?: (value: boolean) => void
  setSettingsPopupVisible?: (value: boolean) => void
  setInstallPopupVisible?: (value: boolean) => void
}

export const StorageSidebarFoldersBlock: FC<Props> = memo(({
  transparent,
  mobileTransparent,
  setFoldersFormPopupParams,
  setProfilePopupVisible,
  setSettingsPopupVisible,
  setInstallPopupVisible
}) => {
  const { appInstalled } = useAppInstall()
  const { foldersLoading, foldersCount } = useFolders()

  const openFolderPopup = useCallback(() => {
    setFoldersFormPopupParams?.({
      isInitialFolder: true
    })
  }, [setFoldersFormPopupParams])

  const openProfilePopup = useCallback(() => {
    setProfilePopupVisible?.(true)
  }, [setProfilePopupVisible])

  const openSettingsPopup = useCallback(() => {
    setSettingsPopupVisible?.(true)
  }, [setSettingsPopupVisible])

  const openInstallPopup = useCallback(() => {
    setInstallPopupVisible?.(true)
  }, [setInstallPopupVisible])

  useEffect(() => {
    if (foldersLoading) return
    setAppFeatureRendered()
  }, [foldersLoading])

  return (
    <Sidebar
      disabled={foldersLoading}
      transparent={transparent}
      mobileTransparent={mobileTransparent}
    >
      <SidebarHeader>
        <Button
          icon="user"
          square
          onClick={openProfilePopup}
        />
        <Button
          icon="settings"
          square
          onClick={openSettingsPopup}
        />
        {!appInstalled && (
          <Button
            icon="device"
            square
            onClick={openInstallPopup}
          />
        )}
      </SidebarHeader>

      <SidebarActionButton
        icon={foldersLoading ? 'loader' : 'folder-plus'}
        onClick={foldersLoading ? undefined : openFolderPopup}
      />

      <StorageSidebarFoldersList
        setFoldersFormPopupParams={setFoldersFormPopupParams}
        fakeExample={foldersCount < 2}
      />
    </Sidebar>
  )
})
