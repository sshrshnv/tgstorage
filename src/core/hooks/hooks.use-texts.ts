import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useSettings } from '~/core/hooks'

export const useTexts = (feature?: 'intro'|'auth'|'storage'|'widgets') => {
  const { locale } = useSettings()

  const {
    texts
  }: {
    texts: State['texts']
  } = useStoreState(state => ({
    texts: state.texts
  }))

  return useMemo(() => ({
    texts: (feature ? texts[locale][feature] : texts[locale]) as Record<string, string>
  }), [locale, feature])
}
