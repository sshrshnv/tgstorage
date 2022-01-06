import { useMemo } from 'preact/hooks'

import { useSettings } from '~/core/hooks'

export const useTheme = () => {
  const { theme } = useSettings()

  return useMemo(() => ({
    isDark: theme === 'system' ? matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark'
  }), [theme])
}
