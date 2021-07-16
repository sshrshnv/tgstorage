import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import { useTexts } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'

type Props = {
  onClose: () => void
}

export const StorageSidebarSettingsPopup: FC<Props> = memo(({
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
})
