import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'

export const useSettings = () => {
  const { theme, locale, generalFolder }: {
    theme: State['settings']['theme']
    locale: State['settings']['locale']
    generalFolder: State['settings']['generalFolder']
  } = useStoreState(state => ({
    theme: state.settings.theme,
    locale: state.settings.locale,
    generalFolder: state.settings.generalFolder
  }))
  const themeRef = useUpdatableRef(theme)
  const localeRef = useUpdatableRef(locale)
  const generalFolderRef = useUpdatableRef(generalFolder)

  return useMemo(() => ({
    theme,
    themeRef,
    locale,
    localeRef,
    generalFolder,
    generalFolderRef
  }), [theme, locale, generalFolder])
}
