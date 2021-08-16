import { getFile, setFile } from '~/core/cache'

const THUMB_MAX_SIZE = 120

export const parseImageFile = (file: File|string|undefined): Promise<{
  w: number
  h: number
  thumbFileKey?: string
} | undefined> => new Promise(resolve => {
  if (typeof file === 'string') {
    file = getFile(file) as File
  }

  if (!file) {
    resolve(undefined)
  }

  const fileUrl = URL.createObjectURL(file)
  file = undefined
  const image = new Image()

  image.onload = () => {
    URL.revokeObjectURL(fileUrl)

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
      return resolve(imageSize)
    }

    canvas.width = width
    canvas.height = height
    canvasContext.drawImage(image, ...canvasParams)

    canvas.toBlob((blob) => {
      if (!blob) {
        canvas.remove()
        return resolve(imageSize)
      }

      canvas.remove()
      let thumbFile = new File([blob], '', { type: 'image/jpeg', lastModified: Date.now() }) as File|undefined
      const thumbFileKey = setFile(thumbFile)
      thumbFile = undefined

      resolve({
        ...imageSize,
        thumbFileKey
      })
    }, 'image/jpeg')
  }

  image.onerror = () => {
    URL.revokeObjectURL(fileUrl)
    resolve(undefined)
  }

  image.src = fileUrl
})
