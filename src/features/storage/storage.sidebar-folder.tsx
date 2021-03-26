import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { useTexts } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar'
import { Form } from '~/ui/elements/form'
import { Select } from '~/ui/elements/select'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'
import { Break } from '~/ui/elements/break'

type Props = {
  onClose: () => void
}

export const StorageSidebarFolder: FC<Props> = ({
  onClose
}) => {
  const { texts } = useTexts('storage')

  return (
    <SidebarPopup
      title={texts.folderFormTitle}
      onClose={onClose}
    >
      <Form center>
        <Break size={28} px/>
        <Select
          label={texts.categoryLabel}
          value=""
          options={[
            { text: 'General', value: ''},
            { text: 'New category', value: 'new'},
          ]}
        />

        <Break size={28} px/>
        <Input
          label={texts.folderNameLabel}
        />

        <Break size={28} px/>
        <Button brand>

        </Button>
      </Form>
    </SidebarPopup>
  )
}
