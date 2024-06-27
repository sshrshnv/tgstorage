import { MTProtoTransport } from '../transport/protocol'
import { MethodDeclMap } from '../tl'
import { Message } from '../message'

export type Transports = 'http' | 'websocket'

/** Client configuration type */
export type ClientConfig = {
  test: boolean
  debug: boolean
  ssl: boolean
  dc: number
  protocol: MTProtoTransport
  transport: Transports
  meta: Record<number, any>

  APILayer: number
  APIID?: number
  APIHash?: string

  deviceModel: string
  systemVersion: string
  appVersion: string
  langCode: string

  autoConnect: boolean
}

/** Default client configuration */
export const defaultClientConfig: ClientConfig = {
  test: false,
  debug: false,
  ssl: true,
  dc: 2,
  protocol: 'intermediate' as MTProtoTransport,
  transport: 'websocket' as Transports,
  meta: {},

  APILayer: 166,
  deviceModel: 'Unknown',
  systemVersion: 'Unknown',
  appVersion: '1.0.0',
  langCode: 'en',

  autoConnect: true,
}

export type RequestRPC = {
  message: Message
  headers: MessageHeaders
  cb?: PlainCallback<any>
}

/** Generic error for mtproto client */
export type ClientError = {
  type: 'rpc' | 'network' | 'transport' | 'internal'
  code: number
  message?: string
} | null

/** Request callback */
export type RequestCallback = (error: ClientError | null, result?: undefined | any) => void

/** Request callback */
export type PlainCallback<K extends keyof MethodDeclMap> = (error: ClientError | null, result?: MethodDeclMap[K]['res']) => void

/** DCService interface to avoid dependency cycle */
export interface DCServiceInterface {
  getHost(dc: number): string
  setSalt(dcID: number, salt: string): void
  setAuthorization(dcID: number, userID: string): void
  setConnection(dcID: number): void
  setPermanentKey(dcID: number, key: AuthKeyNotNull): void
  setTemporaryKey(dcID: number, key: AuthKey): void
  setKeyBinding(dcID: number): void
  setSessionID(dcID: number, session: string): void
  setLayer(dcID: number, layer: number): void
  getKeyBinding(dcID: number): boolean
  getSessionID(dcID: number): string
  getSalt(dcID: number): string
  getAuthKey(dcID: number): AuthKey
  getUserID(): string | null
  getAuthorization(dcID: number): boolean
  getConnection(dcID: number): boolean
  pfs(): boolean
  nextSeqNo(dcID: number, isContentRelated?: boolean): number
}

export interface UpdateServiceInterface {
  process(updateMsg: any): void
}

/** Client interface to avoid dependency cycle */
export interface ClientInterface {
  cfg: ClientConfig
  dc: DCServiceInterface
  updates: UpdateServiceInterface
  authorize(dc: number, cb?: (key: AuthKey) => void): void
  plainCall<K extends keyof MethodDeclMap>(method: K, data: MethodDeclMap[K]['req'], cb?: PlainCallback<K>): void
  plainCall<K extends keyof MethodDeclMap>(method: K, data: MethodDeclMap[K]['req'], headers: CallHeaders, cb?: PlainCallback<K>): void
  call<K extends keyof MethodDeclMap>(method: K, data: MethodDeclMap[K]['req'], cb?: PlainCallback<K>): void
  call<K extends keyof MethodDeclMap>(method: K, data: MethodDeclMap[K]['req'], headers: CallHeaders, cb?: PlainCallback<K>): void
  call(method: 'msgs_ack', data: { msg_ids: string[] }, headers: CallHeaders): void
  send(msg: Message, headers: CallHeaders, cb?: PlainCallback<any>): void
}

/** Authorization key info with PFS */
export type AuthKeyNotNull = {
  key: Uint32Array
  id: string
  expires?: number
  binded?: boolean
}

export type AuthKey = null | AuthKeyNotNull

export type DataCenterMetaData = {
  permanentKey?: AuthKey
  temporaryKey?: AuthKey
  salt?: string
  inited?: boolean
  layer?: number
  authorized?: boolean
}

export type ClientMetaData = {
  pfs: boolean
  baseDC: number
  userID?: string
  authorized?: boolean
  dcs: Record<number, DataCenterMetaData>
}

/** Datacenter info */
export type DatacenterMeta = {
  permKey?: AuthKey
  tempKey?: AuthKey
  salt?: string
  sessionID?: string
  sessionExpire?: number
  connectionInited?: boolean
  seqNo?: number
  userID?: string
  [key: string]: any
}

/** Client Datacenter Meta info */
export type ClientMeta = Record<number, DatacenterMeta>

export type CallHeaders = {
  dc?: number
  thread?: number
  transport?: Transports
  msgID?: string
  force?: boolean
  method?: string
}

export type MessageHeaders = CallHeaders & {
  dc: number
  thread: number
  transport: string
}

/** Headers for recursive processing rpc messages */
export type RPCHeaders = {
  id: string
  dc: number
  thread: number
  transport: string
}
