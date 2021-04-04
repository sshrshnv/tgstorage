/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable quote-props */
/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable semi-style */

/*******************************************************************************************/
/* This file was automatically generated (https://github.com/misupov/tg-schema-generator). */
/*                                                                                         */
/* Do not make changes to this file unless you know what you are doing -- modify           */
/* the tool instead.                                                                       */
/*                                                                                         */
/* Source: mtproto.json (md5: 1ef25a905cf20e6819483f8234f36b6b)                            */
/* Time: Thursday, 07 May 2020 06:31:44 (UTC)                                              */
/*                                                                                         */
/*******************************************************************************************/

interface Writer {
  int32(value: number) : void
  long(value: string): void
  int128(value: Uint32Array): void
  int256(value: Uint32Array): void
  double(value: number): void
  string(value: string): void
  bytes(value: ArrayBuffer | SharedArrayBuffer | Uint8Array): void
}

let w: Writer
let fallbackBuilder: ((stream: Writer, o: any) => void) | undefined

export default function build(writer: Writer, o: any, fallback?: (stream: Writer, o: any) => void) {
  w = writer
  fallbackBuilder = fallback
  return obj(o)
}

const _resPQ = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  bytes(o.pq)
  vector(i64, o.server_public_key_fingerprints)
}

const _p_q_inner_data = (o: any) => {
  bytes(o.pq)
  bytes(o.p)
  bytes(o.q)
  i128(o.nonce)
  i128(o.server_nonce)
  i256(o.new_nonce)
}

const _p_q_inner_data_dc = (o: any) => {
  bytes(o.pq)
  bytes(o.p)
  bytes(o.q)
  i128(o.nonce)
  i128(o.server_nonce)
  i256(o.new_nonce)
  i32(o.dc)
}

const _p_q_inner_data_temp = (o: any) => {
  bytes(o.pq)
  bytes(o.p)
  bytes(o.q)
  i128(o.nonce)
  i128(o.server_nonce)
  i256(o.new_nonce)
  i32(o.expires_in)
}

const _p_q_inner_data_temp_dc = (o: any) => {
  bytes(o.pq)
  bytes(o.p)
  bytes(o.q)
  i128(o.nonce)
  i128(o.server_nonce)
  i256(o.new_nonce)
  i32(o.dc)
  i32(o.expires_in)
}

const _server_DH_params_fail = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  i128(o.new_nonce_hash)
}

const _server_DH_params_ok = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  bytes(o.encrypted_answer)
}

const _server_DH_inner_data = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  i32(o.g)
  bytes(o.dh_prime)
  bytes(o.g_a)
  i32(o.server_time)
}

const _client_DH_inner_data = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  i64(o.retry_id)
  bytes(o.g_b)
}

const _dh_gen_ok = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  i128(o.new_nonce_hash1)
}

const _dh_gen_retry = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  i128(o.new_nonce_hash2)
}

const _dh_gen_fail = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  i128(o.new_nonce_hash3)
}

const _rpc_result = (o: any) => {
  i64(o.req_msg_id)
  obj(o.result)
}

const _rpc_error = (o: any) => {
  i32(o.error_code)
  str(o.error_message)
}

const _rpc_answer_dropped = (o: any) => {
  i64(o.msg_id)
  i32(o.seq_no)
  i32(o.bytes)
}

const _future_salt = (o: any) => {
  i32(o.valid_since)
  i32(o.valid_until)
  i64(o.salt)
}

const _future_salts = (o: any) => {
  i64(o.req_msg_id)
  i32(o.now)
  vector(_future_salt, o.salts)
}

const _pong = (o: any) => {
  i64(o.msg_id)
  i64(o.ping_id)
}

const _new_session_created = (o: any) => {
  i64(o.first_msg_id)
  i64(o.unique_id)
  i64(o.server_salt)
}

const _msg_container = (o: any) => {
  vector(obj, o.messages)
}

