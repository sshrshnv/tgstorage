import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo } from 'preact/hooks'
import cn from 'classnames'

import styles from './file-preview-icon.styl'
import { Icon } from '~/ui/elements/icon'

type Props = {
  name?: string
  isAudio?: boolean
  isVideo?: boolean
}

export const FilePreviewIcon: FC<Props> = memo(({
  name,
  isAudio,
  isVideo
}) => {
  const extention = useMemo(() => {
    return name?.split('.').pop() || ''
  }, [name])

  const colorStyle = useMemo(() => {
    if (isAudio) return styles._lightBlue
    if (isVideo) return styles._black
    if (extention === 'pdf') return styles._red
    if (['epub', 'fb2', 'mobi', 'txt'].includes(extention)) return styles._grey
    if (['doc', 'docx', 'odt', 'rtf'].includes(extention)) return styles._blue
    if (extention === 'csv' || extention.startsWith('xl')) return styles._green
  }, [extention, isAudio, isVideo])

  return (
    <div class={cn(
      styles.root,
      colorStyle,
      (isAudio || isVideo) && styles._center
    )}>
      <Icon icon={(isAudio || isVideo) ? 'play' : 'file'}/>
      {(!isAudio && !isVideo) && extention}
    </div>
  )
})
