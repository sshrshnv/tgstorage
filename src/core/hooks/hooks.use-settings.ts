import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'

export const useSettings = () => {
  const {
    theme,
    lang,
    generalFolderEnabled,
    errorWidgetEnabled,
    errorSendingEnabled,
    installWidgetEnabled
  }: {
    theme: State['settings']['theme']
    lang: State['settings']['lang']
    generalFolderEnabled: State['settings']['generalFolderEnabled']
    errorWidgetEnabled: State['settings']['errorWidgetEnabled']
    errorSendingEnabled: State['settings']['errorSendingEnabled']
    installWidgetEnabled: State['settings']['installWidgetEnabled']
  } = useStoreState(state => ({
    theme: state.settings.theme,
    lang: state.settings.lang,
    generalFolderEnabled: state.settings.generalFolderEnabled,
    errorWidgetEnabled: state.settings.errorWidgetEnabled,
    errorSendingEnabled: state.settings.errorSendingEnabled,
    installWidgetEnabled: state.settings.installWidgetEnabled
  }))
  const themeRef = useUpdatableRef(theme)
  const langRef = useUpdatableRef(lang)
  const generalFolderEnabledRef = useUpdatableRef(generalFolderEnabled)
  const errorWidgetEnabledRef = useUpdatableRef(errorWidgetEnabled)
  const errorSendingEnabledRef = useUpdatableRef(errorSendingEnabled)
  const installWidgetEnabledRef = useUpdatableRef(installWidgetEnabled)

  return useMemo(() => ({
    theme,
    themeRef,
    lang,
    langRef,
    generalFolderEnabled,
    generalFolderEnabledRef,
    errorWidgetEnabled,
    errorWidgetEnabledRef,
    errorSendingEnabled,
    errorSendingEnabledRef,
    installWidgetEnabled,
    installWidgetEnabledRef
  }), [
    theme,
    lang,
    generalFolderEnabled,
    errorWidgetEnabled,
    errorSendingEnabled,
    installWidgetEnabled
  ])
}