const _message = (o: any) => {
  i64(o.msg_id)
  i32(o.seqno)
  i32(o.bytes)
  obj(o.body)
}

const _msg_copy = (o: any) => {
  obj(o.orig_message)
}

const _gzip_packed = (o: any) => {
  bytes(o.packed_data)
}

const _msgs_ack = (o: any) => {
  vector(i64, o.msg_ids)
}

const _bad_msg_notification = (o: any) => {
  i64(o.bad_msg_id)
  i32(o.bad_msg_seqno)
  i32(o.error_code)
}

const _bad_server_salt = (o: any) => {
  i64(o.bad_msg_id)
  i32(o.bad_msg_seqno)
  i32(o.error_code)
  i64(o.new_server_salt)
}

const _msg_resend_req = (o: any) => {
  vector(i64, o.msg_ids)
}

const _msg_resend_ans_req = (o: any) => {
  vector(i64, o.msg_ids)
}

const _msgs_state_req = (o: any) => {
  vector(i64, o.msg_ids)
}

const _msgs_state_info = (o: any) => {
  i64(o.req_msg_id)
  bytes(o.info)
}

const _msgs_all_info = (o: any) => {
  vector(i64, o.msg_ids)
  bytes(o.info)
}

const _msg_detailed_info = (o: any) => {
  i64(o.msg_id)
  i64(o.answer_msg_id)
  i32(o.bytes)
  i32(o.status)
}

const _msg_new_detailed_info = (o: any) => {
  i64(o.answer_msg_id)
  i32(o.bytes)
  i32(o.status)
}

const _bind_auth_key_inner = (o: any) => {
  i64(o.nonce)
  i64(o.temp_auth_key_id)
  i64(o.perm_auth_key_id)
  i64(o.temp_session_id)
  i32(o.expires_at)
}

const _destroy_session_ok = (o: any) => {
  i64(o.session_id)
}

const _destroy_session_none = (o: any) => {
  i64(o.session_id)
}

const _req_pq = (o: any) => {
  i128(o.nonce)
}

const _req_pq_multi = (o: any) => {
  i128(o.nonce)
}

const _req_DH_params = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  bytes(o.p)
  bytes(o.q)
  i64(o.public_key_fingerprint)
  bytes(o.encrypted_data)
}

const _set_client_DH_params = (o: any) => {
  i128(o.nonce)
  i128(o.server_nonce)
  bytes(o.encrypted_data)
}

const _rpc_drop_answer = (o: any) => {
  i64(o.req_msg_id)
}

const _get_future_salts = (o: any) => {
  i32(o.num)
}

const _ping = (o: any) => {
  i64(o.ping_id)
}

const _ping_delay_disconnect = (o: any) => {
  i64(o.ping_id)
  i32(o.disconnect_delay)
}

const _http_wait = (o: any) => {
  i32(o.max_delay)
  i32(o.wait_after)
  i32(o.max_wait)
}

const _destroy_session = (o: any) => {
  i64(o.session_id)
}


