import { FILE_SIZE } from '~/tools/handle-file'
import { getChromiumVersion } from '~/tools/detect-platform'

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

export const checkIsSharingSupported = (file?) =>
  !!navigator.share && (!file?.size || (
    file.size <= FILE_SIZE.MB50 &&
    !!navigator.canShare?.({
      files: [new File([new ArrayBuffer(file?.size)], file.name, { type: file.type })]
    }) && (
      ['text', 'image', 'video', 'audio'].includes(file.type?.split('/')?.[0]?.toLowerCase()) ||
      (getChromiumVersion() >= 93 && !!file.type?.endsWith('pdf'))
    )
  ))

export const shareText = (text: string) =>
  navigator.share?.({ text }).catch(() => false)

export const shareLink = (url: string) =>
  navigator.share?.({ url }).catch(() => false)

export const shareFile = (file: File) =>
  navigator.share?.({ files: [file] })
