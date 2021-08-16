import { setFile } from '~/core/cache'

let input: HTMLInputElement

export const selectFiles = (): Promise<string[]> => new Promise(resolve => {
  if (!input) {
    input = self.document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = '*'
  }

  input.onchange = (ev) => {
    const fileList = Array.from((ev.target as HTMLInputElement).files || [])
    const fileKeys: string[] = []

    for (let i = 0; i < fileList.length; i++) {
      const fileKey = setFile(fileList[i])
      if (fileKey && !fileKeys.includes(fileKey)) {
        fileKeys.push(fileKey)
      }
    }

    resolve(fileKeys)
    input.value = ''
    input.onchange = null
  }

  input.click()
})
