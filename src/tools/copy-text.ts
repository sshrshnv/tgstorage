export const COPY_TIMEOUT = 500

export const copyText = (text: string) => {
  if (!self.navigator.clipboard) {
    return copyTextFallback(text)
  }

  return self.navigator.clipboard.writeText(text).catch(() => false)
}

const copyTextFallback = (text: string) => {
  const textarea = self.document.createElement('textarea')
  textarea.style.position = 'absolute'
  textarea.style.zIndex = '-1'
  textarea.style.clip = 'rect(0, 0, 0, 0)'
  textarea.style.width = '0px'
  textarea.style.height = '0px'
  textarea.style.overflow = 'hidden'
  textarea.value = text

  self.document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  let result = true

  try {
    result = document.execCommand('copy')
  } catch (err) {
    result = false
  }

  self.document.removeChild(textarea)
  textarea.remove()
  return result
}
