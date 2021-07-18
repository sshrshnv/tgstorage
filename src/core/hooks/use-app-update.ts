import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useAppUpdate = () => {
  const { appUpdateExist, appUpdateAccepted }: {
    appUpdateExist: State['appUpdateExist']
    appUpdateAccepted: State['appUpdateAccepted']
  } = useStoreState(state => ({
    appUpdateExist: state.appUpdateExist,
    appUpdateAccepted: state.appUpdateAccepted
  }))

  return useMemo(() => ({
    appUpdateExist,
    appUpdateAccepted
  }), [appUpdateExist, appUpdateAccepted])
}
