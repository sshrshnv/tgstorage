import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useUser = () => {
  const { user, userLoading }: {
    user: State['user']
    userLoading: State['userLoading']
  } = useStoreState(state => ({
    user: state.user,
    userLoading: state.userLoading
  }))

  return useMemo(() => ({
    user,
    userLoading
  }), [user, userLoading])
}
