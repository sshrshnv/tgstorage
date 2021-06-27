const THUMB_MAX_SIZE = 120

export const processImageFile = (file: File): Promise<{
  w: number
  h: number
  thumb?: File
} | undefined> => new Promise(resolve => {
  const fileUrl = URL.createObjectURL(file)
  const image = new Image()

  image.onload = () => {
    const imageSize = {
      w: image.naturalWidth,
      h: image.naturalHeight
    }
    const ratio = imageSize.w / imageSize.h
    const width = ratio >= 1 ? THUMB_MAX_SIZE : Math.floor(ratio * THUMB_MAX_SIZE)
    const height = ratio >= 1 ? Math.floor(THUMB_MAX_SIZE / ratio) : THUMB_MAX_SIZE

    const canvas = document.createElement('canvas')
    const canvasContext = canvas.getContext('2d')
    const imageParams: [number, number, number, number] = [0, 0, imageSize.w, imageSize.h]
    const canvasParams: [number, number, number, number] = [0, 0, width, height]

    if (!canvasContext) {
      canvas.remove()
      URL.revokeObjectURL(fileUrl)
      return resolve(imageSize)
    }

    canvas.width = width
    canvas.height = height
    canvasContext.drawImage(image, ...imageParams, ...canvasParams)

    canvas.toBlob((blob) => {
      if (!blob) {
        canvas.remove()
        URL.revokeObjectURL(fileUrl)
        return resolve(imageSize)
      }

      resolve({
        ...imageSize,
        thumb: new File(
          [blob],
          '',
          {
            type: 'image/jpeg',
            lastModified: Date.now()
          }
        )
      })

      canvas.remove()
      URL.revokeObjectURL(fileUrl)
    }, 'image/jpeg')
  }

  image.onerror = () => {
    resolve(undefined)
    URL.revokeObjectURL(fileUrl)
  }

  image.src = fileUrl
})
