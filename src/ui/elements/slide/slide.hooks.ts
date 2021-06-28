import { useCallback, useMemo } from 'preact/hooks'

export const useSlide = () => {
  const closeSlide = useCallback(() => {
    self.history.back()
  }, [])

  return useMemo(() => ({
    closeSlide
  }), [])
}
