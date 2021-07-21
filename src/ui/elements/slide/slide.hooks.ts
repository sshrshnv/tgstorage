import { useMemo } from 'preact/hooks'

import { useCallbackRef } from '~/tools/hooks'

export const useSlide = () => {
  const [closeSlide, closeSlideRef] = useCallbackRef(() => {
    self.history.back()
  }, [])

  return useMemo(() => ({
    closeSlide,
    closeSlideRef
  }), [closeSlide, closeSlideRef])
}
