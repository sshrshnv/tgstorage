import { FunctionComponent as FC, RefObject } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback, useState } from 'preact/hooks'

import { setLang, loadTexts } from '~/core/actions'
import { useSettings } from '~/core/hooks'
import { LANGS, LANG_NAMES } from '~/tools/detect-lang'
import { Menu } from '~/ui/elements/menu'
import { Loader } from '~/ui/elements/loader'

import styles from './lang-menu.styl'

type Props = {
  layoutRef?: RefObject<HTMLDivElement>
}

export const LangMenu: FC<Props> = memo(({
  layoutRef
}) => {
  const { lang } = useSettings()
  const [langLoading, setLangLoading] = useState(false)

  const handleEdit = useCallback(async (lang) => {
    setLangLoading(true)
    await loadTexts(lang)
    setLang(lang)
    setLangLoading(false)
  }, [])

  const menu = useMemo(() => ({
    items: LANGS.map(l => ({
      icon: l === lang ? 'radio-on' : 'radio-off',
      title: LANG_NAMES[l].name,
      onClick: () => handleEdit(l)
    }))
  }), [lang, handleEdit])

  return langLoading ? (
    <Loader
      class={styles.loader}
      grey
    />
  ) : (
    <Menu
      {...menu}
      class={styles.root}
      icon="lang"
      layoutRef={layoutRef}
    />
  )
})
