/* eslint-disable no-restricted-globals */
export function i2h(number: number) {
  return `00000000${number.toString(16)}`.slice(-8)
}

export const utf8decoder = self.TextDecoder ? new TextDecoder() : {
  decode: (buf: ArrayBuffer | SharedArrayBuffer) => {
    const uint = new Uint8Array(buf)
    let str = ''

    for (let i = 0; i < uint.byteLength; i++) str += String.fromCharCode(uint[i])

    return decodeURIComponent(escape(str))
  },
}

export const utf8encoder = self.TextEncoder ? new TextEncoder() : {
  encode: (src: string) => {
    const str = unescape(encodeURIComponent(src))
    const uint = new Uint8Array(str.length)

    for (let i = 0; i < str.length; i++) uint[i] = str.charCodeAt(i)

    return uint
  },
}

/**
 * Randomize
 */
export function randomize(buf: Uint32Array | Uint8Array, start = 0) {
  if (!start && self.crypto && self.crypto.getRandomValues) {
    self.crypto.getRandomValues(buf)
  } else {
    const base = buf instanceof Uint32Array ? 0xFFFFFFFF : 0xFF
    for (let i = start; i < buf.length; i += 1) {
      buf[i] = Math.ceil(Math.random() * base)
    }
  }
}

/**
 * Randomize
 */
export function reverse32(buf: Uint32Array) {
  const reversed = new Uint32Array(buf.length)

  for (let i = 0; i < buf.length; i++) {
    reversed[i] = (
      (buf[buf.length - i - 1] & 0xFF) << 24
    ^ ((buf[buf.length - i - 1] >> 8) & 0xFF) << 16
    ^ ((buf[buf.length - i - 1] >> 16) & 0xFF) << 8
    ^ ((buf[buf.length - i - 1] >>> 24) & 0xFF)
    ) >>> 0
  }

  return reversed
}

/**
 * Uint32Array -> ArrayBuffer (low-endian os)
 */
export function i2abLow(buf: Uint32Array): ArrayBuffer {
  const uint8 = new Uint8Array(buf.length * 4)
  let i = 0

  for (let j = 0; j < buf.length; j++) {
    const int = buf[j]

    uint8[i++] = int >>> 24
    uint8[i++] = (int >> 16) & 0xFF
    uint8[i++] = (int >> 8) & 0xFF
    uint8[i++] = int & 0xFF
  }

  return uint8.buffer
}

/**
 * Uint32Array -> ArrayBuffer (big-endian os)
 */
export function i2abBig(buf: Uint32Array): ArrayBuffer {
  return buf.buffer
}

/**
 * ArrayBuffer -> Uint32Array (low-endian os)
 */
export function ab2iLow(ab: ArrayBuffer | SharedArrayBuffer | Uint8Array): Uint32Array {
  const uint8 = new Uint8Array(ab)
  const buf = new Uint32Array(uint8.length / 4)

  for (let i = 0; i < uint8.length; i += 4) {
    buf[i / 4] = (
      uint8[i] << 24
      ^ uint8[i + 1] << 16
      ^ uint8[i + 2] << 8
      ^ uint8[i + 3]
    )
  }

  return buf
}

/**
 * ArrayBuffer -> Uint32Array (big-endian os)
 */
export function ab2iBig(ab: ArrayBuffer | SharedArrayBuffer | Uint8Array): Uint32Array {
  return new Uint32Array(ab)
}

export const isBigEndian = new Uint8Array(new Uint32Array([0x01020304]))[0] === 0x01
export const i2ab = isBigEndian ? i2abBig : i2abLow
export const ab2i = isBigEndian ? ab2iBig : ab2iLow
