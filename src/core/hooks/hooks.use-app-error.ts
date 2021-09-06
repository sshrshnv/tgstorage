import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useAppError = () => {
  const {
    appErrorExists
  }: {
    appErrorExists: State['appErrorExists']
  } = useStoreState(state => ({
    appErrorExists: state.appErrorExists
  }))

  return useMemo(() => ({
    appErrorExists
  }), [appErrorExists])
}
