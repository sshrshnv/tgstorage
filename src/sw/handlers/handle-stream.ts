declare const self: ServiceWorkerGlobalScope

import { addMessageHandler } from './handlers'

const STREAMING_PART_SIZE = 1024 * 1024
//const MIN_STREAMING_PART_SIZE = 4 * 1024
//const MAX_STREAMING_PART_SIZE = 1024 * 1024

export const handleStream = ({
  event,
  request,
  url
}) => new Promise<Response>(async resolve => {
  const client = await self.clients.get(event.clientId)
  const fileKey = url.searchParams.get('fileKey')
  const fileSize = +url.searchParams.get('fileSize')
  const fileType = url.searchParams.get('fileType')
  const [from, to] = parseRequest(request)
  const partSize = calcPartSize(from, to)
  const offsetSize = calcOffsetSize(from, partSize)

  const params = { fileKey, fileSize, fileType, from, to, offsetSize, partSize }
  const messageKey = JSON.stringify(params)

  if (from === 0 && to === 1) {
    return resolve(generateResponse(params))
  }

  addMessageHandler(messageKey, (data = {}) => {
    resolve(generateResponse(data))
    data = undefined
  })

  client?.postMessage({
    type: 'downloadStreamFilePart',
    messageKey,
    params
  })
})

const parseRequest = (request: Request) => {
  const { headers } = request
  const rangeHeader = headers.get('Range') || ''
  const rangeHeaderValue = rangeHeader.split('=')[1] || ''
  const range = rangeHeaderValue.split(', ')[0]
  return range.split('-').map(value => value ? +value : 0)
}

const generateResponse = ({
  fileSize,
  fileType,
  from,
  to,
  offsetSize,
  partSize,
  bytes,
  isSafari
}: {
  fileSize: number
  fileType: string
  from: number
  to: number
  offsetSize: number
  partSize: number
  bytes?: Uint8Array
  isSafari?: boolean
}) => {
  if (from === 0 && to === 1) {
    return new Response(new Uint8Array(2).buffer, {
      status: 206,
      statusText: 'Partial Content',
      headers: [
        ['Content-Range', `bytes 0-1/${fileSize}`],
        ['Accept-Ranges', 'bytes'],
        ['Content-Length', '2'],
        ['Content-Type', fileType],
      ]
    })
  }

  if (!bytes) {
    return new Response('', {
      status: 500,
      statusText: 'Failed to fetch file'
    })
  }

  if (isSafari) {
    bytes = bytes.slice(from - offsetSize, to - offsetSize + 1)
    offsetSize = from
  }

  const length = bytes.byteLength
  from = offsetSize
  to = Math.min(offsetSize + partSize, fileSize) - 1

  return new Response(bytes, {
    status: 206,
    statusText: 'Partial Content',
    headers: [
      ['Content-Range', `bytes ${from}-${to}/${fileSize}`],
      ['Accept-Ranges', 'bytes'],
      ['Content-Length', `${length}`],
      ['Content-Type', fileType],
    ]
  })
}

const calcOffsetSize = (from: number, partSize: number) =>
  from - (from % partSize)

const calcPartSize = (from: number, to: number) => (to && to < STREAMING_PART_SIZE) ?
  Math.min(2 ** Math.ceil(Math.log(to - from + 1) / Math.log(2)), STREAMING_PART_SIZE) :
  STREAMING_PART_SIZE
