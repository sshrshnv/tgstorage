import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useAppRoute = () => {
  const { appRoute }: {
    appRoute: State['appRoute']
  } = useStoreState(state => ({
    appRoute: state.appRoute
  }))

  return useMemo(() => ({
    appRoute,
    isIntroAppRoute: !appRoute.startsWith('/app')
  }), [appRoute])
}
