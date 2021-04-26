import { useCallback, useMemo } from 'preact/hooks'

export const useSlide = () => {
  const closeSlide = useCallback(() => {
    history.back()
  }, [])

  return useMemo(() => ({
    closeSlide
  }), [])
}
