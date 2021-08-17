import copyTextFallback from 'copy-to-clipboard'

export const COPY_TIMEOUT = 500

export const copyText = (text: string) => {
  if (!self.navigator.clipboard) {
    return copyTextFallback(text)
  }

  return self.navigator.clipboard.writeText(text).catch(() => false)
}
