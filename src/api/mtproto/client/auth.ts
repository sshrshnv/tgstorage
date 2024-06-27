/* eslint-disable prefer-destructuring */
import sha1 from '@cryptography/sha1'
import { IGE } from '@cryptography/aes'

import { bi, biFromTA, biToTA, biModPow } from '../utils/bigint'
import { getKeyByFingerprints } from '../crypto/rsa/keys'
import { logs } from '../utils/log'
import { randomize, i2h, i2ab, Reader32 } from '../serialization'
import { MessageV1, PlainMessage } from '../message'
import { BrentPrime } from '../crypto/pq'
import RSAEncrypt from '../crypto/rsa/encrypt'
import type { ClientError, AuthKey, ClientInterface, CallHeaders, AuthKeyNotNull } from './types'
import { parse, build } from '../tl'
import type { Req_DH_params, Set_client_DH_params, Server_DH_inner_data, AuthBindTempAuthKey } from '../tl'

const log = logs('auth')

export type KeyExchangeContext = {
  expiresAfter: number
  nonce: Uint32Array
  newNonce: Uint32Array
  serverNonce?: Uint32Array
  pq?: Uint8Array
  p?: Uint8Array
  q?: Uint8Array
  fingerprints?: string[]
  fingerprint?: string
  cipher?: IGE
  g?: number
  ga?: Uint8Array
  dh?: Uint8Array
  key?: Uint32Array
}

export type KeyExchangeCallback = (err: ClientError | null, key?: AuthKey) => void

/**
 *
 */
export function createCipher(ctx: KeyExchangeContext) {
  const sha1a = sha1.stream().update(ctx.newNonce).update(ctx.serverNonce!).digest()
  const sha1b = sha1.stream().update(ctx.serverNonce!).update(ctx.newNonce).digest()
  const sha1c = sha1.stream().update(ctx.newNonce).update(ctx.newNonce).digest()

  const aesKey = new Uint32Array([
    sha1a[0], sha1a[1], sha1a[2], sha1a[3], sha1a[4], sha1b[0], sha1b[1], sha1b[2],
  ])

  const aesIv = new Uint32Array([
    sha1b[3], sha1b[4], sha1c[0], sha1c[1], sha1c[2], sha1c[3], sha1c[4], ctx.newNonce[0],
  ])

  return new IGE(aesKey, aesIv)
}

/**
 *
 */
export function createDHRequestParams(ctx: KeyExchangeContext, random?: Uint32Array): Req_DH_params {
  const [p, q] = BrentPrime(biFromTA(ctx.pq!))
  const publicKey = getKeyByFingerprints(ctx.fingerprints!)

  ctx.p = biToTA(p, Uint8Array)
  ctx.q = biToTA(q, Uint8Array)

  // wrap p_q_inner_data
  const pqInner: Record<string, any> = {
    _: 'p_q_inner_data',
    pq: ctx.pq,
    p: ctx.p,
    q: ctx.q,
    nonce: ctx.nonce,
    server_nonce: ctx.serverNonce,
    new_nonce: ctx.newNonce,
  }

  // wrap p_q_inner_data_temp
  if (ctx.expiresAfter > 0) {
    pqInner._ = 'p_q_inner_data_temp'
    pqInner.expires_in = ctx.expiresAfter
  }

  // encrypt pq_inner_data
  const data = build(pqInner)
  const dataToEncrypt = new Uint32Array(64)
  const dataHash = sha1(data)

  if (!random) {
    random = new Uint32Array(59 - data.length)
    randomize(random)
  }

  for (let i = 0; i < 5; i++) dataToEncrypt[i] = dataHash[i]
  for (let i = 0; i < data.length; i++) dataToEncrypt[5 + i] = data[i]
  for (let i = 0; i < 59 - data.length; i++) dataToEncrypt[5 + data.length + i] = random[i]

  const encrypted = RSAEncrypt(new Uint8Array(i2ab(dataToEncrypt)).slice(0, 255), publicKey.n, publicKey.e)

  ctx.fingerprint = publicKey.fingerprint

  return {
    nonce: ctx.nonce,
    server_nonce: ctx.serverNonce!,
    p: ctx.p!,
    q: ctx.q!,
    public_key_fingerprint: ctx.fingerprint!,
    encrypted_data: i2ab(encrypted),
  }
}

/**
 *
 */
