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

/* CONSTRUCTORS */

export type ResPQ =
  | ResPQ.resPQ


export namespace ResPQ {
  export type resPQ = {
    _: 'resPQ'
    nonce: Uint32Array
    server_nonce: Uint32Array
    pq: ArrayBuffer
    server_public_key_fingerprints: string[]
  }
}

export type P_Q_inner_data =
  | P_Q_inner_data.p_q_inner_data
  | P_Q_inner_data.p_q_inner_data_dc
  | P_Q_inner_data.p_q_inner_data_temp


export namespace P_Q_inner_data {
  export type p_q_inner_data = {
    _: 'p_q_inner_data'
    pq: ArrayBuffer
    p: ArrayBuffer
    q: ArrayBuffer
    nonce: Uint32Array
    server_nonce: Uint32Array
    new_nonce: Uint32Array
  }
  export type p_q_inner_data_dc = {
    _: 'p_q_inner_data_dc'
    pq: ArrayBuffer
    p: ArrayBuffer
    q: ArrayBuffer
    nonce: Uint32Array
    server_nonce: Uint32Array
    new_nonce: Uint32Array
    dc: number
  }
  export type p_q_inner_data_temp = {
    _: 'p_q_inner_data_temp'
    pq: ArrayBuffer
    p: ArrayBuffer
    q: ArrayBuffer
    nonce: Uint32Array
    server_nonce: Uint32Array
    new_nonce: Uint32Array
    expires_in: number
  }
}

export type P_Q_inner_d =
  | P_Q_inner_d.p_q_inner_data_temp_dc


export namespace P_Q_inner_d {
  export type p_q_inner_data_temp_dc = {
    _: 'p_q_inner_data_temp_dc'
    pq: ArrayBuffer
    p: ArrayBuffer
    q: ArrayBuffer
    nonce: Uint32Array
    server_nonce: Uint32Array
    new_nonce: Uint32Array
    dc: number
    expires_in: number
  }
}

export type Server_DH_Params =
  | Server_DH_Params.server_DH_params_fail
  | Server_DH_Params.server_DH_params_ok


export namespace Server_DH_Params {
  export type server_DH_params_fail = {
    _: 'server_DH_params_fail'
    nonce: Uint32Array
    server_nonce: Uint32Array
    new_nonce_hash: Uint32Array
  }
  export type server_DH_params_ok = {
    _: 'server_DH_params_ok'
    nonce: Uint32Array
    server_nonce: Uint32Array
    encrypted_answer: ArrayBuffer
  }
}

export type Server_DH_inner_data =
  | Server_DH_inner_data.server_DH_inner_data


export namespace Server_DH_inner_data {
  export type server_DH_inner_data = {
    _: 'server_DH_inner_data'
    nonce: Uint32Array
    server_nonce: Uint32Array
    g: number
    dh_prime: ArrayBuffer
    g_a: ArrayBuffer
    server_time: number
  }
}

export type Client_DH_Inner_Data =
  | Client_DH_Inner_Data.client_DH_inner_data


export namespace Client_DH_Inner_Data {
  export type client_DH_inner_data = {
    _: 'client_DH_inner_data'
    nonce: Uint32Array
    server_nonce: Uint32Array
    retry_id: string
    g_b: ArrayBuffer
  }
}

export type Set_client_DH_params_answer =
  | Set_client_DH_params_answer.dh_gen_ok
  | Set_client_DH_params_answer.dh_gen_retry
  | Set_client_DH_params_answer.dh_gen_fail


export namespace Set_client_DH_params_answer {
  export type dh_gen_ok = {
    _: 'dh_gen_ok'
    nonce: Uint32Array
    server_nonce: Uint32Array
    new_nonce_hash1: Uint32Array
  }
  export type dh_gen_retry = {
    _: 'dh_gen_retry'
    nonce: Uint32Array
    server_nonce: Uint32Array
    new_nonce_hash2: Uint32Array
  }
  export type dh_gen_fail = {
    _: 'dh_gen_fail'
    nonce: Uint32Array
    server_nonce: Uint32Array
    new_nonce_hash3: Uint32Array
  }
}

export type RpcResult =
  | RpcResult.rpc_result


export namespace RpcResult {
  export type rpc_result = {
    _: 'rpc_result'
    req_msg_id: string
    result: any
  }
}

export type RpcError =
  | RpcError.rpc_error


export namespace RpcError {
  export type rpc_error = {
    _: 'rpc_error'
    error_code: number
    error_message: string
  }
}

export type RpcDropAnswer =
  | RpcDropAnswer.rpc_answer_unknown
  | RpcDropAnswer.rpc_answer_dropped_running
  | RpcDropAnswer.rpc_answer_dropped


export namespace RpcDropAnswer {
  export type rpc_answer_unknown = {
    _: 'rpc_answer_unknown'
  }
  export type rpc_answer_dropped_running = {
    _: 'rpc_answer_dropped_running'
  }
  export type rpc_answer_dropped = {
    _: 'rpc_answer_dropped'
    msg_id: string
    seq_no: number
    bytes: number
  }
}

