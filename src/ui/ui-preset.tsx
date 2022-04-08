import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useEffect } from 'preact/hooks'

import { setTexts } from '~/core/actions'
import { useSettings } from '~/core/hooks'
import { PlatformLazy } from './platform'
import {
  PreventContextMenu, PreventScale, PreventDragAndDrop,
  ApplyTheme, ApplyLang
} from '~/ui/handlers'

export const UIPreset: FC = memo(() => {
  const { lang } = useSettings()

  useEffect(() => {
    const loadTexts = async () => {
      const texts = await import(`~/texts/${lang}/texts.elements.json`)
      setTexts(lang, { elements: texts.default })
    }
    loadTexts()
  }, [])

  return (
    <Fragment>
      <ApplyTheme/>
      <ApplyLang/>

      <PreventContextMenu/>
      <PreventScale/>
      <PreventDragAndDrop/>

      <PlatformLazy/>
    </Fragment>
  )
})
