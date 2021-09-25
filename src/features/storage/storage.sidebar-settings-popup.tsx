import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useState } from 'preact/hooks'

import {
  setTheme, setLocale, setGeneralFolder,
  setErrorWidget, setErrorSending, loadTexts
} from '~/core/actions'
import { useTexts, useSettings } from '~/core/hooks'
import { AVALIABLE_LOCALES } from '~/tools/detect-locale'
import { AVALIABLE_THEMES } from '~/ui/styles'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Select } from '~/ui/elements/select'
import { Switch } from '~/ui/elements/switch'
import { Break } from '~/ui/elements/break'

type Props = {
  onClose: () => void
}

export const StorageSidebarSettingsPopup: FC<Props> = memo(({
  onClose
}) => {
  const { texts } = useTexts('storage')
  const {
    theme, locale, generalFolderEnabled,
    errorWidgetEnabled, errorSendingEnabled
  } = useSettings()
  const [localeLoading, setLocaleLoading] = useState(false)

  const themeOptions = useMemo(() => AVALIABLE_THEMES.map(value => ({
    text: texts[`settingsTheme_${value}`],
    value
  })), [texts.settingsThemeLabel])

  const localeOptions = useMemo(() => AVALIABLE_LOCALES.map(value => ({
    text: texts[`settingsLocale_${value}`],
    value
  })), [texts.settingsLocaleLabel])

  const handleChangeThemeValue = useCallback((theme) => {
    setTheme(theme)
  }, [])

  const handleChangeLocaleValue = useCallback(async (locale) => {
    setLocaleLoading(true)
    await loadTexts(locale)
    setLocale(locale)
    setLocaleLoading(false)
  }, [])

  const handleChangeGeneralFolderValue = useCallback((value) => {
    setGeneralFolder(value)
  }, [])

  const handleChangeErrorWidgetValue = useCallback((value) => {
    setErrorWidget(value)
  }, [])

  const handleChangeErrorSendingValue = useCallback((value) => {
    setErrorSending(value)
  }, [])

  return (
    <SidebarPopup
      title={texts.settingsTitle}
      onClose={onClose}
    >
      <Form center>
        <Break size={28} px/>

        <Select
          name={texts.settingsThemeLabel}
          label={texts.settingsThemeLabel}
          value={theme}
          options={themeOptions}
          onSelect={handleChangeThemeValue}
        />
        <Break size={28} px/>

        <Select
          name={texts.settingsLocaleLabel}
          label={texts.settingsLocaleLabel}
          value={locale}
          options={localeOptions}
          loading={localeLoading}
          onSelect={handleChangeLocaleValue}
        />
        <Break size={28} px/>

        <Switch
          text={texts.settingsFolderText}
          active={generalFolderEnabled}
          onChange={handleChangeGeneralFolderValue}
        />
        <Break size={28} px/>

        <Switch
          text={texts.settingsErrorSendingText}
          active={errorSendingEnabled}
          onChange={handleChangeErrorSendingValue}
        />
        <Break size={28} px/>

        <Switch
          text={texts.settingsErrorWidgetText}
          active={errorWidgetEnabled}
          onChange={handleChangeErrorWidgetValue}
        />
        <Break size={28} px/>
      </Form>
    </SidebarPopup>
  )
})
