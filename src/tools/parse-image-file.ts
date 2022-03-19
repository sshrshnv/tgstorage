import { getFile, setFile } from '~/core/cache'

const THUMB_MAX_SIZE = 640

export const parseImageFile = (file: File|string|undefined): Promise<{
  w: number
  h: number
  thumbFileKey?: string
} | undefined> => new Promise(resolve => {
  if (typeof file === 'string') {
    file = getFile(file) as File
  }

  if (!file) {
    return resolve(undefined)
  }

  const iframe = self.document.createElement('iframe')
  iframe.style.display = 'none'
  self.document.body.appendChild(iframe)
  const document = iframe.contentDocument || self.document

  const fileUrl = URL.createObjectURL(file)
  file = undefined
  const image = new Image()

  const clear = () => {
    URL.revokeObjectURL(fileUrl)
    image.remove()
    iframe.remove()
  }

  image.onload = () => {
    const imageSize = {
      w: image.naturalWidth,
      h: image.naturalHeight
    }
    const ratio = imageSize.w / imageSize.h
    const width = ratio >= 1 ? THUMB_MAX_SIZE : Math.floor(ratio * THUMB_MAX_SIZE)
    const height = ratio >= 1 ? Math.floor(THUMB_MAX_SIZE / ratio) : THUMB_MAX_SIZE

    const canvas = document.createElement('canvas')
    const canvasContext = canvas.getContext('2d', { alpha: false })
    //const imageParams: [number, number, number, number] = [0, 0, imageSize.w, imageSize.h]
    const canvasParams: [number, number, number, number] = [0, 0, width, height]

    if (!canvasContext) {
      canvas.remove()
      clear()
      return resolve(imageSize)
    }

    canvas.width = width
    canvas.height = height
    canvasContext.drawImage(image, ...canvasParams)

    canvas.toBlob((blob) => {
      if (!blob) {
        canvas.remove()
        clear()
        return resolve(imageSize)
      }

      canvas.remove()
      let thumbFile = new File([blob], '', { type: 'image/jpeg', lastModified: Date.now() }) as File|undefined
      const thumbFileKey = setFile(thumbFile)
      thumbFile = undefined

      clear()
      resolve({
        ...imageSize,
        thumbFileKey
      })
    }, 'image/jpeg')
  }

  image.onerror = () => {
    clear()
    resolve(undefined)
  }

  image.src = fileUrl
})
