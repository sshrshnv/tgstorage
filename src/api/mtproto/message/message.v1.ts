/* eslint-disable prefer-destructuring, newline-per-chained-call */
import sha1 from '@cryptography/sha1'
import { IGE } from '@cryptography/aes'
import Message from './message'
import EncryptedMessage from './encrypted'

export default class MessageV1 extends Message {
  getPaddingLen(len: number) {
    return 4 - (len % 4)
  }

  /**
   * MTProto v1.0
   * Encrypts MessageData object with AES-256-IGE mode.
   * https://core.telegram.org/mtproto/description_v1
   */
  encrypt(key: Uint32Array, keyid: string): EncryptedMessage {
    const msgKeyLarge = sha1(this.buf.subarray(0, this.hlen + this.dataLength))
    const msgKey = msgKeyLarge.subarray(1, 5)

    const sha1a = sha1.stream().update(msgKey).update(key.subarray(0, 8)).digest()
    const sha1b = sha1.stream().update(key.subarray(8, 12)).update(msgKey).update(key.subarray(12, 16)).digest()
    const sha1c = sha1.stream().update(key.subarray(16, 24)).update(msgKey).digest()
    const sha1d = sha1.stream().update(msgKey).update(key.subarray(24, 32)).digest()

    const aesKey = new Uint32Array(8)
    for (let i = 0; i < 2; i++) aesKey[i] = sha1a[i]
    for (let i = 2; i < 5; i++) aesKey[i] = sha1b[i]
    for (let i = 5; i < 8; i++) aesKey[i] = sha1c[i - 4]

    const aesIv = new Uint32Array(8)
    for (let i = 0; i < 3; i++) aesIv[i] = sha1a[i + 2]
    for (let i = 3; i < 5; i++) aesIv[i] = sha1b[i - 3]
    for (let i = 6; i < 8; i++) aesIv[i] = sha1d[i - 6]
    aesIv[5] = sha1c[4]

    const cipher = new IGE(aesKey, aesIv)
    const encrypted = cipher.encrypt(this.buf)
    const encMsg = new EncryptedMessage(encrypted, true)

    encMsg.authKey = keyid
    encMsg.key = msgKey

    return encMsg
  }
}
