import { wait } from '~/tools/wait'

const THUMB_MAX_SIZE = 1280

export const processVideoFile = (file: File): Promise<{
  duration: number
  w: number
  h: number
  thumb?: File
} | undefined> => new Promise(resolve => {
  const fileUrl = URL.createObjectURL(file)
  const video = document.createElement('video')

  video.onloadedmetadata = async () => {
    const videoParams = {
      duration: video.duration,
      w: video.videoWidth,
      h: video.videoHeight
    }
    const ratio = videoParams.w / videoParams.h
    const width = videoParams.w // ratio >= 1 ? THUMB_MAX_SIZE : Math.floor(ratio * THUMB_MAX_SIZE)
    const height = videoParams.h // ratio >= 1 ? Math.floor(THUMB_MAX_SIZE / ratio) : THUMB_MAX_SIZE

    const thumb = await Promise.race([
      wait(2500),
      new Promise(resolve => {
        video.onseeked = async () => {
          await wait(100)
          const canvas = document.createElement('canvas')
          const canvasContext = canvas.getContext('2d')
          const imageParams: [number, number, number, number] = [0, 0, videoParams.w, videoParams.h]
          const canvasParams: [number, number, number, number] = [0, 0, width, height]

          if (!canvasContext) {
            canvas.remove()
            return resolve(undefined)
          }

          canvas.width = width
          canvas.height = height
          canvasContext.drawImage(video, ...imageParams, ...canvasParams)

          canvas.toBlob((blob) => {
            if (!blob) {
              canvas.remove()
              return resolve(undefined)
            }

            resolve(new File(
              [blob],
              '',
              {
                type: 'image/jpeg',
                lastModified: Date.now()
              }
            ))

            canvas.remove()
          }, 'image/jpeg')
        }

        video.onerror = () => {
          resolve(undefined)
        }

        video.currentTime = Math.min(videoParams.duration, 2)
      })
    ]) as File | undefined

    resolve({
      ...videoParams,
      thumb
    })
    video.remove()
    URL.revokeObjectURL(fileUrl)
  }

  video.onerror = () => {
    resolve(undefined)
    video.remove()
    URL.revokeObjectURL(fileUrl)
  }

  video.volume = 0
  video.src = fileUrl
})
