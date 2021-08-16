import { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { useRef, useEffect, useCallback, useMemo } from 'preact/hooks'
import cn from 'classnames'

import { useRAFCallback, useCallbackRef, useUpdatableRef, useStateRef } from '~/tools/hooks'
import { normalizeUrl } from '~/tools/normalize-url'
import { moveCursorToEnd } from '~/tools/manipulate-element'
import { Textarea } from '~/ui/elements/textarea'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'
import { LinkIcon, CheckIcon } from '~/ui/icons'

import styles from './content-form-input.styl'

type Props = {
  value?: string
  placeholder?: string
  disabled?: boolean
  filled?: boolean
  onInput?: (value: string) => void
}

const TEXTAREA_PARENT_HEIGHT = 48
const TEXTAREA_HEIGHT = 22
const START_URL = 'https://'

export const ContentFormInput: FC<Props> = ({
  value = '',
  placeholder,
  disabled,
  filled,
  onInput
}) => {
  const [hasSelection, setHasSelection, hasSelectionRef] = useStateRef(false)
  const [urlVisible, setUrlVisible, _urlVisibleRef, setUrlVisibleRef] = useStateRef(false)
  const [urlValue, setUrlValue, urlValueRef, setUrlValueRef] = useStateRef(START_URL)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formattingRef = useRef<HTMLDivElement>(null)
  const onInputRef = useUpdatableRef(onInput)

  const [_setStyles, setStylesRef, cancelSetStylesRef] = useRAFCallback((textareaRef) => {
    const textareaEl = textareaRef?.current
    const textareaParentEl = textareaEl?.parentElement
    if (!textareaParentEl) return

    textareaParentEl.style.height = `${TEXTAREA_PARENT_HEIGHT}px`
    const scrollHeight = Math.round(textareaEl.scrollHeight / TEXTAREA_HEIGHT) * TEXTAREA_HEIGHT
    textareaParentEl.style.height = `${TEXTAREA_PARENT_HEIGHT - TEXTAREA_HEIGHT + scrollHeight}px`
  }, [])

  const [_cancelSelection, cancelSelectionRef] = useCallbackRef(() => {
    self.getSelection()?.removeAllRanges()
    setHasSelection(false)
    setUrlVisible(false)
    setUrlValue(START_URL)
    moveCursorToEnd(textareaRef.current)
  }, [setHasSelection, setUrlVisible])

  const [_formatSelection, formatSelectionRef] = useCallbackRef((before, after = '') => {
    const textareaEl = textareaRef?.current
    const start = textareaEl?.selectionStart || 0
    const end = textareaEl?.selectionEnd || 0
    const selectedText = textareaEl?.value.substring(start, end)

    if (textareaEl && selectedText) {
      textareaEl.setRangeText(`${before}${selectedText}${after || before}`, start, end, 'end')
      onInputRef.current?.(textareaEl.value)
    }
    cancelSelectionRef.current()
  }, [])

  const handleStartSelection = useCallback(() => {
    const textareaEl = textareaRef?.current
    const start = textareaEl?.selectionStart || 0
    const end = textareaEl?.selectionEnd || 0

    if (start !== end) {
      setHasSelection(true)
    }
  }, [setHasSelection])

  const handleBoldFormatting = useCallback(() => {
    formatSelectionRef.current('**')
  }, [])

  const handleItalicFormatting = useCallback(() => {
    formatSelectionRef.current('__')
  }, [])

  const handleUnderlineFormatting = useCallback(() => {
    formatSelectionRef.current('++')
  }, [])

  const handleStrikethroughFormatting = useCallback(() => {
    formatSelectionRef.current('~~')
  }, [])

  const handleMonospaceFormatting = useCallback(() => {
    formatSelectionRef.current('```')
  }, [])

  const handleLinkFormatting = useCallback(() => {
    setUrlVisibleRef.current(true)
  }, [])

  const handleUrlInput = useCallback(value => {
    value = normalizeUrl(value)
    setUrlValueRef.current(value)
    return value
  }, [])

  const handleLinkInserting = useCallback(() => {
    formatSelectionRef.current('[', `](${urlValueRef.current})`)
  }, [])

  const formattingItems = useMemo(() => [{
    type: 'b',
    handler: handleBoldFormatting
  }, {
    type: 'i',
    handler: handleItalicFormatting
  }, {
    type: 'u',
    handler: handleUnderlineFormatting
  }, {
    type: 's',
    handler: handleStrikethroughFormatting
  }, {
    type: 'm',
    handler: handleMonospaceFormatting
  }, {
    type: 'link',
    icon: <LinkIcon/>,
    handler: handleLinkFormatting
  }], [
    handleBoldFormatting,
    handleItalicFormatting,
    handleUnderlineFormatting,
    handleStrikethroughFormatting,
    handleMonospaceFormatting
  ])

  const prevent = useCallback(ev => {
    ev.stopPropagation()
  }, [])

  useEffect(() => {
    setStylesRef.current(textareaRef)
  }, [value])

  useEffect(() => {
    if (!filled) return
    textareaRef.current?.focus()
  }, [filled])

  useEffect(() => {
    if (!hasSelection) return
    const formattingEl = formattingRef.current
    const cancelSelection = () => cancelSelectionRef.current()

    formattingEl?.addEventListener('mousedown', prevent, { passive: true })
    formattingEl?.addEventListener('touchstart', prevent, { passive: true })
    self.document.addEventListener('mousedown', cancelSelection, { passive: true })
    self.document.addEventListener('touchstart', cancelSelection, { passive: true })
    return () => {
      formattingEl?.removeEventListener('mousedown', prevent)
      formattingEl?.removeEventListener('touchstart', prevent)
      self.document.removeEventListener('mousedown', cancelSelection)
      self.document.removeEventListener('touchstart', cancelSelection)
    }
  }, [hasSelection])

  useEffect(() => {
    if (!value && hasSelectionRef.current) {
      cancelSelectionRef.current()
    }
  }, [value])

  useEffect(() => () => {
    cancelSetStylesRef.current?.()
  }, [])

  return (
    <Fragment>
      <Textarea
        class={styles.textarea}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        textareaRef={textareaRef}
        maxLength={4050}
        onInput={onInput}
        onStartSelection={handleStartSelection}
      />
      <div
        class={cn(
          styles.formatting,
          hasSelection && styles._visible
        )}
        ref={formattingRef}
      >
        {!urlVisible && formattingItems.map(({ icon, type, handler }) => (
          <Button
            key={type}
            class={cn(
              styles.formattingButton,
              type && styles[`_${type}`]
            )}
            square
            onClick={handler}
          >
            {icon || type}
          </Button>
        ))}
        {urlVisible && (
          <div class={styles.linkWrapper}>
            <Input
              class={styles.linkInput}
              value={urlValue}
              placeholder={START_URL}
              border={false}
              autoFocus
              clear
              onInput={handleUrlInput}
            />
            <Button
              class={styles.linkButton}
              icon={<CheckIcon/>}
              square
              onClick={handleLinkInserting}
            />
          </div>
        )}
      </div>
    </Fragment>
  )
}
