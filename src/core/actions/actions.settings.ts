import type { Settings, Theme, Lang } from '~/core/store'
import { store } from '~/core/store'
import { dataCache } from '~/core/cache'

export const setSettings = (
  partialSettings: Partial<Settings>
) => {
  const storeSettings = store.getState().settings
  const settings = {
    ...storeSettings,
    ...partialSettings
  }
  store.setState({ settings })
  dataCache.setSettings(settings)
}

export const getTheme = () =>
  store.getState().settings.theme

export const setTheme = (theme: Theme) =>
  setSettings({ theme })

export const getLang = () =>
  store.getState().settings.lang

export const getErrorSending = () =>
  store.getState().settings.errorSendingEnabled

export const setLang = (lang: Lang) =>
  setSettings({ lang })

export const setGeneralFolder = (value: boolean) =>
  setSettings({ generalFolderEnabled: value })

export const setErrorWidget = (value: boolean) =>
  setSettings({ errorWidgetEnabled: value })

export const setErrorSending = (value: boolean) =>
  setSettings({ errorSendingEnabled: value })

export const setInstallWidget = (value: boolean) =>
  setSettings({ installWidgetEnabled: value })
