import { randomize, i2h } from '../serialization'
import { ClientMeta, AuthKey, ClientMetaData, AuthKeyNotNull } from './types'

type DCConfig = {
  host: string
  media: boolean
}

type MetaUpdateCallback = (data: ClientMeta) => void

/**
 * Helper class for managing datacenters
 */
export default class DCService {
  static Config: Record<number, DCConfig> = {
    1: { host: 'pluto', media: true },
    2: { host: 'venus', media: true },
    3: { host: 'aurora', media: true },
    4: { host: 'vesta', media: true },
    5: { host: 'flora', media: true },
  }

  /** On change callback */
  callback?: MetaUpdateCallback

  /** Datacenter meta data */
  meta: ClientMetaData

  sessions: Record<number, string> = {}
  seqNos: Record<number, number> = {}

  constructor(initial: ClientMetaData, callback?: MetaUpdateCallback) {
    this.meta = initial
    this.callback = callback
    this.sessions = {}
    this.seqNos = {}
  }

  /** Resolve hostname by dc id */
  getHost(dc: number) {
    return `${DCService.Config[dc].host}${DCService.Config[dc].media ? '-1' : ''}.web.telegram.org`
  }

  triggerUpdateEvent() {
    if (this.callback) this.callback(this.meta)
  }

  getDC(dcID: number) {
    if (!this.meta.dcs[dcID]) this.meta.dcs[dcID] = {}
    return this.meta.dcs[dcID]
  }

  setBaseDC(dcID: number) {
    this.meta.baseDC = dcID
    this.triggerUpdateEvent()
  }

  setSalt(dcID: number, salt: string) {
    this.getDC(dcID).salt = salt
    this.triggerUpdateEvent()
  }

  setAuthorization(dcID: number, userID: string) {
    this.meta.userID = userID
    this.meta.authorized = true
    this.getDC(dcID).authorized = true
    this.triggerUpdateEvent()
  }

  setConnection(dcID: number) {
    this.getDC(dcID).inited = true
    this.triggerUpdateEvent()
  }

  setLayer(dcID: number, layer: number) {
    this.getDC(dcID).layer = layer
    this.triggerUpdateEvent()
  }

  setPermanentKey(dcID: number, key: AuthKeyNotNull) {
    this.getDC(dcID).permanentKey = key
    this.triggerUpdateEvent()
  }

  setTemporaryKey(dcID: number, key: AuthKey) {
    this.getDC(dcID).temporaryKey = key
    if (key === null) this.getDC(dcID).inited = false
    this.triggerUpdateEvent()
  }

  setKeyBinding(dcID: number) {
    this.getDC(dcID).temporaryKey!.binded = true
    this.triggerUpdateEvent()
  }

  setSessionID(dcID: number, session: string) {
    this.sessions[dcID] = session
    this.seqNos[dcID] = 1
  }

  getKeyBinding(dcID: number): boolean {
    if (!this.getDC(dcID).temporaryKey) return false
    return this.getDC(dcID).temporaryKey!.binded || false
  }

  getSessionID(dcID: number): string {
    if (!this.sessions[dcID]) {
      const rand = new Uint32Array(2)
      randomize(rand)
      this.sessions[dcID] = i2h(rand[0]) + i2h(rand[1])
    }

    return this.sessions[dcID]
  }

  getSalt(dcID: number): string {
    const dc = this.getDC(dcID)
    if (!dc.salt) {
      const rand = new Uint32Array(2)
      randomize(rand)
      dc.salt = i2h(rand[0]) + i2h(rand[1])
    }

    return dc.salt!
  }

  getAuthKey(dcID: number): AuthKey {
    if (this.meta.pfs) return this.getDC(dcID).temporaryKey || null
    return this.getDC(dcID).permanentKey || null
  }

  getPermanentKey(dcID: number) {
    return this.getDC(dcID).permanentKey || null
  }

  getUserID(): string | null {
    return this.meta.userID || null
  }

  getAuthorization(dcID: number): boolean {
    return !!this.getDC(dcID).authorized
  }

  getConnection(dcID: number): boolean {
    return !!this.getDC(dcID).inited
  }

  getLayer(dcID: number): number | undefined {
    return this.getDC(dcID).layer
  }

  pfs(): boolean {
    return this.meta.pfs
  }

  /**
   * Increment msg_seq_no if message is content related
   * Ref: https://core.telegram.org/mtproto/description#message-sequence-number-msg-seqno
   */
  nextSeqNo(dcID: number, isContentRelated = false): number {
    if (!this.seqNos[dcID]) this.seqNos[dcID] = 1

    const isc = isContentRelated ? 1 : 0
    const seqNo = this.seqNos[dcID]

    this.seqNos[dcID] += isc

    return seqNo * 2 + isc
  }
}
