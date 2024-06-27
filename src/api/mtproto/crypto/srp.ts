/* eslint-disable newline-per-chained-call */
import sha256 from '@cryptography/sha256'
import pbkdf2 from '@cryptography/pbkdf2'
import sha512 from '@cryptography/sha512'

import { bi, biFromTA, biToTA, biModPow } from '../utils/bigint'
import { ab2i, randomize, i2ab } from '../serialization'
import { InputCheckPasswordSRP } from '../tl'

function uintTo64(src: Uint8Array): Uint32Array {
  const buf = new Uint32Array(64)

  for (let i = src.length - 1, j = 63; i >= 0 && j >= 0; i -= 4, j--) {
    buf[j] = (
      src[i - 3] << 24
    ^ src[i - 2] << 16
    ^ src[i - 1] << 8
    ^ src[i]
    )
  }

  return buf
}

function bintTo64(src: bigint): Uint32Array {
  const srcBuf = biToTA<Uint32Array>(src, Uint32Array)

  if (srcBuf.length === 64) return srcBuf

  const buf = new Uint32Array(64)

  for (let i = buf.length, j = srcBuf.length; i >= 0 && j >= 0; i--, j--) buf[i] = srcBuf[j]

  return buf
}

export function genPasswordSRP(
  salt1: Uint8Array, salt2: Uint8Array, cg: number, cp: Uint8Array, srpId: string, csrpB: Uint8Array, password: string, rand?: Uint32Array,
): InputCheckPasswordSRP.inputCheckPasswordSRP {
  let clientSaltString = ''
  for (let i = 0; i < salt1.length; i++) clientSaltString += String.fromCharCode(salt1[i])

  const clientSalt = ab2i(salt1)
  const serverSalt = ab2i(salt2)
  const g = bi(cg)
  const p = biFromTA(cp)

  const gBuf = new Uint32Array(64)
  const pBuf = uintTo64(cp)

  gBuf[63] = 3

  const srpB = biFromTA(csrpB)
  const srpBBuf = uintTo64(csrpB)

  let pwdhash = sha256(clientSaltString + password + clientSaltString)
  pwdhash = sha256.stream().update(serverSalt).update(pwdhash).update(serverSalt).digest()
  pwdhash = pbkdf2(pwdhash, clientSaltString, 100000, sha512, 64)
  pwdhash = sha256.stream().update(serverSalt).update(pwdhash).update(serverSalt).digest()

  const x = biFromTA(pwdhash)
  const gx = biModPow(g, x, p)

  const k = biFromTA(sha256.stream().update(pBuf).update(gBuf).digest())
  const kgx = (k * gx) % p

  if (!rand) {
    rand = new Uint32Array(6)
    randomize(rand)
  }

  const a = biFromTA(rand)
  const Ac = biModPow(g, a, p)
  const AcBuf = bintTo64(Ac)

  let bkgx = srpB - kgx
  if (bkgx < 0n) bkgx = bkgx + p

  const u = biFromTA(sha256.stream().update(AcBuf).update(srpBBuf).digest())
  const ux = u * x
  const uxa = ux + a

  const S = biModPow(bkgx, uxa, p)
  const SBuf = bintTo64(S)

  const K = sha256(SBuf)
  const h1 = sha256(pBuf)
  const h2 = sha256(gBuf)

  for (let i = 0; i < h1.length; i++) h1[i] ^= h2[i]

  const M1 = sha256.stream()
    .update(h1)
    .update(sha256(clientSalt))
    .update(sha256(serverSalt))
    .update(AcBuf)
    .update(srpBBuf)
    .update(K)
    .digest()

  return {
    _: 'inputCheckPasswordSRP',
    srp_id: srpId,
    A: i2ab(AcBuf),
    M1: i2ab(M1),
  }
}
