import latinize from 'latinize'

import type { DownloadingFile } from '~/core/store'
import { setFile, getFileUrl } from '~/core/cache'

const SW_STREAM_PATH = '/sw/stream'
const SW_SAVE_PATH = '/sw/save'

export const FILE_SIZE = {
  KB64: 65536,
  KB128: 131072,
  KB512: 524288,
  MB1: 1048576,
  MB10: 10485760,
  MB50: 52428800,
  MB100: 104857600,
  MB750: 786432000,
  MB1500: 1572864000,
  MB2000: 2097152000,
}

export const MAX_FILE_SIZE = FILE_SIZE.MB2000

export const getFilePartSize = (fileSize: number) => (
  (fileSize <= FILE_SIZE.MB100) ? 128 :
    (fileSize <= FILE_SIZE.MB750) ? 256 :
      (fileSize <= FILE_SIZE.MB2000) ? 512 :
        0
) * 1024

export const generateLocalFileKey = ({ name, size, type, lastModified }) =>
  `${name}-${type}-${lastModified}-${size}`

export const generateFileKey = ({ id, size }) =>
  `${id}-${size}`

export const generateFileStreamUrl = ({ id, size, type }) =>
  `${SW_STREAM_PATH}?fileKey=${generateFileKey({ id, size })}&fileSize=${size}&fileType=${type}`

export const generateSaveFileStreamUrl = ({ id, name = '', size, type }) =>
  `${SW_SAVE_PATH}?fileKey=${generateFileKey({ id, size })}&fileName=${latinize(name)}&fileSize=${size}&fileType=${type}`

export const transformToBytes = (file: Blob | undefined) => {
  if (!file) return

  if (!!file.arrayBuffer) {
    return file.arrayBuffer()
  }

  return new Promise(resolve => {
    const fileReader = new FileReader()
    fileReader.onload = ev => {
      resolve(ev.target?.result)
      file = undefined
    }

    if (!file) {
      resolve(undefined)
      return
    }

    fileReader.readAsArrayBuffer(file)
  })
}

let fileInput: HTMLInputElement
export const selectFiles = (): Promise<string[]> => new Promise(resolve => {
  if (!fileInput) {
    fileInput = self.document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.accept = '*'
  }

  fileInput.onchange = (ev) => {
    const fileList = Array.from((ev.target as HTMLInputElement).files || [])
    const fileKeys: string[] = []

    for (let i = 0; i < fileList.length; i++) {
      const fileKey = setFile(fileList[i])
      if (fileKey && !fileKeys.includes(fileKey)) {
        fileKeys.push(fileKey)
      }
    }

    resolve(fileKeys)
    fileInput.value = ''
    fileInput.onchange = null
  }

  fileInput.click()
})

let link: HTMLAnchorElement
export const saveFile = (downloadingFile: DownloadingFile) => {
  let fileUrl = getFileUrl(downloadingFile.fileKey || '')
  if (!fileUrl) return

  link ??= self.document.createElement('a')
  link.download = downloadingFile.name || 'file'
  link.href = fileUrl

  link.onclick = () => setTimeout(() => {
    URL.revokeObjectURL(fileUrl)
    fileUrl = ''
  }, 30 * 1000)

  link.click()
}

export const saveFileStream = (streamUrl: string) => {
  const form = self.document.createElement('form')
  form.action = streamUrl
  form.method = 'POST'
  form.style.position = 'fixed'
  form.style.top = '0'
  form.style.clip = 'rect(0, 0, 0, 0)'

  self.document.body.appendChild(form)
  form.submit()
  form.remove()
}
