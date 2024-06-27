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
/* Source: layer166.json (md5: 3ea45fdb3d67937a5478631e6bd0e5dd)                           */
/* Time: Wednesday, 01 November 2023 12:55:51 (UTC)                                        */
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

const _boolFalse = () => false
const _boolTrue = () => true
const _true = () => true
const _vector: any = () => ({ _: 'vector' })
const _error: any = () => ({ _: 'error', code: i32(), text: str() })
const _null = () => null
const _inputPeerEmpty: any = () => ({ _: 'inputPeerEmpty' })
const _inputPeerSelf: any = () => ({ _: 'inputPeerSelf' })
const _inputPeerChat: any = () => ({ _: 'inputPeerChat', chat_id: i64() })
const _inputPeerUser: any = () => ({ _: 'inputPeerUser', user_id: i64(), access_hash: i64() })
const _inputPeerChannel: any = () => ({ _: 'inputPeerChannel', channel_id: i64(), access_hash: i64() })
const _inputPeerUserFromMessage: any = () => ({ _: 'inputPeerUserFromMessage', peer: obj(), msg_id: i32(), user_id: i64() })
const _inputPeerChannelFromMessage: any = () => ({ _: 'inputPeerChannelFromMessage', peer: obj(), msg_id: i32(), channel_id: i64() })
const _inputUserEmpty: any = () => ({ _: 'inputUserEmpty' })
const _inputUserSelf: any = () => ({ _: 'inputUserSelf' })
const _inputUser: any = () => ({ _: 'inputUser', user_id: i64(), access_hash: i64() })
const _inputUserFromMessage: any = () => ({ _: 'inputUserFromMessage', peer: obj(), msg_id: i32(), user_id: i64() })
const _inputPhoneContact: any = () => ({ _: 'inputPhoneContact', client_id: i64(), phone: str(), first_name: str(), last_name: str() })
const _inputFile: any = () => ({ _: 'inputFile', id: i64(), parts: i32(), name: str(), md5_checksum: str() })
const _inputFileBig: any = () => ({ _: 'inputFileBig', id: i64(), parts: i32(), name: str() })
const _inputMediaEmpty: any = () => ({ _: 'inputMediaEmpty' })
const _inputMediaUploadedPhoto = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaUploadedPhoto' }
  const flags = i32()
  result.spoiler = !!(flags & 0x4)
  result.file = obj()
  if (flags & 0x1) result.stickers = vector(obj)
  if (flags & 0x2) result.ttl_seconds = i32()
  return result
}
const _inputMediaPhoto = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaPhoto' }
  const flags = i32()
  result.spoiler = !!(flags & 0x2)
  result.id = obj()
  if (flags & 0x1) result.ttl_seconds = i32()
  return result
}
const _inputMediaGeoPoint: any = () => ({ _: 'inputMediaGeoPoint', geo_point: obj() })
const _inputMediaContact: any = () => ({ _: 'inputMediaContact', phone_number: str(), first_name: str(), last_name: str(), vcard: str() })
const _inputMediaUploadedDocument = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaUploadedDocument' }
  const flags = i32()
  result.nosound_video = !!(flags & 0x8)
  result.force_file = !!(flags & 0x10)
  result.spoiler = !!(flags & 0x20)
  result.file = obj()
  if (flags & 0x4) result.thumb = obj()
  result.mime_type = str()
  result.attributes = vector(obj)
  if (flags & 0x1) result.stickers = vector(obj)
  if (flags & 0x2) result.ttl_seconds = i32()
  return result
}
const _inputMediaDocument = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaDocument' }
  const flags = i32()
  result.spoiler = !!(flags & 0x4)
  result.id = obj()
  if (flags & 0x1) result.ttl_seconds = i32()
  if (flags & 0x2) result.query = str()
  return result
}
const _inputMediaVenue: any = () => ({ _: 'inputMediaVenue', geo_point: obj(), title: str(), address: str(), provider: str(), venue_id: str(), venue_type: str() })
const _inputMediaPhotoExternal = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaPhotoExternal' }
  const flags = i32()
  result.spoiler = !!(flags & 0x2)
  result.url = str()
  if (flags & 0x1) result.ttl_seconds = i32()
  return result
}
const _inputMediaDocumentExternal = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaDocumentExternal' }
  const flags = i32()
  result.spoiler = !!(flags & 0x2)
  result.url = str()
  if (flags & 0x1) result.ttl_seconds = i32()
  return result
}
const _inputMediaGame: any = () => ({ _: 'inputMediaGame', id: obj() })
const _inputMediaInvoice = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaInvoice' }
  const flags = i32()
  result.title = str()
  result.description = str()
  if (flags & 0x1) result.photo = obj()
  result.invoice = obj()
  result.payload = bytes()
  result.provider = str()
  result.provider_data = obj()
  if (flags & 0x2) result.start_param = str()
  if (flags & 0x4) result.extended_media = obj()
  return result
}
const _inputMediaGeoLive = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaGeoLive' }
  const flags = i32()
  result.stopped = !!(flags & 0x1)
  result.geo_point = obj()
  if (flags & 0x4) result.heading = i32()
  if (flags & 0x2) result.period = i32()
  if (flags & 0x8) result.proximity_notification_radius = i32()
  return result
}
const _inputMediaPoll = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaPoll' }
  const flags = i32()
  result.poll = obj()
  if (flags & 0x1) result.correct_answers = vector(bytes)
  if (flags & 0x2) result.solution = str()
  if (flags & 0x2) result.solution_entities = vector(obj)
  return result
}
const _inputMediaDice: any = () => ({ _: 'inputMediaDice', emoticon: str() })
const _inputMediaStory: any = () => ({ _: 'inputMediaStory', peer: obj(), id: i32() })
const _inputMediaWebPage = (): any => {
  const result: Record<string, unknown> = { _: 'inputMediaWebPage' }
  const flags = i32()
  result.force_large_media = !!(flags & 0x1)
  result.force_small_media = !!(flags & 0x2)
  result.optional = !!(flags & 0x4)
  result.url = str()
  return result
}
const _inputChatPhotoEmpty: any = () => ({ _: 'inputChatPhotoEmpty' })
const _inputChatUploadedPhoto = (): any => {
  const result: Record<string, unknown> = { _: 'inputChatUploadedPhoto' }
  const flags = i32()
  if (flags & 0x1) result.file = obj()
  if (flags & 0x2) result.video = obj()
  if (flags & 0x4) result.video_start_ts = f64()
  if (flags & 0x8) result.video_emoji_markup = obj()
  return result
}
const _inputChatPhoto: any = () => ({ _: 'inputChatPhoto', id: obj() })
const _inputGeoPointEmpty: any = () => ({ _: 'inputGeoPointEmpty' })
const _inputGeoPoint = (): any => {
  const result: Record<string, unknown> = { _: 'inputGeoPoint' }
  const flags = i32()
  result.lat = f64()
  result.long = f64()
  if (flags & 0x1) result.accuracy_radius = i32()
  return result
}
const _inputPhotoEmpty: any = () => ({ _: 'inputPhotoEmpty' })
const _inputPhoto: any = () => ({ _: 'inputPhoto', id: i64(), access_hash: i64(), file_reference: bytes() })
const _inputFileLocation: any = () => ({ _: 'inputFileLocation', volume_id: i64(), local_id: i32(), secret: i64(), file_reference: bytes() })
const _inputEncryptedFileLocation: any = () => ({ _: 'inputEncryptedFileLocation', id: i64(), access_hash: i64() })
const _inputDocumentFileLocation: any = () => ({ _: 'inputDocumentFileLocation', id: i64(), access_hash: i64(), file_reference: bytes(), thumb_size: str() })
const _inputSecureFileLocation: any = () => ({ _: 'inputSecureFileLocation', id: i64(), access_hash: i64() })
const _inputTakeoutFileLocation: any = () => ({ _: 'inputTakeoutFileLocation' })
const _inputPhotoFileLocation: any = () => ({ _: 'inputPhotoFileLocation', id: i64(), access_hash: i64(), file_reference: bytes(), thumb_size: str() })
const _inputPhotoLegacyFileLocation: any = () => ({ _: 'inputPhotoLegacyFileLocation', id: i64(), access_hash: i64(), file_reference: bytes(), volume_id: i64(), local_id: i32(), secret: i64() })
const _inputPeerPhotoFileLocation = (): any => {
  const result: Record<string, unknown> = { _: 'inputPeerPhotoFileLocation' }
  const flags = i32()
  result.big = !!(flags & 0x1)
  result.peer = obj()
  result.photo_id = i64()
  return result
}
const _inputStickerSetThumb: any = () => ({ _: 'inputStickerSetThumb', stickerset: obj(), thumb_version: i32() })
const _inputGroupCallStream = (): any => {
  const result: Record<string, unknown> = { _: 'inputGroupCallStream' }
  const flags = i32()
  result.call = obj()
  result.time_ms = i64()
  result.scale = i32()
  if (flags & 0x1) result.video_channel = i32()
  if (flags & 0x1) result.video_quality = i32()
  return result
}
const _peerUser: any = () => ({ _: 'peerUser', user_id: i64() })
const _peerChat: any = () => ({ _: 'peerChat', chat_id: i64() })
const _peerChannel: any = () => ({ _: 'peerChannel', channel_id: i64() })
const _storageFileUnknown: any = () => ({ _: 'storage.fileUnknown' })
const _storageFilePartial: any = () => ({ _: 'storage.filePartial' })
const _storageFileJpeg: any = () => ({ _: 'storage.fileJpeg' })
const _storageFileGif: any = () => ({ _: 'storage.fileGif' })
const _storageFilePng: any = () => ({ _: 'storage.filePng' })
const _storageFilePdf: any = () => ({ _: 'storage.filePdf' })
const _storageFileMp3: any = () => ({ _: 'storage.fileMp3' })
const _storageFileMov: any = () => ({ _: 'storage.fileMov' })
const _storageFileMp4: any = () => ({ _: 'storage.fileMp4' })
const _storageFileWebp: any = () => ({ _: 'storage.fileWebp' })
const _userEmpty: any = () => ({ _: 'userEmpty', id: i64() })
const _user = (): any => {
  const result: Record<string, unknown> = { _: 'user' }
  const flags = i32()
  result.self = !!(flags & 0x400)
  result.contact = !!(flags & 0x800)
  result.mutual_contact = !!(flags & 0x1000)
  result.deleted = !!(flags & 0x2000)
  result.bot = !!(flags & 0x4000)
  result.bot_chat_history = !!(flags & 0x8000)
  result.bot_nochats = !!(flags & 0x10000)
  result.verified = !!(flags & 0x20000)
  result.restricted = !!(flags & 0x40000)
  result.min = !!(flags & 0x100000)
  result.bot_inline_geo = !!(flags & 0x200000)
  result.support = !!(flags & 0x800000)
  result.scam = !!(flags & 0x1000000)
  result.apply_min_photo = !!(flags & 0x2000000)
  result.fake = !!(flags & 0x4000000)
  result.bot_attach_menu = !!(flags & 0x8000000)
  result.premium = !!(flags & 0x10000000)
  result.attach_menu_enabled = !!(flags & 0x20000000)
  const flags2 = i32()
  result.bot_can_edit = !!(flags2 & 0x2)
  result.close_friend = !!(flags2 & 0x4)
  result.stories_hidden = !!(flags2 & 0x8)
  result.stories_unavailable = !!(flags2 & 0x10)
  result.id = i64()
  if (flags & 0x1) result.access_hash = i64()
  if (flags & 0x2) result.first_name = str()
  if (flags & 0x4) result.last_name = str()
  if (flags & 0x8) result.username = str()
  if (flags & 0x10) result.phone = str()
  if (flags & 0x20) result.photo = obj()
  if (flags & 0x40) result.status = obj()
  if (flags & 0x4000) result.bot_info_version = i32()
  if (flags & 0x40000) result.restriction_reason = vector(obj)
  if (flags & 0x80000) result.bot_inline_placeholder = str()
  if (flags & 0x400000) result.lang_code = str()
  if (flags & 0x40000000) result.emoji_status = obj()
  if (flags2 & 0x1) result.usernames = vector(obj)
  if (flags2 & 0x20) result.stories_max_id = i32()
  if (flags2 & 0x80) result.color = i32()
  if (flags2 & 0x40) result.background_emoji_id = i64()
  return result
}
const _userProfilePhotoEmpty: any = () => ({ _: 'userProfilePhotoEmpty' })
const _userProfilePhoto = (): any => {
  const result: Record<string, unknown> = { _: 'userProfilePhoto' }
  const flags = i32()
  result.has_video = !!(flags & 0x1)
  result.personal = !!(flags & 0x4)
  result.photo_id = i64()
  if (flags & 0x2) result.stripped_thumb = bytes()
  result.dc_id = i32()
  return result
}
const _userStatusEmpty: any = () => ({ _: 'userStatusEmpty' })
const _userStatusOnline: any = () => ({ _: 'userStatusOnline', expires: i32() })
const _userStatusOffline: any = () => ({ _: 'userStatusOffline', was_online: i32() })
const _userStatusRecently: any = () => ({ _: 'userStatusRecently' })
const _userStatusLastWeek: any = () => ({ _: 'userStatusLastWeek' })
const _userStatusLastMonth: any = () => ({ _: 'userStatusLastMonth' })
const _chatEmpty: any = () => ({ _: 'chatEmpty', id: i64() })
const _chat = (): any => {
  const result: Record<string, unknown> = { _: 'chat' }
  const flags = i32()
  result.creator = !!(flags & 0x1)
  result.left = !!(flags & 0x4)
  result.deactivated = !!(flags & 0x20)
  result.call_active = !!(flags & 0x800000)
  result.call_not_empty = !!(flags & 0x1000000)
  result.noforwards = !!(flags & 0x2000000)
  result.id = i64()
  result.title = str()
  result.photo = obj()
  result.participants_count = i32()
  result.date = i32()
  result.version = i32()
  if (flags & 0x40) result.migrated_to = obj()
  if (flags & 0x4000) result.admin_rights = obj()
  if (flags & 0x40000) result.default_banned_rights = obj()
  return result
}
const _chatForbidden: any = () => ({ _: 'chatForbidden', id: i64(), title: str() })
const _channel = (): any => {
  const result: Record<string, unknown> = { _: 'channel' }
  const flags = i32()
  result.creator = !!(flags & 0x1)
  result.left = !!(flags & 0x4)
  result.broadcast = !!(flags & 0x20)
  result.verified = !!(flags & 0x80)
  result.megagroup = !!(flags & 0x100)
  result.restricted = !!(flags & 0x200)
  result.signatures = !!(flags & 0x800)
  result.min = !!(flags & 0x1000)
  result.scam = !!(flags & 0x80000)
  result.has_link = !!(flags & 0x100000)
  result.has_geo = !!(flags & 0x200000)
  result.slowmode_enabled = !!(flags & 0x400000)
  result.call_active = !!(flags & 0x800000)
  result.call_not_empty = !!(flags & 0x1000000)
  result.fake = !!(flags & 0x2000000)
  result.gigagroup = !!(flags & 0x4000000)
  result.noforwards = !!(flags & 0x8000000)
  result.join_to_send = !!(flags & 0x10000000)
  result.join_request = !!(flags & 0x20000000)
  result.forum = !!(flags & 0x40000000)
  const flags2 = i32()
  result.stories_hidden = !!(flags2 & 0x2)
  result.stories_hidden_min = !!(flags2 & 0x4)
  result.stories_unavailable = !!(flags2 & 0x8)
  result.id = i64()
  if (flags & 0x2000) result.access_hash = i64()
  result.title = str()
  if (flags & 0x40) result.username = str()
  result.photo = obj()
  result.date = i32()
  if (flags & 0x200) result.restriction_reason = vector(obj)
  if (flags & 0x4000) result.admin_rights = obj()
  if (flags & 0x8000) result.banned_rights = obj()
  if (flags & 0x40000) result.default_banned_rights = obj()
  if (flags & 0x20000) result.participants_count = i32()
  if (flags2 & 0x1) result.usernames = vector(obj)
  if (flags2 & 0x10) result.stories_max_id = i32()
  if (flags2 & 0x40) result.color = i32()
  if (flags2 & 0x20) result.background_emoji_id = i64()
  return result
}
const _channelForbidden = (): any => {
  const result: Record<string, unknown> = { _: 'channelForbidden' }
  const flags = i32()
  result.broadcast = !!(flags & 0x20)
  result.megagroup = !!(flags & 0x100)
  result.id = i64()
  result.access_hash = i64()
  result.title = str()
  if (flags & 0x10000) result.until_date = i32()
  return result
}
const _chatFull = (): any => {
  const result: Record<string, unknown> = { _: 'chatFull' }
  const flags = i32()
  result.can_set_username = !!(flags & 0x80)
  result.has_scheduled = !!(flags & 0x100)
  result.translations_disabled = !!(flags & 0x80000)
  result.id = i64()
  result.about = str()
  result.participants = obj()
  if (flags & 0x4) result.chat_photo = obj()
  result.notify_settings = obj()
  if (flags & 0x2000) result.exported_invite = obj()
  if (flags & 0x8) result.bot_info = vector(obj)
  if (flags & 0x40) result.pinned_msg_id = i32()
  if (flags & 0x800) result.folder_id = i32()
  if (flags & 0x1000) result.call = obj()
  if (flags & 0x4000) result.ttl_period = i32()
  if (flags & 0x8000) result.groupcall_default_join_as = obj()
  if (flags & 0x10000) result.theme_emoticon = str()
  if (flags & 0x20000) result.requests_pending = i32()
  if (flags & 0x20000) result.recent_requesters = vector(i64)
  if (flags & 0x40000) result.available_reactions = obj()
  return result
}
const _channelFull = (): any => {
  const result: Record<string, unknown> = { _: 'channelFull' }
  const flags = i32()
  result.can_view_participants = !!(flags & 0x8)
  result.can_set_username = !!(flags & 0x40)
  result.can_set_stickers = !!(flags & 0x80)
  result.hidden_prehistory = !!(flags & 0x400)
  result.can_set_location = !!(flags & 0x10000)
  result.has_scheduled = !!(flags & 0x80000)
  result.can_view_stats = !!(flags & 0x100000)
  result.blocked = !!(flags & 0x400000)
  const flags2 = i32()
  result.can_delete_channel = !!(flags2 & 0x1)
  result.antispam = !!(flags2 & 0x2)
  result.participants_hidden = !!(flags2 & 0x4)
  result.translations_disabled = !!(flags2 & 0x8)
  result.stories_pinned_available = !!(flags2 & 0x20)
  result.id = i64()
  result.about = str()
  if (flags & 0x1) result.participants_count = i32()
  if (flags & 0x2) result.admins_count = i32()
  if (flags & 0x4) result.kicked_count = i32()
  if (flags & 0x4) result.banned_count = i32()
  if (flags & 0x2000) result.online_count = i32()
  result.read_inbox_max_id = i32()
  result.read_outbox_max_id = i32()
  result.unread_count = i32()
  result.chat_photo = obj()
  result.notify_settings = obj()
  if (flags & 0x800000) result.exported_invite = obj()
  result.bot_info = vector(obj)
  if (flags & 0x10) result.migrated_from_chat_id = i64()
  if (flags & 0x10) result.migrated_from_max_id = i32()
  if (flags & 0x20) result.pinned_msg_id = i32()
  if (flags & 0x100) result.stickerset = obj()
  if (flags & 0x200) result.available_min_id = i32()
  if (flags & 0x800) result.folder_id = i32()
  if (flags & 0x4000) result.linked_chat_id = i64()
  if (flags & 0x8000) result.location = obj()
  if (flags & 0x20000) result.slowmode_seconds = i32()
  if (flags & 0x40000) result.slowmode_next_send_date = i32()
  if (flags & 0x1000) result.stats_dc = i32()
  result.pts = i32()
  if (flags & 0x200000) result.call = obj()
  if (flags & 0x1000000) result.ttl_period = i32()
  if (flags & 0x2000000) result.pending_suggestions = vector(str)
  if (flags & 0x4000000) result.groupcall_default_join_as = obj()
  if (flags & 0x8000000) result.theme_emoticon = str()
  if (flags & 0x10000000) result.requests_pending = i32()
  if (flags & 0x10000000) result.recent_requesters = vector(i64)
  if (flags & 0x20000000) result.default_send_as = obj()
  if (flags & 0x40000000) result.available_reactions = obj()
  if (flags2 & 0x10) result.stories = obj()
  return result
}
const _chatParticipant: any = () => ({ _: 'chatParticipant', user_id: i64(), inviter_id: i64(), date: i32() })
const _chatParticipantCreator: any = () => ({ _: 'chatParticipantCreator', user_id: i64() })
const _chatParticipantAdmin: any = () => ({ _: 'chatParticipantAdmin', user_id: i64(), inviter_id: i64(), date: i32() })
const _chatParticipantsForbidden = (): any => {
  const result: Record<string, unknown> = { _: 'chatParticipantsForbidden' }
  const flags = i32()
  result.chat_id = i64()
  if (flags & 0x1) result.self_participant = obj()
  return result
}
const _chatParticipants: any = () => ({ _: 'chatParticipants', chat_id: i64(), participants: vector(obj), version: i32() })
const _chatPhotoEmpty: any = () => ({ _: 'chatPhotoEmpty' })
const _chatPhoto = (): any => {
  const result: Record<string, unknown> = { _: 'chatPhoto' }
  const flags = i32()
  result.has_video = !!(flags & 0x1)
  result.photo_id = i64()
  if (flags & 0x2) result.stripped_thumb = bytes()
  result.dc_id = i32()
  return result
}
const _messageEmpty = (): any => {
  const result: Record<string, unknown> = { _: 'messageEmpty' }
  const flags = i32()
  result.id = i32()
  if (flags & 0x1) result.peer_id = obj()
  return result
}
const _message = (): any => {
  const result: Record<string, unknown> = { _: 'message' }
  const flags = i32()
  result.out = !!(flags & 0x2)
  result.mentioned = !!(flags & 0x10)
  result.media_unread = !!(flags & 0x20)
  result.silent = !!(flags & 0x2000)
  result.post = !!(flags & 0x4000)
  result.from_scheduled = !!(flags & 0x40000)
  result.legacy = !!(flags & 0x80000)
  result.edit_hide = !!(flags & 0x200000)
  result.pinned = !!(flags & 0x1000000)
  result.noforwards = !!(flags & 0x4000000)
  result.invert_media = !!(flags & 0x8000000)
  result.id = i32()
  if (flags & 0x100) result.from_id = obj()
  result.peer_id = obj()
  if (flags & 0x4) result.fwd_from = obj()
  if (flags & 0x800) result.via_bot_id = i64()
  if (flags & 0x8) result.reply_to = obj()
  result.date = i32()
  result.message = str()
  if (flags & 0x200) result.media = obj()
  if (flags & 0x40) result.reply_markup = obj()
  if (flags & 0x80) result.entities = vector(obj)
  if (flags & 0x400) result.views = i32()
  if (flags & 0x400) result.forwards = i32()
  if (flags & 0x800000) result.replies = obj()
  if (flags & 0x8000) result.edit_date = i32()
  if (flags & 0x10000) result.post_author = str()
  if (flags & 0x20000) result.grouped_id = i64()
  if (flags & 0x100000) result.reactions = obj()
  if (flags & 0x400000) result.restriction_reason = vector(obj)
  if (flags & 0x2000000) result.ttl_period = i32()
  return result
}
const _messageService = (): any => {
  const result: Record<string, unknown> = { _: 'messageService' }
  const flags = i32()
  result.out = !!(flags & 0x2)
  result.mentioned = !!(flags & 0x10)
  result.media_unread = !!(flags & 0x20)
  result.silent = !!(flags & 0x2000)
  result.post = !!(flags & 0x4000)
  result.legacy = !!(flags & 0x80000)
  result.id = i32()
  if (flags & 0x100) result.from_id = obj()
  result.peer_id = obj()
  if (flags & 0x8) result.reply_to = obj()
  result.date = i32()
  result.action = obj()
  if (flags & 0x2000000) result.ttl_period = i32()
  return result
}
const _messageMediaEmpty: any = () => ({ _: 'messageMediaEmpty' })
const _messageMediaPhoto = (): any => {
  const result: Record<string, unknown> = { _: 'messageMediaPhoto' }
  const flags = i32()
  result.spoiler = !!(flags & 0x8)
  if (flags & 0x1) result.photo = obj()
  if (flags & 0x4) result.ttl_seconds = i32()
  return result
}
const _messageMediaGeo: any = () => ({ _: 'messageMediaGeo', geo: obj() })
const _messageMediaContact: any = () => ({ _: 'messageMediaContact', phone_number: str(), first_name: str(), last_name: str(), vcard: str(), user_id: i64() })
const _messageMediaUnsupported: any = () => ({ _: 'messageMediaUnsupported' })
const _messageMediaDocument = (): any => {
  const result: Record<string, unknown> = { _: 'messageMediaDocument' }
  const flags = i32()
  result.nopremium = !!(flags & 0x8)
  result.spoiler = !!(flags & 0x10)
  if (flags & 0x1) result.document = obj()
  if (flags & 0x20) result.alt_document = obj()
  if (flags & 0x4) result.ttl_seconds = i32()
  return result
}
const _messageMediaWebPage = (): any => {
  const result: Record<string, unknown> = { _: 'messageMediaWebPage' }
  const flags = i32()
  result.force_large_media = !!(flags & 0x1)
  result.force_small_media = !!(flags & 0x2)
  result.manual = !!(flags & 0x8)
  result.safe = !!(flags & 0x10)
  result.webpage = obj()
  return result
}
const _messageMediaVenue: any = () => ({ _: 'messageMediaVenue', geo: obj(), title: str(), address: str(), provider: str(), venue_id: str(), venue_type: str() })
const _messageMediaGame: any = () => ({ _: 'messageMediaGame', game: obj() })
const _messageMediaInvoice = (): any => {
  const result: Record<string, unknown> = { _: 'messageMediaInvoice' }
  const flags = i32()
  result.shipping_address_requested = !!(flags & 0x2)
  result.test = !!(flags & 0x8)
  result.title = str()
  result.description = str()
  if (flags & 0x1) result.photo = obj()
  if (flags & 0x4) result.receipt_msg_id = i32()
  result.currency = str()
  result.total_amount = i64()
  result.start_param = str()
  if (flags & 0x10) result.extended_media = obj()
  return result
}
const _messageMediaGeoLive = (): any => {
  const result: Record<string, unknown> = { _: 'messageMediaGeoLive' }
  const flags = i32()
  result.geo = obj()
  if (flags & 0x1) result.heading = i32()
  result.period = i32()
  if (flags & 0x2) result.proximity_notification_radius = i32()
  return result
}
const _messageMediaPoll: any = () => ({ _: 'messageMediaPoll', poll: obj(), results: obj() })
const _messageMediaDice: any = () => ({ _: 'messageMediaDice', value: i32(), emoticon: str() })
const _messageMediaStory = (): any => {
  const result: Record<string, unknown> = { _: 'messageMediaStory' }
  const flags = i32()
  result.via_mention = !!(flags & 0x2)
  result.peer = obj()
  result.id = i32()
  if (flags & 0x1) result.story = obj()
  return result
}
const _messageMediaGiveaway = (): any => {
  const result: Record<string, unknown> = { _: 'messageMediaGiveaway' }
  const flags = i32()
  result.only_new_subscribers = !!(flags & 0x1)
  result.channels = vector(i64)
  if (flags & 0x2) result.countries_iso2 = vector(str)
  result.quantity = i32()
  result.months = i32()
  result.until_date = i32()
  return result
}
const _messageActionEmpty: any = () => ({ _: 'messageActionEmpty' })
const _messageActionChatCreate: any = () => ({ _: 'messageActionChatCreate', title: str(), users: vector(i64) })
const _messageActionChatEditTitle: any = () => ({ _: 'messageActionChatEditTitle', title: str() })
const _messageActionChatEditPhoto: any = () => ({ _: 'messageActionChatEditPhoto', photo: obj() })
const _messageActionChatDeletePhoto: any = () => ({ _: 'messageActionChatDeletePhoto' })
const _messageActionChatAddUser: any = () => ({ _: 'messageActionChatAddUser', users: vector(i64) })
const _messageActionChatDeleteUser: any = () => ({ _: 'messageActionChatDeleteUser', user_id: i64() })
const _messageActionChatJoinedByLink: any = () => ({ _: 'messageActionChatJoinedByLink', inviter_id: i64() })
const _messageActionChannelCreate: any = () => ({ _: 'messageActionChannelCreate', title: str() })
const _messageActionChatMigrateTo: any = () => ({ _: 'messageActionChatMigrateTo', channel_id: i64() })
const _messageActionChannelMigrateFrom: any = () => ({ _: 'messageActionChannelMigrateFrom', title: str(), chat_id: i64() })
const _messageActionPinMessage: any = () => ({ _: 'messageActionPinMessage' })
const _messageActionHistoryClear: any = () => ({ _: 'messageActionHistoryClear' })
const _messageActionGameScore: any = () => ({ _: 'messageActionGameScore', game_id: i64(), score: i32() })
const _messageActionPaymentSentMe = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionPaymentSentMe' }
  const flags = i32()
  result.recurring_init = !!(flags & 0x4)
  result.recurring_used = !!(flags & 0x8)
  result.currency = str()
  result.total_amount = i64()
  result.payload = bytes()
  if (flags & 0x1) result.info = obj()
  if (flags & 0x2) result.shipping_option_id = str()
  result.charge = obj()
  return result
}
const _messageActionPaymentSent = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionPaymentSent' }
  const flags = i32()
  result.recurring_init = !!(flags & 0x4)
  result.recurring_used = !!(flags & 0x8)
  result.currency = str()
  result.total_amount = i64()
  if (flags & 0x1) result.invoice_slug = str()
  return result
}
const _messageActionPhoneCall = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionPhoneCall' }
  const flags = i32()
  result.video = !!(flags & 0x4)
  result.call_id = i64()
  if (flags & 0x1) result.reason = obj()
  if (flags & 0x2) result.duration = i32()
  return result
}
const _messageActionScreenshotTaken: any = () => ({ _: 'messageActionScreenshotTaken' })
const _messageActionCustomAction: any = () => ({ _: 'messageActionCustomAction', message: str() })
const _messageActionBotAllowed = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionBotAllowed' }
  const flags = i32()
  result.attach_menu = !!(flags & 0x2)
  result.from_request = !!(flags & 0x8)
  if (flags & 0x1) result.domain = str()
  if (flags & 0x4) result.app = obj()
  return result
}
const _messageActionSecureValuesSentMe: any = () => ({ _: 'messageActionSecureValuesSentMe', values: vector(obj), credentials: obj() })
const _messageActionSecureValuesSent: any = () => ({ _: 'messageActionSecureValuesSent', types: vector(obj) })
const _messageActionContactSignUp: any = () => ({ _: 'messageActionContactSignUp' })
const _messageActionGeoProximityReached: any = () => ({ _: 'messageActionGeoProximityReached', from_id: obj(), to_id: obj(), distance: i32() })
const _messageActionGroupCall = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionGroupCall' }
  const flags = i32()
  result.call = obj()
  if (flags & 0x1) result.duration = i32()
  return result
}
const _messageActionInviteToGroupCall: any = () => ({ _: 'messageActionInviteToGroupCall', call: obj(), users: vector(i64) })
const _messageActionSetMessagesTTL = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionSetMessagesTTL' }
  const flags = i32()
  result.period = i32()
  if (flags & 0x1) result.auto_setting_from = i64()
  return result
}
const _messageActionGroupCallScheduled: any = () => ({ _: 'messageActionGroupCallScheduled', call: obj(), schedule_date: i32() })
const _messageActionSetChatTheme: any = () => ({ _: 'messageActionSetChatTheme', emoticon: str() })
const _messageActionChatJoinedByRequest: any = () => ({ _: 'messageActionChatJoinedByRequest' })
const _messageActionWebViewDataSentMe: any = () => ({ _: 'messageActionWebViewDataSentMe', text: str(), data: str() })
const _messageActionWebViewDataSent: any = () => ({ _: 'messageActionWebViewDataSent', text: str() })
const _messageActionGiftPremium = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionGiftPremium' }
  const flags = i32()
  result.currency = str()
  result.amount = i64()
  result.months = i32()
  if (flags & 0x1) result.crypto_currency = str()
  if (flags & 0x1) result.crypto_amount = i64()
  return result
}
const _messageActionTopicCreate = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionTopicCreate' }
  const flags = i32()
  result.title = str()
  result.icon_color = i32()
  if (flags & 0x1) result.icon_emoji_id = i64()
  return result
}
const _messageActionTopicEdit = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionTopicEdit' }
  const flags = i32()
  if (flags & 0x1) result.title = str()
  if (flags & 0x2) result.icon_emoji_id = i64()
  if (flags & 0x4) result.closed = obj()
  if (flags & 0x8) result.hidden = obj()
  return result
}
const _messageActionSuggestProfilePhoto: any = () => ({ _: 'messageActionSuggestProfilePhoto', photo: obj() })
const _messageActionRequestedPeer: any = () => ({ _: 'messageActionRequestedPeer', button_id: i32(), peer: obj() })
const _messageActionSetChatWallPaper: any = () => ({ _: 'messageActionSetChatWallPaper', wallpaper: obj() })
const _messageActionSetSameChatWallPaper: any = () => ({ _: 'messageActionSetSameChatWallPaper', wallpaper: obj() })
const _messageActionGiftCode = (): any => {
  const result: Record<string, unknown> = { _: 'messageActionGiftCode' }
  const flags = i32()
  result.via_giveaway = !!(flags & 0x1)
  result.unclaimed = !!(flags & 0x4)
  if (flags & 0x2) result.boost_peer = obj()
  result.months = i32()
  result.slug = str()
  return result
}
const _messageActionGiveawayLaunch: any = () => ({ _: 'messageActionGiveawayLaunch' })
const _dialog = (): any => {
  const result: Record<string, unknown> = { _: 'dialog' }
  const flags = i32()
  result.pinned = !!(flags & 0x4)
  result.unread_mark = !!(flags & 0x8)
  result.peer = obj()
  result.top_message = i32()
  result.read_inbox_max_id = i32()
  result.read_outbox_max_id = i32()
  result.unread_count = i32()
  result.unread_mentions_count = i32()
  result.unread_reactions_count = i32()
  result.notify_settings = obj()
  if (flags & 0x1) result.pts = i32()
  if (flags & 0x2) result.draft = obj()
  if (flags & 0x10) result.folder_id = i32()
  if (flags & 0x20) result.ttl_period = i32()
  return result
}
const _dialogFolder = (): any => {
  const result: Record<string, unknown> = { _: 'dialogFolder' }
  const flags = i32()
  result.pinned = !!(flags & 0x4)
  result.folder = obj()
  result.peer = obj()
  result.top_message = i32()
  result.unread_muted_peers_count = i32()
  result.unread_unmuted_peers_count = i32()
  result.unread_muted_messages_count = i32()
  result.unread_unmuted_messages_count = i32()
  return result
}
const _photoEmpty: any = () => ({ _: 'photoEmpty', id: i64() })
const _photo = (): any => {
  const result: Record<string, unknown> = { _: 'photo' }
  const flags = i32()
  result.has_stickers = !!(flags & 0x1)
  result.id = i64()
  result.access_hash = i64()
  result.file_reference = bytes()
  result.date = i32()
  result.sizes = vector(obj)
  if (flags & 0x2) result.video_sizes = vector(obj)
  result.dc_id = i32()
  return result
}
const _photoSizeEmpty: any = () => ({ _: 'photoSizeEmpty', type: str() })
const _photoSize: any = () => ({ _: 'photoSize', type: str(), w: i32(), h: i32(), size: i32() })
const _photoCachedSize: any = () => ({ _: 'photoCachedSize', type: str(), w: i32(), h: i32(), bytes: bytes() })
const _photoStrippedSize: any = () => ({ _: 'photoStrippedSize', type: str(), bytes: bytes() })
const _photoSizeProgressive: any = () => ({ _: 'photoSizeProgressive', type: str(), w: i32(), h: i32(), sizes: vector(i32) })
const _photoPathSize: any = () => ({ _: 'photoPathSize', type: str(), bytes: bytes() })
const _geoPointEmpty: any = () => ({ _: 'geoPointEmpty' })
const _geoPoint = (): any => {
  const result: Record<string, unknown> = { _: 'geoPoint' }
  const flags = i32()
  result.long = f64()
  result.lat = f64()
  result.access_hash = i64()
  if (flags & 0x1) result.accuracy_radius = i32()
  return result
}
const _authSentCode = (): any => {
  const result: Record<string, unknown> = { _: 'auth.sentCode' }
  const flags = i32()
  result.type = obj()
  result.phone_code_hash = str()
  if (flags & 0x2) result.next_type = obj()
  if (flags & 0x4) result.timeout = i32()
  return result
}
const _authSentCodeSuccess: any = () => ({ _: 'auth.sentCodeSuccess', authorization: obj() })
const _authAuthorization = (): any => {
  const result: Record<string, unknown> = { _: 'auth.authorization' }
  const flags = i32()
  result.setup_password_required = !!(flags & 0x2)
  if (flags & 0x2) result.otherwise_relogin_days = i32()
  if (flags & 0x1) result.tmp_sessions = i32()
  if (flags & 0x4) result.future_auth_token = bytes()
  result.user = obj()
  return result
}
const _authAuthorizationSignUpRequired = (): any => {
  const result: Record<string, unknown> = { _: 'auth.authorizationSignUpRequired' }
  const flags = i32()
  if (flags & 0x1) result.terms_of_service = obj()
  return result
}
const _authExportedAuthorization: any = () => ({ _: 'auth.exportedAuthorization', id: i64(), bytes: bytes() })
const _inputNotifyPeer: any = () => ({ _: 'inputNotifyPeer', peer: obj() })
const _inputNotifyUsers: any = () => ({ _: 'inputNotifyUsers' })
const _inputNotifyChats: any = () => ({ _: 'inputNotifyChats' })
const _inputNotifyBroadcasts: any = () => ({ _: 'inputNotifyBroadcasts' })
const _inputNotifyForumTopic: any = () => ({ _: 'inputNotifyForumTopic', peer: obj(), top_msg_id: i32() })
const _inputPeerNotifySettings = (): any => {
  const result: Record<string, unknown> = { _: 'inputPeerNotifySettings' }
  const flags = i32()
  if (flags & 0x1) result.show_previews = obj()
  if (flags & 0x2) result.silent = obj()
  if (flags & 0x4) result.mute_until = i32()
  if (flags & 0x8) result.sound = obj()
  if (flags & 0x40) result.stories_muted = obj()
  if (flags & 0x80) result.stories_hide_sender = obj()
  if (flags & 0x100) result.stories_sound = obj()
  return result
}
const _peerNotifySettings = (): any => {
  const result: Record<string, unknown> = { _: 'peerNotifySettings' }
  const flags = i32()
  if (flags & 0x1) result.show_previews = obj()
  if (flags & 0x2) result.silent = obj()
  if (flags & 0x4) result.mute_until = i32()
  if (flags & 0x8) result.ios_sound = obj()
  if (flags & 0x10) result.android_sound = obj()
  if (flags & 0x20) result.other_sound = obj()
  if (flags & 0x40) result.stories_muted = obj()
  if (flags & 0x80) result.stories_hide_sender = obj()
  if (flags & 0x100) result.stories_ios_sound = obj()
  if (flags & 0x200) result.stories_android_sound = obj()
  if (flags & 0x400) result.stories_other_sound = obj()
  return result
}
const _peerSettings = (): any => {
  const result: Record<string, unknown> = { _: 'peerSettings' }
  const flags = i32()
  result.report_spam = !!(flags & 0x1)
  result.add_contact = !!(flags & 0x2)
  result.block_contact = !!(flags & 0x4)
  result.share_contact = !!(flags & 0x8)
  result.need_contacts_exception = !!(flags & 0x10)
  result.report_geo = !!(flags & 0x20)
  result.autoarchived = !!(flags & 0x80)
  result.invite_members = !!(flags & 0x100)
  result.request_chat_broadcast = !!(flags & 0x400)
  if (flags & 0x40) result.geo_distance = i32()
  if (flags & 0x200) result.request_chat_title = str()
  if (flags & 0x200) result.request_chat_date = i32()
  return result
}
const _wallPaper = (): any => {
  const result: Record<string, unknown> = { _: 'wallPaper' }
  result.id = i64()
  const flags = i32()
  result.creator = !!(flags & 0x1)
  result.default = !!(flags & 0x2)
  result.pattern = !!(flags & 0x8)
  result.dark = !!(flags & 0x10)
  result.access_hash = i64()
  result.slug = str()
  result.document = obj()
  if (flags & 0x4) result.settings = obj()
  return result
}
const _wallPaperNoFile = (): any => {
  const result: Record<string, unknown> = { _: 'wallPaperNoFile' }
  result.id = i64()
  const flags = i32()
  result.default = !!(flags & 0x2)
  result.dark = !!(flags & 0x10)
  if (flags & 0x4) result.settings = obj()
  return result
}
const _inputReportReasonSpam: any = () => ({ _: 'inputReportReasonSpam' })
const _inputReportReasonViolence: any = () => ({ _: 'inputReportReasonViolence' })
const _inputReportReasonPornography: any = () => ({ _: 'inputReportReasonPornography' })
const _inputReportReasonChildAbuse: any = () => ({ _: 'inputReportReasonChildAbuse' })
const _inputReportReasonOther: any = () => ({ _: 'inputReportReasonOther' })
const _inputReportReasonCopyright: any = () => ({ _: 'inputReportReasonCopyright' })
const _inputReportReasonGeoIrrelevant: any = () => ({ _: 'inputReportReasonGeoIrrelevant' })
const _inputReportReasonFake: any = () => ({ _: 'inputReportReasonFake' })
const _inputReportReasonIllegalDrugs: any = () => ({ _: 'inputReportReasonIllegalDrugs' })
const _inputReportReasonPersonalDetails: any = () => ({ _: 'inputReportReasonPersonalDetails' })
const _userFull = (): any => {
  const result: Record<string, unknown> = { _: 'userFull' }
  const flags = i32()
  result.blocked = !!(flags & 0x1)
  result.phone_calls_available = !!(flags & 0x10)
  result.phone_calls_private = !!(flags & 0x20)
  result.can_pin_message = !!(flags & 0x80)
  result.has_scheduled = !!(flags & 0x1000)
  result.video_calls_available = !!(flags & 0x2000)
  result.voice_messages_forbidden = !!(flags & 0x100000)
  result.translations_disabled = !!(flags & 0x800000)
  result.stories_pinned_available = !!(flags & 0x4000000)
  result.blocked_my_stories_from = !!(flags & 0x8000000)
  result.id = i64()
  if (flags & 0x2) result.about = str()
  result.settings = obj()
  if (flags & 0x200000) result.personal_photo = obj()
  if (flags & 0x4) result.profile_photo = obj()
  if (flags & 0x400000) result.fallback_photo = obj()
  result.notify_settings = obj()
  if (flags & 0x8) result.bot_info = obj()
  if (flags & 0x40) result.pinned_msg_id = i32()
  result.common_chats_count = i32()
  if (flags & 0x800) result.folder_id = i32()
  if (flags & 0x4000) result.ttl_period = i32()
  if (flags & 0x8000) result.theme_emoticon = str()
  if (flags & 0x10000) result.private_forward_name = str()
  if (flags & 0x20000) result.bot_group_admin_rights = obj()
  if (flags & 0x40000) result.bot_broadcast_admin_rights = obj()
  if (flags & 0x80000) result.premium_gifts = vector(obj)
  if (flags & 0x1000000) result.wallpaper = obj()
  if (flags & 0x2000000) result.stories = obj()
  return result
}
const _contact: any = () => ({ _: 'contact', user_id: i64(), mutual: obj() })
const _importedContact: any = () => ({ _: 'importedContact', user_id: i64(), client_id: i64() })
const _contactStatus: any = () => ({ _: 'contactStatus', user_id: i64(), status: obj() })
const _contactsContactsNotModified: any = () => ({ _: 'contacts.contactsNotModified' })
const _contactsContacts: any = () => ({ _: 'contacts.contacts', contacts: vector(obj), saved_count: i32(), users: vector(obj) })
const _contactsImportedContacts: any = () => ({ _: 'contacts.importedContacts', imported: vector(obj), popular_invites: vector(obj), retry_contacts: vector(i64), users: vector(obj) })
const _contactsBlocked: any = () => ({ _: 'contacts.blocked', blocked: vector(obj), chats: vector(obj), users: vector(obj) })
const _contactsBlockedSlice: any = () => ({ _: 'contacts.blockedSlice', count: i32(), blocked: vector(obj), chats: vector(obj), users: vector(obj) })
const _messagesDialogs: any = () => ({ _: 'messages.dialogs', dialogs: vector(obj), messages: vector(obj), chats: vector(obj), users: vector(obj) })
const _messagesDialogsSlice: any = () => ({ _: 'messages.dialogsSlice', count: i32(), dialogs: vector(obj), messages: vector(obj), chats: vector(obj), users: vector(obj) })
const _messagesDialogsNotModified: any = () => ({ _: 'messages.dialogsNotModified', count: i32() })
const _messagesMessages: any = () => ({ _: 'messages.messages', messages: vector(obj), chats: vector(obj), users: vector(obj) })
const _messagesMessagesSlice = (): any => {
  const result: Record<string, unknown> = { _: 'messages.messagesSlice' }
  const flags = i32()
  result.inexact = !!(flags & 0x2)
  result.count = i32()
  if (flags & 0x1) result.next_rate = i32()
  if (flags & 0x4) result.offset_id_offset = i32()
  result.messages = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _messagesChannelMessages = (): any => {
  const result: Record<string, unknown> = { _: 'messages.channelMessages' }
  const flags = i32()
  result.inexact = !!(flags & 0x2)
  result.pts = i32()
  result.count = i32()
  if (flags & 0x4) result.offset_id_offset = i32()
  result.messages = vector(obj)
  result.topics = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _messagesMessagesNotModified: any = () => ({ _: 'messages.messagesNotModified', count: i32() })
const _messagesChats: any = () => ({ _: 'messages.chats', chats: vector(obj) })
const _messagesChatsSlice: any = () => ({ _: 'messages.chatsSlice', count: i32(), chats: vector(obj) })
const _messagesChatFull: any = () => ({ _: 'messages.chatFull', full_chat: obj(), chats: vector(obj), users: vector(obj) })
const _messagesAffectedHistory: any = () => ({ _: 'messages.affectedHistory', pts: i32(), pts_count: i32(), offset: i32() })
const _inputMessagesFilterEmpty: any = () => ({ _: 'inputMessagesFilterEmpty' })
const _inputMessagesFilterPhotos: any = () => ({ _: 'inputMessagesFilterPhotos' })
const _inputMessagesFilterVideo: any = () => ({ _: 'inputMessagesFilterVideo' })
const _inputMessagesFilterPhotoVideo: any = () => ({ _: 'inputMessagesFilterPhotoVideo' })
const _inputMessagesFilterDocument: any = () => ({ _: 'inputMessagesFilterDocument' })
const _inputMessagesFilterUrl: any = () => ({ _: 'inputMessagesFilterUrl' })
const _inputMessagesFilterGif: any = () => ({ _: 'inputMessagesFilterGif' })
const _inputMessagesFilterVoice: any = () => ({ _: 'inputMessagesFilterVoice' })
const _inputMessagesFilterMusic: any = () => ({ _: 'inputMessagesFilterMusic' })
const _inputMessagesFilterChatPhotos: any = () => ({ _: 'inputMessagesFilterChatPhotos' })
const _inputMessagesFilterPhoneCalls = (): any => {
  const result: Record<string, unknown> = { _: 'inputMessagesFilterPhoneCalls' }
  const flags = i32()
  result.missed = !!(flags & 0x1)
  return result
}
const _inputMessagesFilterRoundVoice: any = () => ({ _: 'inputMessagesFilterRoundVoice' })
const _inputMessagesFilterRoundVideo: any = () => ({ _: 'inputMessagesFilterRoundVideo' })
const _inputMessagesFilterMyMentions: any = () => ({ _: 'inputMessagesFilterMyMentions' })
const _inputMessagesFilterGeo: any = () => ({ _: 'inputMessagesFilterGeo' })
const _inputMessagesFilterContacts: any = () => ({ _: 'inputMessagesFilterContacts' })
const _inputMessagesFilterPinned: any = () => ({ _: 'inputMessagesFilterPinned' })
const _updateNewMessage: any = () => ({ _: 'updateNewMessage', _update: true, message: obj(), pts: i32(), pts_count: i32() })
const _updateMessageID: any = () => ({ _: 'updateMessageID', _update: true, id: i32(), random_id: i64() })
const _updateDeleteMessages: any = () => ({ _: 'updateDeleteMessages', _update: true, messages: vector(i32), pts: i32(), pts_count: i32() })
const _updateUserTyping: any = () => ({ _: 'updateUserTyping', _update: true, user_id: i64(), action: obj() })
const _updateChatUserTyping: any = () => ({ _: 'updateChatUserTyping', _update: true, chat_id: i64(), from_id: obj(), action: obj() })
const _updateChatParticipants: any = () => ({ _: 'updateChatParticipants', _update: true, participants: obj() })
const _updateUserStatus: any = () => ({ _: 'updateUserStatus', _update: true, user_id: i64(), status: obj() })
const _updateUserName: any = () => ({ _: 'updateUserName', _update: true, user_id: i64(), first_name: str(), last_name: str(), usernames: vector(obj) })
const _updateNewAuthorization = (): any => {
  const result: Record<string, unknown> = { _: 'updateNewAuthorization' }
  result._update = true
  const flags = i32()
  result.unconfirmed = !!(flags & 0x1)
  result.hash = i64()
  if (flags & 0x1) result.date = i32()
  if (flags & 0x1) result.device = str()
  if (flags & 0x1) result.location = str()
  return result
}
const _updateNewEncryptedMessage: any = () => ({ _: 'updateNewEncryptedMessage', _update: true, message: obj(), qts: i32() })
const _updateEncryptedChatTyping: any = () => ({ _: 'updateEncryptedChatTyping', _update: true, chat_id: i32() })
const _updateEncryption: any = () => ({ _: 'updateEncryption', _update: true, chat: obj(), date: i32() })
const _updateEncryptedMessagesRead: any = () => ({ _: 'updateEncryptedMessagesRead', _update: true, chat_id: i32(), max_date: i32(), date: i32() })
const _updateChatParticipantAdd: any = () => ({ _: 'updateChatParticipantAdd', _update: true, chat_id: i64(), user_id: i64(), inviter_id: i64(), date: i32(), version: i32() })
const _updateChatParticipantDelete: any = () => ({ _: 'updateChatParticipantDelete', _update: true, chat_id: i64(), user_id: i64(), version: i32() })
const _updateDcOptions: any = () => ({ _: 'updateDcOptions', _update: true, dc_options: vector(obj) })
const _updateNotifySettings: any = () => ({ _: 'updateNotifySettings', _update: true, peer: obj(), notify_settings: obj() })
const _updateServiceNotification = (): any => {
  const result: Record<string, unknown> = { _: 'updateServiceNotification' }
  result._update = true
  const flags = i32()
  result.popup = !!(flags & 0x1)
  result.invert_media = !!(flags & 0x4)
  if (flags & 0x2) result.inbox_date = i32()
  result.type = str()
  result.message = str()
  result.media = obj()
  result.entities = vector(obj)
  return result
}
const _updatePrivacy: any = () => ({ _: 'updatePrivacy', _update: true, key: obj(), rules: vector(obj) })
const _updateUserPhone: any = () => ({ _: 'updateUserPhone', _update: true, user_id: i64(), phone: str() })
const _updateReadHistoryInbox = (): any => {
  const result: Record<string, unknown> = { _: 'updateReadHistoryInbox' }
  result._update = true
  const flags = i32()
  if (flags & 0x1) result.folder_id = i32()
  result.peer = obj()
  result.max_id = i32()
  result.still_unread_count = i32()
  result.pts = i32()
  result.pts_count = i32()
  return result
}
const _updateReadHistoryOutbox: any = () => ({ _: 'updateReadHistoryOutbox', _update: true, peer: obj(), max_id: i32(), pts: i32(), pts_count: i32() })
const _updateWebPage: any = () => ({ _: 'updateWebPage', _update: true, webpage: obj(), pts: i32(), pts_count: i32() })
const _updateReadMessagesContents = (): any => {
  const result: Record<string, unknown> = { _: 'updateReadMessagesContents' }
  result._update = true
  const flags = i32()
  result.messages = vector(i32)
  result.pts = i32()
  result.pts_count = i32()
  if (flags & 0x1) result.date = i32()
  return result
}
const _updateChannelTooLong = (): any => {
  const result: Record<string, unknown> = { _: 'updateChannelTooLong' }
  result._update = true
  const flags = i32()
  result.channel_id = i64()
  if (flags & 0x1) result.pts = i32()
  return result
}
const _updateChannel: any = () => ({ _: 'updateChannel', _update: true, channel_id: i64() })
const _updateNewChannelMessage: any = () => ({ _: 'updateNewChannelMessage', _update: true, message: obj(), pts: i32(), pts_count: i32() })
const _updateReadChannelInbox = (): any => {
  const result: Record<string, unknown> = { _: 'updateReadChannelInbox' }
  result._update = true
  const flags = i32()
  if (flags & 0x1) result.folder_id = i32()
  result.channel_id = i64()
  result.max_id = i32()
  result.still_unread_count = i32()
  result.pts = i32()
  return result
}
const _updateDeleteChannelMessages: any = () => ({ _: 'updateDeleteChannelMessages', _update: true, channel_id: i64(), messages: vector(i32), pts: i32(), pts_count: i32() })
const _updateChannelMessageViews: any = () => ({ _: 'updateChannelMessageViews', _update: true, channel_id: i64(), id: i32(), views: i32() })
const _updateChatParticipantAdmin: any = () => ({ _: 'updateChatParticipantAdmin', _update: true, chat_id: i64(), user_id: i64(), is_admin: obj(), version: i32() })
const _updateNewStickerSet: any = () => ({ _: 'updateNewStickerSet', _update: true, stickerset: obj() })
const _updateStickerSetsOrder = (): any => {
  const result: Record<string, unknown> = { _: 'updateStickerSetsOrder' }
  result._update = true
  const flags = i32()
  result.masks = !!(flags & 0x1)
  result.emojis = !!(flags & 0x2)
  result.order = vector(i64)
  return result
}
const _updateStickerSets = (): any => {
  const result: Record<string, unknown> = { _: 'updateStickerSets' }
  result._update = true
  const flags = i32()
  result.masks = !!(flags & 0x1)
  result.emojis = !!(flags & 0x2)
  return result
}
const _updateSavedGifs: any = () => ({ _: 'updateSavedGifs', _update: true })
const _updateBotInlineQuery = (): any => {
  const result: Record<string, unknown> = { _: 'updateBotInlineQuery' }
  result._update = true
  const flags = i32()
  result.query_id = i64()
  result.user_id = i64()
  result.query = str()
  if (flags & 0x1) result.geo = obj()
  if (flags & 0x2) result.peer_type = obj()
  result.offset = str()
  return result
}
const _updateBotInlineSend = (): any => {
  const result: Record<string, unknown> = { _: 'updateBotInlineSend' }
  result._update = true
  const flags = i32()
  result.user_id = i64()
  result.query = str()
  if (flags & 0x1) result.geo = obj()
  result.id = str()
  if (flags & 0x2) result.msg_id = obj()
  return result
}
const _updateEditChannelMessage: any = () => ({ _: 'updateEditChannelMessage', _update: true, message: obj(), pts: i32(), pts_count: i32() })
const _updateBotCallbackQuery = (): any => {
  const result: Record<string, unknown> = { _: 'updateBotCallbackQuery' }
  result._update = true
  const flags = i32()
  result.query_id = i64()
  result.user_id = i64()
  result.peer = obj()
  result.msg_id = i32()
  result.chat_instance = i64()
  if (flags & 0x1) result.data = bytes()
  if (flags & 0x2) result.game_short_name = str()
  return result
}
const _updateEditMessage: any = () => ({ _: 'updateEditMessage', _update: true, message: obj(), pts: i32(), pts_count: i32() })
const _updateInlineBotCallbackQuery = (): any => {
  const result: Record<string, unknown> = { _: 'updateInlineBotCallbackQuery' }
  result._update = true
  const flags = i32()
  result.query_id = i64()
  result.user_id = i64()
  result.msg_id = obj()
  result.chat_instance = i64()
  if (flags & 0x1) result.data = bytes()
  if (flags & 0x2) result.game_short_name = str()
  return result
}
const _updateReadChannelOutbox: any = () => ({ _: 'updateReadChannelOutbox', _update: true, channel_id: i64(), max_id: i32() })
const _updateDraftMessage = (): any => {
  const result: Record<string, unknown> = { _: 'updateDraftMessage' }
  result._update = true
  const flags = i32()
  result.peer = obj()
  if (flags & 0x1) result.top_msg_id = i32()
  result.draft = obj()
  return result
}
const _updateReadFeaturedStickers: any = () => ({ _: 'updateReadFeaturedStickers', _update: true })
const _updateRecentStickers: any = () => ({ _: 'updateRecentStickers', _update: true })
const _updateConfig: any = () => ({ _: 'updateConfig', _update: true })
const _updatePtsChanged: any = () => ({ _: 'updatePtsChanged', _update: true })
const _updateChannelWebPage: any = () => ({ _: 'updateChannelWebPage', _update: true, channel_id: i64(), webpage: obj(), pts: i32(), pts_count: i32() })
const _updateDialogPinned = (): any => {
  const result: Record<string, unknown> = { _: 'updateDialogPinned' }
  result._update = true
  const flags = i32()
  result.pinned = !!(flags & 0x1)
  if (flags & 0x2) result.folder_id = i32()
  result.peer = obj()
  return result
}
const _updatePinnedDialogs = (): any => {
  const result: Record<string, unknown> = { _: 'updatePinnedDialogs' }
  result._update = true
  const flags = i32()
  if (flags & 0x2) result.folder_id = i32()
  if (flags & 0x1) result.order = vector(obj)
  return result
}
const _updateBotWebhookJSON: any = () => ({ _: 'updateBotWebhookJSON', _update: true, data: obj() })
const _updateBotWebhookJSONQuery: any = () => ({ _: 'updateBotWebhookJSONQuery', _update: true, query_id: i64(), data: obj(), timeout: i32() })
const _updateBotShippingQuery: any = () => ({ _: 'updateBotShippingQuery', _update: true, query_id: i64(), user_id: i64(), payload: bytes(), shipping_address: obj() })
const _updateBotPrecheckoutQuery = (): any => {
  const result: Record<string, unknown> = { _: 'updateBotPrecheckoutQuery' }
  result._update = true
  const flags = i32()
  result.query_id = i64()
  result.user_id = i64()
  result.payload = bytes()
  if (flags & 0x1) result.info = obj()
  if (flags & 0x2) result.shipping_option_id = str()
  result.currency = str()
  result.total_amount = i64()
  return result
}
const _updatePhoneCall: any = () => ({ _: 'updatePhoneCall', _update: true, phone_call: obj() })
const _updateLangPackTooLong: any = () => ({ _: 'updateLangPackTooLong', _update: true, lang_code: str() })
const _updateLangPack: any = () => ({ _: 'updateLangPack', _update: true, difference: obj() })
const _updateFavedStickers: any = () => ({ _: 'updateFavedStickers', _update: true })
const _updateChannelReadMessagesContents = (): any => {
  const result: Record<string, unknown> = { _: 'updateChannelReadMessagesContents' }
  result._update = true
  const flags = i32()
  result.channel_id = i64()
  if (flags & 0x1) result.top_msg_id = i32()
  result.messages = vector(i32)
  return result
}
const _updateContactsReset: any = () => ({ _: 'updateContactsReset', _update: true })
const _updateChannelAvailableMessages: any = () => ({ _: 'updateChannelAvailableMessages', _update: true, channel_id: i64(), available_min_id: i32() })
const _updateDialogUnreadMark = (): any => {
  const result: Record<string, unknown> = { _: 'updateDialogUnreadMark' }
  result._update = true
  const flags = i32()
  result.unread = !!(flags & 0x1)
  result.peer = obj()
  return result
}
const _updateMessagePoll = (): any => {
  const result: Record<string, unknown> = { _: 'updateMessagePoll' }
  result._update = true
  const flags = i32()
  result.poll_id = i64()
  if (flags & 0x1) result.poll = obj()
  result.results = obj()
  return result
}
const _updateChatDefaultBannedRights: any = () => ({ _: 'updateChatDefaultBannedRights', _update: true, peer: obj(), default_banned_rights: obj(), version: i32() })
const _updateFolderPeers: any = () => ({ _: 'updateFolderPeers', _update: true, folder_peers: vector(obj), pts: i32(), pts_count: i32() })
const _updatePeerSettings: any = () => ({ _: 'updatePeerSettings', _update: true, peer: obj(), settings: obj() })
const _updatePeerLocated: any = () => ({ _: 'updatePeerLocated', _update: true, peers: vector(obj) })
const _updateNewScheduledMessage: any = () => ({ _: 'updateNewScheduledMessage', _update: true, message: obj() })
const _updateDeleteScheduledMessages: any = () => ({ _: 'updateDeleteScheduledMessages', _update: true, peer: obj(), messages: vector(i32) })
const _updateTheme: any = () => ({ _: 'updateTheme', _update: true, theme: obj() })
const _updateGeoLiveViewed: any = () => ({ _: 'updateGeoLiveViewed', _update: true, peer: obj(), msg_id: i32() })
const _updateLoginToken: any = () => ({ _: 'updateLoginToken', _update: true })
const _updateMessagePollVote: any = () => ({ _: 'updateMessagePollVote', _update: true, poll_id: i64(), peer: obj(), options: vector(bytes), qts: i32() })
const _updateDialogFilter = (): any => {
  const result: Record<string, unknown> = { _: 'updateDialogFilter' }
  result._update = true
  const flags = i32()
  result.id = i32()
  if (flags & 0x1) result.filter = obj()
  return result
}
const _updateDialogFilterOrder: any = () => ({ _: 'updateDialogFilterOrder', _update: true, order: vector(i32) })
const _updateDialogFilters: any = () => ({ _: 'updateDialogFilters', _update: true })
const _updatePhoneCallSignalingData: any = () => ({ _: 'updatePhoneCallSignalingData', _update: true, phone_call_id: i64(), data: bytes() })
const _updateChannelMessageForwards: any = () => ({ _: 'updateChannelMessageForwards', _update: true, channel_id: i64(), id: i32(), forwards: i32() })
const _updateReadChannelDiscussionInbox = (): any => {
  const result: Record<string, unknown> = { _: 'updateReadChannelDiscussionInbox' }
  result._update = true
  const flags = i32()
  result.channel_id = i64()
  result.top_msg_id = i32()
  result.read_max_id = i32()
  if (flags & 0x1) result.broadcast_id = i64()
  if (flags & 0x1) result.broadcast_post = i32()
  return result
}
const _updateReadChannelDiscussionOutbox: any = () => ({ _: 'updateReadChannelDiscussionOutbox', _update: true, channel_id: i64(), top_msg_id: i32(), read_max_id: i32() })
const _updatePeerBlocked = (): any => {
  const result: Record<string, unknown> = { _: 'updatePeerBlocked' }
  result._update = true
  const flags = i32()
  result.blocked = !!(flags & 0x1)
  result.blocked_my_stories_from = !!(flags & 0x2)
  result.peer_id = obj()
  return result
}
const _updateChannelUserTyping = (): any => {
  const result: Record<string, unknown> = { _: 'updateChannelUserTyping' }
  result._update = true
  const flags = i32()
  result.channel_id = i64()
  if (flags & 0x1) result.top_msg_id = i32()
  result.from_id = obj()
  result.action = obj()
  return result
}
const _updatePinnedMessages = (): any => {
  const result: Record<string, unknown> = { _: 'updatePinnedMessages' }
  result._update = true
  const flags = i32()
  result.pinned = !!(flags & 0x1)
  result.peer = obj()
  result.messages = vector(i32)
  result.pts = i32()
  result.pts_count = i32()
  return result
}
const _updatePinnedChannelMessages = (): any => {
  const result: Record<string, unknown> = { _: 'updatePinnedChannelMessages' }
  result._update = true
  const flags = i32()
  result.pinned = !!(flags & 0x1)
  result.channel_id = i64()
  result.messages = vector(i32)
  result.pts = i32()
  result.pts_count = i32()
  return result
}
const _updateChat: any = () => ({ _: 'updateChat', _update: true, chat_id: i64() })
const _updateGroupCallParticipants: any = () => ({ _: 'updateGroupCallParticipants', _update: true, call: obj(), participants: vector(obj), version: i32() })
const _updateGroupCall: any = () => ({ _: 'updateGroupCall', _update: true, chat_id: i64(), call: obj() })
const _updatePeerHistoryTTL = (): any => {
  const result: Record<string, unknown> = { _: 'updatePeerHistoryTTL' }
  result._update = true
  const flags = i32()
  result.peer = obj()
  if (flags & 0x1) result.ttl_period = i32()
  return result
}
const _updateChatParticipant = (): any => {
  const result: Record<string, unknown> = { _: 'updateChatParticipant' }
  result._update = true
  const flags = i32()
  result.chat_id = i64()
  result.date = i32()
  result.actor_id = i64()
  result.user_id = i64()
  if (flags & 0x1) result.prev_participant = obj()
  if (flags & 0x2) result.new_participant = obj()
  if (flags & 0x4) result.invite = obj()
  result.qts = i32()
  return result
}
const _updateChannelParticipant = (): any => {
  const result: Record<string, unknown> = { _: 'updateChannelParticipant' }
  result._update = true
  const flags = i32()
  result.via_chatlist = !!(flags & 0x8)
  result.channel_id = i64()
  result.date = i32()
  result.actor_id = i64()
  result.user_id = i64()
  if (flags & 0x1) result.prev_participant = obj()
  if (flags & 0x2) result.new_participant = obj()
  if (flags & 0x4) result.invite = obj()
  result.qts = i32()
  return result
}
const _updateBotStopped: any = () => ({ _: 'updateBotStopped', _update: true, user_id: i64(), date: i32(), stopped: obj(), qts: i32() })
const _updateGroupCallConnection = (): any => {
  const result: Record<string, unknown> = { _: 'updateGroupCallConnection' }
  result._update = true
  const flags = i32()
  result.presentation = !!(flags & 0x1)
  result.params = obj()
  return result
}
const _updateBotCommands: any = () => ({ _: 'updateBotCommands', _update: true, peer: obj(), bot_id: i64(), commands: vector(obj) })
const _updatePendingJoinRequests: any = () => ({ _: 'updatePendingJoinRequests', _update: true, peer: obj(), requests_pending: i32(), recent_requesters: vector(i64) })
const _updateBotChatInviteRequester: any = () => ({ _: 'updateBotChatInviteRequester', _update: true, peer: obj(), date: i32(), user_id: i64(), about: str(), invite: obj(), qts: i32() })
const _updateMessageReactions = (): any => {
  const result: Record<string, unknown> = { _: 'updateMessageReactions' }
  result._update = true
  const flags = i32()
  result.peer = obj()
  result.msg_id = i32()
  if (flags & 0x1) result.top_msg_id = i32()
  result.reactions = obj()
  return result
}
const _updateAttachMenuBots: any = () => ({ _: 'updateAttachMenuBots', _update: true })
const _updateWebViewResultSent: any = () => ({ _: 'updateWebViewResultSent', _update: true, query_id: i64() })
const _updateBotMenuButton: any = () => ({ _: 'updateBotMenuButton', _update: true, bot_id: i64(), button: obj() })
const _updateSavedRingtones: any = () => ({ _: 'updateSavedRingtones', _update: true })
const _updateTranscribedAudio = (): any => {
  const result: Record<string, unknown> = { _: 'updateTranscribedAudio' }
  result._update = true
  const flags = i32()
  result.pending = !!(flags & 0x1)
  result.peer = obj()
  result.msg_id = i32()
  result.transcription_id = i64()
  result.text = str()
  return result
}
const _updateReadFeaturedEmojiStickers: any = () => ({ _: 'updateReadFeaturedEmojiStickers', _update: true })
const _updateUserEmojiStatus: any = () => ({ _: 'updateUserEmojiStatus', _update: true, user_id: i64(), emoji_status: obj() })
const _updateRecentEmojiStatuses: any = () => ({ _: 'updateRecentEmojiStatuses', _update: true })
const _updateRecentReactions: any = () => ({ _: 'updateRecentReactions', _update: true })
const _updateMoveStickerSetToTop = (): any => {
  const result: Record<string, unknown> = { _: 'updateMoveStickerSetToTop' }
  result._update = true
  const flags = i32()
  result.masks = !!(flags & 0x1)
  result.emojis = !!(flags & 0x2)
  result.stickerset = i64()
  return result
}
const _updateMessageExtendedMedia: any = () => ({ _: 'updateMessageExtendedMedia', _update: true, peer: obj(), msg_id: i32(), extended_media: obj() })
const _updateChannelPinnedTopic = (): any => {
  const result: Record<string, unknown> = { _: 'updateChannelPinnedTopic' }
  result._update = true
  const flags = i32()
  result.pinned = !!(flags & 0x1)
  result.channel_id = i64()
  result.topic_id = i32()
  return result
}
const _updateChannelPinnedTopics = (): any => {
  const result: Record<string, unknown> = { _: 'updateChannelPinnedTopics' }
  result._update = true
  const flags = i32()
  result.channel_id = i64()
  if (flags & 0x1) result.order = vector(i32)
  return result
}
const _updateUser: any = () => ({ _: 'updateUser', _update: true, user_id: i64() })
const _updateAutoSaveSettings: any = () => ({ _: 'updateAutoSaveSettings', _update: true })
const _updateGroupInvitePrivacyForbidden: any = () => ({ _: 'updateGroupInvitePrivacyForbidden', _update: true, user_id: i64() })
const _updateStory: any = () => ({ _: 'updateStory', _update: true, peer: obj(), story: obj() })
const _updateReadStories: any = () => ({ _: 'updateReadStories', _update: true, peer: obj(), max_id: i32() })
const _updateStoryID: any = () => ({ _: 'updateStoryID', _update: true, id: i32(), random_id: i64() })
const _updateStoriesStealthMode: any = () => ({ _: 'updateStoriesStealthMode', _update: true, stealth_mode: obj() })
const _updateSentStoryReaction: any = () => ({ _: 'updateSentStoryReaction', _update: true, peer: obj(), story_id: i32(), reaction: obj() })
const _updatesState: any = () => ({ _: 'updates.state', pts: i32(), qts: i32(), date: i32(), seq: i32(), unread_count: i32() })
const _updatesDifferenceEmpty: any = () => ({ _: 'updates.differenceEmpty', date: i32(), seq: i32() })
const _updatesDifference: any = () => ({ _: 'updates.difference', new_messages: vector(obj), new_encrypted_messages: vector(obj), other_updates: vector(obj), chats: vector(obj), users: vector(obj), state: obj() })
const _updatesDifferenceSlice: any = () => ({ _: 'updates.differenceSlice', new_messages: vector(obj), new_encrypted_messages: vector(obj), other_updates: vector(obj), chats: vector(obj), users: vector(obj), intermediate_state: obj() })
const _updatesDifferenceTooLong: any = () => ({ _: 'updates.differenceTooLong', pts: i32() })
const _updatesTooLong: any = () => ({ _: 'updatesTooLong', _update: true })
const _updateShortMessage = (): any => {
  const result: Record<string, unknown> = { _: 'updateShortMessage' }
  result._update = true
  const flags = i32()
  result.out = !!(flags & 0x2)
  result.mentioned = !!(flags & 0x10)
  result.media_unread = !!(flags & 0x20)
  result.silent = !!(flags & 0x2000)
  result.id = i32()
  result.user_id = i64()
  result.message = str()
  result.pts = i32()
  result.pts_count = i32()
  result.date = i32()
  if (flags & 0x4) result.fwd_from = obj()
  if (flags & 0x800) result.via_bot_id = i64()
  if (flags & 0x8) result.reply_to = obj()
  if (flags & 0x80) result.entities = vector(obj)
  if (flags & 0x2000000) result.ttl_period = i32()
  return result
}
const _updateShortChatMessage = (): any => {
  const result: Record<string, unknown> = { _: 'updateShortChatMessage' }
  result._update = true
  const flags = i32()
  result.out = !!(flags & 0x2)
  result.mentioned = !!(flags & 0x10)
  result.media_unread = !!(flags & 0x20)
  result.silent = !!(flags & 0x2000)
  result.id = i32()
  result.from_id = i64()
  result.chat_id = i64()
  result.message = str()
  result.pts = i32()
  result.pts_count = i32()
  result.date = i32()
  if (flags & 0x4) result.fwd_from = obj()
  if (flags & 0x800) result.via_bot_id = i64()
  if (flags & 0x8) result.reply_to = obj()
  if (flags & 0x80) result.entities = vector(obj)
  if (flags & 0x2000000) result.ttl_period = i32()
  return result
}
const _updateShort: any = () => ({ _: 'updateShort', _update: true, update: obj(), date: i32() })
const _updatesCombined: any = () => ({ _: 'updatesCombined', _update: true, updates: vector(obj), users: vector(obj), chats: vector(obj), date: i32(), seq_start: i32(), seq: i32() })
const _updates: any = () => ({ _: 'updates', _update: true, updates: vector(obj), users: vector(obj), chats: vector(obj), date: i32(), seq: i32() })
const _updateShortSentMessage = (): any => {
  const result: Record<string, unknown> = { _: 'updateShortSentMessage' }
  result._update = true
  const flags = i32()
  result.out = !!(flags & 0x2)
  result.id = i32()
  result.pts = i32()
  result.pts_count = i32()
  result.date = i32()
  if (flags & 0x200) result.media = obj()
  if (flags & 0x80) result.entities = vector(obj)
  if (flags & 0x2000000) result.ttl_period = i32()
  return result
}
const _photosPhotos: any = () => ({ _: 'photos.photos', photos: vector(obj), users: vector(obj) })
const _photosPhotosSlice: any = () => ({ _: 'photos.photosSlice', count: i32(), photos: vector(obj), users: vector(obj) })
const _photosPhoto: any = () => ({ _: 'photos.photo', photo: obj(), users: vector(obj) })
const _uploadFile: any = () => ({ _: 'upload.file', type: obj(), mtime: i32(), bytes: bytes() })
const _uploadFileCdnRedirect: any = () => ({ _: 'upload.fileCdnRedirect', dc_id: i32(), file_token: bytes(), encryption_key: bytes(), encryption_iv: bytes(), file_hashes: vector(obj) })
const _dcOption = (): any => {
  const result: Record<string, unknown> = { _: 'dcOption' }
  const flags = i32()
  result.ipv6 = !!(flags & 0x1)
  result.media_only = !!(flags & 0x2)
  result.tcpo_only = !!(flags & 0x4)
  result.cdn = !!(flags & 0x8)
  result.static = !!(flags & 0x10)
  result.this_port_only = !!(flags & 0x20)
  result.id = i32()
  result.ip_address = str()
  result.port = i32()
  if (flags & 0x400) result.secret = bytes()
  return result
}
const _config = (): any => {
  const result: Record<string, unknown> = { _: 'config' }
  const flags = i32()
  result.default_p2p_contacts = !!(flags & 0x8)
  result.preload_featured_stickers = !!(flags & 0x10)
  result.revoke_pm_inbox = !!(flags & 0x40)
  result.blocked_mode = !!(flags & 0x100)
  result.force_try_ipv6 = !!(flags & 0x4000)
  result.date = i32()
  result.expires = i32()
  result.test_mode = obj()
  result.this_dc = i32()
  result.dc_options = vector(obj)
  result.dc_txt_domain_name = str()
  result.chat_size_max = i32()
  result.megagroup_size_max = i32()
  result.forwarded_count_max = i32()
  result.online_update_period_ms = i32()
  result.offline_blur_timeout_ms = i32()
  result.offline_idle_timeout_ms = i32()
  result.online_cloud_timeout_ms = i32()
  result.notify_cloud_delay_ms = i32()
  result.notify_default_delay_ms = i32()
  result.push_chat_period_ms = i32()
  result.push_chat_limit = i32()
  result.edit_time_limit = i32()
  result.revoke_time_limit = i32()
  result.revoke_pm_time_limit = i32()
  result.rating_e_decay = i32()
  result.stickers_recent_limit = i32()
  result.channels_read_media_period = i32()
  if (flags & 0x1) result.tmp_sessions = i32()
  result.call_receive_timeout_ms = i32()
  result.call_ring_timeout_ms = i32()
  result.call_connect_timeout_ms = i32()
  result.call_packet_timeout_ms = i32()
  result.me_url_prefix = str()
  if (flags & 0x80) result.autoupdate_url_prefix = str()
  if (flags & 0x200) result.gif_search_username = str()
  if (flags & 0x400) result.venue_search_username = str()
  if (flags & 0x800) result.img_search_username = str()
  if (flags & 0x1000) result.static_maps_provider = str()
  result.caption_length_max = i32()
  result.message_length_max = i32()
  result.webfile_dc_id = i32()
  if (flags & 0x4) result.suggested_lang_code = str()
  if (flags & 0x4) result.lang_pack_version = i32()
  if (flags & 0x4) result.base_lang_pack_version = i32()
  if (flags & 0x8000) result.reactions_default = obj()
  if (flags & 0x10000) result.autologin_token = str()
  return result
}
const _nearestDc: any = () => ({ _: 'nearestDc', country: str(), this_dc: i32(), nearest_dc: i32() })
const _helpAppUpdate = (): any => {
  const result: Record<string, unknown> = { _: 'help.appUpdate' }
  const flags = i32()
  result.can_not_skip = !!(flags & 0x1)
  result.id = i32()
  result.version = str()
  result.text = str()
  result.entities = vector(obj)
  if (flags & 0x2) result.document = obj()
  if (flags & 0x4) result.url = str()
  if (flags & 0x8) result.sticker = obj()
  return result
}
const _helpNoAppUpdate: any = () => ({ _: 'help.noAppUpdate' })
const _helpInviteText: any = () => ({ _: 'help.inviteText', message: str() })
const _encryptedChatEmpty: any = () => ({ _: 'encryptedChatEmpty', id: i32() })
const _encryptedChatWaiting: any = () => ({ _: 'encryptedChatWaiting', id: i32(), access_hash: i64(), date: i32(), admin_id: i64(), participant_id: i64() })
const _encryptedChatRequested = (): any => {
  const result: Record<string, unknown> = { _: 'encryptedChatRequested' }
  const flags = i32()
  if (flags & 0x1) result.folder_id = i32()
  result.id = i32()
  result.access_hash = i64()
  result.date = i32()
  result.admin_id = i64()
  result.participant_id = i64()
  result.g_a = bytes()
  return result
}
const _encryptedChat: any = () => ({ _: 'encryptedChat', id: i32(), access_hash: i64(), date: i32(), admin_id: i64(), participant_id: i64(), g_a_or_b: bytes(), key_fingerprint: i64() })
const _encryptedChatDiscarded = (): any => {
  const result: Record<string, unknown> = { _: 'encryptedChatDiscarded' }
  const flags = i32()
  result.history_deleted = !!(flags & 0x1)
  result.id = i32()
  return result
}
const _inputEncryptedChat: any = () => ({ _: 'inputEncryptedChat', chat_id: i32(), access_hash: i64() })
const _encryptedFileEmpty: any = () => ({ _: 'encryptedFileEmpty' })
const _encryptedFile: any = () => ({ _: 'encryptedFile', id: i64(), access_hash: i64(), size: i64(), dc_id: i32(), key_fingerprint: i32() })
const _inputEncryptedFileEmpty: any = () => ({ _: 'inputEncryptedFileEmpty' })
const _inputEncryptedFileUploaded: any = () => ({ _: 'inputEncryptedFileUploaded', id: i64(), parts: i32(), md5_checksum: str(), key_fingerprint: i32() })
const _inputEncryptedFile: any = () => ({ _: 'inputEncryptedFile', id: i64(), access_hash: i64() })
const _inputEncryptedFileBigUploaded: any = () => ({ _: 'inputEncryptedFileBigUploaded', id: i64(), parts: i32(), key_fingerprint: i32() })
const _encryptedMessage: any = () => ({ _: 'encryptedMessage', random_id: i64(), chat_id: i32(), date: i32(), bytes: bytes(), file: obj() })
const _encryptedMessageService: any = () => ({ _: 'encryptedMessageService', random_id: i64(), chat_id: i32(), date: i32(), bytes: bytes() })
const _messagesDhConfigNotModified: any = () => ({ _: 'messages.dhConfigNotModified', random: bytes() })
const _messagesDhConfig: any = () => ({ _: 'messages.dhConfig', g: i32(), p: bytes(), version: i32(), random: bytes() })
const _messagesSentEncryptedMessage: any = () => ({ _: 'messages.sentEncryptedMessage', date: i32() })
const _messagesSentEncryptedFile: any = () => ({ _: 'messages.sentEncryptedFile', date: i32(), file: obj() })
const _inputDocumentEmpty: any = () => ({ _: 'inputDocumentEmpty' })
const _inputDocument: any = () => ({ _: 'inputDocument', id: i64(), access_hash: i64(), file_reference: bytes() })
const _documentEmpty: any = () => ({ _: 'documentEmpty', id: i64() })
const _document = (): any => {
  const result: Record<string, unknown> = { _: 'document' }
  const flags = i32()
  result.id = i64()
  result.access_hash = i64()
  result.file_reference = bytes()
  result.date = i32()
  result.mime_type = str()
  result.size = i64()
  if (flags & 0x1) result.thumbs = vector(obj)
  if (flags & 0x2) result.video_thumbs = vector(obj)
  result.dc_id = i32()
  result.attributes = vector(obj)
  return result
}
const _helpSupport: any = () => ({ _: 'help.support', phone_number: str(), user: obj() })
const _notifyPeer: any = () => ({ _: 'notifyPeer', peer: obj() })
const _notifyUsers: any = () => ({ _: 'notifyUsers' })
const _notifyChats: any = () => ({ _: 'notifyChats' })
const _notifyBroadcasts: any = () => ({ _: 'notifyBroadcasts' })
const _notifyForumTopic: any = () => ({ _: 'notifyForumTopic', peer: obj(), top_msg_id: i32() })
const _sendMessageTypingAction: any = () => ({ _: 'sendMessageTypingAction' })
const _sendMessageCancelAction: any = () => ({ _: 'sendMessageCancelAction' })
const _sendMessageRecordVideoAction: any = () => ({ _: 'sendMessageRecordVideoAction' })
const _sendMessageUploadVideoAction: any = () => ({ _: 'sendMessageUploadVideoAction', progress: i32() })
const _sendMessageRecordAudioAction: any = () => ({ _: 'sendMessageRecordAudioAction' })
const _sendMessageUploadAudioAction: any = () => ({ _: 'sendMessageUploadAudioAction', progress: i32() })
const _sendMessageUploadPhotoAction: any = () => ({ _: 'sendMessageUploadPhotoAction', progress: i32() })
const _sendMessageUploadDocumentAction: any = () => ({ _: 'sendMessageUploadDocumentAction', progress: i32() })
const _sendMessageGeoLocationAction: any = () => ({ _: 'sendMessageGeoLocationAction' })
const _sendMessageChooseContactAction: any = () => ({ _: 'sendMessageChooseContactAction' })
const _sendMessageGamePlayAction: any = () => ({ _: 'sendMessageGamePlayAction' })
const _sendMessageRecordRoundAction: any = () => ({ _: 'sendMessageRecordRoundAction' })
const _sendMessageUploadRoundAction: any = () => ({ _: 'sendMessageUploadRoundAction', progress: i32() })
const _speakingInGroupCallAction: any = () => ({ _: 'speakingInGroupCallAction' })
const _sendMessageHistoryImportAction: any = () => ({ _: 'sendMessageHistoryImportAction', progress: i32() })
const _sendMessageChooseStickerAction: any = () => ({ _: 'sendMessageChooseStickerAction' })
const _sendMessageEmojiInteraction: any = () => ({ _: 'sendMessageEmojiInteraction', emoticon: str(), msg_id: i32(), interaction: obj() })
const _sendMessageEmojiInteractionSeen: any = () => ({ _: 'sendMessageEmojiInteractionSeen', emoticon: str() })
const _contactsFound: any = () => ({ _: 'contacts.found', my_results: vector(obj), results: vector(obj), chats: vector(obj), users: vector(obj) })
const _inputPrivacyKeyStatusTimestamp: any = () => ({ _: 'inputPrivacyKeyStatusTimestamp' })
const _inputPrivacyKeyChatInvite: any = () => ({ _: 'inputPrivacyKeyChatInvite' })
const _inputPrivacyKeyPhoneCall: any = () => ({ _: 'inputPrivacyKeyPhoneCall' })
const _inputPrivacyKeyPhoneP2P: any = () => ({ _: 'inputPrivacyKeyPhoneP2P' })
const _inputPrivacyKeyForwards: any = () => ({ _: 'inputPrivacyKeyForwards' })
const _inputPrivacyKeyProfilePhoto: any = () => ({ _: 'inputPrivacyKeyProfilePhoto' })
const _inputPrivacyKeyPhoneNumber: any = () => ({ _: 'inputPrivacyKeyPhoneNumber' })
const _inputPrivacyKeyAddedByPhone: any = () => ({ _: 'inputPrivacyKeyAddedByPhone' })
const _inputPrivacyKeyVoiceMessages: any = () => ({ _: 'inputPrivacyKeyVoiceMessages' })
const _inputPrivacyKeyAbout: any = () => ({ _: 'inputPrivacyKeyAbout' })
const _privacyKeyStatusTimestamp: any = () => ({ _: 'privacyKeyStatusTimestamp' })
const _privacyKeyChatInvite: any = () => ({ _: 'privacyKeyChatInvite' })
const _privacyKeyPhoneCall: any = () => ({ _: 'privacyKeyPhoneCall' })
const _privacyKeyPhoneP2P: any = () => ({ _: 'privacyKeyPhoneP2P' })
const _privacyKeyForwards: any = () => ({ _: 'privacyKeyForwards' })
const _privacyKeyProfilePhoto: any = () => ({ _: 'privacyKeyProfilePhoto' })
const _privacyKeyPhoneNumber: any = () => ({ _: 'privacyKeyPhoneNumber' })
const _privacyKeyAddedByPhone: any = () => ({ _: 'privacyKeyAddedByPhone' })
const _privacyKeyVoiceMessages: any = () => ({ _: 'privacyKeyVoiceMessages' })
const _privacyKeyAbout: any = () => ({ _: 'privacyKeyAbout' })
const _inputPrivacyValueAllowContacts: any = () => ({ _: 'inputPrivacyValueAllowContacts' })
const _inputPrivacyValueAllowAll: any = () => ({ _: 'inputPrivacyValueAllowAll' })
const _inputPrivacyValueAllowUsers: any = () => ({ _: 'inputPrivacyValueAllowUsers', users: vector(obj) })
const _inputPrivacyValueDisallowContacts: any = () => ({ _: 'inputPrivacyValueDisallowContacts' })
const _inputPrivacyValueDisallowAll: any = () => ({ _: 'inputPrivacyValueDisallowAll' })
const _inputPrivacyValueDisallowUsers: any = () => ({ _: 'inputPrivacyValueDisallowUsers', users: vector(obj) })
const _inputPrivacyValueAllowChatParticipants: any = () => ({ _: 'inputPrivacyValueAllowChatParticipants', chats: vector(i64) })
const _inputPrivacyValueDisallowChatParticipants: any = () => ({ _: 'inputPrivacyValueDisallowChatParticipants', chats: vector(i64) })
const _inputPrivacyValueAllowCloseFriends: any = () => ({ _: 'inputPrivacyValueAllowCloseFriends' })
const _privacyValueAllowContacts: any = () => ({ _: 'privacyValueAllowContacts' })
const _privacyValueAllowAll: any = () => ({ _: 'privacyValueAllowAll' })
const _privacyValueAllowUsers: any = () => ({ _: 'privacyValueAllowUsers', users: vector(i64) })
const _privacyValueDisallowContacts: any = () => ({ _: 'privacyValueDisallowContacts' })
const _privacyValueDisallowAll: any = () => ({ _: 'privacyValueDisallowAll' })
const _privacyValueDisallowUsers: any = () => ({ _: 'privacyValueDisallowUsers', users: vector(i64) })
const _privacyValueAllowChatParticipants: any = () => ({ _: 'privacyValueAllowChatParticipants', chats: vector(i64) })
const _privacyValueDisallowChatParticipants: any = () => ({ _: 'privacyValueDisallowChatParticipants', chats: vector(i64) })
const _privacyValueAllowCloseFriends: any = () => ({ _: 'privacyValueAllowCloseFriends' })
const _accountPrivacyRules: any = () => ({ _: 'account.privacyRules', rules: vector(obj), chats: vector(obj), users: vector(obj) })
const _accountDaysTTL: any = () => ({ _: 'accountDaysTTL', days: i32() })
const _documentAttributeImageSize: any = () => ({ _: 'documentAttributeImageSize', w: i32(), h: i32() })
const _documentAttributeAnimated: any = () => ({ _: 'documentAttributeAnimated' })
const _documentAttributeSticker = (): any => {
  const result: Record<string, unknown> = { _: 'documentAttributeSticker' }
  const flags = i32()
  result.mask = !!(flags & 0x2)
  result.alt = str()
  result.stickerset = obj()
  if (flags & 0x1) result.mask_coords = obj()
  return result
}
const _documentAttributeVideo = (): any => {
  const result: Record<string, unknown> = { _: 'documentAttributeVideo' }
  const flags = i32()
  result.round_message = !!(flags & 0x1)
  result.supports_streaming = !!(flags & 0x2)
  result.nosound = !!(flags & 0x8)
  result.duration = f64()
  result.w = i32()
  result.h = i32()
  if (flags & 0x4) result.preload_prefix_size = i32()
  return result
}
const _documentAttributeAudio = (): any => {
  const result: Record<string, unknown> = { _: 'documentAttributeAudio' }
  const flags = i32()
  result.voice = !!(flags & 0x400)
  result.duration = i32()
  if (flags & 0x1) result.title = str()
  if (flags & 0x2) result.performer = str()
  if (flags & 0x4) result.waveform = bytes()
  return result
}
const _documentAttributeFilename: any = () => ({ _: 'documentAttributeFilename', file_name: str() })
const _documentAttributeHasStickers: any = () => ({ _: 'documentAttributeHasStickers' })
const _documentAttributeCustomEmoji = (): any => {
  const result: Record<string, unknown> = { _: 'documentAttributeCustomEmoji' }
  const flags = i32()
  result.free = !!(flags & 0x1)
  result.text_color = !!(flags & 0x2)
  result.alt = str()
  result.stickerset = obj()
  return result
}
const _messagesStickersNotModified: any = () => ({ _: 'messages.stickersNotModified' })
const _messagesStickers: any = () => ({ _: 'messages.stickers', hash: i64(), stickers: vector(obj) })
const _stickerPack: any = () => ({ _: 'stickerPack', emoticon: str(), documents: vector(i64) })
const _messagesAllStickersNotModified: any = () => ({ _: 'messages.allStickersNotModified' })
const _messagesAllStickers: any = () => ({ _: 'messages.allStickers', hash: i64(), sets: vector(obj) })
const _messagesAffectedMessages: any = () => ({ _: 'messages.affectedMessages', pts: i32(), pts_count: i32() })
const _webPageEmpty = (): any => {
  const result: Record<string, unknown> = { _: 'webPageEmpty' }
  const flags = i32()
  result.id = i64()
  if (flags & 0x1) result.url = str()
  return result
}
const _webPagePending = (): any => {
  const result: Record<string, unknown> = { _: 'webPagePending' }
  const flags = i32()
  result.id = i64()
  if (flags & 0x1) result.url = str()
  result.date = i32()
  return result
}
const _webPage = (): any => {
  const result: Record<string, unknown> = { _: 'webPage' }
  const flags = i32()
  result.has_large_media = !!(flags & 0x2000)
  result.id = i64()
  result.url = str()
  result.display_url = str()
  result.hash = i32()
  if (flags & 0x1) result.type = str()
  if (flags & 0x2) result.site_name = str()
  if (flags & 0x4) result.title = str()
  if (flags & 0x8) result.description = str()
  if (flags & 0x10) result.photo = obj()
  if (flags & 0x20) result.embed_url = str()
  if (flags & 0x20) result.embed_type = str()
  if (flags & 0x40) result.embed_width = i32()
  if (flags & 0x40) result.embed_height = i32()
  if (flags & 0x80) result.duration = i32()
  if (flags & 0x100) result.author = str()
  if (flags & 0x200) result.document = obj()
  if (flags & 0x400) result.cached_page = obj()
  if (flags & 0x1000) result.attributes = vector(obj)
  return result
}
const _webPageNotModified = (): any => {
  const result: Record<string, unknown> = { _: 'webPageNotModified' }
  const flags = i32()
  if (flags & 0x1) result.cached_page_views = i32()
  return result
}
const _authorization = (): any => {
  const result: Record<string, unknown> = { _: 'authorization' }
  const flags = i32()
  result.current = !!(flags & 0x1)
  result.official_app = !!(flags & 0x2)
  result.password_pending = !!(flags & 0x4)
  result.encrypted_requests_disabled = !!(flags & 0x8)
  result.call_requests_disabled = !!(flags & 0x10)
  result.unconfirmed = !!(flags & 0x20)
  result.hash = i64()
  result.device_model = str()
  result.platform = str()
  result.system_version = str()
  result.api_id = i32()
  result.app_name = str()
  result.app_version = str()
  result.date_created = i32()
  result.date_active = i32()
  result.ip = str()
  result.country = str()
  result.region = str()
  return result
}
const _accountAuthorizations: any = () => ({ _: 'account.authorizations', authorization_ttl_days: i32(), authorizations: vector(obj) })
const _accountPassword = (): any => {
  const result: Record<string, unknown> = { _: 'account.password' }
  const flags = i32()
  result.has_recovery = !!(flags & 0x1)
  result.has_secure_values = !!(flags & 0x2)
  result.has_password = !!(flags & 0x4)
  if (flags & 0x4) result.current_algo = obj()
  if (flags & 0x4) result.srp_B = bytes()
  if (flags & 0x4) result.srp_id = i64()
  if (flags & 0x8) result.hint = str()
  if (flags & 0x10) result.email_unconfirmed_pattern = str()
  result.new_algo = obj()
  result.new_secure_algo = obj()
  result.secure_random = bytes()
  if (flags & 0x20) result.pending_reset_date = i32()
  if (flags & 0x40) result.login_email_pattern = str()
  return result
}
const _accountPasswordSettings = (): any => {
  const result: Record<string, unknown> = { _: 'account.passwordSettings' }
  const flags = i32()
  if (flags & 0x1) result.email = str()
  if (flags & 0x2) result.secure_settings = obj()
  return result
}
const _accountPasswordInputSettings = (): any => {
  const result: Record<string, unknown> = { _: 'account.passwordInputSettings' }
  const flags = i32()
  if (flags & 0x1) result.new_algo = obj()
  if (flags & 0x1) result.new_password_hash = bytes()
  if (flags & 0x1) result.hint = str()
  if (flags & 0x2) result.email = str()
  if (flags & 0x4) result.new_secure_settings = obj()
  return result
}
const _authPasswordRecovery: any = () => ({ _: 'auth.passwordRecovery', email_pattern: str() })
const _receivedNotifyMessage: any = () => ({ _: 'receivedNotifyMessage', id: i32(), flags: i32() })
const _chatInviteExported = (): any => {
  const result: Record<string, unknown> = { _: 'chatInviteExported' }
  const flags = i32()
  result.revoked = !!(flags & 0x1)
  result.permanent = !!(flags & 0x20)
  result.request_needed = !!(flags & 0x40)
  result.link = str()
  result.admin_id = i64()
  result.date = i32()
  if (flags & 0x10) result.start_date = i32()
  if (flags & 0x2) result.expire_date = i32()
  if (flags & 0x4) result.usage_limit = i32()
  if (flags & 0x8) result.usage = i32()
  if (flags & 0x80) result.requested = i32()
  if (flags & 0x100) result.title = str()
  return result
}
const _chatInvitePublicJoinRequests: any = () => ({ _: 'chatInvitePublicJoinRequests' })
const _chatInviteAlready: any = () => ({ _: 'chatInviteAlready', chat: obj() })
const _chatInvite = (): any => {
  const result: Record<string, unknown> = { _: 'chatInvite' }
  const flags = i32()
  result.channel = !!(flags & 0x1)
  result.broadcast = !!(flags & 0x2)
  result.public = !!(flags & 0x4)
  result.megagroup = !!(flags & 0x8)
  result.request_needed = !!(flags & 0x40)
  result.verified = !!(flags & 0x80)
  result.scam = !!(flags & 0x100)
  result.fake = !!(flags & 0x200)
  result.title = str()
  if (flags & 0x20) result.about = str()
  result.photo = obj()
  result.participants_count = i32()
  if (flags & 0x10) result.participants = vector(obj)
  result.color = i32()
  return result
}
const _chatInvitePeek: any = () => ({ _: 'chatInvitePeek', chat: obj(), expires: i32() })
const _inputStickerSetEmpty: any = () => ({ _: 'inputStickerSetEmpty' })
const _inputStickerSetID: any = () => ({ _: 'inputStickerSetID', id: i64(), access_hash: i64() })
const _inputStickerSetShortName: any = () => ({ _: 'inputStickerSetShortName', short_name: str() })
const _inputStickerSetAnimatedEmoji: any = () => ({ _: 'inputStickerSetAnimatedEmoji' })
const _inputStickerSetDice: any = () => ({ _: 'inputStickerSetDice', emoticon: str() })
const _inputStickerSetAnimatedEmojiAnimations: any = () => ({ _: 'inputStickerSetAnimatedEmojiAnimations' })
const _inputStickerSetPremiumGifts: any = () => ({ _: 'inputStickerSetPremiumGifts' })
const _inputStickerSetEmojiGenericAnimations: any = () => ({ _: 'inputStickerSetEmojiGenericAnimations' })
const _inputStickerSetEmojiDefaultStatuses: any = () => ({ _: 'inputStickerSetEmojiDefaultStatuses' })
const _inputStickerSetEmojiDefaultTopicIcons: any = () => ({ _: 'inputStickerSetEmojiDefaultTopicIcons' })
const _stickerSet = (): any => {
  const result: Record<string, unknown> = { _: 'stickerSet' }
  const flags = i32()
  result.archived = !!(flags & 0x2)
  result.official = !!(flags & 0x4)
  result.masks = !!(flags & 0x8)
  result.animated = !!(flags & 0x20)
  result.videos = !!(flags & 0x40)
  result.emojis = !!(flags & 0x80)
  result.text_color = !!(flags & 0x200)
  if (flags & 0x1) result.installed_date = i32()
  result.id = i64()
  result.access_hash = i64()
  result.title = str()
  result.short_name = str()
  if (flags & 0x10) result.thumbs = vector(obj)
  if (flags & 0x10) result.thumb_dc_id = i32()
  if (flags & 0x10) result.thumb_version = i32()
  if (flags & 0x100) result.thumb_document_id = i64()
  result.count = i32()
  result.hash = i32()
  return result
}
const _messagesStickerSet: any = () => ({ _: 'messages.stickerSet', set: obj(), packs: vector(obj), keywords: vector(obj), documents: vector(obj) })
const _messagesStickerSetNotModified: any = () => ({ _: 'messages.stickerSetNotModified' })
const _botCommand: any = () => ({ _: 'botCommand', command: str(), description: str() })
const _botInfo = (): any => {
  const result: Record<string, unknown> = { _: 'botInfo' }
  const flags = i32()
  if (flags & 0x1) result.user_id = i64()
  if (flags & 0x2) result.description = str()
  if (flags & 0x10) result.description_photo = obj()
  if (flags & 0x20) result.description_document = obj()
  if (flags & 0x4) result.commands = vector(obj)
  if (flags & 0x8) result.menu_button = obj()
  return result
}
const _keyboardButton: any = () => ({ _: 'keyboardButton', text: str() })
const _keyboardButtonUrl: any = () => ({ _: 'keyboardButtonUrl', text: str(), url: str() })
const _keyboardButtonCallback = (): any => {
  const result: Record<string, unknown> = { _: 'keyboardButtonCallback' }
  const flags = i32()
  result.requires_password = !!(flags & 0x1)
  result.text = str()
  result.data = bytes()
  return result
}
const _keyboardButtonRequestPhone: any = () => ({ _: 'keyboardButtonRequestPhone', text: str() })
const _keyboardButtonRequestGeoLocation: any = () => ({ _: 'keyboardButtonRequestGeoLocation', text: str() })
const _keyboardButtonSwitchInline = (): any => {
  const result: Record<string, unknown> = { _: 'keyboardButtonSwitchInline' }
  const flags = i32()
  result.same_peer = !!(flags & 0x1)
  result.text = str()
  result.query = str()
  if (flags & 0x2) result.peer_types = vector(obj)
  return result
}
const _keyboardButtonGame: any = () => ({ _: 'keyboardButtonGame', text: str() })
const _keyboardButtonBuy: any = () => ({ _: 'keyboardButtonBuy', text: str() })
const _keyboardButtonUrlAuth = (): any => {
  const result: Record<string, unknown> = { _: 'keyboardButtonUrlAuth' }
  const flags = i32()
  result.text = str()
  if (flags & 0x1) result.fwd_text = str()
  result.url = str()
  result.button_id = i32()
  return result
}
const _inputKeyboardButtonUrlAuth = (): any => {
  const result: Record<string, unknown> = { _: 'inputKeyboardButtonUrlAuth' }
  const flags = i32()
  result.request_write_access = !!(flags & 0x1)
  result.text = str()
  if (flags & 0x2) result.fwd_text = str()
  result.url = str()
  result.bot = obj()
  return result
}
const _keyboardButtonRequestPoll = (): any => {
  const result: Record<string, unknown> = { _: 'keyboardButtonRequestPoll' }
  const flags = i32()
  if (flags & 0x1) result.quiz = obj()
  result.text = str()
  return result
}
const _inputKeyboardButtonUserProfile: any = () => ({ _: 'inputKeyboardButtonUserProfile', text: str(), user_id: obj() })
const _keyboardButtonUserProfile: any = () => ({ _: 'keyboardButtonUserProfile', text: str(), user_id: i64() })
const _keyboardButtonWebView: any = () => ({ _: 'keyboardButtonWebView', text: str(), url: str() })
const _keyboardButtonSimpleWebView: any = () => ({ _: 'keyboardButtonSimpleWebView', text: str(), url: str() })
const _keyboardButtonRequestPeer: any = () => ({ _: 'keyboardButtonRequestPeer', text: str(), button_id: i32(), peer_type: obj() })
const _keyboardButtonRow: any = () => ({ _: 'keyboardButtonRow', buttons: vector(obj) })
const _replyKeyboardHide = (): any => {
  const result: Record<string, unknown> = { _: 'replyKeyboardHide' }
  const flags = i32()
  result.selective = !!(flags & 0x4)
  return result
}
const _replyKeyboardForceReply = (): any => {
  const result: Record<string, unknown> = { _: 'replyKeyboardForceReply' }
  const flags = i32()
  result.single_use = !!(flags & 0x2)
  result.selective = !!(flags & 0x4)
  if (flags & 0x8) result.placeholder = str()
  return result
}
const _replyKeyboardMarkup = (): any => {
  const result: Record<string, unknown> = { _: 'replyKeyboardMarkup' }
  const flags = i32()
  result.resize = !!(flags & 0x1)
  result.single_use = !!(flags & 0x2)
  result.selective = !!(flags & 0x4)
  result.persistent = !!(flags & 0x10)
  result.rows = vector(obj)
  if (flags & 0x8) result.placeholder = str()
  return result
}
const _replyInlineMarkup: any = () => ({ _: 'replyInlineMarkup', rows: vector(obj) })
const _messageEntityUnknown: any = () => ({ _: 'messageEntityUnknown', offset: i32(), length: i32() })
const _messageEntityMention: any = () => ({ _: 'messageEntityMention', offset: i32(), length: i32() })
const _messageEntityHashtag: any = () => ({ _: 'messageEntityHashtag', offset: i32(), length: i32() })
const _messageEntityBotCommand: any = () => ({ _: 'messageEntityBotCommand', offset: i32(), length: i32() })
const _messageEntityUrl: any = () => ({ _: 'messageEntityUrl', offset: i32(), length: i32() })
const _messageEntityEmail: any = () => ({ _: 'messageEntityEmail', offset: i32(), length: i32() })
const _messageEntityBold: any = () => ({ _: 'messageEntityBold', offset: i32(), length: i32() })
const _messageEntityItalic: any = () => ({ _: 'messageEntityItalic', offset: i32(), length: i32() })
const _messageEntityCode: any = () => ({ _: 'messageEntityCode', offset: i32(), length: i32() })
const _messageEntityPre: any = () => ({ _: 'messageEntityPre', offset: i32(), length: i32(), language: str() })
const _messageEntityTextUrl: any = () => ({ _: 'messageEntityTextUrl', offset: i32(), length: i32(), url: str() })
const _messageEntityMentionName: any = () => ({ _: 'messageEntityMentionName', offset: i32(), length: i32(), user_id: i64() })
const _inputMessageEntityMentionName: any = () => ({ _: 'inputMessageEntityMentionName', offset: i32(), length: i32(), user_id: obj() })
const _messageEntityPhone: any = () => ({ _: 'messageEntityPhone', offset: i32(), length: i32() })
const _messageEntityCashtag: any = () => ({ _: 'messageEntityCashtag', offset: i32(), length: i32() })
const _messageEntityUnderline: any = () => ({ _: 'messageEntityUnderline', offset: i32(), length: i32() })
const _messageEntityStrike: any = () => ({ _: 'messageEntityStrike', offset: i32(), length: i32() })
const _messageEntityBankCard: any = () => ({ _: 'messageEntityBankCard', offset: i32(), length: i32() })
const _messageEntitySpoiler: any = () => ({ _: 'messageEntitySpoiler', offset: i32(), length: i32() })
const _messageEntityCustomEmoji: any = () => ({ _: 'messageEntityCustomEmoji', offset: i32(), length: i32(), document_id: i64() })
const _messageEntityBlockquote: any = () => ({ _: 'messageEntityBlockquote', offset: i32(), length: i32() })
const _inputChannelEmpty: any = () => ({ _: 'inputChannelEmpty' })
const _inputChannel: any = () => ({ _: 'inputChannel', channel_id: i64(), access_hash: i64() })
const _inputChannelFromMessage: any = () => ({ _: 'inputChannelFromMessage', peer: obj(), msg_id: i32(), channel_id: i64() })
const _contactsResolvedPeer: any = () => ({ _: 'contacts.resolvedPeer', peer: obj(), chats: vector(obj), users: vector(obj) })
const _messageRange: any = () => ({ _: 'messageRange', min_id: i32(), max_id: i32() })
const _updatesChannelDifferenceEmpty = (): any => {
  const result: Record<string, unknown> = { _: 'updates.channelDifferenceEmpty' }
  const flags = i32()
  result.final = !!(flags & 0x1)
  result.pts = i32()
  if (flags & 0x2) result.timeout = i32()
  return result
}
const _updatesChannelDifferenceTooLong = (): any => {
  const result: Record<string, unknown> = { _: 'updates.channelDifferenceTooLong' }
  const flags = i32()
  result.final = !!(flags & 0x1)
  if (flags & 0x2) result.timeout = i32()
  result.dialog = obj()
  result.messages = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _updatesChannelDifference = (): any => {
  const result: Record<string, unknown> = { _: 'updates.channelDifference' }
  const flags = i32()
  result.final = !!(flags & 0x1)
  result.pts = i32()
  if (flags & 0x2) result.timeout = i32()
  result.new_messages = vector(obj)
  result.other_updates = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _channelMessagesFilterEmpty: any = () => ({ _: 'channelMessagesFilterEmpty' })
const _channelMessagesFilter = (): any => {
  const result: Record<string, unknown> = { _: 'channelMessagesFilter' }
  const flags = i32()
  result.exclude_new_messages = !!(flags & 0x2)
  result.ranges = vector(obj)
  return result
}
const _channelParticipant: any = () => ({ _: 'channelParticipant', user_id: i64(), date: i32() })
const _channelParticipantSelf = (): any => {
  const result: Record<string, unknown> = { _: 'channelParticipantSelf' }
  const flags = i32()
  result.via_request = !!(flags & 0x1)
  result.user_id = i64()
  result.inviter_id = i64()
  result.date = i32()
  return result
}
const _channelParticipantCreator = (): any => {
  const result: Record<string, unknown> = { _: 'channelParticipantCreator' }
  const flags = i32()
  result.user_id = i64()
  result.admin_rights = obj()
  if (flags & 0x1) result.rank = str()
  return result
}
const _channelParticipantAdmin = (): any => {
  const result: Record<string, unknown> = { _: 'channelParticipantAdmin' }
  const flags = i32()
  result.can_edit = !!(flags & 0x1)
  result.self = !!(flags & 0x2)
  result.user_id = i64()
  if (flags & 0x2) result.inviter_id = i64()
  result.promoted_by = i64()
  result.date = i32()
  result.admin_rights = obj()
  if (flags & 0x4) result.rank = str()
  return result
}
const _channelParticipantBanned = (): any => {
  const result: Record<string, unknown> = { _: 'channelParticipantBanned' }
  const flags = i32()
  result.left = !!(flags & 0x1)
  result.peer = obj()
  result.kicked_by = i64()
  result.date = i32()
  result.banned_rights = obj()
  return result
}
const _channelParticipantLeft: any = () => ({ _: 'channelParticipantLeft', peer: obj() })
const _channelParticipantsRecent: any = () => ({ _: 'channelParticipantsRecent' })
const _channelParticipantsAdmins: any = () => ({ _: 'channelParticipantsAdmins' })
const _channelParticipantsKicked: any = () => ({ _: 'channelParticipantsKicked', q: str() })
const _channelParticipantsBots: any = () => ({ _: 'channelParticipantsBots' })
const _channelParticipantsBanned: any = () => ({ _: 'channelParticipantsBanned', q: str() })
const _channelParticipantsSearch: any = () => ({ _: 'channelParticipantsSearch', q: str() })
const _channelParticipantsContacts: any = () => ({ _: 'channelParticipantsContacts', q: str() })
const _channelParticipantsMentions = (): any => {
  const result: Record<string, unknown> = { _: 'channelParticipantsMentions' }
  const flags = i32()
  if (flags & 0x1) result.q = str()
  if (flags & 0x2) result.top_msg_id = i32()
  return result
}
const _channelsChannelParticipants: any = () => ({ _: 'channels.channelParticipants', count: i32(), participants: vector(obj), chats: vector(obj), users: vector(obj) })
const _channelsChannelParticipantsNotModified: any = () => ({ _: 'channels.channelParticipantsNotModified' })
const _channelsChannelParticipant: any = () => ({ _: 'channels.channelParticipant', participant: obj(), chats: vector(obj), users: vector(obj) })
const _helpTermsOfService = (): any => {
  const result: Record<string, unknown> = { _: 'help.termsOfService' }
  const flags = i32()
  result.popup = !!(flags & 0x1)
  result.id = obj()
  result.text = str()
  result.entities = vector(obj)
  if (flags & 0x2) result.min_age_confirm = i32()
  return result
}
const _messagesSavedGifsNotModified: any = () => ({ _: 'messages.savedGifsNotModified' })
const _messagesSavedGifs: any = () => ({ _: 'messages.savedGifs', hash: i64(), gifs: vector(obj) })
const _inputBotInlineMessageMediaAuto = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineMessageMediaAuto' }
  const flags = i32()
  result.invert_media = !!(flags & 0x8)
  result.message = str()
  if (flags & 0x2) result.entities = vector(obj)
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _inputBotInlineMessageText = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineMessageText' }
  const flags = i32()
  result.no_webpage = !!(flags & 0x1)
  result.invert_media = !!(flags & 0x8)
  result.message = str()
  if (flags & 0x2) result.entities = vector(obj)
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _inputBotInlineMessageMediaGeo = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineMessageMediaGeo' }
  const flags = i32()
  result.geo_point = obj()
  if (flags & 0x1) result.heading = i32()
  if (flags & 0x2) result.period = i32()
  if (flags & 0x8) result.proximity_notification_radius = i32()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _inputBotInlineMessageMediaVenue = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineMessageMediaVenue' }
  const flags = i32()
  result.geo_point = obj()
  result.title = str()
  result.address = str()
  result.provider = str()
  result.venue_id = str()
  result.venue_type = str()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _inputBotInlineMessageMediaContact = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineMessageMediaContact' }
  const flags = i32()
  result.phone_number = str()
  result.first_name = str()
  result.last_name = str()
  result.vcard = str()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _inputBotInlineMessageGame = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineMessageGame' }
  const flags = i32()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _inputBotInlineMessageMediaInvoice = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineMessageMediaInvoice' }
  const flags = i32()
  result.title = str()
  result.description = str()
  if (flags & 0x1) result.photo = obj()
  result.invoice = obj()
  result.payload = bytes()
  result.provider = str()
  result.provider_data = obj()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _inputBotInlineMessageMediaWebPage = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineMessageMediaWebPage' }
  const flags = i32()
  result.invert_media = !!(flags & 0x8)
  result.force_large_media = !!(flags & 0x10)
  result.force_small_media = !!(flags & 0x20)
  result.optional = !!(flags & 0x40)
  result.message = str()
  if (flags & 0x2) result.entities = vector(obj)
  result.url = str()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _inputBotInlineResult = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineResult' }
  const flags = i32()
  result.id = str()
  result.type = str()
  if (flags & 0x2) result.title = str()
  if (flags & 0x4) result.description = str()
  if (flags & 0x8) result.url = str()
  if (flags & 0x10) result.thumb = obj()
  if (flags & 0x20) result.content = obj()
  result.send_message = obj()
  return result
}
const _inputBotInlineResultPhoto: any = () => ({ _: 'inputBotInlineResultPhoto', id: str(), type: str(), photo: obj(), send_message: obj() })
const _inputBotInlineResultDocument = (): any => {
  const result: Record<string, unknown> = { _: 'inputBotInlineResultDocument' }
  const flags = i32()
  result.id = str()
  result.type = str()
  if (flags & 0x2) result.title = str()
  if (flags & 0x4) result.description = str()
  result.document = obj()
  result.send_message = obj()
  return result
}
const _inputBotInlineResultGame: any = () => ({ _: 'inputBotInlineResultGame', id: str(), short_name: str(), send_message: obj() })
const _botInlineMessageMediaAuto = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineMessageMediaAuto' }
  const flags = i32()
  result.invert_media = !!(flags & 0x8)
  result.message = str()
  if (flags & 0x2) result.entities = vector(obj)
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _botInlineMessageText = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineMessageText' }
  const flags = i32()
  result.no_webpage = !!(flags & 0x1)
  result.invert_media = !!(flags & 0x8)
  result.message = str()
  if (flags & 0x2) result.entities = vector(obj)
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _botInlineMessageMediaGeo = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineMessageMediaGeo' }
  const flags = i32()
  result.geo = obj()
  if (flags & 0x1) result.heading = i32()
  if (flags & 0x2) result.period = i32()
  if (flags & 0x8) result.proximity_notification_radius = i32()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _botInlineMessageMediaVenue = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineMessageMediaVenue' }
  const flags = i32()
  result.geo = obj()
  result.title = str()
  result.address = str()
  result.provider = str()
  result.venue_id = str()
  result.venue_type = str()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _botInlineMessageMediaContact = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineMessageMediaContact' }
  const flags = i32()
  result.phone_number = str()
  result.first_name = str()
  result.last_name = str()
  result.vcard = str()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _botInlineMessageMediaInvoice = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineMessageMediaInvoice' }
  const flags = i32()
  result.shipping_address_requested = !!(flags & 0x2)
  result.test = !!(flags & 0x8)
  result.title = str()
  result.description = str()
  if (flags & 0x1) result.photo = obj()
  result.currency = str()
  result.total_amount = i64()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _botInlineMessageMediaWebPage = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineMessageMediaWebPage' }
  const flags = i32()
  result.invert_media = !!(flags & 0x8)
  result.force_large_media = !!(flags & 0x10)
  result.force_small_media = !!(flags & 0x20)
  result.manual = !!(flags & 0x80)
  result.safe = !!(flags & 0x100)
  result.message = str()
  if (flags & 0x2) result.entities = vector(obj)
  result.url = str()
  if (flags & 0x4) result.reply_markup = obj()
  return result
}
const _botInlineResult = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineResult' }
  const flags = i32()
  result.id = str()
  result.type = str()
  if (flags & 0x2) result.title = str()
  if (flags & 0x4) result.description = str()
  if (flags & 0x8) result.url = str()
  if (flags & 0x10) result.thumb = obj()
  if (flags & 0x20) result.content = obj()
  result.send_message = obj()
  return result
}
const _botInlineMediaResult = (): any => {
  const result: Record<string, unknown> = { _: 'botInlineMediaResult' }
  const flags = i32()
  result.id = str()
  result.type = str()
  if (flags & 0x1) result.photo = obj()
  if (flags & 0x2) result.document = obj()
  if (flags & 0x4) result.title = str()
  if (flags & 0x8) result.description = str()
  result.send_message = obj()
  return result
}
const _messagesBotResults = (): any => {
  const result: Record<string, unknown> = { _: 'messages.botResults' }
  const flags = i32()
  result.gallery = !!(flags & 0x1)
  result.query_id = i64()
  if (flags & 0x2) result.next_offset = str()
  if (flags & 0x4) result.switch_pm = obj()
  if (flags & 0x8) result.switch_webview = obj()
  result.results = vector(obj)
  result.cache_time = i32()
  result.users = vector(obj)
  return result
}
const _exportedMessageLink: any = () => ({ _: 'exportedMessageLink', link: str(), html: str() })
const _messageFwdHeader = (): any => {
  const result: Record<string, unknown> = { _: 'messageFwdHeader' }
  const flags = i32()
  result.imported = !!(flags & 0x80)
  if (flags & 0x1) result.from_id = obj()
  if (flags & 0x20) result.from_name = str()
  result.date = i32()
  if (flags & 0x4) result.channel_post = i32()
  if (flags & 0x8) result.post_author = str()
  if (flags & 0x10) result.saved_from_peer = obj()
  if (flags & 0x10) result.saved_from_msg_id = i32()
  if (flags & 0x40) result.psa_type = str()
  return result
}
const _authCodeTypeSms: any = () => ({ _: 'auth.codeTypeSms' })
const _authCodeTypeCall: any = () => ({ _: 'auth.codeTypeCall' })
const _authCodeTypeFlashCall: any = () => ({ _: 'auth.codeTypeFlashCall' })
const _authCodeTypeMissedCall: any = () => ({ _: 'auth.codeTypeMissedCall' })
const _authCodeTypeFragmentSms: any = () => ({ _: 'auth.codeTypeFragmentSms' })
const _authSentCodeTypeApp: any = () => ({ _: 'auth.sentCodeTypeApp', length: i32() })
const _authSentCodeTypeSms: any = () => ({ _: 'auth.sentCodeTypeSms', length: i32() })
const _authSentCodeTypeCall: any = () => ({ _: 'auth.sentCodeTypeCall', length: i32() })
const _authSentCodeTypeFlashCall: any = () => ({ _: 'auth.sentCodeTypeFlashCall', pattern: str() })
const _authSentCodeTypeMissedCall: any = () => ({ _: 'auth.sentCodeTypeMissedCall', prefix: str(), length: i32() })
const _authSentCodeTypeEmailCode = (): any => {
  const result: Record<string, unknown> = { _: 'auth.sentCodeTypeEmailCode' }
  const flags = i32()
  result.apple_signin_allowed = !!(flags & 0x1)
  result.google_signin_allowed = !!(flags & 0x2)
  result.email_pattern = str()
  result.length = i32()
  if (flags & 0x8) result.reset_available_period = i32()
  if (flags & 0x10) result.reset_pending_date = i32()
  return result
}
const _authSentCodeTypeSetUpEmailRequired = (): any => {
  const result: Record<string, unknown> = { _: 'auth.sentCodeTypeSetUpEmailRequired' }
  const flags = i32()
  result.apple_signin_allowed = !!(flags & 0x1)
  result.google_signin_allowed = !!(flags & 0x2)
  return result
}
const _authSentCodeTypeFragmentSms: any = () => ({ _: 'auth.sentCodeTypeFragmentSms', url: str(), length: i32() })
const _authSentCodeTypeFirebaseSms = (): any => {
  const result: Record<string, unknown> = { _: 'auth.sentCodeTypeFirebaseSms' }
  const flags = i32()
  if (flags & 0x1) result.nonce = bytes()
  if (flags & 0x2) result.receipt = str()
  if (flags & 0x2) result.push_timeout = i32()
  result.length = i32()
  return result
}
const _messagesBotCallbackAnswer = (): any => {
  const result: Record<string, unknown> = { _: 'messages.botCallbackAnswer' }
  const flags = i32()
  result.alert = !!(flags & 0x2)
  result.has_url = !!(flags & 0x8)
  result.native_ui = !!(flags & 0x10)
  if (flags & 0x1) result.message = str()
  if (flags & 0x4) result.url = str()
  result.cache_time = i32()
  return result
}
const _messagesMessageEditData = (): any => {
  const result: Record<string, unknown> = { _: 'messages.messageEditData' }
  const flags = i32()
  result.caption = !!(flags & 0x1)
  return result
}
const _inputBotInlineMessageID: any = () => ({ _: 'inputBotInlineMessageID', dc_id: i32(), id: i64(), access_hash: i64() })
const _inputBotInlineMessageID64: any = () => ({ _: 'inputBotInlineMessageID64', dc_id: i32(), owner_id: i64(), id: i32(), access_hash: i64() })
const _inlineBotSwitchPM: any = () => ({ _: 'inlineBotSwitchPM', text: str(), start_param: str() })
const _messagesPeerDialogs: any = () => ({ _: 'messages.peerDialogs', dialogs: vector(obj), messages: vector(obj), chats: vector(obj), users: vector(obj), state: obj() })
const _topPeer: any = () => ({ _: 'topPeer', peer: obj(), rating: f64() })
const _topPeerCategoryBotsPM: any = () => ({ _: 'topPeerCategoryBotsPM' })
const _topPeerCategoryBotsInline: any = () => ({ _: 'topPeerCategoryBotsInline' })
const _topPeerCategoryCorrespondents: any = () => ({ _: 'topPeerCategoryCorrespondents' })
const _topPeerCategoryGroups: any = () => ({ _: 'topPeerCategoryGroups' })
const _topPeerCategoryChannels: any = () => ({ _: 'topPeerCategoryChannels' })
const _topPeerCategoryPhoneCalls: any = () => ({ _: 'topPeerCategoryPhoneCalls' })
const _topPeerCategoryForwardUsers: any = () => ({ _: 'topPeerCategoryForwardUsers' })
const _topPeerCategoryForwardChats: any = () => ({ _: 'topPeerCategoryForwardChats' })
const _topPeerCategoryPeers: any = () => ({ _: 'topPeerCategoryPeers', category: obj(), count: i32(), peers: vector(obj) })
const _contactsTopPeersNotModified: any = () => ({ _: 'contacts.topPeersNotModified' })
const _contactsTopPeers: any = () => ({ _: 'contacts.topPeers', categories: vector(obj), chats: vector(obj), users: vector(obj) })
const _contactsTopPeersDisabled: any = () => ({ _: 'contacts.topPeersDisabled' })
const _draftMessageEmpty = (): any => {
  const result: Record<string, unknown> = { _: 'draftMessageEmpty' }
  const flags = i32()
  if (flags & 0x1) result.date = i32()
  return result
}
const _draftMessage = (): any => {
  const result: Record<string, unknown> = { _: 'draftMessage' }
  const flags = i32()
  result.no_webpage = !!(flags & 0x2)
  result.invert_media = !!(flags & 0x40)
  if (flags & 0x10) result.reply_to = obj()
  result.message = str()
  if (flags & 0x8) result.entities = vector(obj)
  if (flags & 0x20) result.media = obj()
  result.date = i32()
  return result
}
const _messagesFeaturedStickersNotModified: any = () => ({ _: 'messages.featuredStickersNotModified', count: i32() })
const _messagesFeaturedStickers = (): any => {
  const result: Record<string, unknown> = { _: 'messages.featuredStickers' }
  const flags = i32()
  result.premium = !!(flags & 0x1)
  result.hash = i64()
  result.count = i32()
  result.sets = vector(obj)
  result.unread = vector(i64)
  return result
}
const _messagesRecentStickersNotModified: any = () => ({ _: 'messages.recentStickersNotModified' })
const _messagesRecentStickers: any = () => ({ _: 'messages.recentStickers', hash: i64(), packs: vector(obj), stickers: vector(obj), dates: vector(i32) })
const _messagesArchivedStickers: any = () => ({ _: 'messages.archivedStickers', count: i32(), sets: vector(obj) })
const _messagesStickerSetInstallResultSuccess: any = () => ({ _: 'messages.stickerSetInstallResultSuccess' })
const _messagesStickerSetInstallResultArchive: any = () => ({ _: 'messages.stickerSetInstallResultArchive', sets: vector(obj) })
const _stickerSetCovered: any = () => ({ _: 'stickerSetCovered', set: obj(), cover: obj() })
const _stickerSetMultiCovered: any = () => ({ _: 'stickerSetMultiCovered', set: obj(), covers: vector(obj) })
const _stickerSetFullCovered: any = () => ({ _: 'stickerSetFullCovered', set: obj(), packs: vector(obj), keywords: vector(obj), documents: vector(obj) })
const _stickerSetNoCovered: any = () => ({ _: 'stickerSetNoCovered', set: obj() })
const _maskCoords: any = () => ({ _: 'maskCoords', n: i32(), x: f64(), y: f64(), zoom: f64() })
const _inputStickeredMediaPhoto: any = () => ({ _: 'inputStickeredMediaPhoto', id: obj() })
const _inputStickeredMediaDocument: any = () => ({ _: 'inputStickeredMediaDocument', id: obj() })
const _game = (): any => {
  const result: Record<string, unknown> = { _: 'game' }
  const flags = i32()
  result.id = i64()
  result.access_hash = i64()
  result.short_name = str()
  result.title = str()
  result.description = str()
  result.photo = obj()
  if (flags & 0x1) result.document = obj()
  return result
}
const _inputGameID: any = () => ({ _: 'inputGameID', id: i64(), access_hash: i64() })
const _inputGameShortName: any = () => ({ _: 'inputGameShortName', bot_id: obj(), short_name: str() })
const _highScore: any = () => ({ _: 'highScore', pos: i32(), user_id: i64(), score: i32() })
const _messagesHighScores: any = () => ({ _: 'messages.highScores', scores: vector(obj), users: vector(obj) })
const _textEmpty: any = () => ({ _: 'textEmpty' })
const _textPlain: any = () => ({ _: 'textPlain', text: str() })
const _textBold: any = () => ({ _: 'textBold', text: obj() })
const _textItalic: any = () => ({ _: 'textItalic', text: obj() })
const _textUnderline: any = () => ({ _: 'textUnderline', text: obj() })
const _textStrike: any = () => ({ _: 'textStrike', text: obj() })
const _textFixed: any = () => ({ _: 'textFixed', text: obj() })
const _textUrl: any = () => ({ _: 'textUrl', text: obj(), url: str(), webpage_id: i64() })
const _textEmail: any = () => ({ _: 'textEmail', text: obj(), email: str() })
const _textConcat: any = () => ({ _: 'textConcat', texts: vector(obj) })
const _textSubscript: any = () => ({ _: 'textSubscript', text: obj() })
const _textSuperscript: any = () => ({ _: 'textSuperscript', text: obj() })
const _textMarked: any = () => ({ _: 'textMarked', text: obj() })
const _textPhone: any = () => ({ _: 'textPhone', text: obj(), phone: str() })
const _textImage: any = () => ({ _: 'textImage', document_id: i64(), w: i32(), h: i32() })
const _textAnchor: any = () => ({ _: 'textAnchor', text: obj(), name: str() })
const _pageBlockUnsupported: any = () => ({ _: 'pageBlockUnsupported' })
const _pageBlockTitle: any = () => ({ _: 'pageBlockTitle', text: obj() })
const _pageBlockSubtitle: any = () => ({ _: 'pageBlockSubtitle', text: obj() })
const _pageBlockAuthorDate: any = () => ({ _: 'pageBlockAuthorDate', author: obj(), published_date: i32() })
const _pageBlockHeader: any = () => ({ _: 'pageBlockHeader', text: obj() })
const _pageBlockSubheader: any = () => ({ _: 'pageBlockSubheader', text: obj() })
const _pageBlockParagraph: any = () => ({ _: 'pageBlockParagraph', text: obj() })
const _pageBlockPreformatted: any = () => ({ _: 'pageBlockPreformatted', text: obj(), language: str() })
const _pageBlockFooter: any = () => ({ _: 'pageBlockFooter', text: obj() })
const _pageBlockDivider: any = () => ({ _: 'pageBlockDivider' })
const _pageBlockAnchor: any = () => ({ _: 'pageBlockAnchor', name: str() })
const _pageBlockList: any = () => ({ _: 'pageBlockList', items: vector(obj) })
const _pageBlockBlockquote: any = () => ({ _: 'pageBlockBlockquote', text: obj(), caption: obj() })
const _pageBlockPullquote: any = () => ({ _: 'pageBlockPullquote', text: obj(), caption: obj() })
const _pageBlockPhoto = (): any => {
  const result: Record<string, unknown> = { _: 'pageBlockPhoto' }
  const flags = i32()
  result.photo_id = i64()
  result.caption = obj()
  if (flags & 0x1) result.url = str()
  if (flags & 0x1) result.webpage_id = i64()
  return result
}
const _pageBlockVideo = (): any => {
  const result: Record<string, unknown> = { _: 'pageBlockVideo' }
  const flags = i32()
  result.autoplay = !!(flags & 0x1)
  result.loop = !!(flags & 0x2)
  result.video_id = i64()
  result.caption = obj()
  return result
}
const _pageBlockCover: any = () => ({ _: 'pageBlockCover', cover: obj() })
const _pageBlockEmbed = (): any => {
  const result: Record<string, unknown> = { _: 'pageBlockEmbed' }
  const flags = i32()
  result.full_width = !!(flags & 0x1)
  result.allow_scrolling = !!(flags & 0x8)
  if (flags & 0x2) result.url = str()
  if (flags & 0x4) result.html = str()
  if (flags & 0x10) result.poster_photo_id = i64()
  if (flags & 0x20) result.w = i32()
  if (flags & 0x20) result.h = i32()
  result.caption = obj()
  return result
}
const _pageBlockEmbedPost: any = () => ({ _: 'pageBlockEmbedPost', url: str(), webpage_id: i64(), author_photo_id: i64(), author: str(), date: i32(), blocks: vector(obj), caption: obj() })
const _pageBlockCollage: any = () => ({ _: 'pageBlockCollage', items: vector(obj), caption: obj() })
const _pageBlockSlideshow: any = () => ({ _: 'pageBlockSlideshow', items: vector(obj), caption: obj() })
const _pageBlockChannel: any = () => ({ _: 'pageBlockChannel', channel: obj() })
const _pageBlockAudio: any = () => ({ _: 'pageBlockAudio', audio_id: i64(), caption: obj() })
const _pageBlockKicker: any = () => ({ _: 'pageBlockKicker', text: obj() })
const _pageBlockTable = (): any => {
  const result: Record<string, unknown> = { _: 'pageBlockTable' }
  const flags = i32()
  result.bordered = !!(flags & 0x1)
  result.striped = !!(flags & 0x2)
  result.title = obj()
  result.rows = vector(obj)
  return result
}
const _pageBlockOrderedList: any = () => ({ _: 'pageBlockOrderedList', items: vector(obj) })
const _pageBlockDetails = (): any => {
  const result: Record<string, unknown> = { _: 'pageBlockDetails' }
  const flags = i32()
  result.open = !!(flags & 0x1)
  result.blocks = vector(obj)
  result.title = obj()
  return result
}
const _pageBlockRelatedArticles: any = () => ({ _: 'pageBlockRelatedArticles', title: obj(), articles: vector(obj) })
const _pageBlockMap: any = () => ({ _: 'pageBlockMap', geo: obj(), zoom: i32(), w: i32(), h: i32(), caption: obj() })
const _phoneCallDiscardReasonMissed: any = () => ({ _: 'phoneCallDiscardReasonMissed' })
const _phoneCallDiscardReasonDisconnect: any = () => ({ _: 'phoneCallDiscardReasonDisconnect' })
const _phoneCallDiscardReasonHangup: any = () => ({ _: 'phoneCallDiscardReasonHangup' })
const _phoneCallDiscardReasonBusy: any = () => ({ _: 'phoneCallDiscardReasonBusy' })
const _dataJSON: any = () => ({ _: 'dataJSON', data: str() })
const _labeledPrice: any = () => ({ _: 'labeledPrice', label: str(), amount: i64() })
const _invoice = (): any => {
  const result: Record<string, unknown> = { _: 'invoice' }
  const flags = i32()
  result.test = !!(flags & 0x1)
  result.name_requested = !!(flags & 0x2)
  result.phone_requested = !!(flags & 0x4)
  result.email_requested = !!(flags & 0x8)
  result.shipping_address_requested = !!(flags & 0x10)
  result.flexible = !!(flags & 0x20)
  result.phone_to_provider = !!(flags & 0x40)
  result.email_to_provider = !!(flags & 0x80)
  result.recurring = !!(flags & 0x200)
  result.currency = str()
  result.prices = vector(obj)
  if (flags & 0x100) result.max_tip_amount = i64()
  if (flags & 0x100) result.suggested_tip_amounts = vector(i64)
  if (flags & 0x400) result.terms_url = str()
  return result
}
const _paymentCharge: any = () => ({ _: 'paymentCharge', id: str(), provider_charge_id: str() })
const _postAddress: any = () => ({ _: 'postAddress', street_line1: str(), street_line2: str(), city: str(), state: str(), country_iso2: str(), post_code: str() })
const _paymentRequestedInfo = (): any => {
  const result: Record<string, unknown> = { _: 'paymentRequestedInfo' }
  const flags = i32()
  if (flags & 0x1) result.name = str()
  if (flags & 0x2) result.phone = str()
  if (flags & 0x4) result.email = str()
  if (flags & 0x8) result.shipping_address = obj()
  return result
}
const _paymentSavedCredentialsCard: any = () => ({ _: 'paymentSavedCredentialsCard', id: str(), title: str() })
const _webDocument: any = () => ({ _: 'webDocument', url: str(), access_hash: i64(), size: i32(), mime_type: str(), attributes: vector(obj) })
const _webDocumentNoProxy: any = () => ({ _: 'webDocumentNoProxy', url: str(), size: i32(), mime_type: str(), attributes: vector(obj) })
const _inputWebDocument: any = () => ({ _: 'inputWebDocument', url: str(), size: i32(), mime_type: str(), attributes: vector(obj) })
const _inputWebFileLocation: any = () => ({ _: 'inputWebFileLocation', url: str(), access_hash: i64() })
const _inputWebFileGeoPointLocation: any = () => ({ _: 'inputWebFileGeoPointLocation', geo_point: obj(), access_hash: i64(), w: i32(), h: i32(), zoom: i32(), scale: i32() })
const _inputWebFileAudioAlbumThumbLocation = (): any => {
  const result: Record<string, unknown> = { _: 'inputWebFileAudioAlbumThumbLocation' }
  const flags = i32()
  result.small = !!(flags & 0x4)
  if (flags & 0x1) result.document = obj()
  if (flags & 0x2) result.title = str()
  if (flags & 0x2) result.performer = str()
  return result
}
const _uploadWebFile: any = () => ({ _: 'upload.webFile', size: i32(), mime_type: str(), file_type: obj(), mtime: i32(), bytes: bytes() })
const _paymentsPaymentForm = (): any => {
  const result: Record<string, unknown> = { _: 'payments.paymentForm' }
  const flags = i32()
  result.can_save_credentials = !!(flags & 0x4)
  result.password_missing = !!(flags & 0x8)
  result.form_id = i64()
  result.bot_id = i64()
  result.title = str()
  result.description = str()
  if (flags & 0x20) result.photo = obj()
  result.invoice = obj()
  result.provider_id = i64()
  result.url = str()
  if (flags & 0x10) result.native_provider = str()
  if (flags & 0x10) result.native_params = obj()
  if (flags & 0x40) result.additional_methods = vector(obj)
  if (flags & 0x1) result.saved_info = obj()
  if (flags & 0x2) result.saved_credentials = vector(obj)
  result.users = vector(obj)
  return result
}
const _paymentsValidatedRequestedInfo = (): any => {
  const result: Record<string, unknown> = { _: 'payments.validatedRequestedInfo' }
  const flags = i32()
  if (flags & 0x1) result.id = str()
  if (flags & 0x2) result.shipping_options = vector(obj)
  return result
}
const _paymentsPaymentResult: any = () => ({ _: 'payments.paymentResult', updates: obj() })
const _paymentsPaymentVerificationNeeded: any = () => ({ _: 'payments.paymentVerificationNeeded', url: str() })
const _paymentsPaymentReceipt = (): any => {
  const result: Record<string, unknown> = { _: 'payments.paymentReceipt' }
  const flags = i32()
  result.date = i32()
  result.bot_id = i64()
  result.provider_id = i64()
  result.title = str()
  result.description = str()
  if (flags & 0x4) result.photo = obj()
  result.invoice = obj()
  if (flags & 0x1) result.info = obj()
  if (flags & 0x2) result.shipping = obj()
  if (flags & 0x8) result.tip_amount = i64()
  result.currency = str()
  result.total_amount = i64()
  result.credentials_title = str()
  result.users = vector(obj)
  return result
}
const _paymentsSavedInfo = (): any => {
  const result: Record<string, unknown> = { _: 'payments.savedInfo' }
  const flags = i32()
  result.has_saved_credentials = !!(flags & 0x2)
  if (flags & 0x1) result.saved_info = obj()
  return result
}
const _inputPaymentCredentialsSaved: any = () => ({ _: 'inputPaymentCredentialsSaved', id: str(), tmp_password: bytes() })
const _inputPaymentCredentials = (): any => {
  const result: Record<string, unknown> = { _: 'inputPaymentCredentials' }
  const flags = i32()
  result.save = !!(flags & 0x1)
  result.data = obj()
  return result
}
const _inputPaymentCredentialsApplePay: any = () => ({ _: 'inputPaymentCredentialsApplePay', payment_data: obj() })
const _inputPaymentCredentialsGooglePay: any = () => ({ _: 'inputPaymentCredentialsGooglePay', payment_token: obj() })
const _accountTmpPassword: any = () => ({ _: 'account.tmpPassword', tmp_password: bytes(), valid_until: i32() })
const _shippingOption: any = () => ({ _: 'shippingOption', id: str(), title: str(), prices: vector(obj) })
const _inputStickerSetItem = (): any => {
  const result: Record<string, unknown> = { _: 'inputStickerSetItem' }
  const flags = i32()
  result.document = obj()
  result.emoji = str()
  if (flags & 0x1) result.mask_coords = obj()
  if (flags & 0x2) result.keywords = str()
  return result
}
const _inputPhoneCall: any = () => ({ _: 'inputPhoneCall', id: i64(), access_hash: i64() })
const _phoneCallEmpty: any = () => ({ _: 'phoneCallEmpty', id: i64() })
const _phoneCallWaiting = (): any => {
  const result: Record<string, unknown> = { _: 'phoneCallWaiting' }
  const flags = i32()
  result.video = !!(flags & 0x40)
  result.id = i64()
  result.access_hash = i64()
  result.date = i32()
  result.admin_id = i64()
  result.participant_id = i64()
  result.protocol = obj()
  if (flags & 0x1) result.receive_date = i32()
  return result
}
const _phoneCallRequested = (): any => {
  const result: Record<string, unknown> = { _: 'phoneCallRequested' }
  const flags = i32()
  result.video = !!(flags & 0x40)
  result.id = i64()
  result.access_hash = i64()
  result.date = i32()
  result.admin_id = i64()
  result.participant_id = i64()
  result.g_a_hash = bytes()
  result.protocol = obj()
  return result
}
const _phoneCallAccepted = (): any => {
  const result: Record<string, unknown> = { _: 'phoneCallAccepted' }
  const flags = i32()
  result.video = !!(flags & 0x40)
  result.id = i64()
  result.access_hash = i64()
  result.date = i32()
  result.admin_id = i64()
  result.participant_id = i64()
  result.g_b = bytes()
  result.protocol = obj()
  return result
}
const _phoneCall = (): any => {
  const result: Record<string, unknown> = { _: 'phoneCall' }
  const flags = i32()
  result.p2p_allowed = !!(flags & 0x20)
  result.video = !!(flags & 0x40)
  result.id = i64()
  result.access_hash = i64()
  result.date = i32()
  result.admin_id = i64()
  result.participant_id = i64()
  result.g_a_or_b = bytes()
  result.key_fingerprint = i64()
  result.protocol = obj()
  result.connections = vector(obj)
  result.start_date = i32()
  return result
}
const _phoneCallDiscarded = (): any => {
  const result: Record<string, unknown> = { _: 'phoneCallDiscarded' }
  const flags = i32()
  result.need_rating = !!(flags & 0x4)
  result.need_debug = !!(flags & 0x8)
  result.video = !!(flags & 0x40)
  result.id = i64()
  if (flags & 0x1) result.reason = obj()
  if (flags & 0x2) result.duration = i32()
  return result
}
const _phoneConnection = (): any => {
  const result: Record<string, unknown> = { _: 'phoneConnection' }
  const flags = i32()
  result.tcp = !!(flags & 0x1)
  result.id = i64()
  result.ip = str()
  result.ipv6 = str()
  result.port = i32()
  result.peer_tag = bytes()
  return result
}
const _phoneConnectionWebrtc = (): any => {
  const result: Record<string, unknown> = { _: 'phoneConnectionWebrtc' }
  const flags = i32()
  result.turn = !!(flags & 0x1)
  result.stun = !!(flags & 0x2)
  result.id = i64()
  result.ip = str()
  result.ipv6 = str()
  result.port = i32()
  result.username = str()
  result.password = str()
  return result
}
const _phoneCallProtocol = (): any => {
  const result: Record<string, unknown> = { _: 'phoneCallProtocol' }
  const flags = i32()
  result.udp_p2p = !!(flags & 0x1)
  result.udp_reflector = !!(flags & 0x2)
  result.min_layer = i32()
  result.max_layer = i32()
  result.library_versions = vector(str)
  return result
}
const _phonePhoneCall: any = () => ({ _: 'phone.phoneCall', phone_call: obj(), users: vector(obj) })
const _uploadCdnFileReuploadNeeded: any = () => ({ _: 'upload.cdnFileReuploadNeeded', request_token: bytes() })
const _uploadCdnFile: any = () => ({ _: 'upload.cdnFile', bytes: bytes() })
const _cdnPublicKey: any = () => ({ _: 'cdnPublicKey', dc_id: i32(), public_key: str() })
const _cdnConfig: any = () => ({ _: 'cdnConfig', public_keys: vector(obj) })
const _langPackString: any = () => ({ _: 'langPackString', key: str(), value: str() })
const _langPackStringPluralized = (): any => {
  const result: Record<string, unknown> = { _: 'langPackStringPluralized' }
  const flags = i32()
  result.key = str()
  if (flags & 0x1) result.zero_value = str()
  if (flags & 0x2) result.one_value = str()
  if (flags & 0x4) result.two_value = str()
  if (flags & 0x8) result.few_value = str()
  if (flags & 0x10) result.many_value = str()
  result.other_value = str()
  return result
}
const _langPackStringDeleted: any = () => ({ _: 'langPackStringDeleted', key: str() })
const _langPackDifference: any = () => ({ _: 'langPackDifference', lang_code: str(), from_version: i32(), version: i32(), strings: vector(obj) })
const _langPackLanguage = (): any => {
  const result: Record<string, unknown> = { _: 'langPackLanguage' }
  const flags = i32()
  result.official = !!(flags & 0x1)
  result.rtl = !!(flags & 0x4)
  result.beta = !!(flags & 0x8)
  result.name = str()
  result.native_name = str()
  result.lang_code = str()
  if (flags & 0x2) result.base_lang_code = str()
  result.plural_code = str()
  result.strings_count = i32()
  result.translated_count = i32()
  result.translations_url = str()
  return result
}
const _channelAdminLogEventActionChangeTitle: any = () => ({ _: 'channelAdminLogEventActionChangeTitle', prev_value: str(), new_value: str() })
const _channelAdminLogEventActionChangeAbout: any = () => ({ _: 'channelAdminLogEventActionChangeAbout', prev_value: str(), new_value: str() })
const _channelAdminLogEventActionChangeUsername: any = () => ({ _: 'channelAdminLogEventActionChangeUsername', prev_value: str(), new_value: str() })
const _channelAdminLogEventActionChangePhoto: any = () => ({ _: 'channelAdminLogEventActionChangePhoto', prev_photo: obj(), new_photo: obj() })
const _channelAdminLogEventActionToggleInvites: any = () => ({ _: 'channelAdminLogEventActionToggleInvites', new_value: obj() })
const _channelAdminLogEventActionToggleSignatures: any = () => ({ _: 'channelAdminLogEventActionToggleSignatures', new_value: obj() })
const _channelAdminLogEventActionUpdatePinned: any = () => ({ _: 'channelAdminLogEventActionUpdatePinned', message: obj() })
const _channelAdminLogEventActionEditMessage: any = () => ({ _: 'channelAdminLogEventActionEditMessage', prev_message: obj(), new_message: obj() })
const _channelAdminLogEventActionDeleteMessage: any = () => ({ _: 'channelAdminLogEventActionDeleteMessage', message: obj() })
const _channelAdminLogEventActionParticipantJoin: any = () => ({ _: 'channelAdminLogEventActionParticipantJoin' })
const _channelAdminLogEventActionParticipantLeave: any = () => ({ _: 'channelAdminLogEventActionParticipantLeave' })
const _channelAdminLogEventActionParticipantInvite: any = () => ({ _: 'channelAdminLogEventActionParticipantInvite', participant: obj() })
const _channelAdminLogEventActionParticipantToggleBan: any = () => ({ _: 'channelAdminLogEventActionParticipantToggleBan', prev_participant: obj(), new_participant: obj() })
const _channelAdminLogEventActionParticipantToggleAdmin: any = () => ({ _: 'channelAdminLogEventActionParticipantToggleAdmin', prev_participant: obj(), new_participant: obj() })
const _channelAdminLogEventActionChangeStickerSet: any = () => ({ _: 'channelAdminLogEventActionChangeStickerSet', prev_stickerset: obj(), new_stickerset: obj() })
const _channelAdminLogEventActionTogglePreHistoryHidden: any = () => ({ _: 'channelAdminLogEventActionTogglePreHistoryHidden', new_value: obj() })
const _channelAdminLogEventActionDefaultBannedRights: any = () => ({ _: 'channelAdminLogEventActionDefaultBannedRights', prev_banned_rights: obj(), new_banned_rights: obj() })
const _channelAdminLogEventActionStopPoll: any = () => ({ _: 'channelAdminLogEventActionStopPoll', message: obj() })
const _channelAdminLogEventActionChangeLinkedChat: any = () => ({ _: 'channelAdminLogEventActionChangeLinkedChat', prev_value: i64(), new_value: i64() })
const _channelAdminLogEventActionChangeLocation: any = () => ({ _: 'channelAdminLogEventActionChangeLocation', prev_value: obj(), new_value: obj() })
const _channelAdminLogEventActionToggleSlowMode: any = () => ({ _: 'channelAdminLogEventActionToggleSlowMode', prev_value: i32(), new_value: i32() })
const _channelAdminLogEventActionStartGroupCall: any = () => ({ _: 'channelAdminLogEventActionStartGroupCall', call: obj() })
const _channelAdminLogEventActionDiscardGroupCall: any = () => ({ _: 'channelAdminLogEventActionDiscardGroupCall', call: obj() })
const _channelAdminLogEventActionParticipantMute: any = () => ({ _: 'channelAdminLogEventActionParticipantMute', participant: obj() })
const _channelAdminLogEventActionParticipantUnmute: any = () => ({ _: 'channelAdminLogEventActionParticipantUnmute', participant: obj() })
const _channelAdminLogEventActionToggleGroupCallSetting: any = () => ({ _: 'channelAdminLogEventActionToggleGroupCallSetting', join_muted: obj() })
const _channelAdminLogEventActionParticipantJoinByInvite = (): any => {
  const result: Record<string, unknown> = { _: 'channelAdminLogEventActionParticipantJoinByInvite' }
  const flags = i32()
  result.via_chatlist = !!(flags & 0x1)
  result.invite = obj()
  return result
}
const _channelAdminLogEventActionExportedInviteDelete: any = () => ({ _: 'channelAdminLogEventActionExportedInviteDelete', invite: obj() })
const _channelAdminLogEventActionExportedInviteRevoke: any = () => ({ _: 'channelAdminLogEventActionExportedInviteRevoke', invite: obj() })
const _channelAdminLogEventActionExportedInviteEdit: any = () => ({ _: 'channelAdminLogEventActionExportedInviteEdit', prev_invite: obj(), new_invite: obj() })
const _channelAdminLogEventActionParticipantVolume: any = () => ({ _: 'channelAdminLogEventActionParticipantVolume', participant: obj() })
const _channelAdminLogEventActionChangeHistoryTTL: any = () => ({ _: 'channelAdminLogEventActionChangeHistoryTTL', prev_value: i32(), new_value: i32() })
const _channelAdminLogEventActionParticipantJoinByRequest: any = () => ({ _: 'channelAdminLogEventActionParticipantJoinByRequest', invite: obj(), approved_by: i64() })
const _channelAdminLogEventActionToggleNoForwards: any = () => ({ _: 'channelAdminLogEventActionToggleNoForwards', new_value: obj() })
const _channelAdminLogEventActionSendMessage: any = () => ({ _: 'channelAdminLogEventActionSendMessage', message: obj() })
const _channelAdminLogEventActionChangeAvailableReactions: any = () => ({ _: 'channelAdminLogEventActionChangeAvailableReactions', prev_value: obj(), new_value: obj() })
const _channelAdminLogEventActionChangeUsernames: any = () => ({ _: 'channelAdminLogEventActionChangeUsernames', prev_value: vector(str), new_value: vector(str) })
const _channelAdminLogEventActionToggleForum: any = () => ({ _: 'channelAdminLogEventActionToggleForum', new_value: obj() })
const _channelAdminLogEventActionCreateTopic: any = () => ({ _: 'channelAdminLogEventActionCreateTopic', topic: obj() })
const _channelAdminLogEventActionEditTopic: any = () => ({ _: 'channelAdminLogEventActionEditTopic', prev_topic: obj(), new_topic: obj() })
const _channelAdminLogEventActionDeleteTopic: any = () => ({ _: 'channelAdminLogEventActionDeleteTopic', topic: obj() })
const _channelAdminLogEventActionPinTopic = (): any => {
  const result: Record<string, unknown> = { _: 'channelAdminLogEventActionPinTopic' }
  const flags = i32()
  if (flags & 0x1) result.prev_topic = obj()
  if (flags & 0x2) result.new_topic = obj()
  return result
}
const _channelAdminLogEventActionToggleAntiSpam: any = () => ({ _: 'channelAdminLogEventActionToggleAntiSpam', new_value: obj() })
const _channelAdminLogEventActionChangeColor: any = () => ({ _: 'channelAdminLogEventActionChangeColor', prev_value: i32(), new_value: i32() })
const _channelAdminLogEventActionChangeBackgroundEmoji: any = () => ({ _: 'channelAdminLogEventActionChangeBackgroundEmoji', prev_value: i64(), new_value: i64() })
const _channelAdminLogEvent: any = () => ({ _: 'channelAdminLogEvent', id: i64(), date: i32(), user_id: i64(), action: obj() })
const _channelsAdminLogResults: any = () => ({ _: 'channels.adminLogResults', events: vector(obj), chats: vector(obj), users: vector(obj) })
const _channelAdminLogEventsFilter = (): any => {
  const result: Record<string, unknown> = { _: 'channelAdminLogEventsFilter' }
  const flags = i32()
  result.join = !!(flags & 0x1)
  result.leave = !!(flags & 0x2)
  result.invite = !!(flags & 0x4)
  result.ban = !!(flags & 0x8)
  result.unban = !!(flags & 0x10)
  result.kick = !!(flags & 0x20)
  result.unkick = !!(flags & 0x40)
  result.promote = !!(flags & 0x80)
  result.demote = !!(flags & 0x100)
  result.info = !!(flags & 0x200)
  result.settings = !!(flags & 0x400)
  result.pinned = !!(flags & 0x800)
  result.edit = !!(flags & 0x1000)
  result.delete = !!(flags & 0x2000)
  result.group_call = !!(flags & 0x4000)
  result.invites = !!(flags & 0x8000)
  result.send = !!(flags & 0x10000)
  result.forums = !!(flags & 0x20000)
  return result
}
const _popularContact: any = () => ({ _: 'popularContact', client_id: i64(), importers: i32() })
const _messagesFavedStickersNotModified: any = () => ({ _: 'messages.favedStickersNotModified' })
const _messagesFavedStickers: any = () => ({ _: 'messages.favedStickers', hash: i64(), packs: vector(obj), stickers: vector(obj) })
const _recentMeUrlUnknown: any = () => ({ _: 'recentMeUrlUnknown', url: str() })
const _recentMeUrlUser: any = () => ({ _: 'recentMeUrlUser', url: str(), user_id: i64() })
const _recentMeUrlChat: any = () => ({ _: 'recentMeUrlChat', url: str(), chat_id: i64() })
const _recentMeUrlChatInvite: any = () => ({ _: 'recentMeUrlChatInvite', url: str(), chat_invite: obj() })
const _recentMeUrlStickerSet: any = () => ({ _: 'recentMeUrlStickerSet', url: str(), set: obj() })
const _helpRecentMeUrls: any = () => ({ _: 'help.recentMeUrls', urls: vector(obj), chats: vector(obj), users: vector(obj) })
const _inputSingleMedia = (): any => {
  const result: Record<string, unknown> = { _: 'inputSingleMedia' }
  const flags = i32()
  result.media = obj()
  result.random_id = i64()
  result.message = str()
  if (flags & 0x1) result.entities = vector(obj)
  return result
}
const _webAuthorization: any = () => ({ _: 'webAuthorization', hash: i64(), bot_id: i64(), domain: str(), browser: str(), platform: str(), date_created: i32(), date_active: i32(), ip: str(), region: str() })
const _accountWebAuthorizations: any = () => ({ _: 'account.webAuthorizations', authorizations: vector(obj), users: vector(obj) })
const _inputMessageID: any = () => ({ _: 'inputMessageID', id: i32() })
const _inputMessageReplyTo: any = () => ({ _: 'inputMessageReplyTo', id: i32() })
const _inputMessagePinned: any = () => ({ _: 'inputMessagePinned' })
const _inputMessageCallbackQuery: any = () => ({ _: 'inputMessageCallbackQuery', id: i32(), query_id: i64() })
const _inputDialogPeer: any = () => ({ _: 'inputDialogPeer', peer: obj() })
const _inputDialogPeerFolder: any = () => ({ _: 'inputDialogPeerFolder', folder_id: i32() })
const _dialogPeer: any = () => ({ _: 'dialogPeer', peer: obj() })
const _dialogPeerFolder: any = () => ({ _: 'dialogPeerFolder', folder_id: i32() })
const _messagesFoundStickerSetsNotModified: any = () => ({ _: 'messages.foundStickerSetsNotModified' })
const _messagesFoundStickerSets: any = () => ({ _: 'messages.foundStickerSets', hash: i64(), sets: vector(obj) })
const _fileHash: any = () => ({ _: 'fileHash', offset: i64(), limit: i32(), hash: bytes() })
const _inputClientProxy: any = () => ({ _: 'inputClientProxy', address: str(), port: i32() })
const _helpTermsOfServiceUpdateEmpty: any = () => ({ _: 'help.termsOfServiceUpdateEmpty', expires: i32() })
const _helpTermsOfServiceUpdate: any = () => ({ _: 'help.termsOfServiceUpdate', expires: i32(), terms_of_service: obj() })
const _inputSecureFileUploaded: any = () => ({ _: 'inputSecureFileUploaded', id: i64(), parts: i32(), md5_checksum: str(), file_hash: bytes(), secret: bytes() })
const _inputSecureFile: any = () => ({ _: 'inputSecureFile', id: i64(), access_hash: i64() })
const _secureFileEmpty: any = () => ({ _: 'secureFileEmpty' })
const _secureFile: any = () => ({ _: 'secureFile', id: i64(), access_hash: i64(), size: i64(), dc_id: i32(), date: i32(), file_hash: bytes(), secret: bytes() })
const _secureData: any = () => ({ _: 'secureData', data: bytes(), data_hash: bytes(), secret: bytes() })
const _securePlainPhone: any = () => ({ _: 'securePlainPhone', phone: str() })
const _securePlainEmail: any = () => ({ _: 'securePlainEmail', email: str() })
const _secureValueTypePersonalDetails: any = () => ({ _: 'secureValueTypePersonalDetails' })
const _secureValueTypePassport: any = () => ({ _: 'secureValueTypePassport' })
const _secureValueTypeDriverLicense: any = () => ({ _: 'secureValueTypeDriverLicense' })
const _secureValueTypeIdentityCard: any = () => ({ _: 'secureValueTypeIdentityCard' })
const _secureValueTypeInternalPassport: any = () => ({ _: 'secureValueTypeInternalPassport' })
const _secureValueTypeAddress: any = () => ({ _: 'secureValueTypeAddress' })
const _secureValueTypeUtilityBill: any = () => ({ _: 'secureValueTypeUtilityBill' })
const _secureValueTypeBankStatement: any = () => ({ _: 'secureValueTypeBankStatement' })
const _secureValueTypeRentalAgreement: any = () => ({ _: 'secureValueTypeRentalAgreement' })
const _secureValueTypePassportRegistration: any = () => ({ _: 'secureValueTypePassportRegistration' })
const _secureValueTypeTemporaryRegistration: any = () => ({ _: 'secureValueTypeTemporaryRegistration' })
const _secureValueTypePhone: any = () => ({ _: 'secureValueTypePhone' })
const _secureValueTypeEmail: any = () => ({ _: 'secureValueTypeEmail' })
const _secureValue = (): any => {
  const result: Record<string, unknown> = { _: 'secureValue' }
  const flags = i32()
  result.type = obj()
  if (flags & 0x1) result.data = obj()
  if (flags & 0x2) result.front_side = obj()
  if (flags & 0x4) result.reverse_side = obj()
  if (flags & 0x8) result.selfie = obj()
  if (flags & 0x40) result.translation = vector(obj)
  if (flags & 0x10) result.files = vector(obj)
  if (flags & 0x20) result.plain_data = obj()
  result.hash = bytes()
  return result
}
const _inputSecureValue = (): any => {
  const result: Record<string, unknown> = { _: 'inputSecureValue' }
  const flags = i32()
  result.type = obj()
  if (flags & 0x1) result.data = obj()
  if (flags & 0x2) result.front_side = obj()
  if (flags & 0x4) result.reverse_side = obj()
  if (flags & 0x8) result.selfie = obj()
  if (flags & 0x40) result.translation = vector(obj)
  if (flags & 0x10) result.files = vector(obj)
  if (flags & 0x20) result.plain_data = obj()
  return result
}
const _secureValueHash: any = () => ({ _: 'secureValueHash', type: obj(), hash: bytes() })
const _secureValueErrorData: any = () => ({ _: 'secureValueErrorData', type: obj(), data_hash: bytes(), field: str(), text: str() })
const _secureValueErrorFrontSide: any = () => ({ _: 'secureValueErrorFrontSide', type: obj(), file_hash: bytes(), text: str() })
const _secureValueErrorReverseSide: any = () => ({ _: 'secureValueErrorReverseSide', type: obj(), file_hash: bytes(), text: str() })
const _secureValueErrorSelfie: any = () => ({ _: 'secureValueErrorSelfie', type: obj(), file_hash: bytes(), text: str() })
const _secureValueErrorFile: any = () => ({ _: 'secureValueErrorFile', type: obj(), file_hash: bytes(), text: str() })
const _secureValueErrorFiles: any = () => ({ _: 'secureValueErrorFiles', type: obj(), file_hash: vector(bytes), text: str() })
const _secureValueError: any = () => ({ _: 'secureValueError', type: obj(), hash: bytes(), text: str() })
const _secureValueErrorTranslationFile: any = () => ({ _: 'secureValueErrorTranslationFile', type: obj(), file_hash: bytes(), text: str() })
const _secureValueErrorTranslationFiles: any = () => ({ _: 'secureValueErrorTranslationFiles', type: obj(), file_hash: vector(bytes), text: str() })
const _secureCredentialsEncrypted: any = () => ({ _: 'secureCredentialsEncrypted', data: bytes(), hash: bytes(), secret: bytes() })
const _accountAuthorizationForm = (): any => {
  const result: Record<string, unknown> = { _: 'account.authorizationForm' }
  const flags = i32()
  result.required_types = vector(obj)
  result.values = vector(obj)
  result.errors = vector(obj)
  result.users = vector(obj)
  if (flags & 0x1) result.privacy_policy_url = str()
  return result
}
const _accountSentEmailCode: any = () => ({ _: 'account.sentEmailCode', email_pattern: str(), length: i32() })
const _helpDeepLinkInfoEmpty: any = () => ({ _: 'help.deepLinkInfoEmpty' })
const _helpDeepLinkInfo = (): any => {
  const result: Record<string, unknown> = { _: 'help.deepLinkInfo' }
  const flags = i32()
  result.update_app = !!(flags & 0x1)
  result.message = str()
  if (flags & 0x2) result.entities = vector(obj)
  return result
}
const _savedPhoneContact: any = () => ({ _: 'savedPhoneContact', phone: str(), first_name: str(), last_name: str(), date: i32() })
const _accountTakeout: any = () => ({ _: 'account.takeout', id: i64() })
const _passwordKdfAlgoUnknown: any = () => ({ _: 'passwordKdfAlgoUnknown' })
const _passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow: any = () => ({ _: 'passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow', salt1: bytes(), salt2: bytes(), g: i32(), p: bytes() })
const _securePasswordKdfAlgoUnknown: any = () => ({ _: 'securePasswordKdfAlgoUnknown' })
const _securePasswordKdfAlgoPBKDF2HMACSHA512iter100000: any = () => ({ _: 'securePasswordKdfAlgoPBKDF2HMACSHA512iter100000', salt: bytes() })
const _securePasswordKdfAlgoSHA512: any = () => ({ _: 'securePasswordKdfAlgoSHA512', salt: bytes() })
const _secureSecretSettings: any = () => ({ _: 'secureSecretSettings', secure_algo: obj(), secure_secret: bytes(), secure_secret_id: i64() })
const _inputCheckPasswordEmpty: any = () => ({ _: 'inputCheckPasswordEmpty' })
const _inputCheckPasswordSRP: any = () => ({ _: 'inputCheckPasswordSRP', srp_id: i64(), A: bytes(), M1: bytes() })
const _secureRequiredType = (): any => {
  const result: Record<string, unknown> = { _: 'secureRequiredType' }
  const flags = i32()
  result.native_names = !!(flags & 0x1)
  result.selfie_required = !!(flags & 0x2)
  result.translation_required = !!(flags & 0x4)
  result.type = obj()
  return result
}
const _secureRequiredTypeOneOf: any = () => ({ _: 'secureRequiredTypeOneOf', types: vector(obj) })
const _helpPassportConfigNotModified: any = () => ({ _: 'help.passportConfigNotModified' })
const _helpPassportConfig: any = () => ({ _: 'help.passportConfig', hash: i32(), countries_langs: obj() })
const _inputAppEvent: any = () => ({ _: 'inputAppEvent', time: f64(), type: str(), peer: i64(), data: obj() })
const _jsonObjectValue: any = () => ({ _: 'jsonObjectValue', key: str(), value: obj() })
const _jsonNull: any = () => ({ _: 'jsonNull' })
const _jsonBool: any = () => ({ _: 'jsonBool', value: obj() })
const _jsonNumber: any = () => ({ _: 'jsonNumber', value: f64() })
const _jsonString: any = () => ({ _: 'jsonString', value: str() })
const _jsonArray: any = () => ({ _: 'jsonArray', value: vector(obj) })
const _jsonObject: any = () => ({ _: 'jsonObject', value: vector(obj) })
const _pageTableCell = (): any => {
  const result: Record<string, unknown> = { _: 'pageTableCell' }
  const flags = i32()
  result.header = !!(flags & 0x1)
  result.align_center = !!(flags & 0x8)
  result.align_right = !!(flags & 0x10)
  result.valign_middle = !!(flags & 0x20)
  result.valign_bottom = !!(flags & 0x40)
  if (flags & 0x80) result.text = obj()
  if (flags & 0x2) result.colspan = i32()
  if (flags & 0x4) result.rowspan = i32()
  return result
}
const _pageTableRow: any = () => ({ _: 'pageTableRow', cells: vector(obj) })
const _pageCaption: any = () => ({ _: 'pageCaption', text: obj(), credit: obj() })
const _pageListItemText: any = () => ({ _: 'pageListItemText', text: obj() })
const _pageListItemBlocks: any = () => ({ _: 'pageListItemBlocks', blocks: vector(obj) })
const _pageListOrderedItemText: any = () => ({ _: 'pageListOrderedItemText', num: str(), text: obj() })
const _pageListOrderedItemBlocks: any = () => ({ _: 'pageListOrderedItemBlocks', num: str(), blocks: vector(obj) })
const _pageRelatedArticle = (): any => {
  const result: Record<string, unknown> = { _: 'pageRelatedArticle' }
  const flags = i32()
  result.url = str()
  result.webpage_id = i64()
  if (flags & 0x1) result.title = str()
  if (flags & 0x2) result.description = str()
  if (flags & 0x4) result.photo_id = i64()
  if (flags & 0x8) result.author = str()
  if (flags & 0x10) result.published_date = i32()
  return result
}
const _page = (): any => {
  const result: Record<string, unknown> = { _: 'page' }
  const flags = i32()
  result.part = !!(flags & 0x1)
  result.rtl = !!(flags & 0x2)
  result.v2 = !!(flags & 0x4)
  result.url = str()
  result.blocks = vector(obj)
  result.photos = vector(obj)
  result.documents = vector(obj)
  if (flags & 0x8) result.views = i32()
  return result
}
const _helpSupportName: any = () => ({ _: 'help.supportName', name: str() })
const _helpUserInfoEmpty: any = () => ({ _: 'help.userInfoEmpty' })
const _helpUserInfo: any = () => ({ _: 'help.userInfo', message: str(), entities: vector(obj), author: str(), date: i32() })
const _pollAnswer: any = () => ({ _: 'pollAnswer', text: str(), option: bytes() })
const _poll = (): any => {
  const result: Record<string, unknown> = { _: 'poll' }
  result.id = i64()
  const flags = i32()
  result.closed = !!(flags & 0x1)
  result.public_voters = !!(flags & 0x2)
  result.multiple_choice = !!(flags & 0x4)
  result.quiz = !!(flags & 0x8)
  result.question = str()
  result.answers = vector(obj)
  if (flags & 0x10) result.close_period = i32()
  if (flags & 0x20) result.close_date = i32()
  return result
}
const _pollAnswerVoters = (): any => {
  const result: Record<string, unknown> = { _: 'pollAnswerVoters' }
  const flags = i32()
  result.chosen = !!(flags & 0x1)
  result.correct = !!(flags & 0x2)
  result.option = bytes()
  result.voters = i32()
  return result
}
const _pollResults = (): any => {
  const result: Record<string, unknown> = { _: 'pollResults' }
  const flags = i32()
  result.min = !!(flags & 0x1)
  if (flags & 0x2) result.results = vector(obj)
  if (flags & 0x4) result.total_voters = i32()
  if (flags & 0x8) result.recent_voters = vector(obj)
  if (flags & 0x10) result.solution = str()
  if (flags & 0x10) result.solution_entities = vector(obj)
  return result
}
const _chatOnlines: any = () => ({ _: 'chatOnlines', onlines: i32() })
const _statsURL: any = () => ({ _: 'statsURL', url: str() })
const _chatAdminRights = (): any => {
  const result: Record<string, unknown> = { _: 'chatAdminRights' }
  const flags = i32()
  result.change_info = !!(flags & 0x1)
  result.post_messages = !!(flags & 0x2)
  result.edit_messages = !!(flags & 0x4)
  result.delete_messages = !!(flags & 0x8)
  result.ban_users = !!(flags & 0x10)
  result.invite_users = !!(flags & 0x20)
  result.pin_messages = !!(flags & 0x80)
  result.add_admins = !!(flags & 0x200)
  result.anonymous = !!(flags & 0x400)
  result.manage_call = !!(flags & 0x800)
  result.other = !!(flags & 0x1000)
  result.manage_topics = !!(flags & 0x2000)
  result.post_stories = !!(flags & 0x4000)
  result.edit_stories = !!(flags & 0x8000)
  result.delete_stories = !!(flags & 0x10000)
  return result
}
const _chatBannedRights = (): any => {
  const result: Record<string, unknown> = { _: 'chatBannedRights' }
  const flags = i32()
  result.view_messages = !!(flags & 0x1)
  result.send_messages = !!(flags & 0x2)
  result.send_media = !!(flags & 0x4)
  result.send_stickers = !!(flags & 0x8)
  result.send_gifs = !!(flags & 0x10)
  result.send_games = !!(flags & 0x20)
  result.send_inline = !!(flags & 0x40)
  result.embed_links = !!(flags & 0x80)
  result.send_polls = !!(flags & 0x100)
  result.change_info = !!(flags & 0x400)
  result.invite_users = !!(flags & 0x8000)
  result.pin_messages = !!(flags & 0x20000)
  result.manage_topics = !!(flags & 0x40000)
  result.send_photos = !!(flags & 0x80000)
  result.send_videos = !!(flags & 0x100000)
  result.send_roundvideos = !!(flags & 0x200000)
  result.send_audios = !!(flags & 0x400000)
  result.send_voices = !!(flags & 0x800000)
  result.send_docs = !!(flags & 0x1000000)
  result.send_plain = !!(flags & 0x2000000)
  result.until_date = i32()
  return result
}
const _inputWallPaper: any = () => ({ _: 'inputWallPaper', id: i64(), access_hash: i64() })
const _inputWallPaperSlug: any = () => ({ _: 'inputWallPaperSlug', slug: str() })
const _inputWallPaperNoFile: any = () => ({ _: 'inputWallPaperNoFile', id: i64() })
const _accountWallPapersNotModified: any = () => ({ _: 'account.wallPapersNotModified' })
const _accountWallPapers: any = () => ({ _: 'account.wallPapers', hash: i64(), wallpapers: vector(obj) })
const _codeSettings = (): any => {
  const result: Record<string, unknown> = { _: 'codeSettings' }
  const flags = i32()
  result.allow_flashcall = !!(flags & 0x1)
  result.current_number = !!(flags & 0x2)
  result.allow_app_hash = !!(flags & 0x10)
  result.allow_missed_call = !!(flags & 0x20)
  result.allow_firebase = !!(flags & 0x80)
  if (flags & 0x40) result.logout_tokens = vector(bytes)
  if (flags & 0x100) result.token = str()
  if (flags & 0x100) result.app_sandbox = obj()
  return result
}
const _wallPaperSettings = (): any => {
  const result: Record<string, unknown> = { _: 'wallPaperSettings' }
  const flags = i32()
  result.blur = !!(flags & 0x2)
  result.motion = !!(flags & 0x4)
  if (flags & 0x1) result.background_color = i32()
  if (flags & 0x10) result.second_background_color = i32()
  if (flags & 0x20) result.third_background_color = i32()
  if (flags & 0x40) result.fourth_background_color = i32()
  if (flags & 0x8) result.intensity = i32()
  if (flags & 0x10) result.rotation = i32()
  return result
}
const _autoDownloadSettings = (): any => {
  const result: Record<string, unknown> = { _: 'autoDownloadSettings' }
  const flags = i32()
  result.disabled = !!(flags & 0x1)
  result.video_preload_large = !!(flags & 0x2)
  result.audio_preload_next = !!(flags & 0x4)
  result.phonecalls_less_data = !!(flags & 0x8)
  result.stories_preload = !!(flags & 0x10)
  result.photo_size_max = i32()
  result.video_size_max = i64()
  result.file_size_max = i64()
  result.video_upload_maxbitrate = i32()
  result.small_queue_active_operations_max = i32()
  result.large_queue_active_operations_max = i32()
  return result
}
const _accountAutoDownloadSettings: any = () => ({ _: 'account.autoDownloadSettings', low: obj(), medium: obj(), high: obj() })
const _emojiKeyword: any = () => ({ _: 'emojiKeyword', keyword: str(), emoticons: vector(str) })
const _emojiKeywordDeleted: any = () => ({ _: 'emojiKeywordDeleted', keyword: str(), emoticons: vector(str) })
const _emojiKeywordsDifference: any = () => ({ _: 'emojiKeywordsDifference', lang_code: str(), from_version: i32(), version: i32(), keywords: vector(obj) })
const _emojiURL: any = () => ({ _: 'emojiURL', url: str() })
const _emojiLanguage: any = () => ({ _: 'emojiLanguage', lang_code: str() })
const _folder = (): any => {
  const result: Record<string, unknown> = { _: 'folder' }
  const flags = i32()
  result.autofill_new_broadcasts = !!(flags & 0x1)
  result.autofill_public_groups = !!(flags & 0x2)
  result.autofill_new_correspondents = !!(flags & 0x4)
  result.id = i32()
  result.title = str()
  if (flags & 0x8) result.photo = obj()
  return result
}
const _inputFolderPeer: any = () => ({ _: 'inputFolderPeer', peer: obj(), folder_id: i32() })
const _folderPeer: any = () => ({ _: 'folderPeer', peer: obj(), folder_id: i32() })
const _messagesSearchCounter = (): any => {
  const result: Record<string, unknown> = { _: 'messages.searchCounter' }
  const flags = i32()
  result.inexact = !!(flags & 0x2)
  result.filter = obj()
  result.count = i32()
  return result
}
const _urlAuthResultRequest = (): any => {
  const result: Record<string, unknown> = { _: 'urlAuthResultRequest' }
  const flags = i32()
  result.request_write_access = !!(flags & 0x1)
  result.bot = obj()
  result.domain = str()
  return result
}
const _urlAuthResultAccepted: any = () => ({ _: 'urlAuthResultAccepted', url: str() })
const _urlAuthResultDefault: any = () => ({ _: 'urlAuthResultDefault' })
const _channelLocationEmpty: any = () => ({ _: 'channelLocationEmpty' })
const _channelLocation: any = () => ({ _: 'channelLocation', geo_point: obj(), address: str() })
const _peerLocated: any = () => ({ _: 'peerLocated', peer: obj(), expires: i32(), distance: i32() })
const _peerSelfLocated: any = () => ({ _: 'peerSelfLocated', expires: i32() })
const _restrictionReason: any = () => ({ _: 'restrictionReason', platform: str(), reason: str(), text: str() })
const _inputTheme: any = () => ({ _: 'inputTheme', id: i64(), access_hash: i64() })
const _inputThemeSlug: any = () => ({ _: 'inputThemeSlug', slug: str() })
const _theme = (): any => {
  const result: Record<string, unknown> = { _: 'theme' }
  const flags = i32()
  result.creator = !!(flags & 0x1)
  result.default = !!(flags & 0x2)
  result.for_chat = !!(flags & 0x20)
  result.id = i64()
  result.access_hash = i64()
  result.slug = str()
  result.title = str()
  if (flags & 0x4) result.document = obj()
  if (flags & 0x8) result.settings = vector(obj)
  if (flags & 0x40) result.emoticon = str()
  if (flags & 0x10) result.installs_count = i32()
  return result
}
const _accountThemesNotModified: any = () => ({ _: 'account.themesNotModified' })
const _accountThemes: any = () => ({ _: 'account.themes', hash: i64(), themes: vector(obj) })
const _authLoginToken: any = () => ({ _: 'auth.loginToken', expires: i32(), token: bytes() })
const _authLoginTokenMigrateTo: any = () => ({ _: 'auth.loginTokenMigrateTo', dc_id: i32(), token: bytes() })
const _authLoginTokenSuccess: any = () => ({ _: 'auth.loginTokenSuccess', authorization: obj() })
const _accountContentSettings = (): any => {
  const result: Record<string, unknown> = { _: 'account.contentSettings' }
  const flags = i32()
  result.sensitive_enabled = !!(flags & 0x1)
  result.sensitive_can_change = !!(flags & 0x2)
  return result
}
const _messagesInactiveChats: any = () => ({ _: 'messages.inactiveChats', dates: vector(i32), chats: vector(obj), users: vector(obj) })
const _baseThemeClassic: any = () => ({ _: 'baseThemeClassic' })
const _baseThemeDay: any = () => ({ _: 'baseThemeDay' })
const _baseThemeNight: any = () => ({ _: 'baseThemeNight' })
const _baseThemeTinted: any = () => ({ _: 'baseThemeTinted' })
const _baseThemeArctic: any = () => ({ _: 'baseThemeArctic' })
const _inputThemeSettings = (): any => {
  const result: Record<string, unknown> = { _: 'inputThemeSettings' }
  const flags = i32()
  result.message_colors_animated = !!(flags & 0x4)
  result.base_theme = obj()
  result.accent_color = i32()
  if (flags & 0x8) result.outbox_accent_color = i32()
  if (flags & 0x1) result.message_colors = vector(i32)
  if (flags & 0x2) result.wallpaper = obj()
  if (flags & 0x2) result.wallpaper_settings = obj()
  return result
}
const _themeSettings = (): any => {
  const result: Record<string, unknown> = { _: 'themeSettings' }
  const flags = i32()
  result.message_colors_animated = !!(flags & 0x4)
  result.base_theme = obj()
  result.accent_color = i32()
  if (flags & 0x8) result.outbox_accent_color = i32()
  if (flags & 0x1) result.message_colors = vector(i32)
  if (flags & 0x2) result.wallpaper = obj()
  return result
}
const _webPageAttributeTheme = (): any => {
  const result: Record<string, unknown> = { _: 'webPageAttributeTheme' }
  const flags = i32()
  if (flags & 0x1) result.documents = vector(obj)
  if (flags & 0x2) result.settings = obj()
  return result
}
const _webPageAttributeStory = (): any => {
  const result: Record<string, unknown> = { _: 'webPageAttributeStory' }
  const flags = i32()
  result.peer = obj()
  result.id = i32()
  if (flags & 0x1) result.story = obj()
  return result
}
const _messagesVotesList = (): any => {
  const result: Record<string, unknown> = { _: 'messages.votesList' }
  const flags = i32()
  result.count = i32()
  result.votes = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  if (flags & 0x1) result.next_offset = str()
  return result
}
const _bankCardOpenUrl: any = () => ({ _: 'bankCardOpenUrl', url: str(), name: str() })
const _paymentsBankCardData: any = () => ({ _: 'payments.bankCardData', title: str(), open_urls: vector(obj) })
const _dialogFilter = (): any => {
  const result: Record<string, unknown> = { _: 'dialogFilter' }
  const flags = i32()
  result.contacts = !!(flags & 0x1)
  result.non_contacts = !!(flags & 0x2)
  result.groups = !!(flags & 0x4)
  result.broadcasts = !!(flags & 0x8)
  result.bots = !!(flags & 0x10)
  result.exclude_muted = !!(flags & 0x800)
  result.exclude_read = !!(flags & 0x1000)
  result.exclude_archived = !!(flags & 0x2000)
  result.id = i32()
  result.title = str()
  if (flags & 0x2000000) result.emoticon = str()
  result.pinned_peers = vector(obj)
  result.include_peers = vector(obj)
  result.exclude_peers = vector(obj)
  return result
}
const _dialogFilterDefault: any = () => ({ _: 'dialogFilterDefault' })
const _dialogFilterChatlist = (): any => {
  const result: Record<string, unknown> = { _: 'dialogFilterChatlist' }
  const flags = i32()
  result.has_my_invites = !!(flags & 0x4000000)
  result.id = i32()
  result.title = str()
  if (flags & 0x2000000) result.emoticon = str()
  result.pinned_peers = vector(obj)
  result.include_peers = vector(obj)
  return result
}
const _dialogFilterSuggested: any = () => ({ _: 'dialogFilterSuggested', filter: obj(), description: str() })
const _statsDateRangeDays: any = () => ({ _: 'statsDateRangeDays', min_date: i32(), max_date: i32() })
const _statsAbsValueAndPrev: any = () => ({ _: 'statsAbsValueAndPrev', current: f64(), previous: f64() })
const _statsPercentValue: any = () => ({ _: 'statsPercentValue', part: f64(), total: f64() })
const _statsGraphAsync: any = () => ({ _: 'statsGraphAsync', token: str() })
const _statsGraphError: any = () => ({ _: 'statsGraphError', error: str() })
const _statsGraph = (): any => {
  const result: Record<string, unknown> = { _: 'statsGraph' }
  const flags = i32()
  result.json = obj()
  if (flags & 0x1) result.zoom_token = str()
  return result
}
const _messageInteractionCounters: any = () => ({ _: 'messageInteractionCounters', msg_id: i32(), views: i32(), forwards: i32() })
const _statsBroadcastStats: any = () => ({ _: 'stats.broadcastStats', period: obj(), followers: obj(), views_per_post: obj(), shares_per_post: obj(), enabled_notifications: obj(), growth_graph: obj(), followers_graph: obj(), mute_graph: obj(), top_hours_graph: obj(), interactions_graph: obj(), iv_interactions_graph: obj(), views_by_source_graph: obj(), new_followers_by_source_graph: obj(), languages_graph: obj(), recent_message_interactions: vector(obj) })
const _helpPromoDataEmpty: any = () => ({ _: 'help.promoDataEmpty', expires: i32() })
const _helpPromoData = (): any => {
  const result: Record<string, unknown> = { _: 'help.promoData' }
  const flags = i32()
  result.proxy = !!(flags & 0x1)
  result.expires = i32()
  result.peer = obj()
  result.chats = vector(obj)
  result.users = vector(obj)
  if (flags & 0x2) result.psa_type = str()
  if (flags & 0x4) result.psa_message = str()
  return result
}
const _videoSize = (): any => {
  const result: Record<string, unknown> = { _: 'videoSize' }
  const flags = i32()
  result.type = str()
  result.w = i32()
  result.h = i32()
  result.size = i32()
  if (flags & 0x1) result.video_start_ts = f64()
  return result
}
const _videoSizeEmojiMarkup: any = () => ({ _: 'videoSizeEmojiMarkup', emoji_id: i64(), background_colors: vector(i32) })
const _videoSizeStickerMarkup: any = () => ({ _: 'videoSizeStickerMarkup', stickerset: obj(), sticker_id: i64(), background_colors: vector(i32) })
const _statsGroupTopPoster: any = () => ({ _: 'statsGroupTopPoster', user_id: i64(), messages: i32(), avg_chars: i32() })
const _statsGroupTopAdmin: any = () => ({ _: 'statsGroupTopAdmin', user_id: i64(), deleted: i32(), kicked: i32(), banned: i32() })
const _statsGroupTopInviter: any = () => ({ _: 'statsGroupTopInviter', user_id: i64(), invitations: i32() })
const _statsMegagroupStats: any = () => ({ _: 'stats.megagroupStats', period: obj(), members: obj(), messages: obj(), viewers: obj(), posters: obj(), growth_graph: obj(), members_graph: obj(), new_members_by_source_graph: obj(), languages_graph: obj(), messages_graph: obj(), actions_graph: obj(), top_hours_graph: obj(), weekdays_graph: obj(), top_posters: vector(obj), top_admins: vector(obj), top_inviters: vector(obj), users: vector(obj) })
const _globalPrivacySettings = (): any => {
  const result: Record<string, unknown> = { _: 'globalPrivacySettings' }
  const flags = i32()
  result.archive_and_mute_new_noncontact_peers = !!(flags & 0x1)
  result.keep_archived_unmuted = !!(flags & 0x2)
  result.keep_archived_folders = !!(flags & 0x4)
  return result
}
const _helpCountryCode = (): any => {
  const result: Record<string, unknown> = { _: 'help.countryCode' }
  const flags = i32()
  result.country_code = str()
  if (flags & 0x1) result.prefixes = vector(str)
  if (flags & 0x2) result.patterns = vector(str)
  return result
}
const _helpCountry = (): any => {
  const result: Record<string, unknown> = { _: 'help.country' }
  const flags = i32()
  result.hidden = !!(flags & 0x1)
  result.iso2 = str()
  result.default_name = str()
  if (flags & 0x2) result.name = str()
  result.country_codes = vector(obj)
  return result
}
const _helpCountriesListNotModified: any = () => ({ _: 'help.countriesListNotModified' })
const _helpCountriesList: any = () => ({ _: 'help.countriesList', countries: vector(obj), hash: i32() })
const _messageViews = (): any => {
  const result: Record<string, unknown> = { _: 'messageViews' }
  const flags = i32()
  if (flags & 0x1) result.views = i32()
  if (flags & 0x2) result.forwards = i32()
  if (flags & 0x4) result.replies = obj()
  return result
}
const _messagesMessageViews: any = () => ({ _: 'messages.messageViews', views: vector(obj), chats: vector(obj), users: vector(obj) })
const _messagesDiscussionMessage = (): any => {
  const result: Record<string, unknown> = { _: 'messages.discussionMessage' }
  const flags = i32()
  result.messages = vector(obj)
  if (flags & 0x1) result.max_id = i32()
  if (flags & 0x2) result.read_inbox_max_id = i32()
  if (flags & 0x4) result.read_outbox_max_id = i32()
  result.unread_count = i32()
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _messageReplyHeader = (): any => {
  const result: Record<string, unknown> = { _: 'messageReplyHeader' }
  const flags = i32()
  result.reply_to_scheduled = !!(flags & 0x4)
  result.forum_topic = !!(flags & 0x8)
  result.quote = !!(flags & 0x200)
  if (flags & 0x10) result.reply_to_msg_id = i32()
  if (flags & 0x1) result.reply_to_peer_id = obj()
  if (flags & 0x20) result.reply_from = obj()
  if (flags & 0x100) result.reply_media = obj()
  if (flags & 0x2) result.reply_to_top_id = i32()
  if (flags & 0x40) result.quote_text = str()
  if (flags & 0x80) result.quote_entities = vector(obj)
  return result
}
const _messageReplyStoryHeader: any = () => ({ _: 'messageReplyStoryHeader', user_id: i64(), story_id: i32() })
const _messageReplies = (): any => {
  const result: Record<string, unknown> = { _: 'messageReplies' }
  const flags = i32()
  result.comments = !!(flags & 0x1)
  result.replies = i32()
  result.replies_pts = i32()
  if (flags & 0x2) result.recent_repliers = vector(obj)
  if (flags & 0x1) result.channel_id = i64()
  if (flags & 0x4) result.max_id = i32()
  if (flags & 0x8) result.read_max_id = i32()
  return result
}
const _peerBlocked: any = () => ({ _: 'peerBlocked', peer_id: obj(), date: i32() })
const _statsMessageStats: any = () => ({ _: 'stats.messageStats', views_graph: obj() })
const _groupCallDiscarded: any = () => ({ _: 'groupCallDiscarded', id: i64(), access_hash: i64(), duration: i32() })
const _groupCall = (): any => {
  const result: Record<string, unknown> = { _: 'groupCall' }
  const flags = i32()
  result.join_muted = !!(flags & 0x2)
  result.can_change_join_muted = !!(flags & 0x4)
  result.join_date_asc = !!(flags & 0x40)
  result.schedule_start_subscribed = !!(flags & 0x100)
  result.can_start_video = !!(flags & 0x200)
  result.record_video_active = !!(flags & 0x800)
  result.rtmp_stream = !!(flags & 0x1000)
  result.listeners_hidden = !!(flags & 0x2000)
  result.id = i64()
  result.access_hash = i64()
  result.participants_count = i32()
  if (flags & 0x8) result.title = str()
  if (flags & 0x10) result.stream_dc_id = i32()
  if (flags & 0x20) result.record_start_date = i32()
  if (flags & 0x80) result.schedule_date = i32()
  if (flags & 0x400) result.unmuted_video_count = i32()
  result.unmuted_video_limit = i32()
  result.version = i32()
  return result
}
const _inputGroupCall: any = () => ({ _: 'inputGroupCall', id: i64(), access_hash: i64() })
const _groupCallParticipant = (): any => {
  const result: Record<string, unknown> = { _: 'groupCallParticipant' }
  const flags = i32()
  result.muted = !!(flags & 0x1)
  result.left = !!(flags & 0x2)
  result.can_self_unmute = !!(flags & 0x4)
  result.just_joined = !!(flags & 0x10)
  result.versioned = !!(flags & 0x20)
  result.min = !!(flags & 0x100)
  result.muted_by_you = !!(flags & 0x200)
  result.volume_by_admin = !!(flags & 0x400)
  result.self = !!(flags & 0x1000)
  result.video_joined = !!(flags & 0x8000)
  result.peer = obj()
  result.date = i32()
  if (flags & 0x8) result.active_date = i32()
  result.source = i32()
  if (flags & 0x80) result.volume = i32()
  if (flags & 0x800) result.about = str()
  if (flags & 0x2000) result.raise_hand_rating = i64()
  if (flags & 0x40) result.video = obj()
  if (flags & 0x4000) result.presentation = obj()
  return result
}
const _phoneGroupCall: any = () => ({ _: 'phone.groupCall', call: obj(), participants: vector(obj), participants_next_offset: str(), chats: vector(obj), users: vector(obj) })
const _phoneGroupParticipants: any = () => ({ _: 'phone.groupParticipants', count: i32(), participants: vector(obj), next_offset: str(), chats: vector(obj), users: vector(obj), version: i32() })
const _inlineQueryPeerTypeSameBotPM: any = () => ({ _: 'inlineQueryPeerTypeSameBotPM' })
const _inlineQueryPeerTypePM: any = () => ({ _: 'inlineQueryPeerTypePM' })
const _inlineQueryPeerTypeChat: any = () => ({ _: 'inlineQueryPeerTypeChat' })
const _inlineQueryPeerTypeMegagroup: any = () => ({ _: 'inlineQueryPeerTypeMegagroup' })
const _inlineQueryPeerTypeBroadcast: any = () => ({ _: 'inlineQueryPeerTypeBroadcast' })
const _inlineQueryPeerTypeBotPM: any = () => ({ _: 'inlineQueryPeerTypeBotPM' })
const _messagesHistoryImport: any = () => ({ _: 'messages.historyImport', id: i64() })
const _messagesHistoryImportParsed = (): any => {
  const result: Record<string, unknown> = { _: 'messages.historyImportParsed' }
  const flags = i32()
  result.pm = !!(flags & 0x1)
  result.group = !!(flags & 0x2)
  if (flags & 0x4) result.title = str()
  return result
}
const _messagesAffectedFoundMessages: any = () => ({ _: 'messages.affectedFoundMessages', pts: i32(), pts_count: i32(), offset: i32(), messages: vector(i32) })
const _chatInviteImporter = (): any => {
  const result: Record<string, unknown> = { _: 'chatInviteImporter' }
  const flags = i32()
  result.requested = !!(flags & 0x1)
  result.via_chatlist = !!(flags & 0x8)
  result.user_id = i64()
  result.date = i32()
  if (flags & 0x4) result.about = str()
  if (flags & 0x2) result.approved_by = i64()
  return result
}
const _messagesExportedChatInvites: any = () => ({ _: 'messages.exportedChatInvites', count: i32(), invites: vector(obj), users: vector(obj) })
const _messagesExportedChatInvite: any = () => ({ _: 'messages.exportedChatInvite', invite: obj(), users: vector(obj) })
const _messagesExportedChatInviteReplaced: any = () => ({ _: 'messages.exportedChatInviteReplaced', invite: obj(), new_invite: obj(), users: vector(obj) })
const _messagesChatInviteImporters: any = () => ({ _: 'messages.chatInviteImporters', count: i32(), importers: vector(obj), users: vector(obj) })
const _chatAdminWithInvites: any = () => ({ _: 'chatAdminWithInvites', admin_id: i64(), invites_count: i32(), revoked_invites_count: i32() })
const _messagesChatAdminsWithInvites: any = () => ({ _: 'messages.chatAdminsWithInvites', admins: vector(obj), users: vector(obj) })
const _messagesCheckedHistoryImportPeer: any = () => ({ _: 'messages.checkedHistoryImportPeer', confirm_text: str() })
const _phoneJoinAsPeers: any = () => ({ _: 'phone.joinAsPeers', peers: vector(obj), chats: vector(obj), users: vector(obj) })
const _phoneExportedGroupCallInvite: any = () => ({ _: 'phone.exportedGroupCallInvite', link: str() })
const _groupCallParticipantVideoSourceGroup: any = () => ({ _: 'groupCallParticipantVideoSourceGroup', semantics: str(), sources: vector(i32) })
const _groupCallParticipantVideo = (): any => {
  const result: Record<string, unknown> = { _: 'groupCallParticipantVideo' }
  const flags = i32()
  result.paused = !!(flags & 0x1)
  result.endpoint = str()
  result.source_groups = vector(obj)
  if (flags & 0x2) result.audio_source = i32()
  return result
}
const _stickersSuggestedShortName: any = () => ({ _: 'stickers.suggestedShortName', short_name: str() })
const _botCommandScopeDefault: any = () => ({ _: 'botCommandScopeDefault' })
const _botCommandScopeUsers: any = () => ({ _: 'botCommandScopeUsers' })
const _botCommandScopeChats: any = () => ({ _: 'botCommandScopeChats' })
const _botCommandScopeChatAdmins: any = () => ({ _: 'botCommandScopeChatAdmins' })
const _botCommandScopePeer: any = () => ({ _: 'botCommandScopePeer', peer: obj() })
const _botCommandScopePeerAdmins: any = () => ({ _: 'botCommandScopePeerAdmins', peer: obj() })
const _botCommandScopePeerUser: any = () => ({ _: 'botCommandScopePeerUser', peer: obj(), user_id: obj() })
const _accountResetPasswordFailedWait: any = () => ({ _: 'account.resetPasswordFailedWait', retry_date: i32() })
const _accountResetPasswordRequestedWait: any = () => ({ _: 'account.resetPasswordRequestedWait', until_date: i32() })
const _accountResetPasswordOk: any = () => ({ _: 'account.resetPasswordOk' })
const _sponsoredMessage = (): any => {
  const result: Record<string, unknown> = { _: 'sponsoredMessage' }
  const flags = i32()
  result.recommended = !!(flags & 0x20)
  result.show_peer_photo = !!(flags & 0x40)
  result.random_id = bytes()
  if (flags & 0x8) result.from_id = obj()
  if (flags & 0x10) result.chat_invite = obj()
  if (flags & 0x10) result.chat_invite_hash = str()
  if (flags & 0x4) result.channel_post = i32()
  if (flags & 0x1) result.start_param = str()
  if (flags & 0x200) result.webpage = obj()
  result.message = str()
  if (flags & 0x2) result.entities = vector(obj)
  if (flags & 0x80) result.sponsor_info = str()
  if (flags & 0x100) result.additional_info = str()
  return result
}
const _messagesSponsoredMessages = (): any => {
  const result: Record<string, unknown> = { _: 'messages.sponsoredMessages' }
  const flags = i32()
  if (flags & 0x1) result.posts_between = i32()
  result.messages = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _messagesSponsoredMessagesEmpty: any = () => ({ _: 'messages.sponsoredMessagesEmpty' })
const _searchResultsCalendarPeriod: any = () => ({ _: 'searchResultsCalendarPeriod', date: i32(), min_msg_id: i32(), max_msg_id: i32(), count: i32() })
const _messagesSearchResultsCalendar = (): any => {
  const result: Record<string, unknown> = { _: 'messages.searchResultsCalendar' }
  const flags = i32()
  result.inexact = !!(flags & 0x1)
  result.count = i32()
  result.min_date = i32()
  result.min_msg_id = i32()
  if (flags & 0x2) result.offset_id_offset = i32()
  result.periods = vector(obj)
  result.messages = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _searchResultPosition: any = () => ({ _: 'searchResultPosition', msg_id: i32(), date: i32(), offset: i32() })
const _messagesSearchResultsPositions: any = () => ({ _: 'messages.searchResultsPositions', count: i32(), positions: vector(obj) })
const _channelsSendAsPeers: any = () => ({ _: 'channels.sendAsPeers', peers: vector(obj), chats: vector(obj), users: vector(obj) })
const _usersUserFull: any = () => ({ _: 'users.userFull', full_user: obj(), chats: vector(obj), users: vector(obj) })
const _messagesPeerSettings: any = () => ({ _: 'messages.peerSettings', settings: obj(), chats: vector(obj), users: vector(obj) })
const _authLoggedOut = (): any => {
  const result: Record<string, unknown> = { _: 'auth.loggedOut' }
  const flags = i32()
  if (flags & 0x1) result.future_auth_token = bytes()
  return result
}
const _reactionCount = (): any => {
  const result: Record<string, unknown> = { _: 'reactionCount' }
  const flags = i32()
  if (flags & 0x1) result.chosen_order = i32()
  result.reaction = obj()
  result.count = i32()
  return result
}
const _messageReactions = (): any => {
  const result: Record<string, unknown> = { _: 'messageReactions' }
  const flags = i32()
  result.min = !!(flags & 0x1)
  result.can_see_list = !!(flags & 0x4)
  result.results = vector(obj)
  if (flags & 0x2) result.recent_reactions = vector(obj)
  return result
}
const _messagesMessageReactionsList = (): any => {
  const result: Record<string, unknown> = { _: 'messages.messageReactionsList' }
  const flags = i32()
  result.count = i32()
  result.reactions = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  if (flags & 0x1) result.next_offset = str()
  return result
}
const _availableReaction = (): any => {
  const result: Record<string, unknown> = { _: 'availableReaction' }
  const flags = i32()
  result.inactive = !!(flags & 0x1)
  result.premium = !!(flags & 0x4)
  result.reaction = str()
  result.title = str()
  result.static_icon = obj()
  result.appear_animation = obj()
  result.select_animation = obj()
  result.activate_animation = obj()
  result.effect_animation = obj()
  if (flags & 0x2) result.around_animation = obj()
  if (flags & 0x2) result.center_icon = obj()
  return result
}
const _messagesAvailableReactionsNotModified: any = () => ({ _: 'messages.availableReactionsNotModified' })
const _messagesAvailableReactions: any = () => ({ _: 'messages.availableReactions', hash: i32(), reactions: vector(obj) })
const _messagePeerReaction = (): any => {
  const result: Record<string, unknown> = { _: 'messagePeerReaction' }
  const flags = i32()
  result.big = !!(flags & 0x1)
  result.unread = !!(flags & 0x2)
  result.my = !!(flags & 0x4)
  result.peer_id = obj()
  result.date = i32()
  result.reaction = obj()
  return result
}
const _groupCallStreamChannel: any = () => ({ _: 'groupCallStreamChannel', channel: i32(), scale: i32(), last_timestamp_ms: i64() })
const _phoneGroupCallStreamChannels: any = () => ({ _: 'phone.groupCallStreamChannels', channels: vector(obj) })
const _phoneGroupCallStreamRtmpUrl: any = () => ({ _: 'phone.groupCallStreamRtmpUrl', url: str(), key: str() })
const _attachMenuBotIconColor: any = () => ({ _: 'attachMenuBotIconColor', name: str(), color: i32() })
const _attachMenuBotIcon = (): any => {
  const result: Record<string, unknown> = { _: 'attachMenuBotIcon' }
  const flags = i32()
  result.name = str()
  result.icon = obj()
  if (flags & 0x1) result.colors = vector(obj)
  return result
}
const _attachMenuBot = (): any => {
  const result: Record<string, unknown> = { _: 'attachMenuBot' }
  const flags = i32()
  result.inactive = !!(flags & 0x1)
  result.has_settings = !!(flags & 0x2)
  result.request_write_access = !!(flags & 0x4)
  result.show_in_attach_menu = !!(flags & 0x8)
  result.show_in_side_menu = !!(flags & 0x10)
  result.side_menu_disclaimer_needed = !!(flags & 0x20)
  result.bot_id = i64()
  result.short_name = str()
  if (flags & 0x8) result.peer_types = vector(obj)
  result.icons = vector(obj)
  return result
}
const _attachMenuBotsNotModified: any = () => ({ _: 'attachMenuBotsNotModified' })
const _attachMenuBots: any = () => ({ _: 'attachMenuBots', hash: i64(), bots: vector(obj), users: vector(obj) })
const _attachMenuBotsBot: any = () => ({ _: 'attachMenuBotsBot', bot: obj(), users: vector(obj) })
const _webViewResultUrl: any = () => ({ _: 'webViewResultUrl', query_id: i64(), url: str() })
const _simpleWebViewResultUrl: any = () => ({ _: 'simpleWebViewResultUrl', url: str() })
const _webViewMessageSent = (): any => {
  const result: Record<string, unknown> = { _: 'webViewMessageSent' }
  const flags = i32()
  if (flags & 0x1) result.msg_id = obj()
  return result
}
const _botMenuButtonDefault: any = () => ({ _: 'botMenuButtonDefault' })
const _botMenuButtonCommands: any = () => ({ _: 'botMenuButtonCommands' })
const _botMenuButton: any = () => ({ _: 'botMenuButton', text: str(), url: str() })
const _accountSavedRingtonesNotModified: any = () => ({ _: 'account.savedRingtonesNotModified' })
const _accountSavedRingtones: any = () => ({ _: 'account.savedRingtones', hash: i64(), ringtones: vector(obj) })
const _notificationSoundDefault: any = () => ({ _: 'notificationSoundDefault' })
const _notificationSoundNone: any = () => ({ _: 'notificationSoundNone' })
const _notificationSoundLocal: any = () => ({ _: 'notificationSoundLocal', title: str(), data: str() })
const _notificationSoundRingtone: any = () => ({ _: 'notificationSoundRingtone', id: i64() })
const _accountSavedRingtone: any = () => ({ _: 'account.savedRingtone' })
const _accountSavedRingtoneConverted: any = () => ({ _: 'account.savedRingtoneConverted', document: obj() })
const _attachMenuPeerTypeSameBotPM: any = () => ({ _: 'attachMenuPeerTypeSameBotPM' })
const _attachMenuPeerTypeBotPM: any = () => ({ _: 'attachMenuPeerTypeBotPM' })
const _attachMenuPeerTypePM: any = () => ({ _: 'attachMenuPeerTypePM' })
const _attachMenuPeerTypeChat: any = () => ({ _: 'attachMenuPeerTypeChat' })
const _attachMenuPeerTypeBroadcast: any = () => ({ _: 'attachMenuPeerTypeBroadcast' })
const _inputInvoiceMessage: any = () => ({ _: 'inputInvoiceMessage', peer: obj(), msg_id: i32() })
const _inputInvoiceSlug: any = () => ({ _: 'inputInvoiceSlug', slug: str() })
const _inputInvoicePremiumGiftCode: any = () => ({ _: 'inputInvoicePremiumGiftCode', purpose: obj(), option: obj() })
const _paymentsExportedInvoice: any = () => ({ _: 'payments.exportedInvoice', url: str() })
const _messagesTranscribedAudio = (): any => {
  const result: Record<string, unknown> = { _: 'messages.transcribedAudio' }
  const flags = i32()
  result.pending = !!(flags & 0x1)
  result.transcription_id = i64()
  result.text = str()
  return result
}
const _helpPremiumPromo: any = () => ({ _: 'help.premiumPromo', status_text: str(), status_entities: vector(obj), video_sections: vector(str), videos: vector(obj), period_options: vector(obj), users: vector(obj) })
const _inputStorePaymentPremiumSubscription = (): any => {
  const result: Record<string, unknown> = { _: 'inputStorePaymentPremiumSubscription' }
  const flags = i32()
  result.restore = !!(flags & 0x1)
  result.upgrade = !!(flags & 0x2)
  return result
}
const _inputStorePaymentGiftPremium: any = () => ({ _: 'inputStorePaymentGiftPremium', user_id: obj(), currency: str(), amount: i64() })
const _inputStorePaymentPremiumGiftCode = (): any => {
  const result: Record<string, unknown> = { _: 'inputStorePaymentPremiumGiftCode' }
  const flags = i32()
  result.users = vector(obj)
  if (flags & 0x1) result.boost_peer = obj()
  result.currency = str()
  result.amount = i64()
  return result
}
const _inputStorePaymentPremiumGiveaway = (): any => {
  const result: Record<string, unknown> = { _: 'inputStorePaymentPremiumGiveaway' }
  const flags = i32()
  result.only_new_subscribers = !!(flags & 0x1)
  result.boost_peer = obj()
  if (flags & 0x2) result.additional_peers = vector(obj)
  if (flags & 0x4) result.countries_iso2 = vector(str)
  result.random_id = i64()
  result.until_date = i32()
  result.currency = str()
  result.amount = i64()
  return result
}
const _premiumGiftOption = (): any => {
  const result: Record<string, unknown> = { _: 'premiumGiftOption' }
  const flags = i32()
  result.months = i32()
  result.currency = str()
  result.amount = i64()
  result.bot_url = str()
  if (flags & 0x1) result.store_product = str()
  return result
}
const _paymentFormMethod: any = () => ({ _: 'paymentFormMethod', url: str(), title: str() })
const _emojiStatusEmpty: any = () => ({ _: 'emojiStatusEmpty' })
const _emojiStatus: any = () => ({ _: 'emojiStatus', document_id: i64() })
const _emojiStatusUntil: any = () => ({ _: 'emojiStatusUntil', document_id: i64(), until: i32() })
const _accountEmojiStatusesNotModified: any = () => ({ _: 'account.emojiStatusesNotModified' })
const _accountEmojiStatuses: any = () => ({ _: 'account.emojiStatuses', hash: i64(), statuses: vector(obj) })
const _reactionEmpty: any = () => ({ _: 'reactionEmpty' })
const _reactionEmoji: any = () => ({ _: 'reactionEmoji', emoticon: str() })
const _reactionCustomEmoji: any = () => ({ _: 'reactionCustomEmoji', document_id: i64() })
const _chatReactionsNone: any = () => ({ _: 'chatReactionsNone' })
const _chatReactionsAll = (): any => {
  const result: Record<string, unknown> = { _: 'chatReactionsAll' }
  const flags = i32()
  result.allow_custom = !!(flags & 0x1)
  return result
}
const _chatReactionsSome: any = () => ({ _: 'chatReactionsSome', reactions: vector(obj) })
const _messagesReactionsNotModified: any = () => ({ _: 'messages.reactionsNotModified' })
const _messagesReactions: any = () => ({ _: 'messages.reactions', hash: i64(), reactions: vector(obj) })
const _emailVerifyPurposeLoginSetup: any = () => ({ _: 'emailVerifyPurposeLoginSetup', phone_number: str(), phone_code_hash: str() })
const _emailVerifyPurposeLoginChange: any = () => ({ _: 'emailVerifyPurposeLoginChange' })
const _emailVerifyPurposePassport: any = () => ({ _: 'emailVerifyPurposePassport' })
const _emailVerificationCode: any = () => ({ _: 'emailVerificationCode', code: str() })
const _emailVerificationGoogle: any = () => ({ _: 'emailVerificationGoogle', token: str() })
const _emailVerificationApple: any = () => ({ _: 'emailVerificationApple', token: str() })
const _accountEmailVerified: any = () => ({ _: 'account.emailVerified', email: str() })
const _accountEmailVerifiedLogin: any = () => ({ _: 'account.emailVerifiedLogin', email: str(), sent_code: obj() })
const _premiumSubscriptionOption = (): any => {
  const result: Record<string, unknown> = { _: 'premiumSubscriptionOption' }
  const flags = i32()
  result.current = !!(flags & 0x2)
  result.can_purchase_upgrade = !!(flags & 0x4)
  if (flags & 0x8) result.transaction = str()
  result.months = i32()
  result.currency = str()
  result.amount = i64()
  result.bot_url = str()
  if (flags & 0x1) result.store_product = str()
  return result
}
const _sendAsPeer = (): any => {
  const result: Record<string, unknown> = { _: 'sendAsPeer' }
  const flags = i32()
  result.premium_required = !!(flags & 0x1)
  result.peer = obj()
  return result
}
const _messageExtendedMediaPreview = (): any => {
  const result: Record<string, unknown> = { _: 'messageExtendedMediaPreview' }
  const flags = i32()
  if (flags & 0x1) result.w = i32()
  if (flags & 0x1) result.h = i32()
  if (flags & 0x2) result.thumb = obj()
  if (flags & 0x4) result.video_duration = i32()
  return result
}
const _messageExtendedMedia: any = () => ({ _: 'messageExtendedMedia', media: obj() })
const _stickerKeyword: any = () => ({ _: 'stickerKeyword', document_id: i64(), keyword: vector(str) })
const _username = (): any => {
  const result: Record<string, unknown> = { _: 'username' }
  const flags = i32()
  result.editable = !!(flags & 0x1)
  result.active = !!(flags & 0x2)
  result.username = str()
  return result
}
const _forumTopicDeleted: any = () => ({ _: 'forumTopicDeleted', id: i32() })
const _forumTopic = (): any => {
  const result: Record<string, unknown> = { _: 'forumTopic' }
  const flags = i32()
  result.my = !!(flags & 0x2)
  result.closed = !!(flags & 0x4)
  result.pinned = !!(flags & 0x8)
  result.short = !!(flags & 0x20)
  result.hidden = !!(flags & 0x40)
  result.id = i32()
  result.date = i32()
  result.title = str()
  result.icon_color = i32()
  if (flags & 0x1) result.icon_emoji_id = i64()
  result.top_message = i32()
  result.read_inbox_max_id = i32()
  result.read_outbox_max_id = i32()
  result.unread_count = i32()
  result.unread_mentions_count = i32()
  result.unread_reactions_count = i32()
  result.from_id = obj()
  result.notify_settings = obj()
  if (flags & 0x10) result.draft = obj()
  return result
}
const _messagesForumTopics = (): any => {
  const result: Record<string, unknown> = { _: 'messages.forumTopics' }
  const flags = i32()
  result.order_by_create_date = !!(flags & 0x1)
  result.count = i32()
  result.topics = vector(obj)
  result.messages = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  result.pts = i32()
  return result
}
const _defaultHistoryTTL: any = () => ({ _: 'defaultHistoryTTL', period: i32() })
const _exportedContactToken: any = () => ({ _: 'exportedContactToken', url: str(), expires: i32() })
const _requestPeerTypeUser = (): any => {
  const result: Record<string, unknown> = { _: 'requestPeerTypeUser' }
  const flags = i32()
  if (flags & 0x1) result.bot = obj()
  if (flags & 0x2) result.premium = obj()
  return result
}
const _requestPeerTypeChat = (): any => {
  const result: Record<string, unknown> = { _: 'requestPeerTypeChat' }
  const flags = i32()
  result.creator = !!(flags & 0x1)
  result.bot_participant = !!(flags & 0x20)
  if (flags & 0x8) result.has_username = obj()
  if (flags & 0x10) result.forum = obj()
  if (flags & 0x2) result.user_admin_rights = obj()
  if (flags & 0x4) result.bot_admin_rights = obj()
  return result
}
const _requestPeerTypeBroadcast = (): any => {
  const result: Record<string, unknown> = { _: 'requestPeerTypeBroadcast' }
  const flags = i32()
  result.creator = !!(flags & 0x1)
  if (flags & 0x8) result.has_username = obj()
  if (flags & 0x2) result.user_admin_rights = obj()
  if (flags & 0x4) result.bot_admin_rights = obj()
  return result
}
const _emojiListNotModified: any = () => ({ _: 'emojiListNotModified' })
const _emojiList: any = () => ({ _: 'emojiList', hash: i64(), document_id: vector(i64) })
const _emojiGroup: any = () => ({ _: 'emojiGroup', title: str(), icon_emoji_id: i64(), emoticons: vector(str) })
const _messagesEmojiGroupsNotModified: any = () => ({ _: 'messages.emojiGroupsNotModified' })
const _messagesEmojiGroups: any = () => ({ _: 'messages.emojiGroups', hash: i32(), groups: vector(obj) })
const _textWithEntities: any = () => ({ _: 'textWithEntities', text: str(), entities: vector(obj) })
const _messagesTranslateResult: any = () => ({ _: 'messages.translateResult', result: vector(obj) })
const _autoSaveSettings = (): any => {
  const result: Record<string, unknown> = { _: 'autoSaveSettings' }
  const flags = i32()
  result.photos = !!(flags & 0x1)
  result.videos = !!(flags & 0x2)
  if (flags & 0x4) result.video_max_size = i64()
  return result
}
const _autoSaveException: any = () => ({ _: 'autoSaveException', peer: obj(), settings: obj() })
const _accountAutoSaveSettings: any = () => ({ _: 'account.autoSaveSettings', users_settings: obj(), chats_settings: obj(), broadcasts_settings: obj(), exceptions: vector(obj), chats: vector(obj), users: vector(obj) })
const _helpAppConfigNotModified: any = () => ({ _: 'help.appConfigNotModified' })
const _helpAppConfig: any = () => ({ _: 'help.appConfig', hash: i32(), config: obj() })
const _inputBotAppID: any = () => ({ _: 'inputBotAppID', id: i64(), access_hash: i64() })
const _inputBotAppShortName: any = () => ({ _: 'inputBotAppShortName', bot_id: obj(), short_name: str() })
const _botAppNotModified: any = () => ({ _: 'botAppNotModified' })
const _botApp = (): any => {
  const result: Record<string, unknown> = { _: 'botApp' }
  const flags = i32()
  result.id = i64()
  result.access_hash = i64()
  result.short_name = str()
  result.title = str()
  result.description = str()
  result.photo = obj()
  if (flags & 0x1) result.document = obj()
  result.hash = i64()
  return result
}
const _messagesBotApp = (): any => {
  const result: Record<string, unknown> = { _: 'messages.botApp' }
  const flags = i32()
  result.inactive = !!(flags & 0x1)
  result.request_write_access = !!(flags & 0x2)
  result.has_settings = !!(flags & 0x4)
  result.app = obj()
  return result
}
const _appWebViewResultUrl: any = () => ({ _: 'appWebViewResultUrl', url: str() })
const _inlineBotWebView: any = () => ({ _: 'inlineBotWebView', text: str(), url: str() })
const _readParticipantDate: any = () => ({ _: 'readParticipantDate', user_id: i64(), date: i32() })
const _inputChatlistDialogFilter: any = () => ({ _: 'inputChatlistDialogFilter', filter_id: i32() })
const _exportedChatlistInvite = (): any => {
  const result: Record<string, unknown> = { _: 'exportedChatlistInvite' }
  // const flags = i32()
  result.title = str()
  result.url = str()
  result.peers = vector(obj)
  return result
}
const _chatlistsExportedChatlistInvite: any = () => ({ _: 'chatlists.exportedChatlistInvite', filter: obj(), invite: obj() })
const _chatlistsExportedInvites: any = () => ({ _: 'chatlists.exportedInvites', invites: vector(obj), chats: vector(obj), users: vector(obj) })
const _chatlistsChatlistInviteAlready: any = () => ({ _: 'chatlists.chatlistInviteAlready', filter_id: i32(), missing_peers: vector(obj), already_peers: vector(obj), chats: vector(obj), users: vector(obj) })
const _chatlistsChatlistInvite = (): any => {
  const result: Record<string, unknown> = { _: 'chatlists.chatlistInvite' }
  const flags = i32()
  result.title = str()
  if (flags & 0x1) result.emoticon = str()
  result.peers = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _chatlistsChatlistUpdates: any = () => ({ _: 'chatlists.chatlistUpdates', missing_peers: vector(obj), chats: vector(obj), users: vector(obj) })
const _botsBotInfo: any = () => ({ _: 'bots.botInfo', name: str(), about: str(), description: str() })
const _messagePeerVote: any = () => ({ _: 'messagePeerVote', peer: obj(), option: bytes(), date: i32() })
const _messagePeerVoteInputOption: any = () => ({ _: 'messagePeerVoteInputOption', peer: obj(), date: i32() })
const _messagePeerVoteMultiple: any = () => ({ _: 'messagePeerVoteMultiple', peer: obj(), options: vector(bytes), date: i32() })
const _sponsoredWebPage = (): any => {
  const result: Record<string, unknown> = { _: 'sponsoredWebPage' }
  const flags = i32()
  result.url = str()
  result.site_name = str()
  if (flags & 0x1) result.photo = obj()
  return result
}
const _storyViews = (): any => {
  const result: Record<string, unknown> = { _: 'storyViews' }
  const flags = i32()
  result.has_viewers = !!(flags & 0x2)
  result.views_count = i32()
  if (flags & 0x4) result.forwards_count = i32()
  if (flags & 0x8) result.reactions = vector(obj)
  if (flags & 0x10) result.reactions_count = i32()
  if (flags & 0x1) result.recent_viewers = vector(i64)
  return result
}
const _storyItemDeleted: any = () => ({ _: 'storyItemDeleted', id: i32() })
const _storyItemSkipped = (): any => {
  const result: Record<string, unknown> = { _: 'storyItemSkipped' }
  const flags = i32()
  result.close_friends = !!(flags & 0x100)
  result.id = i32()
  result.date = i32()
  result.expire_date = i32()
  return result
}
const _storyItem = (): any => {
  const result: Record<string, unknown> = { _: 'storyItem' }
  const flags = i32()
  result.pinned = !!(flags & 0x20)
  result.public = !!(flags & 0x80)
  result.close_friends = !!(flags & 0x100)
  result.min = !!(flags & 0x200)
  result.noforwards = !!(flags & 0x400)
  result.edited = !!(flags & 0x800)
  result.contacts = !!(flags & 0x1000)
  result.selected_contacts = !!(flags & 0x2000)
  result.out = !!(flags & 0x10000)
  result.id = i32()
  result.date = i32()
  result.expire_date = i32()
  if (flags & 0x1) result.caption = str()
  if (flags & 0x2) result.entities = vector(obj)
  result.media = obj()
  if (flags & 0x4000) result.media_areas = vector(obj)
  if (flags & 0x4) result.privacy = vector(obj)
  if (flags & 0x8) result.views = obj()
  if (flags & 0x8000) result.sent_reaction = obj()
  return result
}
const _storiesAllStoriesNotModified = (): any => {
  const result: Record<string, unknown> = { _: 'stories.allStoriesNotModified' }
  // const flags = i32()
  result.state = str()
  result.stealth_mode = obj()
  return result
}
const _storiesAllStories = (): any => {
  const result: Record<string, unknown> = { _: 'stories.allStories' }
  const flags = i32()
  result.has_more = !!(flags & 0x1)
  result.count = i32()
  result.state = str()
  result.peer_stories = vector(obj)
  result.chats = vector(obj)
  result.users = vector(obj)
  result.stealth_mode = obj()
  return result
}
const _storiesStories: any = () => ({ _: 'stories.stories', count: i32(), stories: vector(obj), chats: vector(obj), users: vector(obj) })
const _storyView = (): any => {
  const result: Record<string, unknown> = { _: 'storyView' }
  const flags = i32()
  result.blocked = !!(flags & 0x1)
  result.blocked_my_stories_from = !!(flags & 0x2)
  result.user_id = i64()
  result.date = i32()
  if (flags & 0x4) result.reaction = obj()
  return result
}
const _storiesStoryViewsList = (): any => {
  const result: Record<string, unknown> = { _: 'stories.storyViewsList' }
  const flags = i32()
  result.count = i32()
  result.reactions_count = i32()
  result.views = vector(obj)
  result.users = vector(obj)
  if (flags & 0x1) result.next_offset = str()
  return result
}
const _storiesStoryViews: any = () => ({ _: 'stories.storyViews', views: vector(obj), users: vector(obj) })
const _inputReplyToMessage = (): any => {
  const result: Record<string, unknown> = { _: 'inputReplyToMessage' }
  const flags = i32()
  result.reply_to_msg_id = i32()
  if (flags & 0x1) result.top_msg_id = i32()
  if (flags & 0x2) result.reply_to_peer_id = obj()
  if (flags & 0x4) result.quote_text = str()
  if (flags & 0x8) result.quote_entities = vector(obj)
  return result
}
const _inputReplyToStory: any = () => ({ _: 'inputReplyToStory', user_id: obj(), story_id: i32() })
const _exportedStoryLink: any = () => ({ _: 'exportedStoryLink', link: str() })
const _storiesStealthMode = (): any => {
  const result: Record<string, unknown> = { _: 'storiesStealthMode' }
  const flags = i32()
  if (flags & 0x1) result.active_until_date = i32()
  if (flags & 0x2) result.cooldown_until_date = i32()
  return result
}
const _mediaAreaCoordinates: any = () => ({ _: 'mediaAreaCoordinates', x: f64(), y: f64(), w: f64(), h: f64(), rotation: f64() })
const _mediaAreaVenue: any = () => ({ _: 'mediaAreaVenue', coordinates: obj(), geo: obj(), title: str(), address: str(), provider: str(), venue_id: str(), venue_type: str() })
const _inputMediaAreaVenue: any = () => ({ _: 'inputMediaAreaVenue', coordinates: obj(), query_id: i64(), result_id: str() })
const _mediaAreaGeoPoint: any = () => ({ _: 'mediaAreaGeoPoint', coordinates: obj(), geo: obj() })
const _mediaAreaSuggestedReaction = (): any => {
  const result: Record<string, unknown> = { _: 'mediaAreaSuggestedReaction' }
  const flags = i32()
  result.dark = !!(flags & 0x1)
  result.flipped = !!(flags & 0x2)
  result.coordinates = obj()
  result.reaction = obj()
  return result
}
const _peerStories = (): any => {
  const result: Record<string, unknown> = { _: 'peerStories' }
  const flags = i32()
  result.peer = obj()
  if (flags & 0x1) result.max_read_id = i32()
  result.stories = vector(obj)
  return result
}
const _storiesPeerStories: any = () => ({ _: 'stories.peerStories', stories: obj(), chats: vector(obj), users: vector(obj) })
const _messagesWebPage: any = () => ({ _: 'messages.webPage', webpage: obj(), chats: vector(obj), users: vector(obj) })
const _premiumGiftCodeOption = (): any => {
  const result: Record<string, unknown> = { _: 'premiumGiftCodeOption' }
  const flags = i32()
  result.users = i32()
  result.months = i32()
  if (flags & 0x1) result.store_product = str()
  if (flags & 0x2) result.store_quantity = i32()
  result.currency = str()
  result.amount = i64()
  return result
}
const _paymentsCheckedGiftCode = (): any => {
  const result: Record<string, unknown> = { _: 'payments.checkedGiftCode' }
  const flags = i32()
  result.via_giveaway = !!(flags & 0x4)
  result.from_id = obj()
  if (flags & 0x8) result.giveaway_msg_id = i32()
  if (flags & 0x1) result.to_id = i64()
  result.date = i32()
  result.months = i32()
  if (flags & 0x2) result.used_date = i32()
  result.chats = vector(obj)
  result.users = vector(obj)
  return result
}
const _paymentsGiveawayInfo = (): any => {
  const result: Record<string, unknown> = { _: 'payments.giveawayInfo' }
  const flags = i32()
  result.participating = !!(flags & 0x1)
  result.preparing_results = !!(flags & 0x8)
  result.start_date = i32()
  if (flags & 0x2) result.joined_too_early_date = i32()
  if (flags & 0x4) result.admin_disallowed_chat_id = i64()
  if (flags & 0x10) result.disallowed_country = str()
  return result
}
const _paymentsGiveawayInfoResults = (): any => {
  const result: Record<string, unknown> = { _: 'payments.giveawayInfoResults' }
  const flags = i32()
  result.winner = !!(flags & 0x1)
  result.refunded = !!(flags & 0x2)
  result.start_date = i32()
  if (flags & 0x1) result.gift_code_slug = str()
  result.finish_date = i32()
  result.winners_count = i32()
  result.activated_count = i32()
  return result
}
const _prepaidGiveaway: any = () => ({ _: 'prepaidGiveaway', id: i64(), months: i32(), quantity: i32(), date: i32() })
const _boost = (): any => {
  const result: Record<string, unknown> = { _: 'boost' }
  const flags = i32()
  result.gift = !!(flags & 0x2)
  result.giveaway = !!(flags & 0x4)
  result.unclaimed = !!(flags & 0x8)
  result.id = str()
  if (flags & 0x1) result.user_id = i64()
  if (flags & 0x4) result.giveaway_msg_id = i32()
  result.date = i32()
  result.expires = i32()
  if (flags & 0x10) result.used_gift_slug = str()
  if (flags & 0x20) result.multiplier = i32()
  return result
}
const _premiumBoostsList = (): any => {
  const result: Record<string, unknown> = { _: 'premium.boostsList' }
  const flags = i32()
  result.count = i32()
  result.boosts = vector(obj)
  if (flags & 0x1) result.next_offset = str()
  result.users = vector(obj)
  return result
}
const _myBoost = (): any => {
  const result: Record<string, unknown> = { _: 'myBoost' }
  const flags = i32()
  result.slot = i32()
  if (flags & 0x1) result.peer = obj()
  result.date = i32()
  result.expires = i32()
  if (flags & 0x2) result.cooldown_until_date = i32()
  return result
}
const _premiumMyBoosts: any = () => ({ _: 'premium.myBoosts', my_boosts: vector(obj), chats: vector(obj), users: vector(obj) })
const _premiumBoostsStatus = (): any => {
  const result: Record<string, unknown> = { _: 'premium.boostsStatus' }
  const flags = i32()
  result.my_boost = !!(flags & 0x4)
  result.level = i32()
  result.current_level_boosts = i32()
  result.boosts = i32()
  if (flags & 0x10) result.gift_boosts = i32()
  if (flags & 0x1) result.next_level_boosts = i32()
  if (flags & 0x2) result.premium_audience = obj()
  result.boost_url = str()
  if (flags & 0x8) result.prepaid_giveaways = vector(obj)
  if (flags & 0x4) result.my_boost_slots = vector(i32)
  return result
}

const parserMap = new Map<number, () => any>([
  [0xbc799737, _boolFalse],
  [0x997275b5, _boolTrue],
  [0x3fedd339, _true],
  [0x1cb5c415, _vector],
  [0xc4b9f9bb, _error],
  [0x56730bcc, _null],
  [0x7f3b18ea, _inputPeerEmpty],
  [0x7da07ec9, _inputPeerSelf],
  [0x35a95cb9, _inputPeerChat],
  [0xdde8a54c, _inputPeerUser],
  [0x27bcbbfc, _inputPeerChannel],
  [0xa87b0a1c, _inputPeerUserFromMessage],
  [0xbd2a0840, _inputPeerChannelFromMessage],
  [0xb98886cf, _inputUserEmpty],
  [0xf7c1b13f, _inputUserSelf],
  [0xf21158c6, _inputUser],
  [0x1da448e2, _inputUserFromMessage],
  [0xf392b7f4, _inputPhoneContact],
  [0xf52ff27f, _inputFile],
  [0xfa4f0bb5, _inputFileBig],
  [0x9664f57f, _inputMediaEmpty],
  [0x1e287d04, _inputMediaUploadedPhoto],
  [0xb3ba0635, _inputMediaPhoto],
  [0xf9c44144, _inputMediaGeoPoint],
  [0xf8ab7dfb, _inputMediaContact],
  [0x5b38c6c1, _inputMediaUploadedDocument],
  [0x33473058, _inputMediaDocument],
  [0xc13d1c11, _inputMediaVenue],
  [0xe5bbfe1a, _inputMediaPhotoExternal],
  [0xfb52dc99, _inputMediaDocumentExternal],
  [0xd33f43f3, _inputMediaGame],
  [0x8eb5a6d5, _inputMediaInvoice],
  [0x971fa843, _inputMediaGeoLive],
  [0xf94e5f1, _inputMediaPoll],
  [0xe66fbf7b, _inputMediaDice],
  [0x89fdd778, _inputMediaStory],
  [0xc21b8849, _inputMediaWebPage],
  [0x1ca48f57, _inputChatPhotoEmpty],
  [0xbdcdaec0, _inputChatUploadedPhoto],
  [0x8953ad37, _inputChatPhoto],
  [0xe4c123d6, _inputGeoPointEmpty],
  [0x48222faf, _inputGeoPoint],
  [0x1cd7bf0d, _inputPhotoEmpty],
  [0x3bb3b94a, _inputPhoto],
  [0xdfdaabe1, _inputFileLocation],
  [0xf5235d55, _inputEncryptedFileLocation],
  [0xbad07584, _inputDocumentFileLocation],
  [0xcbc7ee28, _inputSecureFileLocation],
  [0x29be5899, _inputTakeoutFileLocation],
  [0x40181ffe, _inputPhotoFileLocation],
  [0xd83466f3, _inputPhotoLegacyFileLocation],
  [0x37257e99, _inputPeerPhotoFileLocation],
  [0x9d84f3db, _inputStickerSetThumb],
  [0x598a92a, _inputGroupCallStream],
  [0x59511722, _peerUser],
  [0x36c6019a, _peerChat],
  [0xa2a5371e, _peerChannel],
  [0xaa963b05, _storageFileUnknown],
  [0x40bc6f52, _storageFilePartial],
  [0x7efe0e, _storageFileJpeg],
  [0xcae1aadf, _storageFileGif],
  [0xa4f63c0, _storageFilePng],
  [0xae1e508d, _storageFilePdf],
  [0x528a0677, _storageFileMp3],
  [0x4b09ebbc, _storageFileMov],
  [0xb3cea0e4, _storageFileMp4],
  [0x1081464c, _storageFileWebp],
  [0xd3bc4b7a, _userEmpty],
  [0xeb602f25, _user],
  [0x4f11bae1, _userProfilePhotoEmpty],
  [0x82d1f706, _userProfilePhoto],
  [0x9d05049, _userStatusEmpty],
  [0xedb93949, _userStatusOnline],
  [0x8c703f, _userStatusOffline],
  [0xe26f42f1, _userStatusRecently],
  [0x7bf09fc, _userStatusLastWeek],
  [0x77ebc742, _userStatusLastMonth],
  [0x29562865, _chatEmpty],
  [0x41cbf256, _chat],
  [0x6592a1a7, _chatForbidden],
  [0x1981ea7e, _channel],
  [0x17d493d5, _channelForbidden],
  [0xc9d31138, _chatFull],
  [0x723027bd, _channelFull],
  [0xc02d4007, _chatParticipant],
  [0xe46bcee4, _chatParticipantCreator],
  [0xa0933f5b, _chatParticipantAdmin],
  [0x8763d3e1, _chatParticipantsForbidden],
  [0x3cbc93f8, _chatParticipants],
  [0x37c1011c, _chatPhotoEmpty],
  [0x1c6e1c11, _chatPhoto],
  [0x90a6ca84, _messageEmpty],
  [0x38116ee0, _message],
  [0x2b085862, _messageService],
  [0x3ded6320, _messageMediaEmpty],
  [0x695150d7, _messageMediaPhoto],
  [0x56e0d474, _messageMediaGeo],
  [0x70322949, _messageMediaContact],
  [0x9f84f49e, _messageMediaUnsupported],
  [0x4cf4d72d, _messageMediaDocument],
  [0xddf10c3b, _messageMediaWebPage],
  [0x2ec0533f, _messageMediaVenue],
  [0xfdb19008, _messageMediaGame],
  [0xf6a548d3, _messageMediaInvoice],
  [0xb940c666, _messageMediaGeoLive],
  [0x4bd6e798, _messageMediaPoll],
  [0x3f7ee58b, _messageMediaDice],
  [0x68cb6283, _messageMediaStory],
  [0x58260664, _messageMediaGiveaway],
  [0xb6aef7b0, _messageActionEmpty],
  [0xbd47cbad, _messageActionChatCreate],
  [0xb5a1ce5a, _messageActionChatEditTitle],
  [0x7fcb13a8, _messageActionChatEditPhoto],
  [0x95e3fbef, _messageActionChatDeletePhoto],
  [0x15cefd00, _messageActionChatAddUser],
  [0xa43f30cc, _messageActionChatDeleteUser],
  [0x31224c3, _messageActionChatJoinedByLink],
  [0x95d2ac92, _messageActionChannelCreate],
  [0xe1037f92, _messageActionChatMigrateTo],
  [0xea3948e9, _messageActionChannelMigrateFrom],
  [0x94bd38ed, _messageActionPinMessage],
  [0x9fbab604, _messageActionHistoryClear],
  [0x92a72876, _messageActionGameScore],
  [0x8f31b327, _messageActionPaymentSentMe],
  [0x96163f56, _messageActionPaymentSent],
  [0x80e11a7f, _messageActionPhoneCall],
  [0x4792929b, _messageActionScreenshotTaken],
  [0xfae69f56, _messageActionCustomAction],
  [0xc516d679, _messageActionBotAllowed],
  [0x1b287353, _messageActionSecureValuesSentMe],
  [0xd95c6154, _messageActionSecureValuesSent],
  [0xf3f25f76, _messageActionContactSignUp],
  [0x98e0d697, _messageActionGeoProximityReached],
  [0x7a0d7f42, _messageActionGroupCall],
  [0x502f92f7, _messageActionInviteToGroupCall],
  [0x3c134d7b, _messageActionSetMessagesTTL],
  [0xb3a07661, _messageActionGroupCallScheduled],
  [0xaa786345, _messageActionSetChatTheme],
  [0xebbca3cb, _messageActionChatJoinedByRequest],
  [0x47dd8079, _messageActionWebViewDataSentMe],
  [0xb4c38cb5, _messageActionWebViewDataSent],
  [0xc83d6aec, _messageActionGiftPremium],
  [0xd999256, _messageActionTopicCreate],
  [0xc0944820, _messageActionTopicEdit],
  [0x57de635e, _messageActionSuggestProfilePhoto],
  [0xfe77345d, _messageActionRequestedPeer],
  [0xbc44a927, _messageActionSetChatWallPaper],
  [0xc0787d6d, _messageActionSetSameChatWallPaper],
  [0xd2cfdb0e, _messageActionGiftCode],
  [0x332ba9ed, _messageActionGiveawayLaunch],
  [0xd58a08c6, _dialog],
  [0x71bd134c, _dialogFolder],
  [0x2331b22d, _photoEmpty],
  [0xfb197a65, _photo],
  [0xe17e23c, _photoSizeEmpty],
  [0x75c78e60, _photoSize],
  [0x21e1ad6, _photoCachedSize],
  [0xe0b0bc2e, _photoStrippedSize],
  [0xfa3efb95, _photoSizeProgressive],
  [0xd8214d41, _photoPathSize],
  [0x1117dd5f, _geoPointEmpty],
  [0xb2a2f663, _geoPoint],
  [0x5e002502, _authSentCode],
  [0x2390fe44, _authSentCodeSuccess],
  [0x2ea2c0d4, _authAuthorization],
  [0x44747e9a, _authAuthorizationSignUpRequired],
  [0xb434e2b8, _authExportedAuthorization],
  [0xb8bc5b0c, _inputNotifyPeer],
  [0x193b4417, _inputNotifyUsers],
  [0x4a95e84e, _inputNotifyChats],
  [0xb1db7c7e, _inputNotifyBroadcasts],
  [0x5c467992, _inputNotifyForumTopic],
  [0xcacb6ae2, _inputPeerNotifySettings],
  [0x99622c0c, _peerNotifySettings],
  [0xa518110d, _peerSettings],
  [0xa437c3ed, _wallPaper],
  [0xe0804116, _wallPaperNoFile],
  [0x58dbcab8, _inputReportReasonSpam],
  [0x1e22c78d, _inputReportReasonViolence],
  [0x2e59d922, _inputReportReasonPornography],
  [0xadf44ee3, _inputReportReasonChildAbuse],
  [0xc1e4a2b1, _inputReportReasonOther],
  [0x9b89f93a, _inputReportReasonCopyright],
  [0xdbd4feed, _inputReportReasonGeoIrrelevant],
  [0xf5ddd6e7, _inputReportReasonFake],
  [0xa8eb2be, _inputReportReasonIllegalDrugs],
  [0x9ec7863d, _inputReportReasonPersonalDetails],
  [0xb9b12c6c, _userFull],
  [0x145ade0b, _contact],
  [0xc13e3c50, _importedContact],
  [0x16d9703b, _contactStatus],
  [0xb74ba9d2, _contactsContactsNotModified],
  [0xeae87e42, _contactsContacts],
  [0x77d01c3b, _contactsImportedContacts],
  [0xade1591, _contactsBlocked],
  [0xe1664194, _contactsBlockedSlice],
  [0x15ba6c40, _messagesDialogs],
  [0x71e094f3, _messagesDialogsSlice],
  [0xf0e3e596, _messagesDialogsNotModified],
  [0x8c718e87, _messagesMessages],
  [0x3a54685e, _messagesMessagesSlice],
  [0xc776ba4e, _messagesChannelMessages],
  [0x74535f21, _messagesMessagesNotModified],
  [0x64ff9fd5, _messagesChats],
  [0x9cd81144, _messagesChatsSlice],
  [0xe5d7d19c, _messagesChatFull],
  [0xb45c69d1, _messagesAffectedHistory],
  [0x57e2f66c, _inputMessagesFilterEmpty],
  [0x9609a51c, _inputMessagesFilterPhotos],
  [0x9fc00e65, _inputMessagesFilterVideo],
  [0x56e9f0e4, _inputMessagesFilterPhotoVideo],
  [0x9eddf188, _inputMessagesFilterDocument],
  [0x7ef0dd87, _inputMessagesFilterUrl],
  [0xffc86587, _inputMessagesFilterGif],
  [0x50f5c392, _inputMessagesFilterVoice],
  [0x3751b49e, _inputMessagesFilterMusic],
  [0x3a20ecb8, _inputMessagesFilterChatPhotos],
  [0x80c99768, _inputMessagesFilterPhoneCalls],
  [0x7a7c17a4, _inputMessagesFilterRoundVoice],
  [0xb549da53, _inputMessagesFilterRoundVideo],
  [0xc1f8e69a, _inputMessagesFilterMyMentions],
  [0xe7026d0d, _inputMessagesFilterGeo],
  [0xe062db83, _inputMessagesFilterContacts],
  [0x1bb00451, _inputMessagesFilterPinned],
  [0x1f2b0afd, _updateNewMessage],
  [0x4e90bfd6, _updateMessageID],
  [0xa20db0e5, _updateDeleteMessages],
  [0xc01e857f, _updateUserTyping],
  [0x83487af0, _updateChatUserTyping],
  [0x7761198, _updateChatParticipants],
  [0xe5bdf8de, _updateUserStatus],
  [0xa7848924, _updateUserName],
  [0x8951abef, _updateNewAuthorization],
  [0x12bcbd9a, _updateNewEncryptedMessage],
  [0x1710f156, _updateEncryptedChatTyping],
  [0xb4a2e88d, _updateEncryption],
  [0x38fe25b7, _updateEncryptedMessagesRead],
  [0x3dda5451, _updateChatParticipantAdd],
  [0xe32f3d77, _updateChatParticipantDelete],
  [0x8e5e9873, _updateDcOptions],
  [0xbec268ef, _updateNotifySettings],
  [0xebe46819, _updateServiceNotification],
  [0xee3b272a, _updatePrivacy],
  [0x5492a13, _updateUserPhone],
  [0x9c974fdf, _updateReadHistoryInbox],
  [0x2f2f21bf, _updateReadHistoryOutbox],
  [0x7f891213, _updateWebPage],
  [0xf8227181, _updateReadMessagesContents],
  [0x108d941f, _updateChannelTooLong],
  [0x635b4c09, _updateChannel],
  [0x62ba04d9, _updateNewChannelMessage],
  [0x922e6e10, _updateReadChannelInbox],
  [0xc32d5b12, _updateDeleteChannelMessages],
  [0xf226ac08, _updateChannelMessageViews],
  [0xd7ca61a2, _updateChatParticipantAdmin],
  [0x688a30aa, _updateNewStickerSet],
  [0xbb2d201, _updateStickerSetsOrder],
  [0x31c24808, _updateStickerSets],
  [0x9375341e, _updateSavedGifs],
  [0x496f379c, _updateBotInlineQuery],
  [0x12f12a07, _updateBotInlineSend],
  [0x1b3f4df7, _updateEditChannelMessage],
  [0xb9cfc48d, _updateBotCallbackQuery],
  [0xe40370a3, _updateEditMessage],
  [0x691e9052, _updateInlineBotCallbackQuery],
  [0xb75f99a9, _updateReadChannelOutbox],
  [0x1b49ec6d, _updateDraftMessage],
  [0x571d2742, _updateReadFeaturedStickers],
  [0x9a422c20, _updateRecentStickers],
  [0xa229dd06, _updateConfig],
  [0x3354678f, _updatePtsChanged],
  [0x2f2ba99f, _updateChannelWebPage],
  [0x6e6fe51c, _updateDialogPinned],
  [0xfa0f3ca2, _updatePinnedDialogs],
  [0x8317c0c3, _updateBotWebhookJSON],
  [0x9b9240a6, _updateBotWebhookJSONQuery],
  [0xb5aefd7d, _updateBotShippingQuery],
  [0x8caa9a96, _updateBotPrecheckoutQuery],
  [0xab0f6b1e, _updatePhoneCall],
  [0x46560264, _updateLangPackTooLong],
  [0x56022f4d, _updateLangPack],
  [0xe511996d, _updateFavedStickers],
  [0xea29055d, _updateChannelReadMessagesContents],
  [0x7084a7be, _updateContactsReset],
  [0xb23fc698, _updateChannelAvailableMessages],
  [0xe16459c3, _updateDialogUnreadMark],
  [0xaca1657b, _updateMessagePoll],
  [0x54c01850, _updateChatDefaultBannedRights],
  [0x19360dc0, _updateFolderPeers],
  [0x6a7e7366, _updatePeerSettings],
  [0xb4afcfb0, _updatePeerLocated],
  [0x39a51dfb, _updateNewScheduledMessage],
  [0x90866cee, _updateDeleteScheduledMessages],
  [0x8216fba3, _updateTheme],
  [0x871fb939, _updateGeoLiveViewed],
  [0x564fe691, _updateLoginToken],
  [0x24f40e77, _updateMessagePollVote],
  [0x26ffde7d, _updateDialogFilter],
  [0xa5d72105, _updateDialogFilterOrder],
  [0x3504914f, _updateDialogFilters],
  [0x2661bf09, _updatePhoneCallSignalingData],
  [0xd29a27f4, _updateChannelMessageForwards],
  [0xd6b19546, _updateReadChannelDiscussionInbox],
  [0x695c9e7c, _updateReadChannelDiscussionOutbox],
  [0xebe07752, _updatePeerBlocked],
  [0x8c88c923, _updateChannelUserTyping],
  [0xed85eab5, _updatePinnedMessages],
  [0x5bb98608, _updatePinnedChannelMessages],
  [0xf89a6a4e, _updateChat],
  [0xf2ebdb4e, _updateGroupCallParticipants],
  [0x14b24500, _updateGroupCall],
  [0xbb9bb9a5, _updatePeerHistoryTTL],
  [0xd087663a, _updateChatParticipant],
  [0x985d3abb, _updateChannelParticipant],
  [0xc4870a49, _updateBotStopped],
  [0xb783982, _updateGroupCallConnection],
  [0x4d712f2e, _updateBotCommands],
  [0x7063c3db, _updatePendingJoinRequests],
  [0x11dfa986, _updateBotChatInviteRequester],
  [0x5e1b3cb8, _updateMessageReactions],
  [0x17b7a20b, _updateAttachMenuBots],
  [0x1592b79d, _updateWebViewResultSent],
  [0x14b85813, _updateBotMenuButton],
  [0x74d8be99, _updateSavedRingtones],
  [0x84cd5a, _updateTranscribedAudio],
  [0xfb4c496c, _updateReadFeaturedEmojiStickers],
  [0x28373599, _updateUserEmojiStatus],
  [0x30f443db, _updateRecentEmojiStatuses],
  [0x6f7863f4, _updateRecentReactions],
  [0x86fccf85, _updateMoveStickerSetToTop],
  [0x5a73a98c, _updateMessageExtendedMedia],
  [0x192efbe3, _updateChannelPinnedTopic],
  [0xfe198602, _updateChannelPinnedTopics],
  [0x20529438, _updateUser],
  [0xec05b097, _updateAutoSaveSettings],
  [0xccf08ad6, _updateGroupInvitePrivacyForbidden],
  [0x75b3b798, _updateStory],
  [0xf74e932b, _updateReadStories],
  [0x1bf335b9, _updateStoryID],
  [0x2c084dc1, _updateStoriesStealthMode],
  [0x7d627683, _updateSentStoryReaction],
  [0xa56c2a3e, _updatesState],
  [0x5d75a138, _updatesDifferenceEmpty],
  [0xf49ca0, _updatesDifference],
  [0xa8fb1981, _updatesDifferenceSlice],
  [0x4afe8f6d, _updatesDifferenceTooLong],
  [0xe317af7e, _updatesTooLong],
  [0x313bc7f8, _updateShortMessage],
  [0x4d6deea5, _updateShortChatMessage],
  [0x78d4dec1, _updateShort],
  [0x725b04c3, _updatesCombined],
  [0x74ae4240, _updates],
  [0x9015e101, _updateShortSentMessage],
  [0x8dca6aa5, _photosPhotos],
  [0x15051f54, _photosPhotosSlice],
  [0x20212ca8, _photosPhoto],
  [0x96a18d5, _uploadFile],
  [0xf18cda44, _uploadFileCdnRedirect],
  [0x18b7a10d, _dcOption],
  [0xcc1a241e, _config],
  [0x8e1a1775, _nearestDc],
  [0xccbbce30, _helpAppUpdate],
  [0xc45a6536, _helpNoAppUpdate],
  [0x18cb9f78, _helpInviteText],
  [0xab7ec0a0, _encryptedChatEmpty],
  [0x66b25953, _encryptedChatWaiting],
  [0x48f1d94c, _encryptedChatRequested],
  [0x61f0d4c7, _encryptedChat],
  [0x1e1c7c45, _encryptedChatDiscarded],
  [0xf141b5e1, _inputEncryptedChat],
  [0xc21f497e, _encryptedFileEmpty],
  [0xa8008cd8, _encryptedFile],
  [0x1837c364, _inputEncryptedFileEmpty],
  [0x64bd0306, _inputEncryptedFileUploaded],
  [0x5a17b5e5, _inputEncryptedFile],
  [0x2dc173c8, _inputEncryptedFileBigUploaded],
  [0xed18c118, _encryptedMessage],
  [0x23734b06, _encryptedMessageService],
  [0xc0e24635, _messagesDhConfigNotModified],
  [0x2c221edd, _messagesDhConfig],
  [0x560f8935, _messagesSentEncryptedMessage],
  [0x9493ff32, _messagesSentEncryptedFile],
  [0x72f0eaae, _inputDocumentEmpty],
  [0x1abfb575, _inputDocument],
  [0x36f8c871, _documentEmpty],
  [0x8fd4c4d8, _document],
  [0x17c6b5f6, _helpSupport],
  [0x9fd40bd8, _notifyPeer],
  [0xb4c83b4c, _notifyUsers],
  [0xc007cec3, _notifyChats],
  [0xd612e8ef, _notifyBroadcasts],
  [0x226e6308, _notifyForumTopic],
  [0x16bf744e, _sendMessageTypingAction],
  [0xfd5ec8f5, _sendMessageCancelAction],
  [0xa187d66f, _sendMessageRecordVideoAction],
  [0xe9763aec, _sendMessageUploadVideoAction],
  [0xd52f73f7, _sendMessageRecordAudioAction],
  [0xf351d7ab, _sendMessageUploadAudioAction],
  [0xd1d34a26, _sendMessageUploadPhotoAction],
  [0xaa0cd9e4, _sendMessageUploadDocumentAction],
  [0x176f8ba1, _sendMessageGeoLocationAction],
  [0x628cbc6f, _sendMessageChooseContactAction],
  [0xdd6a8f48, _sendMessageGamePlayAction],
  [0x88f27fbc, _sendMessageRecordRoundAction],
  [0x243e1c66, _sendMessageUploadRoundAction],
  [0xd92c2285, _speakingInGroupCallAction],
  [0xdbda9246, _sendMessageHistoryImportAction],
  [0xb05ac6b1, _sendMessageChooseStickerAction],
  [0x25972bcb, _sendMessageEmojiInteraction],
  [0xb665902e, _sendMessageEmojiInteractionSeen],
  [0xb3134d9d, _contactsFound],
  [0x4f96cb18, _inputPrivacyKeyStatusTimestamp],
  [0xbdfb0426, _inputPrivacyKeyChatInvite],
  [0xfabadc5f, _inputPrivacyKeyPhoneCall],
  [0xdb9e70d2, _inputPrivacyKeyPhoneP2P],
  [0xa4dd4c08, _inputPrivacyKeyForwards],
  [0x5719bacc, _inputPrivacyKeyProfilePhoto],
  [0x352dafa, _inputPrivacyKeyPhoneNumber],
  [0xd1219bdd, _inputPrivacyKeyAddedByPhone],
  [0xaee69d68, _inputPrivacyKeyVoiceMessages],
  [0x3823cc40, _inputPrivacyKeyAbout],
  [0xbc2eab30, _privacyKeyStatusTimestamp],
  [0x500e6dfa, _privacyKeyChatInvite],
  [0x3d662b7b, _privacyKeyPhoneCall],
  [0x39491cc8, _privacyKeyPhoneP2P],
  [0x69ec56a3, _privacyKeyForwards],
  [0x96151fed, _privacyKeyProfilePhoto],
  [0xd19ae46d, _privacyKeyPhoneNumber],
  [0x42ffd42b, _privacyKeyAddedByPhone],
  [0x697f414, _privacyKeyVoiceMessages],
  [0xa486b761, _privacyKeyAbout],
  [0xd09e07b, _inputPrivacyValueAllowContacts],
  [0x184b35ce, _inputPrivacyValueAllowAll],
  [0x131cc67f, _inputPrivacyValueAllowUsers],
  [0xba52007, _inputPrivacyValueDisallowContacts],
  [0xd66b66c9, _inputPrivacyValueDisallowAll],
  [0x90110467, _inputPrivacyValueDisallowUsers],
  [0x840649cf, _inputPrivacyValueAllowChatParticipants],
  [0xe94f0f86, _inputPrivacyValueDisallowChatParticipants],
  [0x2f453e49, _inputPrivacyValueAllowCloseFriends],
  [0xfffe1bac, _privacyValueAllowContacts],
  [0x65427b82, _privacyValueAllowAll],
  [0xb8905fb2, _privacyValueAllowUsers],
  [0xf888fa1a, _privacyValueDisallowContacts],
  [0x8b73e763, _privacyValueDisallowAll],
  [0xe4621141, _privacyValueDisallowUsers],
  [0x6b134e8e, _privacyValueAllowChatParticipants],
  [0x41c87565, _privacyValueDisallowChatParticipants],
  [0xf7e8d89b, _privacyValueAllowCloseFriends],
  [0x50a04e45, _accountPrivacyRules],
  [0xb8d0afdf, _accountDaysTTL],
  [0x6c37c15c, _documentAttributeImageSize],
  [0x11b58939, _documentAttributeAnimated],
  [0x6319d612, _documentAttributeSticker],
  [0xd38ff1c2, _documentAttributeVideo],
  [0x9852f9c6, _documentAttributeAudio],
  [0x15590068, _documentAttributeFilename],
  [0x9801d2f7, _documentAttributeHasStickers],
  [0xfd149899, _documentAttributeCustomEmoji],
  [0xf1749a22, _messagesStickersNotModified],
  [0x30a6ec7e, _messagesStickers],
  [0x12b299d4, _stickerPack],
  [0xe86602c3, _messagesAllStickersNotModified],
  [0xcdbbcebb, _messagesAllStickers],
  [0x84d19185, _messagesAffectedMessages],
  [0x211a1788, _webPageEmpty],
  [0xb0d13e47, _webPagePending],
  [0xe89c45b2, _webPage],
  [0x7311ca11, _webPageNotModified],
  [0xad01d61d, _authorization],
  [0x4bff8ea0, _accountAuthorizations],
  [0x957b50fb, _accountPassword],
  [0x9a5c33e5, _accountPasswordSettings],
  [0xc23727c9, _accountPasswordInputSettings],
  [0x137948a5, _authPasswordRecovery],
  [0xa384b779, _receivedNotifyMessage],
  [0xab4a819, _chatInviteExported],
  [0xed107ab7, _chatInvitePublicJoinRequests],
  [0x5a686d7c, _chatInviteAlready],
  [0xcde0ec40, _chatInvite],
  [0x61695cb0, _chatInvitePeek],
  [0xffb62b95, _inputStickerSetEmpty],
  [0x9de7a269, _inputStickerSetID],
  [0x861cc8a0, _inputStickerSetShortName],
  [0x28703c8, _inputStickerSetAnimatedEmoji],
  [0xe67f520e, _inputStickerSetDice],
  [0xcde3739, _inputStickerSetAnimatedEmojiAnimations],
  [0xc88b3b02, _inputStickerSetPremiumGifts],
  [0x4c4d4ce, _inputStickerSetEmojiGenericAnimations],
  [0x29d0f5ee, _inputStickerSetEmojiDefaultStatuses],
  [0x44c1f8e9, _inputStickerSetEmojiDefaultTopicIcons],
  [0x2dd14edc, _stickerSet],
  [0x6e153f16, _messagesStickerSet],
  [0xd3f924eb, _messagesStickerSetNotModified],
  [0xc27ac8c7, _botCommand],
  [0x8f300b57, _botInfo],
  [0xa2fa4880, _keyboardButton],
  [0x258aff05, _keyboardButtonUrl],
  [0x35bbdb6b, _keyboardButtonCallback],
  [0xb16a6c29, _keyboardButtonRequestPhone],
  [0xfc796b3f, _keyboardButtonRequestGeoLocation],
  [0x93b9fbb5, _keyboardButtonSwitchInline],
  [0x50f41ccf, _keyboardButtonGame],
  [0xafd93fbb, _keyboardButtonBuy],
  [0x10b78d29, _keyboardButtonUrlAuth],
  [0xd02e7fd4, _inputKeyboardButtonUrlAuth],
  [0xbbc7515d, _keyboardButtonRequestPoll],
  [0xe988037b, _inputKeyboardButtonUserProfile],
  [0x308660c1, _keyboardButtonUserProfile],
  [0x13767230, _keyboardButtonWebView],
  [0xa0c0505c, _keyboardButtonSimpleWebView],
  [0xd0b468c, _keyboardButtonRequestPeer],
  [0x77608b83, _keyboardButtonRow],
  [0xa03e5b85, _replyKeyboardHide],
  [0x86b40b08, _replyKeyboardForceReply],
  [0x85dd99d1, _replyKeyboardMarkup],
  [0x48a30254, _replyInlineMarkup],
  [0xbb92ba95, _messageEntityUnknown],
  [0xfa04579d, _messageEntityMention],
  [0x6f635b0d, _messageEntityHashtag],
  [0x6cef8ac7, _messageEntityBotCommand],
  [0x6ed02538, _messageEntityUrl],
  [0x64e475c2, _messageEntityEmail],
  [0xbd610bc9, _messageEntityBold],
  [0x826f8b60, _messageEntityItalic],
  [0x28a20571, _messageEntityCode],
  [0x73924be0, _messageEntityPre],
  [0x76a6d327, _messageEntityTextUrl],
  [0xdc7b1140, _messageEntityMentionName],
  [0x208e68c9, _inputMessageEntityMentionName],
  [0x9b69e34b, _messageEntityPhone],
  [0x4c4e743f, _messageEntityCashtag],
  [0x9c4e7e8b, _messageEntityUnderline],
  [0xbf0693d4, _messageEntityStrike],
  [0x761e6af4, _messageEntityBankCard],
  [0x32ca960f, _messageEntitySpoiler],
  [0xc8cf05f8, _messageEntityCustomEmoji],
  [0x20df5d0, _messageEntityBlockquote],
  [0xee8c1e86, _inputChannelEmpty],
  [0xf35aec28, _inputChannel],
  [0x5b934f9d, _inputChannelFromMessage],
  [0x7f077ad9, _contactsResolvedPeer],
  [0xae30253, _messageRange],
  [0x3e11affb, _updatesChannelDifferenceEmpty],
  [0xa4bcc6fe, _updatesChannelDifferenceTooLong],
  [0x2064674e, _updatesChannelDifference],
  [0x94d42ee7, _channelMessagesFilterEmpty],
  [0xcd77d957, _channelMessagesFilter],
  [0xc00c07c0, _channelParticipant],
  [0x35a8bfa7, _channelParticipantSelf],
  [0x2fe601d3, _channelParticipantCreator],
  [0x34c3bb53, _channelParticipantAdmin],
  [0x6df8014e, _channelParticipantBanned],
  [0x1b03f006, _channelParticipantLeft],
  [0xde3f3c79, _channelParticipantsRecent],
  [0xb4608969, _channelParticipantsAdmins],
  [0xa3b54985, _channelParticipantsKicked],
  [0xb0d1865b, _channelParticipantsBots],
  [0x1427a5e1, _channelParticipantsBanned],
  [0x656ac4b, _channelParticipantsSearch],
  [0xbb6ae88d, _channelParticipantsContacts],
  [0xe04b5ceb, _channelParticipantsMentions],
  [0x9ab0feaf, _channelsChannelParticipants],
  [0xf0173fe9, _channelsChannelParticipantsNotModified],
  [0xdfb80317, _channelsChannelParticipant],
  [0x780a0310, _helpTermsOfService],
  [0xe8025ca2, _messagesSavedGifsNotModified],
  [0x84a02a0d, _messagesSavedGifs],
  [0x3380c786, _inputBotInlineMessageMediaAuto],
  [0x3dcd7a87, _inputBotInlineMessageText],
  [0x96929a85, _inputBotInlineMessageMediaGeo],
  [0x417bbf11, _inputBotInlineMessageMediaVenue],
  [0xa6edbffd, _inputBotInlineMessageMediaContact],
  [0x4b425864, _inputBotInlineMessageGame],
  [0xd7e78225, _inputBotInlineMessageMediaInvoice],
  [0xbddcc510, _inputBotInlineMessageMediaWebPage],
  [0x88bf9319, _inputBotInlineResult],
  [0xa8d864a7, _inputBotInlineResultPhoto],
  [0xfff8fdc4, _inputBotInlineResultDocument],
  [0x4fa417f2, _inputBotInlineResultGame],
  [0x764cf810, _botInlineMessageMediaAuto],
  [0x8c7f65e2, _botInlineMessageText],
  [0x51846fd, _botInlineMessageMediaGeo],
  [0x8a86659c, _botInlineMessageMediaVenue],
  [0x18d1cdc2, _botInlineMessageMediaContact],
  [0x354a9b09, _botInlineMessageMediaInvoice],
  [0x809ad9a6, _botInlineMessageMediaWebPage],
  [0x11965f3a, _botInlineResult],
  [0x17db940b, _botInlineMediaResult],
  [0xe021f2f6, _messagesBotResults],
  [0x5dab1af4, _exportedMessageLink],
  [0x5f777dce, _messageFwdHeader],
  [0x72a3158c, _authCodeTypeSms],
  [0x741cd3e3, _authCodeTypeCall],
  [0x226ccefb, _authCodeTypeFlashCall],
  [0xd61ad6ee, _authCodeTypeMissedCall],
  [0x6ed998c, _authCodeTypeFragmentSms],
  [0x3dbb5986, _authSentCodeTypeApp],
  [0xc000bba2, _authSentCodeTypeSms],
  [0x5353e5a7, _authSentCodeTypeCall],
  [0xab03c6d9, _authSentCodeTypeFlashCall],
  [0x82006484, _authSentCodeTypeMissedCall],
  [0xf450f59b, _authSentCodeTypeEmailCode],
  [0xa5491dea, _authSentCodeTypeSetUpEmailRequired],
  [0xd9565c39, _authSentCodeTypeFragmentSms],
  [0xe57b1432, _authSentCodeTypeFirebaseSms],
  [0x36585ea4, _messagesBotCallbackAnswer],
  [0x26b5dde6, _messagesMessageEditData],
  [0x890c3d89, _inputBotInlineMessageID],
  [0xb6d915d7, _inputBotInlineMessageID64],
  [0x3c20629f, _inlineBotSwitchPM],
  [0x3371c354, _messagesPeerDialogs],
  [0xedcdc05b, _topPeer],
  [0xab661b5b, _topPeerCategoryBotsPM],
  [0x148677e2, _topPeerCategoryBotsInline],
  [0x637b7ed, _topPeerCategoryCorrespondents],
  [0xbd17a14a, _topPeerCategoryGroups],
  [0x161d9628, _topPeerCategoryChannels],
  [0x1e76a78c, _topPeerCategoryPhoneCalls],
  [0xa8406ca9, _topPeerCategoryForwardUsers],
  [0xfbeec0f0, _topPeerCategoryForwardChats],
  [0xfb834291, _topPeerCategoryPeers],
  [0xde266ef5, _contactsTopPeersNotModified],
  [0x70b772a8, _contactsTopPeers],
  [0xb52c939d, _contactsTopPeersDisabled],
  [0x1b0c841a, _draftMessageEmpty],
  [0x3fccf7ef, _draftMessage],
  [0xc6dc0c66, _messagesFeaturedStickersNotModified],
  [0xbe382906, _messagesFeaturedStickers],
  [0xb17f890, _messagesRecentStickersNotModified],
  [0x88d37c56, _messagesRecentStickers],
  [0x4fcba9c8, _messagesArchivedStickers],
  [0x38641628, _messagesStickerSetInstallResultSuccess],
  [0x35e410a8, _messagesStickerSetInstallResultArchive],
  [0x6410a5d2, _stickerSetCovered],
  [0x3407e51b, _stickerSetMultiCovered],
  [0x40d13c0e, _stickerSetFullCovered],
  [0x77b15d1c, _stickerSetNoCovered],
  [0xaed6dbb2, _maskCoords],
  [0x4a992157, _inputStickeredMediaPhoto],
  [0x438865b, _inputStickeredMediaDocument],
  [0xbdf9653b, _game],
  [0x32c3e77, _inputGameID],
  [0xc331e80a, _inputGameShortName],
  [0x73a379eb, _highScore],
  [0x9a3bfd99, _messagesHighScores],
  [0xdc3d824f, _textEmpty],
  [0x744694e0, _textPlain],
  [0x6724abc4, _textBold],
  [0xd912a59c, _textItalic],
  [0xc12622c4, _textUnderline],
  [0x9bf8bb95, _textStrike],
  [0x6c3f19b9, _textFixed],
  [0x3c2884c1, _textUrl],
  [0xde5a0dd6, _textEmail],
  [0x7e6260d7, _textConcat],
  [0xed6a8504, _textSubscript],
  [0xc7fb5e01, _textSuperscript],
  [0x34b8621, _textMarked],
  [0x1ccb966a, _textPhone],
  [0x81ccf4f, _textImage],
  [0x35553762, _textAnchor],
  [0x13567e8a, _pageBlockUnsupported],
  [0x70abc3fd, _pageBlockTitle],
  [0x8ffa9a1f, _pageBlockSubtitle],
  [0xbaafe5e0, _pageBlockAuthorDate],
  [0xbfd064ec, _pageBlockHeader],
  [0xf12bb6e1, _pageBlockSubheader],
  [0x467a0766, _pageBlockParagraph],
  [0xc070d93e, _pageBlockPreformatted],
  [0x48870999, _pageBlockFooter],
  [0xdb20b188, _pageBlockDivider],
  [0xce0d37b0, _pageBlockAnchor],
  [0xe4e88011, _pageBlockList],
  [0x263d7c26, _pageBlockBlockquote],
  [0x4f4456d3, _pageBlockPullquote],
  [0x1759c560, _pageBlockPhoto],
  [0x7c8fe7b6, _pageBlockVideo],
  [0x39f23300, _pageBlockCover],
  [0xa8718dc5, _pageBlockEmbed],
  [0xf259a80b, _pageBlockEmbedPost],
  [0x65a0fa4d, _pageBlockCollage],
  [0x31f9590, _pageBlockSlideshow],
  [0xef1751b5, _pageBlockChannel],
  [0x804361ea, _pageBlockAudio],
  [0x1e148390, _pageBlockKicker],
  [0xbf4dea82, _pageBlockTable],
  [0x9a8ae1e1, _pageBlockOrderedList],
  [0x76768bed, _pageBlockDetails],
  [0x16115a96, _pageBlockRelatedArticles],
  [0xa44f3ef6, _pageBlockMap],
  [0x85e42301, _phoneCallDiscardReasonMissed],
  [0xe095c1a0, _phoneCallDiscardReasonDisconnect],
  [0x57adc690, _phoneCallDiscardReasonHangup],
  [0xfaf7e8c9, _phoneCallDiscardReasonBusy],
  [0x7d748d04, _dataJSON],
  [0xcb296bf8, _labeledPrice],
  [0x5db95a15, _invoice],
  [0xea02c27e, _paymentCharge],
  [0x1e8caaeb, _postAddress],
  [0x909c3f94, _paymentRequestedInfo],
  [0xcdc27a1f, _paymentSavedCredentialsCard],
  [0x1c570ed1, _webDocument],
  [0xf9c8bcc6, _webDocumentNoProxy],
  [0x9bed434d, _inputWebDocument],
  [0xc239d686, _inputWebFileLocation],
  [0x9f2221c9, _inputWebFileGeoPointLocation],
  [0xf46fe924, _inputWebFileAudioAlbumThumbLocation],
  [0x21e753bc, _uploadWebFile],
  [0xa0058751, _paymentsPaymentForm],
  [0xd1451883, _paymentsValidatedRequestedInfo],
  [0x4e5f810d, _paymentsPaymentResult],
  [0xd8411139, _paymentsPaymentVerificationNeeded],
  [0x70c4fe03, _paymentsPaymentReceipt],
  [0xfb8fe43c, _paymentsSavedInfo],
  [0xc10eb2cf, _inputPaymentCredentialsSaved],
  [0x3417d728, _inputPaymentCredentials],
  [0xaa1c39f, _inputPaymentCredentialsApplePay],
  [0x8ac32801, _inputPaymentCredentialsGooglePay],
  [0xdb64fd34, _accountTmpPassword],
  [0xb6213cdf, _shippingOption],
  [0x32da9e9c, _inputStickerSetItem],
  [0x1e36fded, _inputPhoneCall],
  [0x5366c915, _phoneCallEmpty],
  [0xc5226f17, _phoneCallWaiting],
  [0x14b0ed0c, _phoneCallRequested],
  [0x3660c311, _phoneCallAccepted],
  [0x967f7c67, _phoneCall],
  [0x50ca4de1, _phoneCallDiscarded],
  [0x9cc123c7, _phoneConnection],
  [0x635fe375, _phoneConnectionWebrtc],
  [0xfc878fc8, _phoneCallProtocol],
  [0xec82e140, _phonePhoneCall],
  [0xeea8e46e, _uploadCdnFileReuploadNeeded],
  [0xa99fca4f, _uploadCdnFile],
  [0xc982eaba, _cdnPublicKey],
  [0x5725e40a, _cdnConfig],
  [0xcad181f6, _langPackString],
  [0x6c47ac9f, _langPackStringPluralized],
  [0x2979eeb2, _langPackStringDeleted],
  [0xf385c1f6, _langPackDifference],
  [0xeeca5ce3, _langPackLanguage],
  [0xe6dfb825, _channelAdminLogEventActionChangeTitle],
  [0x55188a2e, _channelAdminLogEventActionChangeAbout],
  [0x6a4afc38, _channelAdminLogEventActionChangeUsername],
  [0x434bd2af, _channelAdminLogEventActionChangePhoto],
  [0x1b7907ae, _channelAdminLogEventActionToggleInvites],
  [0x26ae0971, _channelAdminLogEventActionToggleSignatures],
  [0xe9e82c18, _channelAdminLogEventActionUpdatePinned],
  [0x709b2405, _channelAdminLogEventActionEditMessage],
  [0x42e047bb, _channelAdminLogEventActionDeleteMessage],
  [0x183040d3, _channelAdminLogEventActionParticipantJoin],
  [0xf89777f2, _channelAdminLogEventActionParticipantLeave],
  [0xe31c34d8, _channelAdminLogEventActionParticipantInvite],
  [0xe6d83d7e, _channelAdminLogEventActionParticipantToggleBan],
  [0xd5676710, _channelAdminLogEventActionParticipantToggleAdmin],
  [0xb1c3caa7, _channelAdminLogEventActionChangeStickerSet],
  [0x5f5c95f1, _channelAdminLogEventActionTogglePreHistoryHidden],
  [0x2df5fc0a, _channelAdminLogEventActionDefaultBannedRights],
  [0x8f079643, _channelAdminLogEventActionStopPoll],
  [0x50c7ac8, _channelAdminLogEventActionChangeLinkedChat],
  [0xe6b76ae, _channelAdminLogEventActionChangeLocation],
  [0x53909779, _channelAdminLogEventActionToggleSlowMode],
  [0x23209745, _channelAdminLogEventActionStartGroupCall],
  [0xdb9f9140, _channelAdminLogEventActionDiscardGroupCall],
  [0xf92424d2, _channelAdminLogEventActionParticipantMute],
  [0xe64429c0, _channelAdminLogEventActionParticipantUnmute],
  [0x56d6a247, _channelAdminLogEventActionToggleGroupCallSetting],
  [0xfe9fc158, _channelAdminLogEventActionParticipantJoinByInvite],
  [0x5a50fca4, _channelAdminLogEventActionExportedInviteDelete],
  [0x410a134e, _channelAdminLogEventActionExportedInviteRevoke],
  [0xe90ebb59, _channelAdminLogEventActionExportedInviteEdit],
  [0x3e7f6847, _channelAdminLogEventActionParticipantVolume],
  [0x6e941a38, _channelAdminLogEventActionChangeHistoryTTL],
  [0xafb6144a, _channelAdminLogEventActionParticipantJoinByRequest],
  [0xcb2ac766, _channelAdminLogEventActionToggleNoForwards],
  [0x278f2868, _channelAdminLogEventActionSendMessage],
  [0xbe4e0ef8, _channelAdminLogEventActionChangeAvailableReactions],
  [0xf04fb3a9, _channelAdminLogEventActionChangeUsernames],
  [0x2cc6383, _channelAdminLogEventActionToggleForum],
  [0x58707d28, _channelAdminLogEventActionCreateTopic],
  [0xf06fe208, _channelAdminLogEventActionEditTopic],
  [0xae168909, _channelAdminLogEventActionDeleteTopic],
  [0x5d8d353b, _channelAdminLogEventActionPinTopic],
  [0x64f36dfc, _channelAdminLogEventActionToggleAntiSpam],
  [0x3c2b247b, _channelAdminLogEventActionChangeColor],
  [0x445fc434, _channelAdminLogEventActionChangeBackgroundEmoji],
  [0x1fad68cd, _channelAdminLogEvent],
  [0xed8af74d, _channelsAdminLogResults],
  [0xea107ae4, _channelAdminLogEventsFilter],
  [0x5ce14175, _popularContact],
  [0x9e8fa6d3, _messagesFavedStickersNotModified],
  [0x2cb51097, _messagesFavedStickers],
  [0x46e1d13d, _recentMeUrlUnknown],
  [0xb92c09e2, _recentMeUrlUser],
  [0xb2da71d2, _recentMeUrlChat],
  [0xeb49081d, _recentMeUrlChatInvite],
  [0xbc0a57dc, _recentMeUrlStickerSet],
  [0xe0310d7, _helpRecentMeUrls],
  [0x1cc6e91f, _inputSingleMedia],
  [0xa6f8f452, _webAuthorization],
  [0xed56c9fc, _accountWebAuthorizations],
  [0xa676a322, _inputMessageID],
  [0xbad88395, _inputMessageReplyTo],
  [0x86872538, _inputMessagePinned],
  [0xacfa1a7e, _inputMessageCallbackQuery],
  [0xfcaafeb7, _inputDialogPeer],
  [0x64600527, _inputDialogPeerFolder],
  [0xe56dbf05, _dialogPeer],
  [0x514519e2, _dialogPeerFolder],
  [0xd54b65d, _messagesFoundStickerSetsNotModified],
  [0x8af09dd2, _messagesFoundStickerSets],
  [0xf39b035c, _fileHash],
  [0x75588b3f, _inputClientProxy],
  [0xe3309f7f, _helpTermsOfServiceUpdateEmpty],
  [0x28ecf961, _helpTermsOfServiceUpdate],
  [0x3334b0f0, _inputSecureFileUploaded],
  [0x5367e5be, _inputSecureFile],
  [0x64199744, _secureFileEmpty],
  [0x7d09c27e, _secureFile],
  [0x8aeabec3, _secureData],
  [0x7d6099dd, _securePlainPhone],
  [0x21ec5a5f, _securePlainEmail],
  [0x9d2a81e3, _secureValueTypePersonalDetails],
  [0x3dac6a00, _secureValueTypePassport],
  [0x6e425c4, _secureValueTypeDriverLicense],
  [0xa0d0744b, _secureValueTypeIdentityCard],
  [0x99a48f23, _secureValueTypeInternalPassport],
  [0xcbe31e26, _secureValueTypeAddress],
  [0xfc36954e, _secureValueTypeUtilityBill],
  [0x89137c0d, _secureValueTypeBankStatement],
  [0x8b883488, _secureValueTypeRentalAgreement],
  [0x99e3806a, _secureValueTypePassportRegistration],
  [0xea02ec33, _secureValueTypeTemporaryRegistration],
  [0xb320aadb, _secureValueTypePhone],
  [0x8e3ca7ee, _secureValueTypeEmail],
  [0x187fa0ca, _secureValue],
  [0xdb21d0a7, _inputSecureValue],
  [0xed1ecdb0, _secureValueHash],
  [0xe8a40bd9, _secureValueErrorData],
  [0xbe3dfa, _secureValueErrorFrontSide],
  [0x868a2aa5, _secureValueErrorReverseSide],
  [0xe537ced6, _secureValueErrorSelfie],
  [0x7a700873, _secureValueErrorFile],
  [0x666220e9, _secureValueErrorFiles],
  [0x869d758f, _secureValueError],
  [0xa1144770, _secureValueErrorTranslationFile],
  [0x34636dd8, _secureValueErrorTranslationFiles],
  [0x33f0ea47, _secureCredentialsEncrypted],
  [0xad2e1cd8, _accountAuthorizationForm],
  [0x811f854f, _accountSentEmailCode],
  [0x66afa166, _helpDeepLinkInfoEmpty],
  [0x6a4ee832, _helpDeepLinkInfo],
  [0x1142bd56, _savedPhoneContact],
  [0x4dba4501, _accountTakeout],
  [0xd45ab096, _passwordKdfAlgoUnknown],
  [0x3a912d4a, _passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow],
  [0x4a8537, _securePasswordKdfAlgoUnknown],
  [0xbbf2dda0, _securePasswordKdfAlgoPBKDF2HMACSHA512iter100000],
  [0x86471d92, _securePasswordKdfAlgoSHA512],
  [0x1527bcac, _secureSecretSettings],
  [0x9880f658, _inputCheckPasswordEmpty],
  [0xd27ff082, _inputCheckPasswordSRP],
  [0x829d99da, _secureRequiredType],
  [0x27477b4, _secureRequiredTypeOneOf],
  [0xbfb9f457, _helpPassportConfigNotModified],
  [0xa098d6af, _helpPassportConfig],
  [0x1d1b1245, _inputAppEvent],
  [0xc0de1bd9, _jsonObjectValue],
  [0x3f6d7b68, _jsonNull],
  [0xc7345e6a, _jsonBool],
  [0x2be0dfa4, _jsonNumber],
  [0xb71e767a, _jsonString],
  [0xf7444763, _jsonArray],
  [0x99c1d49d, _jsonObject],
  [0x34566b6a, _pageTableCell],
  [0xe0c0c5e5, _pageTableRow],
  [0x6f747657, _pageCaption],
  [0xb92fb6cd, _pageListItemText],
  [0x25e073fc, _pageListItemBlocks],
  [0x5e068047, _pageListOrderedItemText],
  [0x98dd8936, _pageListOrderedItemBlocks],
  [0xb390dc08, _pageRelatedArticle],
  [0x98657f0d, _page],
  [0x8c05f1c9, _helpSupportName],
  [0xf3ae2eed, _helpUserInfoEmpty],
  [0x1eb3758, _helpUserInfo],
  [0x6ca9c2e9, _pollAnswer],
  [0x86e18161, _poll],
  [0x3b6ddad2, _pollAnswerVoters],
  [0x7adf2420, _pollResults],
  [0xf041e250, _chatOnlines],
  [0x47a971e0, _statsURL],
  [0x5fb224d5, _chatAdminRights],
  [0x9f120418, _chatBannedRights],
  [0xe630b979, _inputWallPaper],
  [0x72091c80, _inputWallPaperSlug],
  [0x967a462e, _inputWallPaperNoFile],
  [0x1c199183, _accountWallPapersNotModified],
  [0xcdc3858c, _accountWallPapers],
  [0xad253d78, _codeSettings],
  [0x1dc1bca4, _wallPaperSettings],
  [0xbaa57628, _autoDownloadSettings],
  [0x63cacf26, _accountAutoDownloadSettings],
  [0xd5b3b9f9, _emojiKeyword],
  [0x236df622, _emojiKeywordDeleted],
  [0x5cc761bd, _emojiKeywordsDifference],
  [0xa575739d, _emojiURL],
  [0xb3fb5361, _emojiLanguage],
  [0xff544e65, _folder],
  [0xfbd2c296, _inputFolderPeer],
  [0xe9baa668, _folderPeer],
  [0xe844ebff, _messagesSearchCounter],
  [0x92d33a0e, _urlAuthResultRequest],
  [0x8f8c0e4e, _urlAuthResultAccepted],
  [0xa9d6db1f, _urlAuthResultDefault],
  [0xbfb5ad8b, _channelLocationEmpty],
  [0x209b82db, _channelLocation],
  [0xca461b5d, _peerLocated],
  [0xf8ec284b, _peerSelfLocated],
  [0xd072acb4, _restrictionReason],
  [0x3c5693e9, _inputTheme],
  [0xf5890df1, _inputThemeSlug],
  [0xa00e67d6, _theme],
  [0xf41eb622, _accountThemesNotModified],
  [0x9a3d8c6d, _accountThemes],
  [0x629f1980, _authLoginToken],
  [0x68e9916, _authLoginTokenMigrateTo],
  [0x390d5c5e, _authLoginTokenSuccess],
  [0x57e28221, _accountContentSettings],
  [0xa927fec5, _messagesInactiveChats],
  [0xc3a12462, _baseThemeClassic],
  [0xfbd81688, _baseThemeDay],
  [0xb7b31ea8, _baseThemeNight],
  [0x6d5f77ee, _baseThemeTinted],
  [0x5b11125a, _baseThemeArctic],
  [0x8fde504f, _inputThemeSettings],
  [0xfa58b6d4, _themeSettings],
  [0x54b56617, _webPageAttributeTheme],
  [0x2e94c3e7, _webPageAttributeStory],
  [0x4899484e, _messagesVotesList],
  [0xf568028a, _bankCardOpenUrl],
  [0x3e24e573, _paymentsBankCardData],
  [0x7438f7e8, _dialogFilter],
  [0x363293ae, _dialogFilterDefault],
  [0xd64a04a8, _dialogFilterChatlist],
  [0x77744d4a, _dialogFilterSuggested],
  [0xb637edaf, _statsDateRangeDays],
  [0xcb43acde, _statsAbsValueAndPrev],
  [0xcbce2fe0, _statsPercentValue],
  [0x4a27eb2d, _statsGraphAsync],
  [0xbedc9822, _statsGraphError],
  [0x8ea464b6, _statsGraph],
  [0xad4fc9bd, _messageInteractionCounters],
  [0xbdf78394, _statsBroadcastStats],
  [0x98f6ac75, _helpPromoDataEmpty],
  [0x8c39793f, _helpPromoData],
  [0xde33b094, _videoSize],
  [0xf85c413c, _videoSizeEmojiMarkup],
  [0xda082fe, _videoSizeStickerMarkup],
  [0x9d04af9b, _statsGroupTopPoster],
  [0xd7584c87, _statsGroupTopAdmin],
  [0x535f779d, _statsGroupTopInviter],
  [0xef7ff916, _statsMegagroupStats],
  [0x734c4ccb, _globalPrivacySettings],
  [0x4203c5ef, _helpCountryCode],
  [0xc3878e23, _helpCountry],
  [0x93cc1f32, _helpCountriesListNotModified],
  [0x87d0759e, _helpCountriesList],
  [0x455b853d, _messageViews],
  [0xb6c4f543, _messagesMessageViews],
  [0xa6341782, _messagesDiscussionMessage],
  [0x6eebcabd, _messageReplyHeader],
  [0x9c98bfc1, _messageReplyStoryHeader],
  [0x83d60fc2, _messageReplies],
  [0xe8fd8014, _peerBlocked],
  [0x8999f295, _statsMessageStats],
  [0x7780bcb4, _groupCallDiscarded],
  [0xd597650c, _groupCall],
  [0xd8aa840f, _inputGroupCall],
  [0xeba636fe, _groupCallParticipant],
  [0x9e727aad, _phoneGroupCall],
  [0xf47751b6, _phoneGroupParticipants],
  [0x3081ed9d, _inlineQueryPeerTypeSameBotPM],
  [0x833c0fac, _inlineQueryPeerTypePM],
  [0xd766c50a, _inlineQueryPeerTypeChat],
  [0x5ec4be43, _inlineQueryPeerTypeMegagroup],
  [0x6334ee9a, _inlineQueryPeerTypeBroadcast],
  [0xe3b2d0c, _inlineQueryPeerTypeBotPM],
  [0x1662af0b, _messagesHistoryImport],
  [0x5e0fb7b9, _messagesHistoryImportParsed],
  [0xef8d3e6c, _messagesAffectedFoundMessages],
  [0x8c5adfd9, _chatInviteImporter],
  [0xbdc62dcc, _messagesExportedChatInvites],
  [0x1871be50, _messagesExportedChatInvite],
  [0x222600ef, _messagesExportedChatInviteReplaced],
  [0x81b6b00a, _messagesChatInviteImporters],
  [0xf2ecef23, _chatAdminWithInvites],
  [0xb69b72d7, _messagesChatAdminsWithInvites],
  [0xa24de717, _messagesCheckedHistoryImportPeer],
  [0xafe5623f, _phoneJoinAsPeers],
  [0x204bd158, _phoneExportedGroupCallInvite],
  [0xdcb118b7, _groupCallParticipantVideoSourceGroup],
  [0x67753ac8, _groupCallParticipantVideo],
  [0x85fea03f, _stickersSuggestedShortName],
  [0x2f6cb2ab, _botCommandScopeDefault],
  [0x3c4f04d8, _botCommandScopeUsers],
  [0x6fe1a881, _botCommandScopeChats],
  [0xb9aa606a, _botCommandScopeChatAdmins],
  [0xdb9d897d, _botCommandScopePeer],
  [0x3fd863d1, _botCommandScopePeerAdmins],
  [0xa1321f3, _botCommandScopePeerUser],
  [0xe3779861, _accountResetPasswordFailedWait],
  [0xe9effc7d, _accountResetPasswordRequestedWait],
  [0xe926d63e, _accountResetPasswordOk],
  [0xdaafff6b, _sponsoredMessage],
  [0xc9ee1d87, _messagesSponsoredMessages],
  [0x1839490f, _messagesSponsoredMessagesEmpty],
  [0xc9b0539f, _searchResultsCalendarPeriod],
  [0x147ee23c, _messagesSearchResultsCalendar],
  [0x7f648b67, _searchResultPosition],
  [0x53b22baf, _messagesSearchResultsPositions],
  [0xf496b0c6, _channelsSendAsPeers],
  [0x3b6d152e, _usersUserFull],
  [0x6880b94d, _messagesPeerSettings],
  [0xc3a2835f, _authLoggedOut],
  [0xa3d1cb80, _reactionCount],
  [0x4f2b9479, _messageReactions],
  [0x31bd492d, _messagesMessageReactionsList],
  [0xc077ec01, _availableReaction],
  [0x9f071957, _messagesAvailableReactionsNotModified],
  [0x768e3aad, _messagesAvailableReactions],
  [0x8c79b63c, _messagePeerReaction],
  [0x80eb48af, _groupCallStreamChannel],
  [0xd0e482b2, _phoneGroupCallStreamChannels],
  [0x2dbf3432, _phoneGroupCallStreamRtmpUrl],
  [0x4576f3f0, _attachMenuBotIconColor],
  [0xb2a7386b, _attachMenuBotIcon],
  [0xd90d8dfe, _attachMenuBot],
  [0xf1d88a5c, _attachMenuBotsNotModified],
  [0x3c4301c0, _attachMenuBots],
  [0x93bf667f, _attachMenuBotsBot],
  [0xc14557c, _webViewResultUrl],
  [0x882f76bb, _simpleWebViewResultUrl],
  [0xc94511c, _webViewMessageSent],
  [0x7533a588, _botMenuButtonDefault],
  [0x4258c205, _botMenuButtonCommands],
  [0xc7b57ce6, _botMenuButton],
  [0xfbf6e8b1, _accountSavedRingtonesNotModified],
  [0xc1e92cc5, _accountSavedRingtones],
  [0x97e8bebe, _notificationSoundDefault],
  [0x6f0c34df, _notificationSoundNone],
  [0x830b9ae4, _notificationSoundLocal],
  [0xff6c8049, _notificationSoundRingtone],
  [0xb7263f6d, _accountSavedRingtone],
  [0x1f307eb7, _accountSavedRingtoneConverted],
  [0x7d6be90e, _attachMenuPeerTypeSameBotPM],
  [0xc32bfa1a, _attachMenuPeerTypeBotPM],
  [0xf146d31f, _attachMenuPeerTypePM],
  [0x509113f, _attachMenuPeerTypeChat],
  [0x7bfbdefc, _attachMenuPeerTypeBroadcast],
  [0xc5b56859, _inputInvoiceMessage],
  [0xc326caef, _inputInvoiceSlug],
  [0x98986c0d, _inputInvoicePremiumGiftCode],
  [0xaed0cbd9, _paymentsExportedInvoice],
  [0x93752c52, _messagesTranscribedAudio],
  [0x5334759c, _helpPremiumPromo],
  [0xa6751e66, _inputStorePaymentPremiumSubscription],
  [0x616f7fe8, _inputStorePaymentGiftPremium],
  [0xa3805f3f, _inputStorePaymentPremiumGiftCode],
  [0x7c9375e6, _inputStorePaymentPremiumGiveaway],
  [0x74c34319, _premiumGiftOption],
  [0x88f8f21b, _paymentFormMethod],
  [0x2de11aae, _emojiStatusEmpty],
  [0x929b619d, _emojiStatus],
  [0xfa30a8c7, _emojiStatusUntil],
  [0xd08ce645, _accountEmojiStatusesNotModified],
  [0x90c467d1, _accountEmojiStatuses],
  [0x79f5d419, _reactionEmpty],
  [0x1b2286b8, _reactionEmoji],
  [0x8935fc73, _reactionCustomEmoji],
  [0xeafc32bc, _chatReactionsNone],
  [0x52928bca, _chatReactionsAll],
  [0x661d4037, _chatReactionsSome],
  [0xb06fdbdf, _messagesReactionsNotModified],
  [0xeafdf716, _messagesReactions],
  [0x4345be73, _emailVerifyPurposeLoginSetup],
  [0x527d22eb, _emailVerifyPurposeLoginChange],
  [0xbbf51685, _emailVerifyPurposePassport],
  [0x922e55a9, _emailVerificationCode],
  [0xdb909ec2, _emailVerificationGoogle],
  [0x96d074fd, _emailVerificationApple],
  [0x2b96cd1b, _accountEmailVerified],
  [0xe1bb0d61, _accountEmailVerifiedLogin],
  [0x5f2d1df2, _premiumSubscriptionOption],
  [0xb81c7034, _sendAsPeer],
  [0xad628cc8, _messageExtendedMediaPreview],
  [0xee479c64, _messageExtendedMedia],
  [0xfcfeb29c, _stickerKeyword],
  [0xb4073647, _username],
  [0x23f109b, _forumTopicDeleted],
  [0x71701da9, _forumTopic],
  [0x367617d3, _messagesForumTopics],
  [0x43b46b20, _defaultHistoryTTL],
  [0x41bf109b, _exportedContactToken],
  [0x5f3b8a00, _requestPeerTypeUser],
  [0xc9f06e1b, _requestPeerTypeChat],
  [0x339bef6c, _requestPeerTypeBroadcast],
  [0x481eadfa, _emojiListNotModified],
  [0x7a1e11d1, _emojiList],
  [0x7a9abda9, _emojiGroup],
  [0x6fb4ad87, _messagesEmojiGroupsNotModified],
  [0x881fb94b, _messagesEmojiGroups],
  [0x751f3146, _textWithEntities],
  [0x33db32f8, _messagesTranslateResult],
  [0xc84834ce, _autoSaveSettings],
  [0x81602d47, _autoSaveException],
  [0x4c3e069d, _accountAutoSaveSettings],
  [0x7cde641d, _helpAppConfigNotModified],
  [0xdd18782e, _helpAppConfig],
  [0xa920bd7a, _inputBotAppID],
  [0x908c0407, _inputBotAppShortName],
  [0x5da674b7, _botAppNotModified],
  [0x95fcd1d6, _botApp],
  [0xeb50adf5, _messagesBotApp],
  [0x3c1b4f0d, _appWebViewResultUrl],
  [0xb57295d5, _inlineBotWebView],
  [0x4a4ff172, _readParticipantDate],
  [0xf3e0da33, _inputChatlistDialogFilter],
  [0xc5181ac, _exportedChatlistInvite],
  [0x10e6e3a6, _chatlistsExportedChatlistInvite],
  [0x10ab6dc7, _chatlistsExportedInvites],
  [0xfa87f659, _chatlistsChatlistInviteAlready],
  [0x1dcd839d, _chatlistsChatlistInvite],
  [0x93bd878d, _chatlistsChatlistUpdates],
  [0xe8a775b0, _botsBotInfo],
  [0xb6cc2d5c, _messagePeerVote],
  [0x74cda504, _messagePeerVoteInputOption],
  [0x4628f6e6, _messagePeerVoteMultiple],
  [0x3db8ec63, _sponsoredWebPage],
  [0x8d595cd6, _storyViews],
  [0x51e6ee4f, _storyItemDeleted],
  [0xffadc913, _storyItemSkipped],
  [0x44c457ce, _storyItem],
  [0x1158fe3e, _storiesAllStoriesNotModified],
  [0x6efc5e81, _storiesAllStories],
  [0x5dd8c3c8, _storiesStories],
  [0xb0bdeac5, _storyView],
  [0x46e9b9ec, _storiesStoryViewsList],
  [0xde9eed1d, _storiesStoryViews],
  [0x73ec805, _inputReplyToMessage],
  [0x15b0f283, _inputReplyToStory],
  [0x3fc9053b, _exportedStoryLink],
  [0x712e27fd, _storiesStealthMode],
  [0x3d1ea4e, _mediaAreaCoordinates],
  [0xbe82db9c, _mediaAreaVenue],
  [0xb282217f, _inputMediaAreaVenue],
  [0xdf8b3b22, _mediaAreaGeoPoint],
  [0x14455871, _mediaAreaSuggestedReaction],
  [0x9a35e999, _peerStories],
  [0xcae68768, _storiesPeerStories],
  [0xfd5e12bd, _messagesWebPage],
  [0x257e962b, _premiumGiftCodeOption],
  [0xb722f158, _paymentsCheckedGiftCode],
  [0x4367daa0, _paymentsGiveawayInfo],
  [0xcd5570, _paymentsGiveawayInfoResults],
  [0xb2539d54, _prepaidGiveaway],
  [0x2a1c8c71, _boost],
  [0x86f8613c, _premiumBoostsList],
  [0xc448415c, _myBoost],
  [0x9ae228e2, _premiumMyBoosts],
  [0x4959427a, _premiumBoostsStatus],
])

const i32 = () => r.int32()
const i64 = () => r.long()
const f64 = () => r.double()
const str = () => r.string()
const bytes = () => r.bytes()

function vector(t: () => any, bare = false) {
  if (!bare) { i32() /* ignoring constructor id. */ }
  const len = i32()
  const result: any[] = []
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
