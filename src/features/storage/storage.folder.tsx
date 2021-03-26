import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { Text } from '~/ui/elements/text'

type Props = {
  id: number
  title: string
}

export const StorageFolder: FC<Props> = ({
  id,
  title
}) => {
  return (
    <div>
      <Text>{title}</Text>
    </div>
  )
}
