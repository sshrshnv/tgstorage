import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useAppUpdate = () => {
  const { appUpdateExists, appUpdateAccepted }: {
    appUpdateExists: State['appUpdateExists']
    appUpdateAccepted: State['appUpdateAccepted']
  } = useStoreState(state => ({
    appUpdateExists: state.appUpdateExists,
    appUpdateAccepted: state.appUpdateAccepted
  }))

  return useMemo(() => ({
    appUpdateExists,
    appUpdateAccepted
  }), [appUpdateExists, appUpdateAccepted])
}
