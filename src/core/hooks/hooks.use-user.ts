import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'
import { checkIsLegacyUser } from '~/tools/handle-user'

export const useUser = () => {
  const { user, userLoading }: {
    user: State['user']
    userLoading: State['userLoading']
  } = useStoreState(state => ({
    user: state.user,
    userLoading: state.userLoading
  }))

  const userRef = useUpdatableRef(user)

  return useMemo(() => ({
    user,
    userLoading,
    userRef,
    isLegacyUser: checkIsLegacyUser(user)
  }), [user, userLoading, userRef])
}