const builderMap: Record<string, [number, ((o: any) => void)?]> = {
  'vector': [0x1cb5c415],
  'resPQ': [0x5162463, _resPQ],
  'p_q_inner_data': [0x83c95aec, _p_q_inner_data],
  'p_q_inner_data_dc': [0xa9f55f95, _p_q_inner_data_dc],
  'p_q_inner_data_temp': [0x3c6a84d4, _p_q_inner_data_temp],
  'p_q_inner_data_temp_dc': [0x56fddf88, _p_q_inner_data_temp_dc],
  'server_DH_params_fail': [0x79cb045d, _server_DH_params_fail],
  'server_DH_params_ok': [0xd0e8075c, _server_DH_params_ok],
  'server_DH_inner_data': [0xb5890dba, _server_DH_inner_data],
  'client_DH_inner_data': [0x6643b654, _client_DH_inner_data],
  'dh_gen_ok': [0x3bcbf734, _dh_gen_ok],
  'dh_gen_retry': [0x46dc1fb9, _dh_gen_retry],
  'dh_gen_fail': [0xa69dae02, _dh_gen_fail],
  'rpc_result': [0xf35c6d01, _rpc_result],
  'rpc_error': [0x2144ca19, _rpc_error],
  'rpc_answer_unknown': [0x5e2ad36e],
  'rpc_answer_dropped_running': [0xcd78e586],
  'rpc_answer_dropped': [0xa43ad8b7, _rpc_answer_dropped],
  'future_salt': [0x949d9dc, _future_salt],
  'future_salts': [0xae500895, _future_salts],
  'pong': [0x347773c5, _pong],
  'new_session_created': [0x9ec20908, _new_session_created],
  'msg_container': [0x73f1f8dc, _msg_container],
  'message': [0x5bb8e511, _message],
  'msg_copy': [0xe06046b2, _msg_copy],
  'gzip_packed': [0x3072cfa1, _gzip_packed],
  'msgs_ack': [0x62d6b459, _msgs_ack],
  'bad_msg_notification': [0xa7eff811, _bad_msg_notification],
  'bad_server_salt': [0xedab447b, _bad_server_salt],
  'msg_resend_req': [0x7d861a08, _msg_resend_req],
  'msg_resend_ans_req': [0x8610baeb, _msg_resend_ans_req],
  'msgs_state_req': [0xda69fb52, _msgs_state_req],
  'msgs_state_info': [0x4deb57d, _msgs_state_info],
  'msgs_all_info': [0x8cc0d131, _msgs_all_info],
  'msg_detailed_info': [0x276d3ec6, _msg_detailed_info],
  'msg_new_detailed_info': [0x809db6df, _msg_new_detailed_info],
  'bind_auth_key_inner': [0x75a3f765, _bind_auth_key_inner],
  'destroy_auth_key_ok': [0xf660e1d4],
  'destroy_auth_key_none': [0xa9f2259],
  'destroy_auth_key_fail': [0xea109b13],
  'destroy_session_ok': [0xe22045fc, _destroy_session_ok],
  'destroy_session_none': [0x62d350c9, _destroy_session_none],
  'req_pq': [0x60469778, _req_pq],
  'req_pq_multi': [0xbe7e8ef1, _req_pq_multi],
  'req_DH_params': [0xd712e4be, _req_DH_params],
  'set_client_DH_params': [0xf5045f1f, _set_client_DH_params],
  'rpc_drop_answer': [0x58e4a740, _rpc_drop_answer],
  'get_future_salts': [0xb921bd04, _get_future_salts],
  'ping': [0x7abe77ec, _ping],
  'ping_delay_disconnect': [0xf3427b8c, _ping_delay_disconnect],
  'http_wait': [0x9299359f, _http_wait],
  'destroy_auth_key': [0xd1435160],
  'destroy_session': [0xe7512126, _destroy_session],
}

const i32 = (value: number) => w.int32(value)
const i64 = (value: string) => w.long(value)
const i128 = (value: Uint32Array) => w.int128(value)
const i256 = (value: Uint32Array) => w.int256(value)
const str = (value: string) => w.string(value)
const bytes = (value: ArrayBuffer) => w.bytes(value)

const vector = (fn: (value: any) => void, value: Array<any>) => {
  i32(0x1cb5c415)
  i32(value.length)
  for (let i = 0; i < value.length; i++) {
    fn(value[i])
  }
}

const obj = (o: any, bare = false) => {
  const descriptor = builderMap[o._]
  if (descriptor) {
    const [id, fn] = descriptor
    if (!bare) i32(id)
    if (fn) fn(o)
  } else if (fallbackBuilder) {
    fallbackBuilder(w, o)
  } else {
    console.error(`Cannot serialize object ${JSON.stringify(o)}`)
  }
}
