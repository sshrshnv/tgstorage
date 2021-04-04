/**
 * Intermediate MTProto Transport Protocol
 * Ref: https://core.telegram.org/mtproto/mtproto-transports#intermediate
 */

/**
 * Protocol header
 */
export const HEADER = 0xeeeeeeee

/**
 * Wraps message at envelope
 */
export function wrap(payload: Uint32Array): Uint32Array {
  const len = payload.byteLength
  const enveloped = new Uint32Array(payload.length + 1)

  // quick ack
  // len |= 1 << 31;

  // serialize as int32
  enveloped[0] = (
    (len & 0xFF) << 24
  ^ ((len >> 8) & 0xFF) << 16
  ^ ((len >> 16) & 0xFF) << 8
  ^ (len >> 24) & 0xFF
  ) >>> 0


  for (let i = 1; i <= payload.length; i++) enveloped[i] = payload[i - 1]

  return enveloped
}

/**
 * Unwraps incoming bytes to type language message
 */
export function unWrap(data: Uint32Array): Uint32Array {
  return data.subarray(1)
}