export type FutureSalt =
  | FutureSalt.future_salt


export namespace FutureSalt {
  export type future_salt = {
    _: 'future_salt'
    valid_since: number
    valid_until: number
    salt: string
  }
}

export type FutureSalts =
  | FutureSalts.future_salts


export namespace FutureSalts {
  export type future_salts = {
    _: 'future_salts'
    req_msg_id: string
    now: number
    salts: FutureSalt.future_salt[]
  }
}

export type Pong =
  | Pong.pong


export namespace Pong {
  export type pong = {
    _: 'pong'
    msg_id: string
    ping_id: string
  }
}

export type NewSession =
  | NewSession.new_session_created


export namespace NewSession {
  export type new_session_created = {
    _: 'new_session_created'
    first_msg_id: string
    unique_id: string
    server_salt: string
  }
}

export type MessageContainer =
  | MessageContainer.msg_container


export namespace MessageContainer {
  export type msg_container = {
    _: 'msg_container'
    messages: Message[]
  }
}

export type Message =
  | Message.message


export namespace Message {
  export type message = {
    _: 'message'
    msg_id: string
    seqno: number
    bytes: number
    body: any
  }
}

export type MessageCopy =
  | MessageCopy.msg_copy


export namespace MessageCopy {
  export type msg_copy = {
    _: 'msg_copy'
    orig_message: Message
  }
}

export type Object =
  | Object.gzip_packed


export namespace Object {
  export type gzip_packed = {
    _: 'gzip_packed'
    packed_data: ArrayBuffer
  }
}

export type MsgsAck =
  | MsgsAck.msgs_ack


export namespace MsgsAck {
  export type msgs_ack = {
    _: 'msgs_ack'
    msg_ids: string[]
  }
}

export type BadMsgNotification =
  | BadMsgNotification.bad_msg_notification
  | BadMsgNotification.bad_server_salt


export namespace BadMsgNotification {
  export type bad_msg_notification = {
    _: 'bad_msg_notification'
    bad_msg_id: string
    bad_msg_seqno: number
    error_code: number
  }
  export type bad_server_salt = {
    _: 'bad_server_salt'
    bad_msg_id: string
    bad_msg_seqno: number
    error_code: number
    new_server_salt: string
  }
}

export type MsgResendReq =
  | MsgResendReq.msg_resend_req
  | MsgResendReq.msg_resend_ans_req


export namespace MsgResendReq {
  export type msg_resend_req = {
    _: 'msg_resend_req'
    msg_ids: string[]
  }
  export type msg_resend_ans_req = {
    _: 'msg_resend_ans_req'
    msg_ids: string[]
  }
}

export type MsgsStateReq =
  | MsgsStateReq.msgs_state_req


export namespace MsgsStateReq {
  export type msgs_state_req = {
    _: 'msgs_state_req'
    msg_ids: string[]
  }
}

export type MsgsStateInfo =
  | MsgsStateInfo.msgs_state_info


export namespace MsgsStateInfo {
  export type msgs_state_info = {
    _: 'msgs_state_info'
    req_msg_id: string
    info: ArrayBuffer
  }
}

export type MsgsAllInfo =
  | MsgsAllInfo.msgs_all_info


export namespace MsgsAllInfo {
  export type msgs_all_info = {
    _: 'msgs_all_info'
    msg_ids: string[]
    info: ArrayBuffer
  }
}

export type MsgDetailedInfo =
  | MsgDetailedInfo.msg_detailed_info
  | MsgDetailedInfo.msg_new_detailed_info


export namespace MsgDetailedInfo {
  export type msg_detailed_info = {
    _: 'msg_detailed_info'
    msg_id: string
    answer_msg_id: string
    bytes: number
    status: number
  }
  export type msg_new_detailed_info = {
    _: 'msg_new_detailed_info'
    answer_msg_id: string
    bytes: number
    status: number
  }
}

export type BindAuthKeyInner =
  | BindAuthKeyInner.bind_auth_key_inner


export namespace BindAuthKeyInner {
  export type bind_auth_key_inner = {
    _: 'bind_auth_key_inner'
    nonce: string
    temp_auth_key_id: string
    perm_auth_key_id: string
    temp_session_id: string
    expires_at: number
  }
}

export type DestroyAuthKeyRes =
  | DestroyAuthKeyRes.destroy_auth_key_ok
  | DestroyAuthKeyRes.destroy_auth_key_none
  | DestroyAuthKeyRes.destroy_auth_key_fail


export namespace DestroyAuthKeyRes {
  export type destroy_auth_key_ok = {
    _: 'destroy_auth_key_ok'
  }
  export type destroy_auth_key_none = {
    _: 'destroy_auth_key_none'
  }
  export type destroy_auth_key_fail = {
    _: 'destroy_auth_key_fail'
  }
}

export type DestroySessionRes =
  | DestroySessionRes.destroy_session_ok
  | DestroySessionRes.destroy_session_none


