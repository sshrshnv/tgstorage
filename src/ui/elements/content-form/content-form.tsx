import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo, useCallback, useRef } from 'preact/hooks'
import cn from 'classnames'

import type { Texts, InputFile } from '~/core/store'
import {
  CHECKLIST_UNCHECKED_MARK,
  checkIsChecklistMessage,
  stringifyChecklistMessage
} from '~/tools/handle-content'
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
    files?: InputFile[]
  }
  texts: Texts['en']
  loading?: boolean
  onSubmit?: () => void
  onAddFiles?: (files: File[]) => void
  onRemoveFile?: (file: InputFile) => void
  onChangeText?: (note: string) => void
  onCancelEdit?: () => void
}

export const ContentForm: FC<Props> = ({
  message,
  texts,
  loading,
  onSubmit,
  onAddFiles,
  onRemoveFile,
  onChangeText,
  onCancelEdit
}) => {
  const isChecklist = useMemo(() => {
    return checkIsChecklistMessage(message.text)
  }, [message.text])

  const isFilled = useMemo(() => {
    return !!message.text || !!message.files?.length
  }, [message.text, message.files?.length])

  const elRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    elRef?.current?.scrollTo(0, elRef.current.offsetHeight)
  }, [elRef])

  const enableChecklist = useCallback(() => {
    onChangeText?.(stringifyChecklistMessage('', [CHECKLIST_UNCHECKED_MARK]))
  }, [onChangeText])

  return (
    <div
      class={styles.root}
      ref={elRef}
    >
      {isFilled && (
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
        class={cn(
          styles.form,
          !isChecklist && isFilled && styles._vertical
        )}
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
            onRemoveFile={onRemoveFile}
          />
        )}
      </Form>
    </div>
  )
}
