import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { Button } from '~/ui/elements/button'
import { Textarea } from '~/ui/elements/textarea'
import { SendIcon, PlusIcon } from '~/ui/icons'

import styles from './content-form.styl'

type Props = {

}

export const ContentFormChecklist: FC<Props> = () => {
  return (
    <div
      class={styles.form}
    >
      <Button
        class={styles.button}
        icon={<PlusIcon/>}
      />
      <Textarea
        class={styles.textarea}
        //placeholder={placeholder}
        //onInput={handleInput}
      />
      <Button
        class={styles.button}
        icon={<SendIcon/>}
      />
    </div>
  )
}