export namespace DestroySessionRes {
  export type destroy_session_ok = {
    _: 'destroy_session_ok'
    session_id: string
  }
  export type destroy_session_none = {
    _: 'destroy_session_none'
    session_id: string
  }
}

export interface ConstructorDeclMap {
  'resPQ': ResPQ.resPQ
  'p_q_inner_data': P_Q_inner_data.p_q_inner_data
  'p_q_inner_data_dc': P_Q_inner_data.p_q_inner_data_dc
  'p_q_inner_data_temp': P_Q_inner_data.p_q_inner_data_temp
  'p_q_inner_data_temp_dc': P_Q_inner_d.p_q_inner_data_temp_dc
  'server_DH_params_fail': Server_DH_Params.server_DH_params_fail
  'server_DH_params_ok': Server_DH_Params.server_DH_params_ok
  'server_DH_inner_data': Server_DH_inner_data.server_DH_inner_data
  'client_DH_inner_data': Client_DH_Inner_Data.client_DH_inner_data
  'dh_gen_ok': Set_client_DH_params_answer.dh_gen_ok
  'dh_gen_retry': Set_client_DH_params_answer.dh_gen_retry
  'dh_gen_fail': Set_client_DH_params_answer.dh_gen_fail
  'rpc_result': RpcResult.rpc_result
  'rpc_error': RpcError.rpc_error
  'rpc_answer_unknown': RpcDropAnswer.rpc_answer_unknown
  'rpc_answer_dropped_running': RpcDropAnswer.rpc_answer_dropped_running
  'rpc_answer_dropped': RpcDropAnswer.rpc_answer_dropped
  'future_salt': FutureSalt.future_salt
  'future_salts': FutureSalts.future_salts
  'pong': Pong.pong
  'new_session_created': NewSession.new_session_created
  'msg_container': MessageContainer.msg_container
  'message': Message.message
  'msg_copy': MessageCopy.msg_copy
  'gzip_packed': Object.gzip_packed
  'msgs_ack': MsgsAck.msgs_ack
  'bad_msg_notification': BadMsgNotification.bad_msg_notification
  'bad_server_salt': BadMsgNotification.bad_server_salt
  'msg_resend_req': MsgResendReq.msg_resend_req
  'msg_resend_ans_req': MsgResendReq.msg_resend_ans_req
  'msgs_state_req': MsgsStateReq.msgs_state_req
  'msgs_state_info': MsgsStateInfo.msgs_state_info
  'msgs_all_info': MsgsAllInfo.msgs_all_info
  'msg_detailed_info': MsgDetailedInfo.msg_detailed_info
  'msg_new_detailed_info': MsgDetailedInfo.msg_new_detailed_info
  'bind_auth_key_inner': BindAuthKeyInner.bind_auth_key_inner
  'destroy_auth_key_ok': DestroyAuthKeyRes.destroy_auth_key_ok
  'destroy_auth_key_none': DestroyAuthKeyRes.destroy_auth_key_none
  'destroy_auth_key_fail': DestroyAuthKeyRes.destroy_auth_key_fail
  'destroy_session_ok': DestroySessionRes.destroy_session_ok
  'destroy_session_none': DestroySessionRes.destroy_session_none
}

/* METHODS */

export type Req_pq = {
  nonce: Uint32Array
}

export type Req_pq_multi = {
  nonce: Uint32Array
}

export type Req_DH_params = {
  nonce: Uint32Array
  server_nonce: Uint32Array
  p: ArrayBuffer
  q: ArrayBuffer
  public_key_fingerprint: string
  encrypted_data: ArrayBuffer
}

export type Set_client_DH_params = {
  nonce: Uint32Array
  server_nonce: Uint32Array
  encrypted_data: ArrayBuffer
}

export type Rpc_drop_answer = {
  req_msg_id: string
}

export type Get_future_salts = {
  num: number
}

export type Ping = {
  ping_id: string
}

export type Ping_delay_disconnect = {
  ping_id: string
  disconnect_delay: number
}

export type Http_wait = {
  max_delay: number
  wait_after: number
  max_wait: number
}

export type Destroy_auth_key = {
}

export type Destroy_session = {
  session_id: string
}

export interface MethodDeclMap {
  'req_pq': { req: Req_pq, res: ResPQ }
  'req_pq_multi': { req: Req_pq_multi, res: ResPQ }
  'req_DH_params': { req: Req_DH_params, res: Server_DH_Params }
  'set_client_DH_params': { req: Set_client_DH_params, res: Set_client_DH_params_answer }
  'rpc_drop_answer': { req: Rpc_drop_answer, res: RpcDropAnswer }
  'get_future_salts': { req: Get_future_salts, res: FutureSalts }
  'ping': { req: Ping, res: Pong }
  'ping_delay_disconnect': { req: Ping_delay_disconnect, res: Pong }
  'http_wait': { req: Http_wait, res: any }
  'destroy_auth_key': { req: Destroy_auth_key, res: DestroyAuthKeyRes }
  'destroy_session': { req: Destroy_session, res: DestroySessionRes }
}
