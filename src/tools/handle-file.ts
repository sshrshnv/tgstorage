export const FILE_SIZE = {
  KB64: 65536,
  KB128: 131072,
  KB512: 524288,
  MB1: 1048576,
  MB10: 10485760,
  MB100: 104857600,
  MB750: 786432000,
  MB1500: 1572864000,
  MB2000: 2097152000,
}

export const MAX_FILE_SIZE = FILE_SIZE.MB2000

export const getFilePartSize = (fileSize: number) => (
  fileSize <= FILE_SIZE.MB100 ? 128 :
    fileSize <= FILE_SIZE.MB750 ? 256 :
      fileSize <= FILE_SIZE.MB2000 ? 512 :
        0
) * 1024

export const generateLocalFileKey = ({ name, size, type, lastModified }) =>
  `${name}-${type}-${lastModified}-${size}`

export const generateFileKey = ({ id, size }) =>
  `${id}-${size}`

export const generateStreamFileUrl = ({ id, size, type }) =>
  `/sw/stream?fileKey=${generateFileKey({ id, size })}&fileSize=${size}&fileType=${type}`

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
