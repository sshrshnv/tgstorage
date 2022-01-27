import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useEffect } from 'preact/hooks'

import { logOut, loadPhoto } from '~/core/actions'
import { useTexts, useUser } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Button } from '~/ui/elements/button'
import { Input } from '~/ui/elements/input'
import { Avatar } from '~/ui/elements/avatar'
import { Break } from '~/ui/elements/break'

type Props = {
  onClose: () => void
}

export const StorageSidebarProfilePopup: FC<Props> = memo(({
  onClose
}) => {
  const { texts } = useTexts('storage')
  const { user } = useUser()

  useEffect(() => {
    loadPhoto()
  }, [])

  return user ? (
    <SidebarPopup
      title={texts.profileTitle}
      onClose={onClose}
    >
      <Form center>
        <Break size={28} px/>

        <Avatar image={user.photoFile}/>
        <Break size={28} px/>

        <Input
          value={`${user?.firstName}${user?.lastName ? ` ${user?.lastName}` : ''}`}
          label={texts.profileNameLabel}
          disabled
        />
        <Break size={28} px/>

        {user?.username && (
          <Fragment>
            <Input
              value={user.username}
              label={texts.profileUsernameLabel}
              disabled
            />
            <Break size={28} px/>
          </Fragment>
        )}

        {user?.phone && (
          <Fragment>
            <Input
              value={`+${user.phone}`}
              label={texts.profilePhoneLabel}
              disabled
            />
            <Break size={28} px/>
          </Fragment>
        )}

        <Button
          uppercase
          brand
          outline
          onClick={logOut}
        >
          {texts.logOutButton}
        </Button>
        <Break size={28} px/>
      </Form>
    </SidebarPopup>
  ) : null
})
