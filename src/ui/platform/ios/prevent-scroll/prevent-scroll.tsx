import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

import './prevent-scroll.styl'

export const PreventScroll: FC = () => {
  useEffect(() => {
    self.document.body.classList.add('preventScroll')
  }, [])

  return null
}
