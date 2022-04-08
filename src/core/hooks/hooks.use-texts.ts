import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import type { TextModules } from '~/texts'
import { useSettings } from '~/core/hooks'

export const useTexts = (module?: TextModules) => {
  const { lang } = useSettings()

  const {
    texts
  }: {
    texts: State['texts']
  } = useStoreState(state => ({
    texts: state.texts
  }))

  return useMemo(() => ({
    texts: (module ? texts[lang][module] : texts[lang]) as Record<string, any>
  }), [lang, module])
}
