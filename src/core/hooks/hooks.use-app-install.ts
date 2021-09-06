import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useAppInstall = () => {
  const {
    appInstallAvailable
  }: {
    appInstallAvailable: State['appInstallAvailable']
  } = useStoreState(state => ({
    appInstallAvailable: state.appInstallAvailable
  }))

  return useMemo(() => ({
    appInstallAvailable
  }), [appInstallAvailable])
}
