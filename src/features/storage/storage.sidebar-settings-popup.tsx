import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useState } from 'preact/hooks'

import {
  setTheme, setLang, setGeneralFolder,
  setErrorWidget, setErrorSending, loadTexts
} from '~/core/actions'
import { useTexts, useSettings } from '~/core/hooks'
import { LANGS, LANG_NAMES } from '~/tools/detect-lang'
import { AVAILABLE_THEMES } from '~/ui/styles'
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
    theme, lang, generalFolderEnabled,
    errorWidgetEnabled, errorSendingEnabled
  } = useSettings()
  const [langLoading, setLangLoading] = useState(false)

  const themeOptions = useMemo(() => AVAILABLE_THEMES.map(value => ({
    text: texts[`settingsTheme_${value}`],
    value
  })), [texts.settingsThemeLabel])

  const langOptions = useMemo(() => LANGS.map(value => ({
    text: LANG_NAMES[value].name,
    value
  })), [])

  const handleChangeThemeValue = useCallback((theme) => {
    setTheme(theme)
  }, [])

  const handleChangeLangValue = useCallback(async (lang) => {
    setLangLoading(true)
    await loadTexts(lang)
    setLang(lang)
    setLangLoading(false)
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
          name={texts.settingsLangLabel}
          label={texts.settingsLangLabel}
          value={lang}
          options={langOptions}
          loading={langLoading}
          onSelect={handleChangeLangValue}
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
