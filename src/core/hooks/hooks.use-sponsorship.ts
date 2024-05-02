import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useSponsorship = () => {
  const { sponsorshipAvailable }: {
    sponsorshipAvailable: State['sponsorshipAvailable']
  } = useStoreState(state => ({
    sponsorshipAvailable: state.sponsorshipAvailable
  }))

  return useMemo(() => ({
    sponsorshipAvailable
  }), [sponsorshipAvailable])
}
