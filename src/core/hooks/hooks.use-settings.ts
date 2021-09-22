import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'

export const useSettings = () => {
  const {
    theme,
    locale,
    generalFolderEnabled,
    errorWidgetEnabled,
    installWidgetEnabled
  }: {
    theme: State['settings']['theme']
    locale: State['settings']['locale']
    generalFolderEnabled: State['settings']['generalFolderEnabled']
    errorWidgetEnabled: State['settings']['errorWidgetEnabled']
    installWidgetEnabled: State['settings']['installWidgetEnabled']
  } = useStoreState(state => ({
    theme: state.settings.theme,
    locale: state.settings.locale,
    generalFolderEnabled: state.settings.generalFolderEnabled,
    errorWidgetEnabled: state.settings.errorWidgetEnabled,
    installWidgetEnabled: state.settings.installWidgetEnabled
  }))
  const themeRef = useUpdatableRef(theme)
  const localeRef = useUpdatableRef(locale)
  const generalFolderEnabledRef = useUpdatableRef(generalFolderEnabled)
  const errorWidgetEnabledRef = useUpdatableRef(errorWidgetEnabled)
  const installWidgetEnabledRef = useUpdatableRef(installWidgetEnabled)

  return useMemo(() => ({
    theme,
    themeRef,
    locale,
    localeRef,
    generalFolderEnabled,
    generalFolderEnabledRef,
    errorWidgetEnabled,
    errorWidgetEnabledRef,
    installWidgetEnabled,
    installWidgetEnabledRef
  }), [
    theme,
    locale,
    generalFolderEnabled,
    errorWidgetEnabled,
    installWidgetEnabled
  ])
}
