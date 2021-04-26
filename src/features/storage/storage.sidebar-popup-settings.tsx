import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { useTexts } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'

type Props = {
  onClose: () => void
}

export const StorageSidebarPopupSettings: FC<Props> = ({
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
