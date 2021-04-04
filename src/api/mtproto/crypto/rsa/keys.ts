import sha1 from '@cryptography/sha1'
import { Writer32, ab2i, Reader32 } from '../../serialization'

export type RSAKey = {
  fingerprint: string
  n: Uint32Array
  e: number
}

/**
 * Converts base64-encoded public key to {fingerprint, modulus, exponent} object
 */
export function parseKey(key: string): RSAKey {
  const matches = key.match(/-----BEGIN ([A-Z ]+?)-----([A-Za-z0-9\s+/]+)-----([A-Z ]+?)-----/m)

  if (!matches) throw new Error(`RSA Key: Unable to parse key \n ${key}`)

  const keyType = matches[1]
  const buf = Uint8Array.from(atob(matches[2].trim()), (char) => char.charCodeAt(0))

  let n: Uint8Array; let e: Uint8Array

  switch (keyType) {
    case 'RSA PUBLIC KEY':
      n = buf.subarray(9, 265)
      e = buf.subarray(buf.byteLength - 3)
      break

    case 'PUBLIC KEY':
      n = buf.subarray(33, 289)
      e = buf.subarray(buf.byteLength - 3)
      break

    default:
      throw new Error(`RSA Key: Unknown key format ${keyType}`)
  }


  // rsa_public_key n:bytes e:bytes = RSAPublicKey
  const writer = new Writer32(new Uint32Array(66))
  writer.bytes(n)
  writer.bytes(e)

  const keyHash = sha1(writer.buf)
  const reader = new Reader32(keyHash, 3)

  return {
    fingerprint: reader.long(),
    n: ab2i(n),
    e: (e[0] << 16) ^ (e[1] << 8) ^ e[0],
  }
}

