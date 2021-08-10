import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

import { useSettings } from '~/core/hooks'

const htmlEl = self.document.documentElement

export const ApplyTheme: FC = () => {
  const { theme } = useSettings()

  useEffect(() => {
    htmlEl.setAttribute('data-theme', theme)
  }, [theme])

  return null
}
