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
/* Time: Sunday, 07 June 2020 15:17:31 (UTC)                                               */
/*                                                                                         */
/*******************************************************************************************/

interface Reader {
  int32(): number
  long(): string
  int128(): Uint32Array
  int256(): Uint32Array
  double(): number
  string(): string
  bytes(): ArrayBuffer
  rollback(): void
}

let r: Reader
let fallbackParse: ((stream: Reader) => any) | undefined

export default function parse(reader: Reader, fallback?: (stream: Reader) => any) {
  r = reader
  fallbackParse = fallback
  return obj()
}

const _vector = () => vector(obj, true)
const _resPQ: any = () => ({ _: 'resPQ', nonce: i128(), server_nonce: i128(), pq: bytes(), server_public_key_fingerprints: vector(i64) })
const _p_q_inner_data: any = () => ({ _: 'p_q_inner_data', pq: bytes(), p: bytes(), q: bytes(), nonce: i128(), server_nonce: i128(), new_nonce: i256() })
const _p_q_inner_data_dc: any = () => ({ _: 'p_q_inner_data_dc', pq: bytes(), p: bytes(), q: bytes(), nonce: i128(), server_nonce: i128(), new_nonce: i256(), dc: i32() })
const _p_q_inner_data_temp: any = () => ({ _: 'p_q_inner_data_temp', pq: bytes(), p: bytes(), q: bytes(), nonce: i128(), server_nonce: i128(), new_nonce: i256(), expires_in: i32() })
const _p_q_inner_data_temp_dc: any = () => ({ _: 'p_q_inner_data_temp_dc', pq: bytes(), p: bytes(), q: bytes(), nonce: i128(), server_nonce: i128(), new_nonce: i256(), dc: i32(), expires_in: i32() })
const _server_DH_params_fail: any = () => ({ _: 'server_DH_params_fail', nonce: i128(), server_nonce: i128(), new_nonce_hash: i128() })
const _server_DH_params_ok: any = () => ({ _: 'server_DH_params_ok', nonce: i128(), server_nonce: i128(), encrypted_answer: bytes() })
const _server_DH_inner_data: any = () => ({ _: 'server_DH_inner_data', nonce: i128(), server_nonce: i128(), g: i32(), dh_prime: bytes(), g_a: bytes(), server_time: i32() })
const _client_DH_inner_data: any = () => ({ _: 'client_DH_inner_data', nonce: i128(), server_nonce: i128(), retry_id: i64(), g_b: bytes() })
const _dh_gen_ok: any = () => ({ _: 'dh_gen_ok', nonce: i128(), server_nonce: i128(), new_nonce_hash1: i128() })
const _dh_gen_retry: any = () => ({ _: 'dh_gen_retry', nonce: i128(), server_nonce: i128(), new_nonce_hash2: i128() })
const _dh_gen_fail: any = () => ({ _: 'dh_gen_fail', nonce: i128(), server_nonce: i128(), new_nonce_hash3: i128() })
const _rpc_result: any = () => ({ _: 'rpc_result', req_msg_id: i64(), result: obj() })
const _rpc_error: any = () => ({ _: 'rpc_error', error_code: i32(), error_message: str() })
const _rpc_answer_unknown: any = () => ({ _: 'rpc_answer_unknown' })
const _rpc_answer_dropped_running: any = () => ({ _: 'rpc_answer_dropped_running' })
const _rpc_answer_dropped: any = () => ({ _: 'rpc_answer_dropped', msg_id: i64(), seq_no: i32(), bytes: i32() })
const _future_salt: any = () => ({ _: 'future_salt', valid_since: i32(), valid_until: i32(), salt: i64() })
const _future_salts: any = () => ({ _: 'future_salts', req_msg_id: i64(), now: i32(), salts: vector(_future_salt, true) })
const _pong: any = () => ({ _: 'pong', msg_id: i64(), ping_id: i64() })
const _new_session_created: any = () => ({ _: 'new_session_created', first_msg_id: i64(), unique_id: i64(), server_salt: i64() })
const _msg_container: any = () => ({ _: 'msg_container', messages: vector(_message, true) })
const _message: any = () => ({ _: 'message', msg_id: i64(), seqno: i32(), bytes: i32(), body: obj() })
const _msg_copy: any = () => ({ _: 'msg_copy', orig_message: obj() })
const _gzip_packed: any = () => ({ _: 'gzip_packed', packed_data: bytes() })
const _msgs_ack: any = () => ({ _: 'msgs_ack', msg_ids: vector(i64) })
const _bad_msg_notification: any = () => ({ _: 'bad_msg_notification', bad_msg_id: i64(), bad_msg_seqno: i32(), error_code: i32() })
const _bad_server_salt: any = () => ({ _: 'bad_server_salt', bad_msg_id: i64(), bad_msg_seqno: i32(), error_code: i32(), new_server_salt: i64() })
const _msg_resend_req: any = () => ({ _: 'msg_resend_req', msg_ids: vector(i64) })
const _msg_resend_ans_req: any = () => ({ _: 'msg_resend_ans_req', msg_ids: vector(i64) })
const _msgs_state_req: any = () => ({ _: 'msgs_state_req', msg_ids: vector(i64) })
const _msgs_state_info: any = () => ({ _: 'msgs_state_info', req_msg_id: i64(), info: bytes() })
const _msgs_all_info: any = () => ({ _: 'msgs_all_info', msg_ids: vector(i64), info: bytes() })
const _msg_detailed_info: any = () => ({ _: 'msg_detailed_info', msg_id: i64(), answer_msg_id: i64(), bytes: i32(), status: i32() })
const _msg_new_detailed_info: any = () => ({ _: 'msg_new_detailed_info', answer_msg_id: i64(), bytes: i32(), status: i32() })
const _bind_auth_key_inner: any = () => ({ _: 'bind_auth_key_inner', nonce: i64(), temp_auth_key_id: i64(), perm_auth_key_id: i64(), temp_session_id: i64(), expires_at: i32() })
const _destroy_auth_key_ok: any = () => ({ _: 'destroy_auth_key_ok' })
const _destroy_auth_key_none: any = () => ({ _: 'destroy_auth_key_none' })
const _destroy_auth_key_fail: any = () => ({ _: 'destroy_auth_key_fail' })
const _destroy_session_ok: any = () => ({ _: 'destroy_session_ok', session_id: i64() })
const _destroy_session_none: any = () => ({ _: 'destroy_session_none', session_id: i64() })

