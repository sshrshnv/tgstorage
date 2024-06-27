/* eslint-disable no-restricted-globals */
import Transport, { TransportConfig, TransportCallback, TransportState } from './abstract'
import { i2ab, ab2i } from '../serialization'
import { PlainMessage, bytesToMessage, EncryptedMessage } from '../message'
import { wrap, unWrap, HEADER, Obfuscation } from './protocol'

/** Configuration object for WebSocket transport */
type SocketConfig = TransportConfig

export default class Socket extends Transport {
  /** Connection handler */
  ws: WebSocket | undefined

  /** Pending Requests */
  pending: Array<PlainMessage | EncryptedMessage> = []

  /** WebSocket Config */
  cfg: SocketConfig

  /** Instance transport */
  transport = 'websocket'

  /** Transport obfuscation */
  obfuscation?: Obfuscation

  /** Last connect retry */
  lastConnectRetry = 0

  /** Reconnect timer */
  reconnectTimer?: number

  /** Request timeout timer */
  requestTimer?: number

  /** Transport state */
  state: TransportState = 'disconnected'

  /**
   * Creates new web socket handler
   */
  constructor(receiver: TransportCallback, cfg: SocketConfig) {
    super(receiver, cfg)

    this.cfg = cfg
    this.connect()

    if (self) {
      self.addEventListener('online', () => {
        this.connect()
      })

      self.addEventListener('offline', () => {
        if (this.ws) this.ws.close()
      })
    }
  }

  notify = (status: TransportState) => {
    if (status !== this.state) {
      this.pass(this.cfg, status)
      this.state = status
    }
  }

  connect = (force?: boolean) => {
    if (this.ws && this.ws.readyState <= 1) return

    const timestamp = Date.now()

    // forced connect
    if (force) {
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer)

    // auto connect should be throttled
    } else if (timestamp - this.lastConnectRetry < 1000) {
      this.reconnectTimer = self.setTimeout(this.connect as TimerHandler, 3000)
      return
    }

    this.reconnectTimer = 0

    if (navigator.onLine !== false) {
      this.lastConnectRetry = timestamp

      this.ws = new WebSocket(`ws${this.cfg.ssl ? 's' : ''}://${this.cfg.host}/apiws${this.cfg.test ? '_test' : ''}`, 'binary')
      this.ws.binaryType = 'arraybuffer'
      this.ws.onopen = this.handleOpen
      this.ws.onclose = this.handleClose
      this.ws.onmessage = this.handleMessage
    }
  }

  /**
   * Handles onopen event at websocket object
   */
  handleOpen = () => {
    if (!this.ws) return

    this.obfuscation = new Obfuscation()

    // notify client
    this.notify('connected')

    // init obfuscation with first packet
    const initPayload = this.obfuscation.init(HEADER)
    this.ws.send(i2ab(initPayload))

    // release pending messages
    this.releasePending()
  }

  /**
   * Handles onclose event at websocket object
   */
  handleClose = (_event: CloseEvent) => {
    // notify client
    this.notify('disconnected')

    // keep connection for 1st threads
    if (this.cfg.thread === 1) this.connect()
  }

  /**
   * Handles onmessage event at websocket object
   */
  handleMessage = (event: MessageEvent) => {
    if (!event.data || !this.obfuscation) return

    // process message
    const data = unWrap(this.obfuscation.decode(ab2i(event.data)))
    const msg = bytesToMessage(data)

    // flush request timer
    if (this.requestTimer) {
      clearTimeout(this.requestTimer)
      this.requestTimer = 0
    }

    // notify client
    if (this.state !== 'connected') this.notify('connected')

    // pass message to main client thread
    this.pass(this.cfg, msg)
  }

  /**
   * Method sends bytes to server via web socket.
   */
  send(msg: PlainMessage | EncryptedMessage) {
    // send if socket is ready
    if (this.obfuscation && this.ws && this.ws.readyState === 1) {
      const frame = this.obfuscation.encode(wrap(msg.buf))
      this.ws.send(i2ab(frame))

    // else: add message to pending quene and reconnect
    } else {
      this.pending.push(msg)
      if (!this.ws || this.ws.readyState !== 0) this.connect(true)
    }
  }

  /**
   * Re-sends pending messages
   */
  releasePending() {
    if (this.pending) {
      const num = this.pending.length
      for (let i = 0; i < num; i += 1) {
        const msg = this.pending.shift()
        if (msg) this.send(msg)
      }
    }
  }
}
