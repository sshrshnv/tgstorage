import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'

export const useSettings = () => {
  const { locale }: {
    locale: State['settings']['locale']
  } = useStoreState(state => ({
    locale: state.settings.locale
  }))
  const localeRef = useUpdatableRef(locale)

  return useMemo(() => ({
    locale,
    localeRef
  }), [locale, localeRef])
}
