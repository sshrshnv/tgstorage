import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

import { useSettings } from '~/core/hooks'

const htmlEl = self.document.documentElement

export const ApplyLocale: FC = () => {
  const { locale } = useSettings()

  useEffect(() => {
    htmlEl.setAttribute('lang', locale)
  }, [locale])

  return null
}
