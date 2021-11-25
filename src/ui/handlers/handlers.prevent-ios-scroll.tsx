import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

export const PreventIOSScroll: FC = () => {
  useEffect(() => {
    self.document.body.classList.add('ios')
  }, [])

  return null
}
