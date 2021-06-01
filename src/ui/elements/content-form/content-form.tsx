import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo, useCallback, useRef } from 'preact/hooks'
import cn from 'classnames'

import type { Texts } from '~/core/store'
import {
  CHECKLIST_UNCHECKED_MARK,
  checkIsChecklist,
  stringifyChecklist
} from '~/tools/handle-checklist'
import { Form } from '~/ui/elements/form'
import { Button } from '~/ui/elements/button'
import { CrossIcon } from '~/ui/icons'

import { ContentFormNote } from './content-form-note'
import { ContentFormChecklist } from './content-form-checklist'
import styles from './content-form.styl'

type Props = {
  message: {
    id?: number
    text: string
  }
  texts: Texts['en']
  loading?: boolean
  onSubmit?: () => void
  onAddFiles?: (files: File[]) => void
  onChangeText?: (note: string) => void
  onCancelEdit?: () => void
}

export const ContentForm: FC<Props> = ({
  message,
  texts,
  loading,
  onSubmit,
  onAddFiles,
  onChangeText,
  onCancelEdit
}) => {
  const isChecklist = useMemo(() => {
    return checkIsChecklist(message.text)
  }, [message.text])

  const elRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    elRef?.current?.scrollTo(0, elRef.current.offsetHeight)
  }, [elRef])

  const enableChecklist = useCallback(() => {
    onChangeText?.(stringifyChecklist('', [CHECKLIST_UNCHECKED_MARK]))
  }, [onChangeText])

  return (
    <div
      class={styles.root}
      ref={elRef}
    >
      {message.text && (
        <div class={styles.header}>
          {isChecklist ?
            message.id ? texts.checklistEditTitle : texts.checklistTitle :
            message.id ? texts.noteEditTitle : texts.noteTitle
          }
          <Button
            class={cn(
              styles.button,
              styles._header,
              styles._small
            )}
            icon={<CrossIcon/>}
            onClick={onCancelEdit}
          />
        </div>
      )}
      <Form
        class={styles.form}
        onSubmit={onSubmit}
      >
        { isChecklist ? (
          <ContentFormChecklist
            text={message.text}
            titlePlaceholder={texts.checklistTitlePlaceholder}
            itemPlaceholder={texts.checklistItemPlaceholder}
            loading={loading}
            onChangeText={onChangeText}
            onSubmit={onSubmit}
            scrollToBottom={scrollToBottom}
          />
        ) : (
          <ContentFormNote
            message={message}
            placeholder={texts.notePlaceholder}
            loading={loading}
            enableChecklist={enableChecklist}
            onChangeText={onChangeText}
            onAddFiles={onAddFiles}
          />
        )}
      </Form>
    </div>
  )
}