const parserMap = new Map<number, () => any>([
  [0x1cb5c415, _vector],
  [0x5162463, _resPQ],
  [0x83c95aec, _p_q_inner_data],
  [0xa9f55f95, _p_q_inner_data_dc],
  [0x3c6a84d4, _p_q_inner_data_temp],
  [0x56fddf88, _p_q_inner_data_temp_dc],
  [0x79cb045d, _server_DH_params_fail],
  [0xd0e8075c, _server_DH_params_ok],
  [0xb5890dba, _server_DH_inner_data],
  [0x6643b654, _client_DH_inner_data],
  [0x3bcbf734, _dh_gen_ok],
  [0x46dc1fb9, _dh_gen_retry],
  [0xa69dae02, _dh_gen_fail],
  [0xf35c6d01, _rpc_result],
  [0x2144ca19, _rpc_error],
  [0x5e2ad36e, _rpc_answer_unknown],
  [0xcd78e586, _rpc_answer_dropped_running],
  [0xa43ad8b7, _rpc_answer_dropped],
  [0x949d9dc, _future_salt],
  [0xae500895, _future_salts],
  [0x347773c5, _pong],
  [0x9ec20908, _new_session_created],
  [0x73f1f8dc, _msg_container],
  [0x5bb8e511, _message],
  [0xe06046b2, _msg_copy],
  [0x3072cfa1, _gzip_packed],
  [0x62d6b459, _msgs_ack],
  [0xa7eff811, _bad_msg_notification],
  [0xedab447b, _bad_server_salt],
  [0x7d861a08, _msg_resend_req],
  [0x8610baeb, _msg_resend_ans_req],
  [0xda69fb52, _msgs_state_req],
  [0x4deb57d, _msgs_state_info],
  [0x8cc0d131, _msgs_all_info],
  [0x276d3ec6, _msg_detailed_info],
  [0x809db6df, _msg_new_detailed_info],
  [0x75a3f765, _bind_auth_key_inner],
  [0xf660e1d4, _destroy_auth_key_ok],
  [0xa9f2259, _destroy_auth_key_none],
  [0xea109b13, _destroy_auth_key_fail],
  [0xe22045fc, _destroy_session_ok],
  [0x62d350c9, _destroy_session_none],
])

const i32 = () => r.int32()
const i64 = () => r.long()
const i128 = () => r.int128()
const i256 = () => r.int256()
const str = () => r.string()
const bytes = () => r.bytes()

function vector(t: () => any, bare = false) {
  if (!bare) { i32() /* ignoring constructor id. */ }
  const len = i32()
  const result = []
  for (let i = 0; i < len; ++i) result.push(t())
  return result
}

function obj() {
  const c = i32() >>> 0
  const f = parserMap.get(c)
  if (f) return f()
  if (fallbackParse) {
    r.rollback()
    return fallbackParse(r)
  }
  console.error(`Unknown constructor 0x${c.toString(16)}.`)
  return undefined
}
