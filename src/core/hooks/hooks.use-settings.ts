import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'

export const useSettings = () => {
  const { theme, locale, generalFolderEnabled, errorWidgetEnabled }: {
    theme: State['settings']['theme']
    locale: State['settings']['locale']
    generalFolderEnabled: State['settings']['generalFolderEnabled']
    errorWidgetEnabled: State['settings']['generalFolderEnabled']
  } = useStoreState(state => ({
    theme: state.settings.theme,
    locale: state.settings.locale,
    generalFolderEnabled: state.settings.generalFolderEnabled,
    errorWidgetEnabled: state.settings.errorWidgetEnabled,
  }))
  const themeRef = useUpdatableRef(theme)
  const localeRef = useUpdatableRef(locale)
  const generalFolderEnabledRef = useUpdatableRef(generalFolderEnabled)
  const errorWidgetEnabledRef = useUpdatableRef(errorWidgetEnabled)

  return useMemo(() => ({
    theme,
    themeRef,
    locale,
    localeRef,
    generalFolderEnabled,
    generalFolderEnabledRef,
    errorWidgetEnabled,
    errorWidgetEnabledRef
  }), [theme, locale, generalFolderEnabled, errorWidgetEnabled])
}
