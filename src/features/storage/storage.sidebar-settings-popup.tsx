import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useState } from 'preact/hooks'

import { setTheme, setLocale, setGeneralFolder, loadTexts } from '~/core/actions'
import { useTexts, useSettings } from '~/core/hooks'
import { AVALIABLE_LOCALES } from '~/tools/detect-locale'
import { AVALIABLE_THEMES } from '~/ui/styles'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Select } from '~/ui/elements/select'
import { Break } from '~/ui/elements/break'

type Props = {
  onClose: () => void
}

export const StorageSidebarSettingsPopup: FC<Props> = memo(({
  onClose
}) => {
  const { texts } = useTexts('storage')
  const { theme, locale, generalFolder } = useSettings()
  const [localeLoading, setLocaleLoading] = useState(false)

  const themeOptions = useMemo(() => AVALIABLE_THEMES.map(value => ({
    text: `${value.charAt(0).toUpperCase()}${value.slice(1)}`,
    value
  })), [])

  const localeOptions = useMemo(() => AVALIABLE_LOCALES.map(value => ({
    text: `${value.charAt(0).toUpperCase()}${value.slice(1)}`,
    value
  })), [])

  const generalFolderOptions = useMemo(() => [
    { text: texts.settingsFolderTrueLabel, value: 'true' },
    { text: texts.settingsFolderFalseLabel, value: 'false' }
  ], [])

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
    setGeneralFolder(value === 'true')
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

        <Select
          name={texts.settingsFolderLabel}
          label={texts.settingsFolderLabel}
          value={`${generalFolder}`}
          options={generalFolderOptions}
          onSelect={handleChangeGeneralFolderValue}
        />
        <Break size={28} px/>
      </Form>
    </SidebarPopup>
  )
})
