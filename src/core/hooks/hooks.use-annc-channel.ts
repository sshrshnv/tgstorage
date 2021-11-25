import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useAnncChannel = () => {
  const { anncChannelAvailable }: {
    anncChannelAvailable: State['anncChannelAvailable']
  } = useStoreState(state => ({
    anncChannelAvailable: state.anncChannelAvailable
  }))

  return useMemo(() => ({
    anncChannelAvailable
  }), [anncChannelAvailable])
}
