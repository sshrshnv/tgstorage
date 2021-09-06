import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useAppInstall = () => {
  const {
    appInstallAvailable,
    appInstalled
  }: {
    appInstallAvailable: State['appInstallAvailable']
    appInstalled: State['appInstalled']
  } = useStoreState(state => ({
    appInstallAvailable: state.appInstallAvailable,
    appInstalled: state.appInstalled
  }))

  return useMemo(() => ({
    appInstallAvailable,
    appInstalled
  }), [appInstallAvailable, appInstalled])
}
