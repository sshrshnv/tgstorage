import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useAppRender = () => {
  const { appFeatureRendered }: {
    appFeatureRendered: State['appFeatureRendered']
  } = useStoreState(state => ({
    appFeatureRendered: state.appFeatureRendered
  }))

  return useMemo(() => ({
    appFeatureRendered
  }), [appFeatureRendered])
}
