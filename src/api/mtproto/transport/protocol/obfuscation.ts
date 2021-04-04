/* eslint-disable prefer-destructuring */
import { CTR } from '@cryptography/aes'
import { randomize, reverse32 } from '../../serialization'

/**
 * Obfuscation for MTProto Transport Protocol
 * Ref: https://core.telegram.org/mtproto/mtproto-transports#transport-obfuscation
 */
export default class Obfuscation {
  /** Encription Cipher */
  enc?: CTR

  /** Decription Cipher */
  dec?: CTR

  /**
   * Creates initialization payload for establishing web-socket connection
   */
  init(header: number, randomized?: Uint32Array): Uint32Array {
    let initPayload

    if (randomized) initPayload = randomized
    else {
      initPayload = new Uint32Array(16)
      randomize(initPayload)
      initPayload[0] = 0xFFABCDEF // avoid collisions
    }

    if (header) initPayload[14] = header

    const reversedPayload = reverse32(initPayload)

    const encKey = initPayload.subarray(2, 10)
    const encIv = initPayload.slice(10, 14)
    const decKey = reversedPayload.slice(2, 10)
    const decIv = reversedPayload.slice(10, 14)

    // to do: typing for aesjs
    this.enc = new CTR(encKey, encIv)
    this.dec = new CTR(decKey, decIv)

    const encrypted = this.enc.encrypt(initPayload)

    initPayload[14] = encrypted[14]
    initPayload[15] = encrypted[15]

    return initPayload
  }

  /**
   * Obfuscates data
   */
  encode(payload: string | Uint32Array | Uint8Array): Uint32Array {
    if (!this.enc) throw new Error('Must init first')
    return this.enc.encrypt(payload)
  }


  /**
   * Decodes obfuscated data
   */
  decode(data: string | Uint32Array | Uint8Array): Uint32Array {
    if (!this.dec) throw new Error('Must init first')
    return this.dec.encrypt(data)
  }
}
