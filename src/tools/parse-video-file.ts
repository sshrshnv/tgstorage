import { getFile, setFile } from '~/core/cache'
import { timer } from '~/tools/timer'

//const THUMB_MAX_SIZE = 1280

export const parseVideoFile = (file: File|string|undefined): Promise<{
  duration: number
  w: number
  h: number
  thumbFileKey?: File
} | undefined> => new Promise(resolve => {
  if (typeof file === 'string') {
    file = getFile(file) as File
  }

  if (!file) {
    resolve(undefined)
  }

  const fileUrl = URL.createObjectURL(file)
  file = undefined
  const video = document.createElement('video')

  const clear = () => {
    URL.revokeObjectURL(fileUrl)
    video.remove()
  }

  video.onloadedmetadata = async () => {
    const videoParams = {
      duration: video.duration,
      w: video.videoWidth,
      h: video.videoHeight
    }
    //const ratio = videoParams.w / videoParams.h
    const width = videoParams.w // ratio >= 1 ? THUMB_MAX_SIZE : Math.floor(ratio * THUMB_MAX_SIZE)
    const height = videoParams.h // ratio >= 1 ? Math.floor(THUMB_MAX_SIZE / ratio) : THUMB_MAX_SIZE

    const thumbFileKey = await Promise.race([
      timer(2500),
      new Promise(resolve => {
        video.onseeked = async () => {
          await timer(100)
          const canvas = document.createElement('canvas')
          const canvasContext = canvas.getContext('2d', { alpha: false })
          //const imageParams: [number, number, number, number] = [0, 0, videoParams.w, videoParams.h]
          const canvasParams: [number, number, number, number] = [0, 0, width, height]

          if (!canvasContext) {
            canvas.remove()
            return resolve(undefined)
          }

          canvas.width = width
          canvas.height = height
          canvasContext.drawImage(video, ...canvasParams)

          canvas.toBlob((blob) => {
            if (!blob) {
              canvas.remove()
              return resolve(undefined)
            }

            canvas.remove()
            let thumbFile = new File([blob], '', { type: 'image/jpeg', lastModified: Date.now() }) as File|undefined
            const thumbFileKey = setFile(thumbFile)
            thumbFile = undefined

            resolve(thumbFileKey)
          }, 'image/jpeg')
        }

        video.onerror = () => {
          resolve(undefined)
        }

        video.currentTime = Math.min(videoParams.duration, 2)
      })
    ]).catch(() => {
      clear()
      resolve(videoParams)
    }) as File | undefined

    clear()
    resolve({
      ...videoParams,
      thumbFileKey
    })
  }

  video.onerror = () => {
    clear()
    resolve(undefined)
  }

  video.volume = 0
  video.src = fileUrl
})
