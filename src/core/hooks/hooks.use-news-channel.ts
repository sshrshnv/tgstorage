import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useNewsChannel = () => {
  const { newsChannelAvailable }: {
    newsChannelAvailable: State['newsChannelAvailable']
  } = useStoreState(state => ({
    newsChannelAvailable: state.newsChannelAvailable
  }))

  return useMemo(() => ({
    newsChannelAvailable
  }), [newsChannelAvailable])
}
