import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

import { useSettings } from '~/core/hooks'

const htmlEl = self.document.documentElement

export const ApplyLang: FC = () => {
  const { lang } = useSettings()

  useEffect(() => {
    htmlEl.setAttribute('lang', lang)
  }, [lang])

  return null
}
