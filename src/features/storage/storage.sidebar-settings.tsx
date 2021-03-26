import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { useTexts } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar'

type Props = {
  onClose: () => void
}

export const StorageSidebarSettings: FC<Props> = ({
  onClose
}) => {
  const { texts } = useTexts('storage')

  return (
    <SidebarPopup
      title={texts.settingsTitle}
      onClose={onClose}
    >

    </SidebarPopup>
  )
}
