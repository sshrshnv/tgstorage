/* eslint-disable newline-per-chained-call */
import sha256 from '@cryptography/sha256'
import pbkdf2 from '@cryptography/pbkdf2'
import sha512 from '@cryptography/sha512'
import BigInt from 'big-integer'
import type { BigInteger } from 'big-integer'

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

function bintTo64(src: BigInteger): Uint32Array {
  const srcBuf = src.toArray(0x100000000).value

  if (srcBuf.length === 64) return new Uint32Array(srcBuf)

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
  const g = BigInt(cg)
  const p = BigInt.fromArray(Array.from(cp), 0x100)

  const gBuf = new Uint32Array(64)
  const pBuf = uintTo64(cp)

  gBuf[63] = 3

  const srpB = BigInt.fromArray(Array.from(csrpB), 0x100)
  const srpBBuf = uintTo64(csrpB)

  let pwdhash = sha256(clientSaltString + password + clientSaltString)
  pwdhash = sha256.stream().update(serverSalt).update(pwdhash).update(serverSalt).digest()
  pwdhash = pbkdf2(pwdhash, clientSaltString, 100000, sha512, 64)
  pwdhash = sha256.stream().update(serverSalt).update(pwdhash).update(serverSalt).digest()

  const x = BigInt.fromArray(Array.from(pwdhash), 0x100000000)
  const gx = g.modPow(x, p)

  const k = BigInt.fromArray(Array.from(sha256.stream().update(pBuf).update(gBuf).digest()), 0x100000000)
  const kgx = k.multiply(gx).mod(p)

  if (!rand) {
    rand = new Uint32Array(6)
    randomize(rand)
  }

  const a = BigInt.fromArray(Array.from(rand), 0x100000000)
  const Ac = g.modPow(a, p)
  const AcBuf = bintTo64(Ac)

  let bkgx = srpB.subtract(kgx)
  if (bkgx.lesser(BigInt.zero)) bkgx = bkgx.add(p)

  const u = BigInt.fromArray(Array.from(sha256.stream().update(AcBuf).update(srpBBuf).digest()), 0x100000000)
  const ux = u.multiply(x)
  const uxa = ux.add(a)

  const S = bkgx.modPow(uxa, p)
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
