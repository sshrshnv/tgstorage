import type { FileMeta } from '~/core/cache'
import { getFile, setFile } from '~/core/cache'
import { timer } from '~/tools/timer'
import { checkIsSafari } from '~/tools/detect-platform'

//const THUMB_MAX_SIZE = 1280

export const parseVideoFile = (
  fileKey: string | undefined,
  fileMeta?: FileMeta
): Promise<{
  duration: number
  w: number
  h: number
  thumbFileKey?: string
} | undefined> => new Promise(resolve => {
  let file = getFile(fileKey || '') as File | Blob | undefined
  let isSliced = false

  if (!file) {
    return resolve(undefined)
  }

  if (fileMeta && fileMeta.size > 10 * 1024 * 1024) {
    file = file.slice(0, 10 * 1024 * 1024)
    isSliced = true
  }

  const iframe = self.document.createElement('iframe')
  iframe.style.display = 'none'
  self.document.body.appendChild(iframe)
  const document = iframe.contentDocument || self.document
  const video = document.createElement('video')

  const isSafari = checkIsSafari()
  const fileUrl = URL.createObjectURL(file)
  file = undefined

  const clear = () => {
    URL.revokeObjectURL(fileUrl)
    video.remove()
    iframe.remove()
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
          await timer(50)

          if (!video.videoWidth || !video.videoHeight) {
            return resolve(undefined)
          }

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

        video.currentTime = videoParams.duration > 1 ? 1 : Math.min(videoParams.duration, 0.1)
      })
    ]).catch(() => {
      clear()
      resolve(videoParams)
    }) as string | undefined

    clear()
    resolve({
      ...videoParams,
      thumbFileKey
    })
  }

  video.onerror = () => {
    clear()
    if (isSliced) {
      return resolve(parseVideoFile(fileKey))
    }
    resolve(undefined)
  }

  if (isSafari) {
    video.preload = 'auto'
    video.autoplay = true
    video.playsInline = true
    video.controls = true
  }

  video.volume = 0
  video.src = fileUrl
})