export function createClientDHParams(ctx: KeyExchangeContext, rand?: Uint8Array, padding?: Uint32Array): Set_client_DH_params {
  if (!rand) {
    rand = new Uint8Array(20)
    randomize(rand)
  }

  // generate key;
  const g = bi(ctx.g!)
  const ga = biFromTA(ctx.ga!)
  const dhPrime = biFromTA(ctx.dh!)
  const b = biFromTA(rand)
  const gb = biToTA(biModPow(g, b, dhPrime), Uint8Array)

  ctx.key = biToTA(biModPow(ga, b, dhPrime), Uint32Array)

  // inner content for client_DH_inner_data
  const clientDH = build({
    _: 'client_DH_inner_data',
    nonce: ctx.nonce,
    server_nonce: ctx.serverNonce,
    retry_id: '0000000000000000',
    g_b: gb,
  })

  let len = 5 + clientDH.length
  len += 4 - (len % 4)

  const plain = new Uint32Array(len)
  const dataHash = sha1(clientDH)

  if (!padding) {
    padding = new Uint32Array(len - 5 - clientDH.length)
    randomize(padding)
  }

  for (let i = 0; i < 5; i++) plain[i] = dataHash[i]
  for (let i = 0; i < clientDH.length; i++) plain[5 + i] = clientDH[i]
  for (let i = 0; i < padding.length; i++) plain[5 + clientDH.length + i] = padding[i]

  // encrypt client_DH_inner_data
  const encryptedDH = ctx.cipher!.encrypt(plain)

  // params for set_client_DH_params
  return {
    nonce: ctx.nonce,
    server_nonce: ctx.serverNonce!,
    encrypted_data: i2ab(encryptedDH),
  }
}

/**
 * Creates AuthKey using DH-exchange
 * Ref: https://core.telegram.org/mtproto/auth_key
 */
export function createAuthKey(client: ClientInterface, dc: number, thread: number, expiresAfter: number, cb: KeyExchangeCallback) {
  const ctx: KeyExchangeContext = {
    nonce: new Uint32Array(4),
    newNonce: new Uint32Array(8),
    expiresAfter,
  }

  randomize(ctx.nonce)
  randomize(ctx.newNonce)

  const headers: CallHeaders = { dc, thread, transport: 'websocket' }

  /**
   * Auth Flow
   * Step 1. Send random nonce.
   * @mtproto req_pq_multi
   */
  client.plainCall('req_pq_multi', { nonce: ctx.nonce }, headers, (err, resPQ) => {
    if (err || !resPQ || resPQ._ !== 'resPQ') {
      log(dc, 'Unexpected resPQ response')
      cb(err)
      return
    }

    ctx.serverNonce = resPQ.server_nonce
    ctx.fingerprints = resPQ.server_public_key_fingerprints
    ctx.pq = new Uint8Array(resPQ.pq.slice(0))
    ctx.cipher = createCipher(ctx)

    /**
     * Auth Flow
     * Step 2. Request Diffie-Hellman params
     * @mtproto req_DH_params
     */
    client.plainCall('req_DH_params', createDHRequestParams(ctx), headers, (errd, resDH) => {
      if (errd || !resDH || resDH._ !== 'server_DH_params_ok') {
        log(dc, thread, 'Unexpected req_DH_params response')
        cb(errd)
        return
      }

      // decrypt encrypted_answer
      const decryptedDH = ctx.cipher!.decrypt(new Uint8Array(resDH.encrypted_answer))
      const serverDH = parse(new Reader32(decryptedDH.subarray(5))) as Server_DH_inner_data

      if (!serverDH || serverDH._ !== 'server_DH_inner_data') {
        log(dc, thread, 'Unable to decrypt aes-256-ige')
        cb({ type: 'internal', code: 0, message: 'Unable to decrypt aes-256-ige' })
        return
      }

      // todo: server time sync
      // todo: check dh prime, ga, gb
      ctx.g = serverDH.g
      ctx.ga = new Uint8Array(serverDH.g_a)
      ctx.dh = new Uint8Array(serverDH.dh_prime)

      /**
       * Auth Flow
       * Step 3. Send Client Diffie-Hellman params
       * @mtproto set_client_DH_params
       */
      client.plainCall('set_client_DH_params', createClientDHParams(ctx), headers, (errs, sDH) => {
        if (errs || !sDH || sDH._ !== 'dh_gen_ok') {
          log(dc, thread, 'Unexpected set_client_DH_params response')
          cb(err)
          return
        }

        const keyhash = new Reader32(sha1(ctx.key!), 3)
        const keyid = keyhash.long()

        const authKey: AuthKey = {
          id: keyid,
          key: ctx.key!,
        }

        if (expiresAfter > 0) {
          authKey.expires = Math.floor(Date.now() / 1000) + expiresAfter
          authKey.binded = false

          ctx.serverNonce![0] ^= ctx.newNonce[0]
          ctx.serverNonce![1] ^= ctx.newNonce[1]

          const saltReader = new Reader32(ctx.serverNonce!)
          client.dc.setSalt(dc, saltReader.long())
        }

        if (expiresAfter > 0) client.dc.setTemporaryKey(dc, authKey)
        else client.dc.setPermanentKey(dc, authKey)

        if (cb) cb(null, authKey)
      })
    })
  })
}

