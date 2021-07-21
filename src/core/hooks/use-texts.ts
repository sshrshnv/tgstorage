import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Locales } from '~/core/store'

export const useTexts = (feature?: 'auth'|'storage') => {
  const {
    texts
  }: {
    texts: State['texts'][Locales]
  } = useStoreState(state => ({
    texts: feature ?
      state.texts[state.settings.locale][feature] :
      state.texts[state.settings.locale]
  }))

  return useMemo(() => ({
    texts
  }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [feature])
}
