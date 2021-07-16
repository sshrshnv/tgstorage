import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import { logOut } from '~/core/actions'
import { useTexts } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Button } from '~/ui/elements/button'
import { Break } from '~/ui/elements/break'

type Props = {
  onClose: () => void
}

export const StorageSidebarProfilePopup: FC<Props> = memo(({
  onClose
}) => {
  const { texts } = useTexts('storage')

  return (
    <SidebarPopup
      title={texts.profileTitle}
      onClose={onClose}
    >
      <Form center>
        <Break size={28} px/>
        <Button
          brand
          outline
          onClick={logOut}
        >
          {texts.logOutButton}
        </Button>
      </Form>
    </SidebarPopup>
  )
})
