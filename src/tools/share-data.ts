type ShareData = {
  title?: string
  text?: string
  url?: string
  files?: File[]
}

interface Navigator {
  share?: (data: ShareData) => Promise<void>
  canShare?: (data?: ShareData) => boolean
}

const navigator = self.navigator as Navigator

export const IS_SHARE_SUPPORTED = !!self.navigator.share

export const shareText = (text: string) =>
  navigator.share?.({ text }).catch(() => false)

export const shareLink = (url: string) =>
  navigator.share?.({ url }).catch(() => false)

export const shareFile = (file: File) =>
  navigator.share?.({ files: [file] })