export function createBindingEncryptedPayload(permKey: AuthKeyNotNull, tempKey: AuthKeyNotNull, msgID: string, rand?: Uint32Array): AuthBindTempAuthKey {
  if (!rand) {
    rand = new Uint32Array(10)
    randomize(rand)
  }

  const nonce = i2h(rand[0]) + i2h(rand[1])
  const tmpSessionID = i2h(rand[2]) + i2h(rand[3])

  const bindMsg = new MessageV1(
    build({
      _: 'bind_auth_key_inner',
      nonce,
      temp_auth_key_id: tempKey.id,
      perm_auth_key_id: permKey.id,
      temp_session_id: tmpSessionID,
      expires_at: tempKey.expires,
    }),
    true,
  )

  bindMsg.salt = i2h(rand[4]) + i2h(rand[5])
  bindMsg.sessionID = i2h(rand[6]) + i2h(rand[7])
  bindMsg.id = msgID
  bindMsg.buf[18] = rand[8]
  bindMsg.buf[19] = rand[9]

  return {
    perm_auth_key_id: permKey.id,
    nonce: i2h(rand[0]) + i2h(rand[1]),
    expires_at: tempKey.expires || 0,
    encrypted_message: i2ab(bindMsg.encrypt(permKey!.key, permKey!.id).buf),
  }
}

/**
 * Binds temp auth key to permenent
 * Ref: https://core.telegram.org/method/auth.bindTempAuthKey
 */
export function bindTempAuthKey(client: ClientInterface, dc: number, permKey: AuthKey, tempKey: AuthKey, cb: (result: boolean) => void) {
  if (!tempKey || !permKey) {
    cb(false)
    return
  }

  const msgID = PlainMessage.GenerateID()
  const rand = new Uint32Array(10)
  randomize(rand)

  client.dc.setSessionID(dc, i2h(rand[2]) + i2h(rand[3]))

  client.call('auth.bindTempAuthKey', createBindingEncryptedPayload(permKey, tempKey, msgID, rand), { msgID, dc, force: true }, (err, res) => {
    if (!err && res === true) {
      client.dc.setKeyBinding(dc)
      if (cb) cb(true)
    } else {
      // cb(false);
      throw new Error('Auth: Binding temp auth key failed')
    }
  })
}

/**
 * Calls initConnection method invoked with layer
 */
export function initConnection(client: ClientInterface, dc: number, cb?: (result: boolean) => void) {
  const invokePrams = {
    layer: client.cfg.APILayer,
    query: {
      _: 'initConnection',
      api_id: client.cfg.APIID,
      device_model: client.cfg.deviceModel,
      system_version: client.cfg.systemVersion,
      app_version: client.cfg.appVersion,
      system_lang_code: client.cfg.langCode,
      lang_pack: '',
      lang_code: client.cfg.langCode,
      query: { _: 'help.getNearestDc' },
    },
  }

  client.call('invokeWithLayer', invokePrams, { dc, force: true }, (err, res) => {
    if (err || !res) {
      log('Unexpected initConnection response')
      if (cb) cb(false)
    } else {
      client.dc.setLayer(dc, client.cfg.APILayer)
      if (cb) cb(true)
    }
  })
}

/**
 * Calls auth.exportAuthorization and auth.importAuthorization from one dc to another
 */
export function transferAuthorization(client: ClientInterface, userID: string, dcFrom: number, dcTo: number, cb?: (res: boolean) => void) {
  client.call('auth.exportAuthorization', { dc_id: dcTo }, { dc: dcFrom, force: true }, (err, res) => {
    if (err || !res || res._ !== 'auth.exportedAuthorization') {
      if (cb) cb(false)
      return
    }

    const { bytes } = res

    client.call('auth.importAuthorization', { id: userID, bytes }, { dc: dcTo, force: true }, (err2, res2) => {
      if (err2 || !res2 || res2._ !== 'auth.authorization') {
        if (cb) cb(false)
        return
      }

      if (cb) cb(true)
    })
  })
}
