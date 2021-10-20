import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback, useRef } from 'preact/hooks'
import cn from 'classnames'

import type { Texts, InputFile, MessageMedia } from '~/core/store'
import {
  CHECKLIST_UNCHECKED_MARK,
  checkIsChecklistMessage,
  stringifyChecklistMessage
} from '~/tools/handle-content'
import { ContentFormNote } from '~/ui/elements/content-form-note'
import { ContentFormChecklist } from '~/ui/elements/content-form-checklist'
import { Form } from '~/ui/elements/form'
import { Button } from '~/ui/elements/button'

import styles from './content-form.styl'

type Props = {
  message: {
    id?: number
    text: string
    inputFiles?: InputFile[]
    media?: MessageMedia
  }
  texts: Texts['en']
  loading?: boolean
  onSubmit?: () => void
  onAddFiles?: (fileKeys: string[]) => void
  onRemoveFile?: (inputFile: InputFile) => void
  onReoderFiles?: () => void
  onChangeText?: (note: string) => void
  onCancel?: () => void
}

export const ContentForm: FC<Props> = memo(({
  message,
  texts,
  loading,
  onSubmit,
  onAddFiles,
  onRemoveFile,
  onReoderFiles,
  onChangeText,
  onCancel
}) => {
  const elRef = useRef<HTMLDivElement>(null)

  const isChecklist = useMemo(() => {
    return checkIsChecklistMessage(message.text)
  }, [message.text])

  const filled = useMemo(() => {
    return !!message.text || !!message.inputFiles?.length || !!message.media
  }, [message.text, message.inputFiles?.length, message.media])

  const enableChecklist = useCallback(() => {
    onChangeText?.(stringifyChecklistMessage('', [CHECKLIST_UNCHECKED_MARK]))
  }, [onChangeText])

  return (
    <div
      class={styles.root}
      ref={elRef}
    >
      {filled && (
        <div class={styles.header}>
          {isChecklist ?
            message.id ? texts.checklistEditTitle : texts.checklistTitle :
            message.id ? texts.messageEditTitle : texts.messageTitle
          }
          <Button
            class={styles.button}
            icon="cross"
            onClick={onCancel}
          />
        </div>
      )}
      <Form
        class={cn(
          styles.form,
          filled && styles._vertical
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
          />
        ) : (
          <ContentFormNote
            message={message}
            placeholder={texts.messagePlaceholder}
            sendingPlaceholder={texts.messageSendingPlaceholder}
            loading={loading}
            filled={filled}
            enableChecklist={enableChecklist}
            onChangeText={onChangeText}
            onAddFiles={onAddFiles}
            onRemoveFile={onRemoveFile}
            onReoderFiles={onReoderFiles}
          />
        )}
      </Form>
    </div>
  )
})