export const PredefinedKeys: RSAKey[] = [
  /**
   * -----BEGIN RSA PUBLIC KEY-----
   * MIIBCgKCAQEAwVACPi9w23mF3tBkdZz+zwrzKOaaQdr01vAbU4E1pvkfj4sqDsm6
   * lyDONS789sVoD/xCS9Y0hkkC3gtL1tSfTlgCMOOul9lcixlEKzwKENj1Yz/s7daS
   * an9tqw3bfUV/nqgbhGX81v/+7RFAEd+RwFnK7a+XYl9sluzHRyVVaTTveB2GazTw
   * Efzk2DWgkBluml8OREmvfraX3bkHZJTKX4EQSjBbbdJ2ZXIsRrYOXfaA+xayEGB+
   * 8hdlLmAjbCVfaigxX0CDqWeR1yFL9kwd9P0NsZRPsmoqVwMbMu7mStFai6aIhc3n
   * Slv8kg9qv1m6XHVQY3PnEw+QQtqSIXklHwIDAQAB
   * -----END RSA PUBLIC KEY-----
   */
  {
    fingerprint: 'c3b42b026ce86b21',
    n: new Uint32Array([
      0xc150023e, 0x2f70db79, 0x85ded064, 0x759cfecf, 0x0af328e6, 0x9a41daf4, 0xd6f01b53, 0x8135a6f9, 0x1f8f8b2a, 0x0ec9ba97, 0x20ce352e, 0xfcf6c568,
      0x0ffc424b, 0xd6348649, 0x02de0b4b, 0xd6d49f4e, 0x580230e3, 0xae97d95c, 0x8b19442b, 0x3c0a10d8, 0xf5633fec, 0xedd6926a, 0x7f6dab0d, 0xdb7d457f,
      0x9ea81b84, 0x65fcd6ff, 0xfeed1140, 0x11df91c0, 0x59caedaf, 0x97625f6c, 0x96ecc747, 0x25556934, 0xef781d86, 0x6b34f011, 0xfce4d835, 0xa090196e,
      0x9a5f0e44, 0x49af7eb6, 0x97ddb907, 0x6494ca5f, 0x81104a30, 0x5b6dd276, 0x65722c46, 0xb60e5df6, 0x80fb16b2, 0x10607ef2, 0x17652e60, 0x236c255f,
      0x6a28315f, 0x4083a967, 0x91d7214b, 0xf64c1df4, 0xfd0db194, 0x4fb26a2a, 0x57031b32, 0xeee64ad1, 0x5a8ba688, 0x85cde74a, 0x5bfc920f, 0x6abf59ba,
      0x5c755063, 0x73e7130f, 0x9042da92, 0x2179251f,
    ]),
    e: 0x010001,
  },

  /** ********************************************** */

  /** -----BEGIN PUBLIC KEY-----
   * MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAruw2yP/BCcsJliRoW5eB
   * VBVle9dtjJw+OYED160Wybum9SXtBBLXriwt4rROd9csv0t0OHCaTmRqBcQ0J8fx
   * hN6/cpR1GWgOZRUAiQxoMnlt0R93LCX/j1dnVa/gVbCjdSxpbrfY2g2L4frzjJvd
   * l84Kd9ORYjDEAyFnEA7dD556OptgLQQ2e2iVNq8NZLYTzLp5YpOdO1doK+ttrltg
   * gTCy5SrKeLoCPPbOgGsdxJxyz5KKcZnSLj16yE5HvJQn0CNpRdENvRUXe6tBP78O
   * 39oJ8BTHp9oIjd6XWXAsp2CvK45Ol8wFXGF710w9lwCGNbmNxNYhtIkdqfsEcwR5
   * JwIDAQAB
   * -----END PUBLIC KEY----- */
  {
    fingerprint: '0bc35f3509f7b7a5',
    n: new Uint32Array([
      0xaeec36c8, 0xffc109cb, 0x09962468, 0x5b978154, 0x15657bd7, 0x6d8c9c3e, 0x398103d7, 0xad16c9bb, 0xa6f525ed, 0x0412d7ae, 0x2c2de2b4, 0x4e77d72c,
      0xbf4b7438, 0x709a4e64, 0x6a05c434, 0x27c7f184, 0xdebf7294, 0x7519680e, 0x65150089, 0x0c683279, 0x6dd11f77, 0x2c25ff8f, 0x576755af, 0xe055b0a3,
      0x752c696e, 0xb7d8da0d, 0x8be1faf3, 0x8c9bdd97, 0xce0a77d3, 0x916230c4, 0x03216710, 0x0edd0f9e, 0x7a3a9b60, 0x2d04367b, 0x689536af, 0x0d64b613,
      0xccba7962, 0x939d3b57, 0x682beb6d, 0xae5b6081, 0x30b2e52a, 0xca78ba02, 0x3cf6ce80, 0x6b1dc49c, 0x72cf928a, 0x7199d22e, 0x3d7ac84e, 0x47bc9427,
      0xd0236945, 0xd10dbd15, 0x177bab41, 0x3fbf0edf, 0xda09f014, 0xc7a7da08, 0x8dde9759, 0x702ca760, 0xaf2b8e4e, 0x97cc055c, 0x617bd74c, 0x3d970086,
      0x35b98dc4, 0xd621b489, 0x1da9fb04, 0x73047927,
    ]),
    e: 0x010001,
  },

  /** ********************************************** */

  /** -----BEGIN PUBLIC KEY-----
   * MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvfLHfYH2r9R70w8prHbl
   * Wt/nDkh+XkgpflqQVcnAfSuTtO05lNPspQmL8Y2XjVT4t8cT6xAkdgfmmvnvRPOO
   * KPi0OfJXoRVylFzAQG/j83u5K3kRLbae7fLccVhKZhY46lvsueI1hQdLgNV9n1cQ
   * 3TDS2pQOCtovG4eDl9wacrXOJTG2990VjgnIKNA0UMoP+KF03qzryqIt3oTvZq03
   * DyWdGK+AZjgBLaDKSnC6qD2cFY81UryRWOab8zKkWAnhw2kFpcqhI0jdV5QaSCEx
   * vnsjVaX0Y1N0870931/5Jb9ICe4nweZ9kSDF/gip3kWLG0o8XQpChDfyvsqB9OLV
   * /wIDAQAB
   * -----END PUBLIC KEY----- */
  {
    fingerprint: '15ae5fa8b5529542',
    n: new Uint32Array([
      0xbdf2c77d, 0x81f6afd4, 0x7bd30f29, 0xac76e55a, 0xdfe70e48, 0x7e5e4829, 0x7e5a9055, 0xc9c07d2b, 0x93b4ed39, 0x94d3eca5, 0x098bf18d, 0x978d54f8,
      0xb7c713eb, 0x10247607, 0xe69af9ef, 0x44f38e28, 0xf8b439f2, 0x57a11572, 0x945cc040, 0x6fe3f37b, 0xb92b7911, 0x2db69eed, 0xf2dc7158, 0x4a661638,
      0xea5becb9, 0xe2358507, 0x4b80d57d, 0x9f5710dd, 0x30d2da94, 0x0e0ada2f, 0x1b878397, 0xdc1a72b5, 0xce2531b6, 0xf7dd158e, 0x09c828d0, 0x3450ca0f,
      0xf8a174de, 0xacebcaa2, 0x2dde84ef, 0x66ad370f, 0x259d18af, 0x80663801, 0x2da0ca4a, 0x70baa83d, 0x9c158f35, 0x52bc9158, 0xe69bf332, 0xa45809e1,
      0xc36905a5, 0xcaa12348, 0xdd57941a, 0x482131be, 0x7b2355a5, 0xf4635374, 0xf3bd3ddf, 0x5ff925bf, 0x4809ee27, 0xc1e67d91, 0x20c5fe08, 0xa9de458b,
      0x1b4a3c5d, 0x0a428437, 0xf2beca81, 0xf4e2d5ff,
    ]),
    e: 0x010001,
  },

  /** ********************************************** */

  /** -----BEGIN PUBLIC KEY-----
   * MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs/ditzm+mPND6xkhzwFI
   * z6J/968CtkcSE/7Z2qAJiXbmZ3UDJPGrzqTDHkO30R8VeRM/Kz2f4nR05GIFiITl
   * 4bEjvpy7xqRDspJcCFIOcyXm8abVDhF+th6knSU0yLtNKuQVP6voMrnt9MV1X92L
   * GZQLgdHZbPQz0Z5qIpaKhdyA8DEvWWvSUwwc+yi1/gGaybwlzZwqXYoPOhwMebzK
   * Uk0xW14htcJrRrq+PXXQbRzTMynseCoPIoke0dtCodbA3qQxQovE16q9zz4Otv2k
   * 4j63cz53J+mhkVWAeWxVGI0lltJmWtEYK6er8VqqWot3nqmWMXogrgRLggv/Nbbo
   * oQIDAQAB
   * -----END PUBLIC KEY----- */
  {
    fingerprint: 'aeae98e13cd7f94f',
    n: new Uint32Array([
      0xb3f762b7, 0x39be98f3, 0x43eb1921, 0xcf0148cf, 0xa27ff7af, 0x02b64712, 0x13fed9da, 0xa0098976, 0xe6677503, 0x24f1abce, 0xa4c31e43, 0xb7d11f15,
      0x79133f2b, 0x3d9fe274, 0x74e46205, 0x8884e5e1, 0xb123be9c, 0xbbc6a443, 0xb2925c08, 0x520e7325, 0xe6f1a6d5, 0x0e117eb6, 0x1ea49d25, 0x34c8bb4d,
      0x2ae4153f, 0xabe832b9, 0xedf4c575, 0x5fdd8b19, 0x940b81d1, 0xd96cf433, 0xd19e6a22, 0x968a85dc, 0x80f0312f, 0x596bd253, 0x0c1cfb28, 0xb5fe019a,
      0xc9bc25cd, 0x9c2a5d8a, 0x0f3a1c0c, 0x79bcca52, 0x4d315b5e, 0x21b5c26b, 0x46babe3d, 0x75d06d1c, 0xd33329ec, 0x782a0f22, 0x891ed1db, 0x42a1d6c0,
      0xdea43142, 0x8bc4d7aa, 0xbdcf3e0e, 0xb6fda4e2, 0x3eb7733e, 0x7727e9a1, 0x91558079, 0x6c55188d, 0x2596d266, 0x5ad1182b, 0xa7abf15a, 0xaa5a8b77,
      0x9ea99631, 0x7a20ae04, 0x4b820bff, 0x35b6e8a1,
    ]),
    e: 0x010001,
  },

  /** ********************************************** */

  /** -----BEGIN PUBLIC KEY-----
   * MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvmpxVY7ld/8DAjz6F6q0
   * 5shjg8/4p6047bn6/m8yPy1RBsvIyvuDuGnP/RzPEhzXQ9UJ5Ynmh2XJZgHoE9xb
   * nfxL5BXHplJhMtADXKM9bWB11PU1Eioc3+AXBB8QiNFBn2XI5UkO5hPhbb9mJpjA
   * 9Uhw8EdfqJP8QetVsI/xrCEbwEXe0xvifRLJbY08/Gp66KpQvy7g8w7VB8wlgePe
   * xW3pT13Ap6vuC+mQuJPyiHvSxjEKHgqePji9NP3tJUFQjcECqcm0yV7/2d0t/pbC
   * m+ZH1sadZspQCEPPrtbkQBlvHb4OLiIWPGHKSMeRFvp3IWcmdJqXahxLCUS1Eh6M
   * AQIDAQAB
   * -----END PUBLIC KEY----- */
  {
    fingerprint: '5a181b2235057d98',
    n: new Uint32Array([
      0xbe6a7155, 0x8ee577ff, 0x03023cfa, 0x17aab4e6, 0xc86383cf, 0xf8a7ad38, 0xedb9fafe, 0x6f323f2d, 0x5106cbc8, 0xcafb83b8, 0x69cffd1c, 0xcf121cd7,
      0x43d509e5, 0x89e68765, 0xc96601e8, 0x13dc5b9d, 0xfc4be415, 0xc7a65261, 0x32d0035c, 0xa33d6d60, 0x75d4f535, 0x122a1cdf, 0xe017041f, 0x1088d141,
      0x9f65c8e5, 0x490ee613, 0xe16dbf66, 0x2698c0f5, 0x4870f047, 0x5fa893fc, 0x41eb55b0, 0x8ff1ac21, 0x1bc045de, 0xd31be27d, 0x12c96d8d, 0x3cfc6a7a,
      0xe8aa50bf, 0x2ee0f30e, 0xd507cc25, 0x81e3dec5, 0x6de94f5d, 0xc0a7abee, 0x0be990b8, 0x93f2887b, 0xd2c6310a, 0x1e0a9e3e, 0x38bd34fd, 0xed254150,
      0x8dc102a9, 0xc9b4c95e, 0xffd9dd2d, 0xfe96c29b, 0xe647d6c6, 0x9d66ca50, 0x0843cfae, 0xd6e44019, 0x6f1dbe0e, 0x2e22163c, 0x61ca48c7, 0x9116fa77,
      0x21672674, 0x9a976a1c, 0x4b0944b5, 0x121e8c01,
    ]),
    e: 0x010001,
  },
]

/**
 * Find RSA key by fingerprint
 */
export function getKeyByFingerprints(fingerprints: string[]): RSAKey {
  for (let i = 0; i < fingerprints.length; i += 1) {
    const item = fingerprints[i]
    for (let j = 0; j < PredefinedKeys.length; j += 1) {
      if (PredefinedKeys[j].fingerprint === item) {
        return PredefinedKeys[j]
      }
    }
  }

  return PredefinedKeys[0]
}
