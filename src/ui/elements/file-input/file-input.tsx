import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback } from 'preact/hooks'
import cn from 'classnames'

import { AttachIcon } from '~/ui/icons'

import styles from './file-input.styl'

type Props = {
  class?: string
  onChange?: (files: File[]) => void
}

export const FileInput: FC<Props> = ({
  class: className,
  onChange
}) => {
  const handleChange = useCallback((ev) => {
    const files: File[] = [...ev.target.files]
    onChange?.(files)
  }, [onChange])

  return (
    <label class={cn(
      styles.root,
      className
    )}>
      <input
        class={styles.input}
        type="file"
        multiple
        onChange={handleChange}
      />
      <AttachIcon/>
    </label>
  )
}
