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

const _error = (o: any) => {
  i32(o.code)
  str(o.text)
}

const _inputPeerChat = (o: any) => {
  i64(o.chat_id)
}

const _inputPeerUser = (o: any) => {
  i64(o.user_id)
  i64(o.access_hash)
}

const _inputPeerChannel = (o: any) => {
  i64(o.channel_id)
  i64(o.access_hash)
}

const _inputPeerUserFromMessage = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  i64(o.user_id)
}

const _inputPeerChannelFromMessage = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  i64(o.channel_id)
}

const _inputUser = (o: any) => {
  i64(o.user_id)
  i64(o.access_hash)
}

const _inputUserFromMessage = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  i64(o.user_id)
}

const _inputPhoneContact = (o: any) => {
  i64(o.client_id)
  str(o.phone)
  str(o.first_name)
  str(o.last_name)
}

const _inputFile = (o: any) => {
  i64(o.id)
  i32(o.parts)
  str(o.name)
  str(o.md5_checksum)
}

const _inputFileBig = (o: any) => {
  i64(o.id)
  i32(o.parts)
  str(o.name)
}

const _inputMediaUploadedPhoto = (o: any) => {
  const flags =
      (has(o.spoiler) << 2)
    | has(o.stickers)
    | (has(o.ttl_seconds) << 1)
  i32(flags)
  obj(o.file)
  flagVector(obj, o.stickers)
  flag(i32, o.ttl_seconds)
}

const _inputMediaPhoto = (o: any) => {
  const flags =
      (has(o.spoiler) << 1)
    | has(o.ttl_seconds)
  i32(flags)
  obj(o.id)
  flag(i32, o.ttl_seconds)
}

const _inputMediaGeoPoint = (o: any) => {
  obj(o.geo_point)
}

const _inputMediaContact = (o: any) => {
  str(o.phone_number)
  str(o.first_name)
  str(o.last_name)
  str(o.vcard)
}

const _inputMediaUploadedDocument = (o: any) => {
  const flags =
      (has(o.nosound_video) << 3)
    | (has(o.force_file) << 4)
    | (has(o.spoiler) << 5)
    | (has(o.thumb) << 2)
    | has(o.stickers)
    | (has(o.ttl_seconds) << 1)
  i32(flags)
  obj(o.file)
  flag(obj, o.thumb)
  str(o.mime_type)
  vector(obj, o.attributes)
  flagVector(obj, o.stickers)
  flag(i32, o.ttl_seconds)
}

const _inputMediaDocument = (o: any) => {
  const flags =
      (has(o.spoiler) << 2)
    | has(o.ttl_seconds)
    | (has(o.query) << 1)
  i32(flags)
  obj(o.id)
  flag(i32, o.ttl_seconds)
  flag(str, o.query)
}

const _inputMediaVenue = (o: any) => {
  obj(o.geo_point)
  str(o.title)
  str(o.address)
  str(o.provider)
  str(o.venue_id)
  str(o.venue_type)
}

const _inputMediaPhotoExternal = (o: any) => {
  const flags =
      (has(o.spoiler) << 1)
    | has(o.ttl_seconds)
  i32(flags)
  str(o.url)
  flag(i32, o.ttl_seconds)
}

const _inputMediaDocumentExternal = (o: any) => {
  const flags =
      (has(o.spoiler) << 1)
    | has(o.ttl_seconds)
  i32(flags)
  str(o.url)
  flag(i32, o.ttl_seconds)
}

const _inputMediaGame = (o: any) => {
  obj(o.id)
}

const _inputMediaInvoice = (o: any) => {
  const flags =
      has(o.photo)
    | (has(o.start_param) << 1)
    | (has(o.extended_media) << 2)
  i32(flags)
  str(o.title)
  str(o.description)
  flag(obj, o.photo)
  obj(o.invoice)
  bytes(o.payload)
  str(o.provider)
  obj(o.provider_data)
  flag(str, o.start_param)
  flag(obj, o.extended_media)
}

const _inputMediaGeoLive = (o: any) => {
  const flags =
      has(o.stopped)
    | (has(o.heading) << 2)
    | (has(o.period) << 1)
    | (has(o.proximity_notification_radius) << 3)
  i32(flags)
  obj(o.geo_point)
  flag(i32, o.heading)
  flag(i32, o.period)
  flag(i32, o.proximity_notification_radius)
}

const _inputMediaPoll = (o: any) => {
  const flags =
      has(o.correct_answers)
    | (has(o.solution) << 1)
    | (has(o.solution_entities) << 1)
  i32(flags)
  obj(o.poll)
  flagVector(bytes, o.correct_answers)
  flag(str, o.solution)
  flagVector(obj, o.solution_entities)
}

const _inputMediaDice = (o: any) => {
  str(o.emoticon)
}

const _inputMediaStory = (o: any) => {
  obj(o.peer)
  i32(o.id)
}

const _inputMediaWebPage = (o: any) => {
  const flags =
      has(o.force_large_media)
    | (has(o.force_small_media) << 1)
    | (has(o.optional) << 2)
  i32(flags)
  str(o.url)
}

const _inputChatUploadedPhoto = (o: any) => {
  const flags =
      has(o.file)
    | (has(o.video) << 1)
    | (has(o.video_start_ts) << 2)
    | (has(o.video_emoji_markup) << 3)
  i32(flags)
  flag(obj, o.file)
  flag(obj, o.video)
  flag(f64, o.video_start_ts)
  flag(obj, o.video_emoji_markup)
}

const _inputChatPhoto = (o: any) => {
  obj(o.id)
}

const _inputGeoPoint = (o: any) => {
  const flags =
      has(o.accuracy_radius)
  i32(flags)
  f64(o.lat)
  f64(o.long)
  flag(i32, o.accuracy_radius)
}

const _inputPhoto = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
  bytes(o.file_reference)
}

const _inputFileLocation = (o: any) => {
  i64(o.volume_id)
  i32(o.local_id)
  i64(o.secret)
  bytes(o.file_reference)
}

const _inputEncryptedFileLocation = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _inputDocumentFileLocation = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
  bytes(o.file_reference)
  str(o.thumb_size)
}

const _inputSecureFileLocation = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _inputPhotoFileLocation = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
  bytes(o.file_reference)
  str(o.thumb_size)
}

const _inputPhotoLegacyFileLocation = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
  bytes(o.file_reference)
  i64(o.volume_id)
  i32(o.local_id)
  i64(o.secret)
}

const _inputPeerPhotoFileLocation = (o: any) => {
  const flags =
      has(o.big)
  i32(flags)
  obj(o.peer)
  i64(o.photo_id)
}

const _inputStickerSetThumb = (o: any) => {
  obj(o.stickerset)
  i32(o.thumb_version)
}

const _inputGroupCallStream = (o: any) => {
  const flags =
      has(o.video_channel)
    | has(o.video_quality)
  i32(flags)
  obj(o.call)
  i64(o.time_ms)
  i32(o.scale)
  flag(i32, o.video_channel)
  flag(i32, o.video_quality)
}

const _peerUser = (o: any) => {
  i64(o.user_id)
}

const _peerChat = (o: any) => {
  i64(o.chat_id)
}

const _peerChannel = (o: any) => {
  i64(o.channel_id)
}

const _userEmpty = (o: any) => {
  i64(o.id)
}

const _user = (o: any) => {
  const flags =
      (has(o.self) << 10)
    | (has(o.contact) << 11)
    | (has(o.mutual_contact) << 12)
    | (has(o.deleted) << 13)
    | (has(o.bot) << 14)
    | (has(o.bot_chat_history) << 15)
    | (has(o.bot_nochats) << 16)
    | (has(o.verified) << 17)
    | (has(o.restricted) << 18)
    | (has(o.min) << 20)
    | (has(o.bot_inline_geo) << 21)
    | (has(o.support) << 23)
    | (has(o.scam) << 24)
    | (has(o.apply_min_photo) << 25)
    | (has(o.fake) << 26)
    | (has(o.bot_attach_menu) << 27)
    | (has(o.premium) << 28)
    | (has(o.attach_menu_enabled) << 29)
    | has(o.access_hash)
    | (has(o.first_name) << 1)
    | (has(o.last_name) << 2)
    | (has(o.username) << 3)
    | (has(o.phone) << 4)
    | (has(o.photo) << 5)
    | (has(o.status) << 6)
    | (has(o.bot_info_version) << 14)
    | (has(o.restriction_reason) << 18)
    | (has(o.bot_inline_placeholder) << 19)
    | (has(o.lang_code) << 22)
    | (has(o.emoji_status) << 30)
  i32(flags)
  const flags2 =
      (has(o.bot_can_edit) << 1)
    | (has(o.close_friend) << 2)
    | (has(o.stories_hidden) << 3)
    | (has(o.stories_unavailable) << 4)
    | has(o.usernames)
    | (has(o.stories_max_id) << 5)
    | (has(o.color) << 7)
    | (has(o.background_emoji_id) << 6)
  i32(flags2)
  i64(o.id)
  flag(i64, o.access_hash)
  flag(str, o.first_name)
  flag(str, o.last_name)
  flag(str, o.username)
  flag(str, o.phone)
  flag(obj, o.photo)
  flag(obj, o.status)
  flag(i32, o.bot_info_version)
  flagVector(obj, o.restriction_reason)
  flag(str, o.bot_inline_placeholder)
  flag(str, o.lang_code)
  flag(obj, o.emoji_status)
  flagVector(obj, o.usernames)
  flag(i32, o.stories_max_id)
  flag(i32, o.color)
  flag(i64, o.background_emoji_id)
}

const _userProfilePhoto = (o: any) => {
  const flags =
      has(o.has_video)
    | (has(o.personal) << 2)
    | (has(o.stripped_thumb) << 1)
  i32(flags)
  i64(o.photo_id)
  flag(bytes, o.stripped_thumb)
  i32(o.dc_id)
}

const _userStatusOnline = (o: any) => {
  i32(o.expires)
}

const _userStatusOffline = (o: any) => {
  i32(o.was_online)
}

const _chatEmpty = (o: any) => {
  i64(o.id)
}

const _chat = (o: any) => {
  const flags =
      has(o.creator)
    | (has(o.left) << 2)
    | (has(o.deactivated) << 5)
    | (has(o.call_active) << 23)
    | (has(o.call_not_empty) << 24)
    | (has(o.noforwards) << 25)
    | (has(o.migrated_to) << 6)
    | (has(o.admin_rights) << 14)
    | (has(o.default_banned_rights) << 18)
  i32(flags)
  i64(o.id)
  str(o.title)
  obj(o.photo)
  i32(o.participants_count)
  i32(o.date)
  i32(o.version)
  flag(obj, o.migrated_to)
  flag(obj, o.admin_rights)
  flag(obj, o.default_banned_rights)
}

const _chatForbidden = (o: any) => {
  i64(o.id)
  str(o.title)
}

const _channel = (o: any) => {
  const flags =
      has(o.creator)
    | (has(o.left) << 2)
    | (has(o.broadcast) << 5)
    | (has(o.verified) << 7)
    | (has(o.megagroup) << 8)
    | (has(o.restricted) << 9)
    | (has(o.signatures) << 11)
    | (has(o.min) << 12)
    | (has(o.scam) << 19)
    | (has(o.has_link) << 20)
    | (has(o.has_geo) << 21)
    | (has(o.slowmode_enabled) << 22)
    | (has(o.call_active) << 23)
    | (has(o.call_not_empty) << 24)
    | (has(o.fake) << 25)
    | (has(o.gigagroup) << 26)
    | (has(o.noforwards) << 27)
    | (has(o.join_to_send) << 28)
    | (has(o.join_request) << 29)
    | (has(o.forum) << 30)
    | (has(o.access_hash) << 13)
    | (has(o.username) << 6)
    | (has(o.restriction_reason) << 9)
    | (has(o.admin_rights) << 14)
    | (has(o.banned_rights) << 15)
    | (has(o.default_banned_rights) << 18)
    | (has(o.participants_count) << 17)
  i32(flags)
  const flags2 =
      (has(o.stories_hidden) << 1)
    | (has(o.stories_hidden_min) << 2)
    | (has(o.stories_unavailable) << 3)
    | has(o.usernames)
    | (has(o.stories_max_id) << 4)
    | (has(o.color) << 6)
    | (has(o.background_emoji_id) << 5)
  i32(flags2)
  i64(o.id)
  flag(i64, o.access_hash)
  str(o.title)
  flag(str, o.username)
  obj(o.photo)
  i32(o.date)
  flagVector(obj, o.restriction_reason)
  flag(obj, o.admin_rights)
  flag(obj, o.banned_rights)
  flag(obj, o.default_banned_rights)
  flag(i32, o.participants_count)
  flagVector(obj, o.usernames)
  flag(i32, o.stories_max_id)
  flag(i32, o.color)
  flag(i64, o.background_emoji_id)
}

const _channelForbidden = (o: any) => {
  const flags =
      (has(o.broadcast) << 5)
    | (has(o.megagroup) << 8)
    | (has(o.until_date) << 16)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  str(o.title)
  flag(i32, o.until_date)
}

const _chatFull = (o: any) => {
  const flags =
      (has(o.can_set_username) << 7)
    | (has(o.has_scheduled) << 8)
    | (has(o.translations_disabled) << 19)
    | (has(o.chat_photo) << 2)
    | (has(o.exported_invite) << 13)
    | (has(o.bot_info) << 3)
    | (has(o.pinned_msg_id) << 6)
    | (has(o.folder_id) << 11)
    | (has(o.call) << 12)
    | (has(o.ttl_period) << 14)
    | (has(o.groupcall_default_join_as) << 15)
    | (has(o.theme_emoticon) << 16)
    | (has(o.requests_pending) << 17)
    | (has(o.recent_requesters) << 17)
    | (has(o.available_reactions) << 18)
  i32(flags)
  i64(o.id)
  str(o.about)
  obj(o.participants)
  flag(obj, o.chat_photo)
  obj(o.notify_settings)
  flag(obj, o.exported_invite)
  flagVector(obj, o.bot_info)
  flag(i32, o.pinned_msg_id)
  flag(i32, o.folder_id)
  flag(obj, o.call)
  flag(i32, o.ttl_period)
  flag(obj, o.groupcall_default_join_as)
  flag(str, o.theme_emoticon)
  flag(i32, o.requests_pending)
  flagVector(i64, o.recent_requesters)
  flag(obj, o.available_reactions)
}

const _channelFull = (o: any) => {
  const flags =
      (has(o.can_view_participants) << 3)
    | (has(o.can_set_username) << 6)
    | (has(o.can_set_stickers) << 7)
    | (has(o.hidden_prehistory) << 10)
    | (has(o.can_set_location) << 16)
    | (has(o.has_scheduled) << 19)
    | (has(o.can_view_stats) << 20)
    | (has(o.blocked) << 22)
    | has(o.participants_count)
    | (has(o.admins_count) << 1)
    | (has(o.kicked_count) << 2)
    | (has(o.banned_count) << 2)
    | (has(o.online_count) << 13)
    | (has(o.exported_invite) << 23)
    | (has(o.migrated_from_chat_id) << 4)
    | (has(o.migrated_from_max_id) << 4)
    | (has(o.pinned_msg_id) << 5)
    | (has(o.stickerset) << 8)
    | (has(o.available_min_id) << 9)
    | (has(o.folder_id) << 11)
    | (has(o.linked_chat_id) << 14)
    | (has(o.location) << 15)
    | (has(o.slowmode_seconds) << 17)
    | (has(o.slowmode_next_send_date) << 18)
    | (has(o.stats_dc) << 12)
    | (has(o.call) << 21)
    | (has(o.ttl_period) << 24)
    | (has(o.pending_suggestions) << 25)
    | (has(o.groupcall_default_join_as) << 26)
    | (has(o.theme_emoticon) << 27)
    | (has(o.requests_pending) << 28)
    | (has(o.recent_requesters) << 28)
    | (has(o.default_send_as) << 29)
    | (has(o.available_reactions) << 30)
  i32(flags)
  const flags2 =
      has(o.can_delete_channel)
    | (has(o.antispam) << 1)
    | (has(o.participants_hidden) << 2)
    | (has(o.translations_disabled) << 3)
    | (has(o.stories_pinned_available) << 5)
    | (has(o.stories) << 4)
  i32(flags2)
  i64(o.id)
  str(o.about)
  flag(i32, o.participants_count)
  flag(i32, o.admins_count)
  flag(i32, o.kicked_count)
  flag(i32, o.banned_count)
  flag(i32, o.online_count)
  i32(o.read_inbox_max_id)
  i32(o.read_outbox_max_id)
  i32(o.unread_count)
  obj(o.chat_photo)
  obj(o.notify_settings)
  flag(obj, o.exported_invite)
  vector(obj, o.bot_info)
  flag(i64, o.migrated_from_chat_id)
  flag(i32, o.migrated_from_max_id)
  flag(i32, o.pinned_msg_id)
  flag(obj, o.stickerset)
  flag(i32, o.available_min_id)
  flag(i32, o.folder_id)
  flag(i64, o.linked_chat_id)
  flag(obj, o.location)
  flag(i32, o.slowmode_seconds)
  flag(i32, o.slowmode_next_send_date)
  flag(i32, o.stats_dc)
  i32(o.pts)
  flag(obj, o.call)
  flag(i32, o.ttl_period)
  flagVector(str, o.pending_suggestions)
  flag(obj, o.groupcall_default_join_as)
  flag(str, o.theme_emoticon)
  flag(i32, o.requests_pending)
  flagVector(i64, o.recent_requesters)
  flag(obj, o.default_send_as)
  flag(obj, o.available_reactions)
  flag(obj, o.stories)
}

const _chatParticipant = (o: any) => {
  i64(o.user_id)
  i64(o.inviter_id)
  i32(o.date)
}

const _chatParticipantCreator = (o: any) => {
  i64(o.user_id)
}

const _chatParticipantAdmin = (o: any) => {
  i64(o.user_id)
  i64(o.inviter_id)
  i32(o.date)
}

const _chatParticipantsForbidden = (o: any) => {
  const flags =
      has(o.self_participant)
  i32(flags)
  i64(o.chat_id)
  flag(obj, o.self_participant)
}

const _chatParticipants = (o: any) => {
  i64(o.chat_id)
  vector(obj, o.participants)
  i32(o.version)
}

const _chatPhoto = (o: any) => {
  const flags =
      has(o.has_video)
    | (has(o.stripped_thumb) << 1)
  i32(flags)
  i64(o.photo_id)
  flag(bytes, o.stripped_thumb)
  i32(o.dc_id)
}

const _messageEmpty = (o: any) => {
  const flags =
      has(o.peer_id)
  i32(flags)
  i32(o.id)
  flag(obj, o.peer_id)
}

const _message = (o: any) => {
  const flags =
      (has(o.out) << 1)
    | (has(o.mentioned) << 4)
    | (has(o.media_unread) << 5)
    | (has(o.silent) << 13)
    | (has(o.post) << 14)
    | (has(o.from_scheduled) << 18)
    | (has(o.legacy) << 19)
    | (has(o.edit_hide) << 21)
    | (has(o.pinned) << 24)
    | (has(o.noforwards) << 26)
    | (has(o.invert_media) << 27)
    | (has(o.from_id) << 8)
    | (has(o.fwd_from) << 2)
    | (has(o.via_bot_id) << 11)
    | (has(o.reply_to) << 3)
    | (has(o.media) << 9)
    | (has(o.reply_markup) << 6)
    | (has(o.entities) << 7)
    | (has(o.views) << 10)
    | (has(o.forwards) << 10)
    | (has(o.replies) << 23)
    | (has(o.edit_date) << 15)
    | (has(o.post_author) << 16)
    | (has(o.grouped_id) << 17)
    | (has(o.reactions) << 20)
    | (has(o.restriction_reason) << 22)
    | (has(o.ttl_period) << 25)
  i32(flags)
  i32(o.id)
  flag(obj, o.from_id)
  obj(o.peer_id)
  flag(obj, o.fwd_from)
  flag(i64, o.via_bot_id)
  flag(obj, o.reply_to)
  i32(o.date)
  str(o.message)
  flag(obj, o.media)
  flag(obj, o.reply_markup)
  flagVector(obj, o.entities)
  flag(i32, o.views)
  flag(i32, o.forwards)
  flag(obj, o.replies)
  flag(i32, o.edit_date)
  flag(str, o.post_author)
  flag(i64, o.grouped_id)
  flag(obj, o.reactions)
  flagVector(obj, o.restriction_reason)
  flag(i32, o.ttl_period)
}

const _messageService = (o: any) => {
  const flags =
      (has(o.out) << 1)
    | (has(o.mentioned) << 4)
    | (has(o.media_unread) << 5)
    | (has(o.silent) << 13)
    | (has(o.post) << 14)
    | (has(o.legacy) << 19)
    | (has(o.from_id) << 8)
    | (has(o.reply_to) << 3)
    | (has(o.ttl_period) << 25)
  i32(flags)
  i32(o.id)
  flag(obj, o.from_id)
  obj(o.peer_id)
  flag(obj, o.reply_to)
  i32(o.date)
  obj(o.action)
  flag(i32, o.ttl_period)
}

const _messageMediaPhoto = (o: any) => {
  const flags =
      (has(o.spoiler) << 3)
    | has(o.photo)
    | (has(o.ttl_seconds) << 2)
  i32(flags)
  flag(obj, o.photo)
  flag(i32, o.ttl_seconds)
}

const _messageMediaGeo = (o: any) => {
  obj(o.geo)
}

const _messageMediaContact = (o: any) => {
  str(o.phone_number)
  str(o.first_name)
  str(o.last_name)
  str(o.vcard)
  i64(o.user_id)
}

const _messageMediaDocument = (o: any) => {
  const flags =
      (has(o.nopremium) << 3)
    | (has(o.spoiler) << 4)
    | has(o.document)
    | (has(o.alt_document) << 5)
    | (has(o.ttl_seconds) << 2)
  i32(flags)
  flag(obj, o.document)
  flag(obj, o.alt_document)
  flag(i32, o.ttl_seconds)
}

const _messageMediaWebPage = (o: any) => {
  const flags =
      has(o.force_large_media)
    | (has(o.force_small_media) << 1)
    | (has(o.manual) << 3)
    | (has(o.safe) << 4)
  i32(flags)
  obj(o.webpage)
}

const _messageMediaVenue = (o: any) => {
  obj(o.geo)
  str(o.title)
  str(o.address)
  str(o.provider)
  str(o.venue_id)
  str(o.venue_type)
}

const _messageMediaGame = (o: any) => {
  obj(o.game)
}

const _messageMediaInvoice = (o: any) => {
  const flags =
      (has(o.shipping_address_requested) << 1)
    | (has(o.test) << 3)
    | has(o.photo)
    | (has(o.receipt_msg_id) << 2)
    | (has(o.extended_media) << 4)
  i32(flags)
  str(o.title)
  str(o.description)
  flag(obj, o.photo)
  flag(i32, o.receipt_msg_id)
  str(o.currency)
  i64(o.total_amount)
  str(o.start_param)
  flag(obj, o.extended_media)
}

const _messageMediaGeoLive = (o: any) => {
  const flags =
      has(o.heading)
    | (has(o.proximity_notification_radius) << 1)
  i32(flags)
  obj(o.geo)
  flag(i32, o.heading)
  i32(o.period)
  flag(i32, o.proximity_notification_radius)
}

const _messageMediaPoll = (o: any) => {
  obj(o.poll)
  obj(o.results)
}

const _messageMediaDice = (o: any) => {
  i32(o.value)
  str(o.emoticon)
}

const _messageMediaStory = (o: any) => {
  const flags =
      (has(o.via_mention) << 1)
    | has(o.story)
  i32(flags)
  obj(o.peer)
  i32(o.id)
  flag(obj, o.story)
}

const _messageMediaGiveaway = (o: any) => {
  const flags =
      has(o.only_new_subscribers)
    | (has(o.countries_iso2) << 1)
  i32(flags)
  vector(i64, o.channels)
  flagVector(str, o.countries_iso2)
  i32(o.quantity)
  i32(o.months)
  i32(o.until_date)
}

const _messageActionChatCreate = (o: any) => {
  str(o.title)
  vector(i64, o.users)
}

const _messageActionChatEditTitle = (o: any) => {
  str(o.title)
}

const _messageActionChatEditPhoto = (o: any) => {
  obj(o.photo)
}

const _messageActionChatAddUser = (o: any) => {
  vector(i64, o.users)
}

const _messageActionChatDeleteUser = (o: any) => {
  i64(o.user_id)
}

const _messageActionChatJoinedByLink = (o: any) => {
  i64(o.inviter_id)
}

const _messageActionChannelCreate = (o: any) => {
  str(o.title)
}

const _messageActionChatMigrateTo = (o: any) => {
  i64(o.channel_id)
}

const _messageActionChannelMigrateFrom = (o: any) => {
  str(o.title)
  i64(o.chat_id)
}

const _messageActionGameScore = (o: any) => {
  i64(o.game_id)
  i32(o.score)
}

const _messageActionPaymentSentMe = (o: any) => {
  const flags =
      (has(o.recurring_init) << 2)
    | (has(o.recurring_used) << 3)
    | has(o.info)
    | (has(o.shipping_option_id) << 1)
  i32(flags)
  str(o.currency)
  i64(o.total_amount)
  bytes(o.payload)
  flag(obj, o.info)
  flag(str, o.shipping_option_id)
  obj(o.charge)
}

const _messageActionPaymentSent = (o: any) => {
  const flags =
      (has(o.recurring_init) << 2)
    | (has(o.recurring_used) << 3)
    | has(o.invoice_slug)
  i32(flags)
  str(o.currency)
  i64(o.total_amount)
  flag(str, o.invoice_slug)
}

const _messageActionPhoneCall = (o: any) => {
  const flags =
      (has(o.video) << 2)
    | has(o.reason)
    | (has(o.duration) << 1)
  i32(flags)
  i64(o.call_id)
  flag(obj, o.reason)
  flag(i32, o.duration)
}

const _messageActionCustomAction = (o: any) => {
  str(o.message)
}

const _messageActionBotAllowed = (o: any) => {
  const flags =
      (has(o.attach_menu) << 1)
    | (has(o.from_request) << 3)
    | has(o.domain)
    | (has(o.app) << 2)
  i32(flags)
  flag(str, o.domain)
  flag(obj, o.app)
}

const _messageActionSecureValuesSentMe = (o: any) => {
  vector(obj, o.values)
  obj(o.credentials)
}

const _messageActionSecureValuesSent = (o: any) => {
  vector(obj, o.types)
}

const _messageActionGeoProximityReached = (o: any) => {
  obj(o.from_id)
  obj(o.to_id)
  i32(o.distance)
}

const _messageActionGroupCall = (o: any) => {
  const flags =
      has(o.duration)
  i32(flags)
  obj(o.call)
  flag(i32, o.duration)
}

const _messageActionInviteToGroupCall = (o: any) => {
  obj(o.call)
  vector(i64, o.users)
}

const _messageActionSetMessagesTTL = (o: any) => {
  const flags =
      has(o.auto_setting_from)
  i32(flags)
  i32(o.period)
  flag(i64, o.auto_setting_from)
}

const _messageActionGroupCallScheduled = (o: any) => {
  obj(o.call)
  i32(o.schedule_date)
}

const _messageActionSetChatTheme = (o: any) => {
  str(o.emoticon)
}

const _messageActionWebViewDataSentMe = (o: any) => {
  str(o.text)
  str(o.data)
}

const _messageActionWebViewDataSent = (o: any) => {
  str(o.text)
}

const _messageActionGiftPremium = (o: any) => {
  const flags =
      has(o.crypto_currency)
    | has(o.crypto_amount)
  i32(flags)
  str(o.currency)
  i64(o.amount)
  i32(o.months)
  flag(str, o.crypto_currency)
  flag(i64, o.crypto_amount)
}

const _messageActionTopicCreate = (o: any) => {
  const flags =
      has(o.icon_emoji_id)
  i32(flags)
  str(o.title)
  i32(o.icon_color)
  flag(i64, o.icon_emoji_id)
}

const _messageActionTopicEdit = (o: any) => {
  const flags =
      has(o.title)
    | (has(o.icon_emoji_id) << 1)
    | (has(o.closed) << 2)
    | (has(o.hidden) << 3)
  i32(flags)
  flag(str, o.title)
  flag(i64, o.icon_emoji_id)
  flag(bool, o.closed)
  flag(bool, o.hidden)
}

const _messageActionSuggestProfilePhoto = (o: any) => {
  obj(o.photo)
}

const _messageActionRequestedPeer = (o: any) => {
  i32(o.button_id)
  obj(o.peer)
}

const _messageActionSetChatWallPaper = (o: any) => {
  obj(o.wallpaper)
}

const _messageActionSetSameChatWallPaper = (o: any) => {
  obj(o.wallpaper)
}

const _messageActionGiftCode = (o: any) => {
  const flags =
      has(o.via_giveaway)
    | (has(o.unclaimed) << 2)
    | (has(o.boost_peer) << 1)
  i32(flags)
  flag(obj, o.boost_peer)
  i32(o.months)
  str(o.slug)
}

const _dialog = (o: any) => {
  const flags =
      (has(o.pinned) << 2)
    | (has(o.unread_mark) << 3)
    | has(o.pts)
    | (has(o.draft) << 1)
    | (has(o.folder_id) << 4)
    | (has(o.ttl_period) << 5)
  i32(flags)
  obj(o.peer)
  i32(o.top_message)
  i32(o.read_inbox_max_id)
  i32(o.read_outbox_max_id)
  i32(o.unread_count)
  i32(o.unread_mentions_count)
  i32(o.unread_reactions_count)
  obj(o.notify_settings)
  flag(i32, o.pts)
  flag(obj, o.draft)
  flag(i32, o.folder_id)
  flag(i32, o.ttl_period)
}

const _dialogFolder = (o: any) => {
  const flags =
      (has(o.pinned) << 2)
  i32(flags)
  obj(o.folder)
  obj(o.peer)
  i32(o.top_message)
  i32(o.unread_muted_peers_count)
  i32(o.unread_unmuted_peers_count)
  i32(o.unread_muted_messages_count)
  i32(o.unread_unmuted_messages_count)
}

const _photoEmpty = (o: any) => {
  i64(o.id)
}

const _photo = (o: any) => {
  const flags =
      has(o.has_stickers)
    | (has(o.video_sizes) << 1)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  bytes(o.file_reference)
  i32(o.date)
  vector(obj, o.sizes)
  flagVector(obj, o.video_sizes)
  i32(o.dc_id)
}

const _photoSizeEmpty = (o: any) => {
  str(o.type)
}

const _photoSize = (o: any) => {
  str(o.type)
  i32(o.w)
  i32(o.h)
  i32(o.size)
}

const _photoCachedSize = (o: any) => {
  str(o.type)
  i32(o.w)
  i32(o.h)
  bytes(o.bytes)
}

const _photoStrippedSize = (o: any) => {
  str(o.type)
  bytes(o.bytes)
}

const _photoSizeProgressive = (o: any) => {
  str(o.type)
  i32(o.w)
  i32(o.h)
  vector(i32, o.sizes)
}

const _photoPathSize = (o: any) => {
  str(o.type)
  bytes(o.bytes)
}

const _geoPoint = (o: any) => {
  const flags =
      has(o.accuracy_radius)
  i32(flags)
  f64(o.long)
  f64(o.lat)
  i64(o.access_hash)
  flag(i32, o.accuracy_radius)
}

const _authSentCode = (o: any) => {
  const flags =
      (has(o.next_type) << 1)
    | (has(o.timeout) << 2)
  i32(flags)
  obj(o.type)
  str(o.phone_code_hash)
  flag(obj, o.next_type)
  flag(i32, o.timeout)
}

const _authSentCodeSuccess = (o: any) => {
  obj(o.authorization)
}

const _authAuthorization = (o: any) => {
  const flags =
      (has(o.setup_password_required) << 1)
    | (has(o.otherwise_relogin_days) << 1)
    | has(o.tmp_sessions)
    | (has(o.future_auth_token) << 2)
  i32(flags)
  flag(i32, o.otherwise_relogin_days)
  flag(i32, o.tmp_sessions)
  flag(bytes, o.future_auth_token)
  obj(o.user)
}

const _authAuthorizationSignUpRequired = (o: any) => {
  const flags =
      has(o.terms_of_service)
  i32(flags)
  flag(obj, o.terms_of_service)
}

const _authExportedAuthorization = (o: any) => {
  i64(o.id)
  bytes(o.bytes)
}

const _inputNotifyPeer = (o: any) => {
  obj(o.peer)
}

const _inputNotifyForumTopic = (o: any) => {
  obj(o.peer)
  i32(o.top_msg_id)
}

const _inputPeerNotifySettings = (o: any) => {
  const flags =
      has(o.show_previews)
    | (has(o.silent) << 1)
    | (has(o.mute_until) << 2)
    | (has(o.sound) << 3)
    | (has(o.stories_muted) << 6)
    | (has(o.stories_hide_sender) << 7)
    | (has(o.stories_sound) << 8)
  i32(flags)
  flag(bool, o.show_previews)
  flag(bool, o.silent)
  flag(i32, o.mute_until)
  flag(obj, o.sound)
  flag(bool, o.stories_muted)
  flag(bool, o.stories_hide_sender)
  flag(obj, o.stories_sound)
}

const _peerNotifySettings = (o: any) => {
  const flags =
      has(o.show_previews)
    | (has(o.silent) << 1)
    | (has(o.mute_until) << 2)
    | (has(o.ios_sound) << 3)
    | (has(o.android_sound) << 4)
    | (has(o.other_sound) << 5)
    | (has(o.stories_muted) << 6)
    | (has(o.stories_hide_sender) << 7)
    | (has(o.stories_ios_sound) << 8)
    | (has(o.stories_android_sound) << 9)
    | (has(o.stories_other_sound) << 10)
  i32(flags)
  flag(bool, o.show_previews)
  flag(bool, o.silent)
  flag(i32, o.mute_until)
  flag(obj, o.ios_sound)
  flag(obj, o.android_sound)
  flag(obj, o.other_sound)
  flag(bool, o.stories_muted)
  flag(bool, o.stories_hide_sender)
  flag(obj, o.stories_ios_sound)
  flag(obj, o.stories_android_sound)
  flag(obj, o.stories_other_sound)
}

const _peerSettings = (o: any) => {
  const flags =
      has(o.report_spam)
    | (has(o.add_contact) << 1)
    | (has(o.block_contact) << 2)
    | (has(o.share_contact) << 3)
    | (has(o.need_contacts_exception) << 4)
    | (has(o.report_geo) << 5)
    | (has(o.autoarchived) << 7)
    | (has(o.invite_members) << 8)
    | (has(o.request_chat_broadcast) << 10)
    | (has(o.geo_distance) << 6)
    | (has(o.request_chat_title) << 9)
    | (has(o.request_chat_date) << 9)
  i32(flags)
  flag(i32, o.geo_distance)
  flag(str, o.request_chat_title)
  flag(i32, o.request_chat_date)
}

const _wallPaper = (o: any) => {
  const flags =
      has(o.creator)
    | (has(o.default) << 1)
    | (has(o.pattern) << 3)
    | (has(o.dark) << 4)
    | (has(o.settings) << 2)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  str(o.slug)
  obj(o.document)
  flag(obj, o.settings)
}

const _wallPaperNoFile = (o: any) => {
  const flags =
      (has(o.default) << 1)
    | (has(o.dark) << 4)
    | (has(o.settings) << 2)
  i32(flags)
  i64(o.id)
  flag(obj, o.settings)
}

const _userFull = (o: any) => {
  const flags =
      has(o.blocked)
    | (has(o.phone_calls_available) << 4)
    | (has(o.phone_calls_private) << 5)
    | (has(o.can_pin_message) << 7)
    | (has(o.has_scheduled) << 12)
    | (has(o.video_calls_available) << 13)
    | (has(o.voice_messages_forbidden) << 20)
    | (has(o.translations_disabled) << 23)
    | (has(o.stories_pinned_available) << 26)
    | (has(o.blocked_my_stories_from) << 27)
    | (has(o.about) << 1)
    | (has(o.personal_photo) << 21)
    | (has(o.profile_photo) << 2)
    | (has(o.fallback_photo) << 22)
    | (has(o.bot_info) << 3)
    | (has(o.pinned_msg_id) << 6)
    | (has(o.folder_id) << 11)
    | (has(o.ttl_period) << 14)
    | (has(o.theme_emoticon) << 15)
    | (has(o.private_forward_name) << 16)
    | (has(o.bot_group_admin_rights) << 17)
    | (has(o.bot_broadcast_admin_rights) << 18)
    | (has(o.premium_gifts) << 19)
    | (has(o.wallpaper) << 24)
    | (has(o.stories) << 25)
  i32(flags)
  i64(o.id)
  flag(str, o.about)
  obj(o.settings)
  flag(obj, o.personal_photo)
  flag(obj, o.profile_photo)
  flag(obj, o.fallback_photo)
  obj(o.notify_settings)
  flag(obj, o.bot_info)
  flag(i32, o.pinned_msg_id)
  i32(o.common_chats_count)
  flag(i32, o.folder_id)
  flag(i32, o.ttl_period)
  flag(str, o.theme_emoticon)
  flag(str, o.private_forward_name)
  flag(obj, o.bot_group_admin_rights)
  flag(obj, o.bot_broadcast_admin_rights)
  flagVector(obj, o.premium_gifts)
  flag(obj, o.wallpaper)
  flag(obj, o.stories)
}

const _contact = (o: any) => {
  i64(o.user_id)
  bool(o.mutual)
}

const _importedContact = (o: any) => {
  i64(o.user_id)
  i64(o.client_id)
}

const _contactStatus = (o: any) => {
  i64(o.user_id)
  obj(o.status)
}

const _contactsContacts = (o: any) => {
  vector(obj, o.contacts)
  i32(o.saved_count)
  vector(obj, o.users)
}

const _contactsImportedContacts = (o: any) => {
  vector(obj, o.imported)
  vector(obj, o.popular_invites)
  vector(i64, o.retry_contacts)
  vector(obj, o.users)
}

const _contactsBlocked = (o: any) => {
  vector(obj, o.blocked)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _contactsBlockedSlice = (o: any) => {
  i32(o.count)
  vector(obj, o.blocked)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesDialogs = (o: any) => {
  vector(obj, o.dialogs)
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesDialogsSlice = (o: any) => {
  i32(o.count)
  vector(obj, o.dialogs)
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesDialogsNotModified = (o: any) => {
  i32(o.count)
}

const _messagesMessages = (o: any) => {
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesMessagesSlice = (o: any) => {
  const flags =
      (has(o.inexact) << 1)
    | has(o.next_rate)
    | (has(o.offset_id_offset) << 2)
  i32(flags)
  i32(o.count)
  flag(i32, o.next_rate)
  flag(i32, o.offset_id_offset)
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesChannelMessages = (o: any) => {
  const flags =
      (has(o.inexact) << 1)
    | (has(o.offset_id_offset) << 2)
  i32(flags)
  i32(o.pts)
  i32(o.count)
  flag(i32, o.offset_id_offset)
  vector(obj, o.messages)
  vector(obj, o.topics)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesMessagesNotModified = (o: any) => {
  i32(o.count)
}

const _messagesChats = (o: any) => {
  vector(obj, o.chats)
}

const _messagesChatsSlice = (o: any) => {
  i32(o.count)
  vector(obj, o.chats)
}

const _messagesChatFull = (o: any) => {
  obj(o.full_chat)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesAffectedHistory = (o: any) => {
  i32(o.pts)
  i32(o.pts_count)
  i32(o.offset)
}

const _inputMessagesFilterPhoneCalls = (o: any) => {
  const flags =
      has(o.missed)
  i32(flags)
}

const _updateNewMessage = (o: any) => {
  obj(o.message)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateMessageID = (o: any) => {
  i32(o.id)
  i64(o.random_id)
}

const _updateDeleteMessages = (o: any) => {
  vector(i32, o.messages)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateUserTyping = (o: any) => {
  i64(o.user_id)
  obj(o.action)
}

const _updateChatUserTyping = (o: any) => {
  i64(o.chat_id)
  obj(o.from_id)
  obj(o.action)
}

const _updateChatParticipants = (o: any) => {
  obj(o.participants)
}

const _updateUserStatus = (o: any) => {
  i64(o.user_id)
  obj(o.status)
}

const _updateUserName = (o: any) => {
  i64(o.user_id)
  str(o.first_name)
  str(o.last_name)
  vector(obj, o.usernames)
}

const _updateNewAuthorization = (o: any) => {
  const flags =
      has(o.unconfirmed)
    | has(o.date)
    | has(o.device)
    | has(o.location)
  i32(flags)
  i64(o.hash)
  flag(i32, o.date)
  flag(str, o.device)
  flag(str, o.location)
}

const _updateNewEncryptedMessage = (o: any) => {
  obj(o.message)
  i32(o.qts)
}

const _updateEncryptedChatTyping = (o: any) => {
  i32(o.chat_id)
}

const _updateEncryption = (o: any) => {
  obj(o.chat)
  i32(o.date)
}

const _updateEncryptedMessagesRead = (o: any) => {
  i32(o.chat_id)
  i32(o.max_date)
  i32(o.date)
}

const _updateChatParticipantAdd = (o: any) => {
  i64(o.chat_id)
  i64(o.user_id)
  i64(o.inviter_id)
  i32(o.date)
  i32(o.version)
}

const _updateChatParticipantDelete = (o: any) => {
  i64(o.chat_id)
  i64(o.user_id)
  i32(o.version)
}

const _updateDcOptions = (o: any) => {
  vector(obj, o.dc_options)
}

const _updateNotifySettings = (o: any) => {
  obj(o.peer)
  obj(o.notify_settings)
}

const _updateServiceNotification = (o: any) => {
  const flags =
      has(o.popup)
    | (has(o.invert_media) << 2)
    | (has(o.inbox_date) << 1)
  i32(flags)
  flag(i32, o.inbox_date)
  str(o.type)
  str(o.message)
  obj(o.media)
  vector(obj, o.entities)
}

const _updatePrivacy = (o: any) => {
  obj(o.key)
  vector(obj, o.rules)
}

const _updateUserPhone = (o: any) => {
  i64(o.user_id)
  str(o.phone)
}

const _updateReadHistoryInbox = (o: any) => {
  const flags =
      has(o.folder_id)
  i32(flags)
  flag(i32, o.folder_id)
  obj(o.peer)
  i32(o.max_id)
  i32(o.still_unread_count)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateReadHistoryOutbox = (o: any) => {
  obj(o.peer)
  i32(o.max_id)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateWebPage = (o: any) => {
  obj(o.webpage)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateReadMessagesContents = (o: any) => {
  const flags =
      has(o.date)
  i32(flags)
  vector(i32, o.messages)
  i32(o.pts)
  i32(o.pts_count)
  flag(i32, o.date)
}

const _updateChannelTooLong = (o: any) => {
  const flags =
      has(o.pts)
  i32(flags)
  i64(o.channel_id)
  flag(i32, o.pts)
}

const _updateChannel = (o: any) => {
  i64(o.channel_id)
}

const _updateNewChannelMessage = (o: any) => {
  obj(o.message)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateReadChannelInbox = (o: any) => {
  const flags =
      has(o.folder_id)
  i32(flags)
  flag(i32, o.folder_id)
  i64(o.channel_id)
  i32(o.max_id)
  i32(o.still_unread_count)
  i32(o.pts)
}

const _updateDeleteChannelMessages = (o: any) => {
  i64(o.channel_id)
  vector(i32, o.messages)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateChannelMessageViews = (o: any) => {
  i64(o.channel_id)
  i32(o.id)
  i32(o.views)
}

const _updateChatParticipantAdmin = (o: any) => {
  i64(o.chat_id)
  i64(o.user_id)
  bool(o.is_admin)
  i32(o.version)
}

const _updateNewStickerSet = (o: any) => {
  obj(o.stickerset)
}

const _updateStickerSetsOrder = (o: any) => {
  const flags =
      has(o.masks)
    | (has(o.emojis) << 1)
  i32(flags)
  vector(i64, o.order)
}

const _updateStickerSets = (o: any) => {
  const flags =
      has(o.masks)
    | (has(o.emojis) << 1)
  i32(flags)
}

const _updateBotInlineQuery = (o: any) => {
  const flags =
      has(o.geo)
    | (has(o.peer_type) << 1)
  i32(flags)
  i64(o.query_id)
  i64(o.user_id)
  str(o.query)
  flag(obj, o.geo)
  flag(obj, o.peer_type)
  str(o.offset)
}

const _updateBotInlineSend = (o: any) => {
  const flags =
      has(o.geo)
    | (has(o.msg_id) << 1)
  i32(flags)
  i64(o.user_id)
  str(o.query)
  flag(obj, o.geo)
  str(o.id)
  flag(obj, o.msg_id)
}

const _updateEditChannelMessage = (o: any) => {
  obj(o.message)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateBotCallbackQuery = (o: any) => {
  const flags =
      has(o.data)
    | (has(o.game_short_name) << 1)
  i32(flags)
  i64(o.query_id)
  i64(o.user_id)
  obj(o.peer)
  i32(o.msg_id)
  i64(o.chat_instance)
  flag(bytes, o.data)
  flag(str, o.game_short_name)
}

const _updateEditMessage = (o: any) => {
  obj(o.message)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateInlineBotCallbackQuery = (o: any) => {
  const flags =
      has(o.data)
    | (has(o.game_short_name) << 1)
  i32(flags)
  i64(o.query_id)
  i64(o.user_id)
  obj(o.msg_id)
  i64(o.chat_instance)
  flag(bytes, o.data)
  flag(str, o.game_short_name)
}

const _updateReadChannelOutbox = (o: any) => {
  i64(o.channel_id)
  i32(o.max_id)
}

const _updateDraftMessage = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.top_msg_id)
  obj(o.draft)
}

const _updateChannelWebPage = (o: any) => {
  i64(o.channel_id)
  obj(o.webpage)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateDialogPinned = (o: any) => {
  const flags =
      has(o.pinned)
    | (has(o.folder_id) << 1)
  i32(flags)
  flag(i32, o.folder_id)
  obj(o.peer)
}

const _updatePinnedDialogs = (o: any) => {
  const flags =
      (has(o.folder_id) << 1)
    | has(o.order)
  i32(flags)
  flag(i32, o.folder_id)
  flagVector(obj, o.order)
}

const _updateBotWebhookJSON = (o: any) => {
  obj(o.data)
}

const _updateBotWebhookJSONQuery = (o: any) => {
  i64(o.query_id)
  obj(o.data)
  i32(o.timeout)
}

const _updateBotShippingQuery = (o: any) => {
  i64(o.query_id)
  i64(o.user_id)
  bytes(o.payload)
  obj(o.shipping_address)
}

const _updateBotPrecheckoutQuery = (o: any) => {
  const flags =
      has(o.info)
    | (has(o.shipping_option_id) << 1)
  i32(flags)
  i64(o.query_id)
  i64(o.user_id)
  bytes(o.payload)
  flag(obj, o.info)
  flag(str, o.shipping_option_id)
  str(o.currency)
  i64(o.total_amount)
}

const _updatePhoneCall = (o: any) => {
  obj(o.phone_call)
}

const _updateLangPackTooLong = (o: any) => {
  str(o.lang_code)
}

const _updateLangPack = (o: any) => {
  obj(o.difference)
}

const _updateChannelReadMessagesContents = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  i64(o.channel_id)
  flag(i32, o.top_msg_id)
  vector(i32, o.messages)
}

const _updateChannelAvailableMessages = (o: any) => {
  i64(o.channel_id)
  i32(o.available_min_id)
}

const _updateDialogUnreadMark = (o: any) => {
  const flags =
      has(o.unread)
  i32(flags)
  obj(o.peer)
}

const _updateMessagePoll = (o: any) => {
  const flags =
      has(o.poll)
  i32(flags)
  i64(o.poll_id)
  flag(obj, o.poll)
  obj(o.results)
}

const _updateChatDefaultBannedRights = (o: any) => {
  obj(o.peer)
  obj(o.default_banned_rights)
  i32(o.version)
}

const _updateFolderPeers = (o: any) => {
  vector(obj, o.folder_peers)
  i32(o.pts)
  i32(o.pts_count)
}

const _updatePeerSettings = (o: any) => {
  obj(o.peer)
  obj(o.settings)
}

const _updatePeerLocated = (o: any) => {
  vector(obj, o.peers)
}

const _updateNewScheduledMessage = (o: any) => {
  obj(o.message)
}

const _updateDeleteScheduledMessages = (o: any) => {
  obj(o.peer)
  vector(i32, o.messages)
}

const _updateTheme = (o: any) => {
  obj(o.theme)
}

const _updateGeoLiveViewed = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
}

const _updateMessagePollVote = (o: any) => {
  i64(o.poll_id)
  obj(o.peer)
  vector(bytes, o.options)
  i32(o.qts)
}

const _updateDialogFilter = (o: any) => {
  const flags =
      has(o.filter)
  i32(flags)
  i32(o.id)
  flag(obj, o.filter)
}

const _updateDialogFilterOrder = (o: any) => {
  vector(i32, o.order)
}

const _updatePhoneCallSignalingData = (o: any) => {
  i64(o.phone_call_id)
  bytes(o.data)
}

const _updateChannelMessageForwards = (o: any) => {
  i64(o.channel_id)
  i32(o.id)
  i32(o.forwards)
}

const _updateReadChannelDiscussionInbox = (o: any) => {
  const flags =
      has(o.broadcast_id)
    | has(o.broadcast_post)
  i32(flags)
  i64(o.channel_id)
  i32(o.top_msg_id)
  i32(o.read_max_id)
  flag(i64, o.broadcast_id)
  flag(i32, o.broadcast_post)
}

const _updateReadChannelDiscussionOutbox = (o: any) => {
  i64(o.channel_id)
  i32(o.top_msg_id)
  i32(o.read_max_id)
}

const _updatePeerBlocked = (o: any) => {
  const flags =
      has(o.blocked)
    | (has(o.blocked_my_stories_from) << 1)
  i32(flags)
  obj(o.peer_id)
}

const _updateChannelUserTyping = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  i64(o.channel_id)
  flag(i32, o.top_msg_id)
  obj(o.from_id)
  obj(o.action)
}

const _updatePinnedMessages = (o: any) => {
  const flags =
      has(o.pinned)
  i32(flags)
  obj(o.peer)
  vector(i32, o.messages)
  i32(o.pts)
  i32(o.pts_count)
}

const _updatePinnedChannelMessages = (o: any) => {
  const flags =
      has(o.pinned)
  i32(flags)
  i64(o.channel_id)
  vector(i32, o.messages)
  i32(o.pts)
  i32(o.pts_count)
}

const _updateChat = (o: any) => {
  i64(o.chat_id)
}

const _updateGroupCallParticipants = (o: any) => {
  obj(o.call)
  vector(obj, o.participants)
  i32(o.version)
}

const _updateGroupCall = (o: any) => {
  i64(o.chat_id)
  obj(o.call)
}

const _updatePeerHistoryTTL = (o: any) => {
  const flags =
      has(o.ttl_period)
  i32(flags)
  obj(o.peer)
  flag(i32, o.ttl_period)
}

const _updateChatParticipant = (o: any) => {
  const flags =
      has(o.prev_participant)
    | (has(o.new_participant) << 1)
    | (has(o.invite) << 2)
  i32(flags)
  i64(o.chat_id)
  i32(o.date)
  i64(o.actor_id)
  i64(o.user_id)
  flag(obj, o.prev_participant)
  flag(obj, o.new_participant)
  flag(obj, o.invite)
  i32(o.qts)
}

const _updateChannelParticipant = (o: any) => {
  const flags =
      (has(o.via_chatlist) << 3)
    | has(o.prev_participant)
    | (has(o.new_participant) << 1)
    | (has(o.invite) << 2)
  i32(flags)
  i64(o.channel_id)
  i32(o.date)
  i64(o.actor_id)
  i64(o.user_id)
  flag(obj, o.prev_participant)
  flag(obj, o.new_participant)
  flag(obj, o.invite)
  i32(o.qts)
}

const _updateBotStopped = (o: any) => {
  i64(o.user_id)
  i32(o.date)
  bool(o.stopped)
  i32(o.qts)
}

const _updateGroupCallConnection = (o: any) => {
  const flags =
      has(o.presentation)
  i32(flags)
  obj(o.params)
}

const _updateBotCommands = (o: any) => {
  obj(o.peer)
  i64(o.bot_id)
  vector(obj, o.commands)
}

const _updatePendingJoinRequests = (o: any) => {
  obj(o.peer)
  i32(o.requests_pending)
  vector(i64, o.recent_requesters)
}

const _updateBotChatInviteRequester = (o: any) => {
  obj(o.peer)
  i32(o.date)
  i64(o.user_id)
  str(o.about)
  obj(o.invite)
  i32(o.qts)
}

const _updateMessageReactions = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  i32(o.msg_id)
  flag(i32, o.top_msg_id)
  obj(o.reactions)
}

const _updateWebViewResultSent = (o: any) => {
  i64(o.query_id)
}

const _updateBotMenuButton = (o: any) => {
  i64(o.bot_id)
  obj(o.button)
}

const _updateTranscribedAudio = (o: any) => {
  const flags =
      has(o.pending)
  i32(flags)
  obj(o.peer)
  i32(o.msg_id)
  i64(o.transcription_id)
  str(o.text)
}

const _updateUserEmojiStatus = (o: any) => {
  i64(o.user_id)
  obj(o.emoji_status)
}

const _updateMoveStickerSetToTop = (o: any) => {
  const flags =
      has(o.masks)
    | (has(o.emojis) << 1)
  i32(flags)
  i64(o.stickerset)
}

const _updateMessageExtendedMedia = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  obj(o.extended_media)
}

const _updateChannelPinnedTopic = (o: any) => {
  const flags =
      has(o.pinned)
  i32(flags)
  i64(o.channel_id)
  i32(o.topic_id)
}

const _updateChannelPinnedTopics = (o: any) => {
  const flags =
      has(o.order)
  i32(flags)
  i64(o.channel_id)
  flagVector(i32, o.order)
}

const _updateUser = (o: any) => {
  i64(o.user_id)
}

const _updateGroupInvitePrivacyForbidden = (o: any) => {
  i64(o.user_id)
}

const _updateStory = (o: any) => {
  obj(o.peer)
  obj(o.story)
}

const _updateReadStories = (o: any) => {
  obj(o.peer)
  i32(o.max_id)
}

const _updateStoryID = (o: any) => {
  i32(o.id)
  i64(o.random_id)
}

const _updateStoriesStealthMode = (o: any) => {
  obj(o.stealth_mode)
}

const _updateSentStoryReaction = (o: any) => {
  obj(o.peer)
  i32(o.story_id)
  obj(o.reaction)
}

const _updatesState = (o: any) => {
  i32(o.pts)
  i32(o.qts)
  i32(o.date)
  i32(o.seq)
  i32(o.unread_count)
}

const _updatesDifferenceEmpty = (o: any) => {
  i32(o.date)
  i32(o.seq)
}

const _updatesDifference = (o: any) => {
  vector(obj, o.new_messages)
  vector(obj, o.new_encrypted_messages)
  vector(obj, o.other_updates)
  vector(obj, o.chats)
  vector(obj, o.users)
  obj(o.state)
}

const _updatesDifferenceSlice = (o: any) => {
  vector(obj, o.new_messages)
  vector(obj, o.new_encrypted_messages)
  vector(obj, o.other_updates)
  vector(obj, o.chats)
  vector(obj, o.users)
  obj(o.intermediate_state)
}

const _updatesDifferenceTooLong = (o: any) => {
  i32(o.pts)
}

const _updateShortMessage = (o: any) => {
  const flags =
      (has(o.out) << 1)
    | (has(o.mentioned) << 4)
    | (has(o.media_unread) << 5)
    | (has(o.silent) << 13)
    | (has(o.fwd_from) << 2)
    | (has(o.via_bot_id) << 11)
    | (has(o.reply_to) << 3)
    | (has(o.entities) << 7)
    | (has(o.ttl_period) << 25)
  i32(flags)
  i32(o.id)
  i64(o.user_id)
  str(o.message)
  i32(o.pts)
  i32(o.pts_count)
  i32(o.date)
  flag(obj, o.fwd_from)
  flag(i64, o.via_bot_id)
  flag(obj, o.reply_to)
  flagVector(obj, o.entities)
  flag(i32, o.ttl_period)
}

const _updateShortChatMessage = (o: any) => {
  const flags =
      (has(o.out) << 1)
    | (has(o.mentioned) << 4)
    | (has(o.media_unread) << 5)
    | (has(o.silent) << 13)
    | (has(o.fwd_from) << 2)
    | (has(o.via_bot_id) << 11)
    | (has(o.reply_to) << 3)
    | (has(o.entities) << 7)
    | (has(o.ttl_period) << 25)
  i32(flags)
  i32(o.id)
  i64(o.from_id)
  i64(o.chat_id)
  str(o.message)
  i32(o.pts)
  i32(o.pts_count)
  i32(o.date)
  flag(obj, o.fwd_from)
  flag(i64, o.via_bot_id)
  flag(obj, o.reply_to)
  flagVector(obj, o.entities)
  flag(i32, o.ttl_period)
}

const _updateShort = (o: any) => {
  obj(o.update)
  i32(o.date)
}

const _updatesCombined = (o: any) => {
  vector(obj, o.updates)
  vector(obj, o.users)
  vector(obj, o.chats)
  i32(o.date)
  i32(o.seq_start)
  i32(o.seq)
}

const _updates = (o: any) => {
  vector(obj, o.updates)
  vector(obj, o.users)
  vector(obj, o.chats)
  i32(o.date)
  i32(o.seq)
}

const _updateShortSentMessage = (o: any) => {
  const flags =
      (has(o.out) << 1)
    | (has(o.media) << 9)
    | (has(o.entities) << 7)
    | (has(o.ttl_period) << 25)
  i32(flags)
  i32(o.id)
  i32(o.pts)
  i32(o.pts_count)
  i32(o.date)
  flag(obj, o.media)
  flagVector(obj, o.entities)
  flag(i32, o.ttl_period)
}

const _photosPhotos = (o: any) => {
  vector(obj, o.photos)
  vector(obj, o.users)
}

const _photosPhotosSlice = (o: any) => {
  i32(o.count)
  vector(obj, o.photos)
  vector(obj, o.users)
}

const _photosPhoto = (o: any) => {
  obj(o.photo)
  vector(obj, o.users)
}

const _uploadFile = (o: any) => {
  obj(o.type)
  i32(o.mtime)
  bytes(o.bytes)
}

const _uploadFileCdnRedirect = (o: any) => {
  i32(o.dc_id)
  bytes(o.file_token)
  bytes(o.encryption_key)
  bytes(o.encryption_iv)
  vector(obj, o.file_hashes)
}

const _dcOption = (o: any) => {
  const flags =
      has(o.ipv6)
    | (has(o.media_only) << 1)
    | (has(o.tcpo_only) << 2)
    | (has(o.cdn) << 3)
    | (has(o.static) << 4)
    | (has(o.this_port_only) << 5)
    | (has(o.secret) << 10)
  i32(flags)
  i32(o.id)
  str(o.ip_address)
  i32(o.port)
  flag(bytes, o.secret)
}

const _config = (o: any) => {
  const flags =
      (has(o.default_p2p_contacts) << 3)
    | (has(o.preload_featured_stickers) << 4)
    | (has(o.revoke_pm_inbox) << 6)
    | (has(o.blocked_mode) << 8)
    | (has(o.force_try_ipv6) << 14)
    | has(o.tmp_sessions)
    | (has(o.autoupdate_url_prefix) << 7)
    | (has(o.gif_search_username) << 9)
    | (has(o.venue_search_username) << 10)
    | (has(o.img_search_username) << 11)
    | (has(o.static_maps_provider) << 12)
    | (has(o.suggested_lang_code) << 2)
    | (has(o.lang_pack_version) << 2)
    | (has(o.base_lang_pack_version) << 2)
    | (has(o.reactions_default) << 15)
    | (has(o.autologin_token) << 16)
  i32(flags)
  i32(o.date)
  i32(o.expires)
  bool(o.test_mode)
  i32(o.this_dc)
  vector(obj, o.dc_options)
  str(o.dc_txt_domain_name)
  i32(o.chat_size_max)
  i32(o.megagroup_size_max)
  i32(o.forwarded_count_max)
  i32(o.online_update_period_ms)
  i32(o.offline_blur_timeout_ms)
  i32(o.offline_idle_timeout_ms)
  i32(o.online_cloud_timeout_ms)
  i32(o.notify_cloud_delay_ms)
  i32(o.notify_default_delay_ms)
  i32(o.push_chat_period_ms)
  i32(o.push_chat_limit)
  i32(o.edit_time_limit)
  i32(o.revoke_time_limit)
  i32(o.revoke_pm_time_limit)
  i32(o.rating_e_decay)
  i32(o.stickers_recent_limit)
  i32(o.channels_read_media_period)
  flag(i32, o.tmp_sessions)
  i32(o.call_receive_timeout_ms)
  i32(o.call_ring_timeout_ms)
  i32(o.call_connect_timeout_ms)
  i32(o.call_packet_timeout_ms)
  str(o.me_url_prefix)
  flag(str, o.autoupdate_url_prefix)
  flag(str, o.gif_search_username)
  flag(str, o.venue_search_username)
  flag(str, o.img_search_username)
  flag(str, o.static_maps_provider)
  i32(o.caption_length_max)
  i32(o.message_length_max)
  i32(o.webfile_dc_id)
  flag(str, o.suggested_lang_code)
  flag(i32, o.lang_pack_version)
  flag(i32, o.base_lang_pack_version)
  flag(obj, o.reactions_default)
  flag(str, o.autologin_token)
}

const _nearestDc = (o: any) => {
  str(o.country)
  i32(o.this_dc)
  i32(o.nearest_dc)
}

const _helpAppUpdate = (o: any) => {
  const flags =
      has(o.can_not_skip)
    | (has(o.document) << 1)
    | (has(o.url) << 2)
    | (has(o.sticker) << 3)
  i32(flags)
  i32(o.id)
  str(o.version)
  str(o.text)
  vector(obj, o.entities)
  flag(obj, o.document)
  flag(str, o.url)
  flag(obj, o.sticker)
}

const _helpInviteText = (o: any) => {
  str(o.message)
}

const _encryptedChatEmpty = (o: any) => {
  i32(o.id)
}

const _encryptedChatWaiting = (o: any) => {
  i32(o.id)
  i64(o.access_hash)
  i32(o.date)
  i64(o.admin_id)
  i64(o.participant_id)
}

const _encryptedChatRequested = (o: any) => {
  const flags =
      has(o.folder_id)
  i32(flags)
  flag(i32, o.folder_id)
  i32(o.id)
  i64(o.access_hash)
  i32(o.date)
  i64(o.admin_id)
  i64(o.participant_id)
  bytes(o.g_a)
}

const _encryptedChat = (o: any) => {
  i32(o.id)
  i64(o.access_hash)
  i32(o.date)
  i64(o.admin_id)
  i64(o.participant_id)
  bytes(o.g_a_or_b)
  i64(o.key_fingerprint)
}

const _encryptedChatDiscarded = (o: any) => {
  const flags =
      has(o.history_deleted)
  i32(flags)
  i32(o.id)
}

const _inputEncryptedChat = (o: any) => {
  i32(o.chat_id)
  i64(o.access_hash)
}

const _encryptedFile = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
  i64(o.size)
  i32(o.dc_id)
  i32(o.key_fingerprint)
}

const _inputEncryptedFileUploaded = (o: any) => {
  i64(o.id)
  i32(o.parts)
  str(o.md5_checksum)
  i32(o.key_fingerprint)
}

const _inputEncryptedFile = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _inputEncryptedFileBigUploaded = (o: any) => {
  i64(o.id)
  i32(o.parts)
  i32(o.key_fingerprint)
}

const _encryptedMessage = (o: any) => {
  i64(o.random_id)
  i32(o.chat_id)
  i32(o.date)
  bytes(o.bytes)
  obj(o.file)
}

const _encryptedMessageService = (o: any) => {
  i64(o.random_id)
  i32(o.chat_id)
  i32(o.date)
  bytes(o.bytes)
}

const _messagesDhConfigNotModified = (o: any) => {
  bytes(o.random)
}

const _messagesDhConfig = (o: any) => {
  i32(o.g)
  bytes(o.p)
  i32(o.version)
  bytes(o.random)
}

const _messagesSentEncryptedMessage = (o: any) => {
  i32(o.date)
}

const _messagesSentEncryptedFile = (o: any) => {
  i32(o.date)
  obj(o.file)
}

const _inputDocument = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
  bytes(o.file_reference)
}

const _documentEmpty = (o: any) => {
  i64(o.id)
}

const _document = (o: any) => {
  const flags =
      has(o.thumbs)
    | (has(o.video_thumbs) << 1)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  bytes(o.file_reference)
  i32(o.date)
  str(o.mime_type)
  i64(o.size)
  flagVector(obj, o.thumbs)
  flagVector(obj, o.video_thumbs)
  i32(o.dc_id)
  vector(obj, o.attributes)
}

const _helpSupport = (o: any) => {
  str(o.phone_number)
  obj(o.user)
}

const _notifyPeer = (o: any) => {
  obj(o.peer)
}

const _notifyForumTopic = (o: any) => {
  obj(o.peer)
  i32(o.top_msg_id)
}

const _sendMessageUploadVideoAction = (o: any) => {
  i32(o.progress)
}

const _sendMessageUploadAudioAction = (o: any) => {
  i32(o.progress)
}

const _sendMessageUploadPhotoAction = (o: any) => {
  i32(o.progress)
}

const _sendMessageUploadDocumentAction = (o: any) => {
  i32(o.progress)
}

const _sendMessageUploadRoundAction = (o: any) => {
  i32(o.progress)
}

const _sendMessageHistoryImportAction = (o: any) => {
  i32(o.progress)
}

const _sendMessageEmojiInteraction = (o: any) => {
  str(o.emoticon)
  i32(o.msg_id)
  obj(o.interaction)
}

const _sendMessageEmojiInteractionSeen = (o: any) => {
  str(o.emoticon)
}

const _contactsFound = (o: any) => {
  vector(obj, o.my_results)
  vector(obj, o.results)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _inputPrivacyValueAllowUsers = (o: any) => {
  vector(obj, o.users)
}

const _inputPrivacyValueDisallowUsers = (o: any) => {
  vector(obj, o.users)
}

const _inputPrivacyValueAllowChatParticipants = (o: any) => {
  vector(i64, o.chats)
}

const _inputPrivacyValueDisallowChatParticipants = (o: any) => {
  vector(i64, o.chats)
}

const _privacyValueAllowUsers = (o: any) => {
  vector(i64, o.users)
}

const _privacyValueDisallowUsers = (o: any) => {
  vector(i64, o.users)
}

const _privacyValueAllowChatParticipants = (o: any) => {
  vector(i64, o.chats)
}

const _privacyValueDisallowChatParticipants = (o: any) => {
  vector(i64, o.chats)
}

const _accountPrivacyRules = (o: any) => {
  vector(obj, o.rules)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _accountDaysTTL = (o: any) => {
  i32(o.days)
}

const _documentAttributeImageSize = (o: any) => {
  i32(o.w)
  i32(o.h)
}

const _documentAttributeSticker = (o: any) => {
  const flags =
      (has(o.mask) << 1)
    | has(o.mask_coords)
  i32(flags)
  str(o.alt)
  obj(o.stickerset)
  flag(obj, o.mask_coords)
}

const _documentAttributeVideo = (o: any) => {
  const flags =
      has(o.round_message)
    | (has(o.supports_streaming) << 1)
    | (has(o.nosound) << 3)
    | (has(o.preload_prefix_size) << 2)
  i32(flags)
  f64(o.duration)
  i32(o.w)
  i32(o.h)
  flag(i32, o.preload_prefix_size)
}

const _documentAttributeAudio = (o: any) => {
  const flags =
      (has(o.voice) << 10)
    | has(o.title)
    | (has(o.performer) << 1)
    | (has(o.waveform) << 2)
  i32(flags)
  i32(o.duration)
  flag(str, o.title)
  flag(str, o.performer)
  flag(bytes, o.waveform)
}

const _documentAttributeFilename = (o: any) => {
  str(o.file_name)
}

const _documentAttributeCustomEmoji = (o: any) => {
  const flags =
      has(o.free)
    | (has(o.text_color) << 1)
  i32(flags)
  str(o.alt)
  obj(o.stickerset)
}

const _messagesStickers = (o: any) => {
  i64(o.hash)
  vector(obj, o.stickers)
}

const _stickerPack = (o: any) => {
  str(o.emoticon)
  vector(i64, o.documents)
}

const _messagesAllStickers = (o: any) => {
  i64(o.hash)
  vector(obj, o.sets)
}

const _messagesAffectedMessages = (o: any) => {
  i32(o.pts)
  i32(o.pts_count)
}

const _webPageEmpty = (o: any) => {
  const flags =
      has(o.url)
  i32(flags)
  i64(o.id)
  flag(str, o.url)
}

const _webPagePending = (o: any) => {
  const flags =
      has(o.url)
  i32(flags)
  i64(o.id)
  flag(str, o.url)
  i32(o.date)
}

const _webPage = (o: any) => {
  const flags =
      (has(o.has_large_media) << 13)
    | has(o.type)
    | (has(o.site_name) << 1)
    | (has(o.title) << 2)
    | (has(o.description) << 3)
    | (has(o.photo) << 4)
    | (has(o.embed_url) << 5)
    | (has(o.embed_type) << 5)
    | (has(o.embed_width) << 6)
    | (has(o.embed_height) << 6)
    | (has(o.duration) << 7)
    | (has(o.author) << 8)
    | (has(o.document) << 9)
    | (has(o.cached_page) << 10)
    | (has(o.attributes) << 12)
  i32(flags)
  i64(o.id)
  str(o.url)
  str(o.display_url)
  i32(o.hash)
  flag(str, o.type)
  flag(str, o.site_name)
  flag(str, o.title)
  flag(str, o.description)
  flag(obj, o.photo)
  flag(str, o.embed_url)
  flag(str, o.embed_type)
  flag(i32, o.embed_width)
  flag(i32, o.embed_height)
  flag(i32, o.duration)
  flag(str, o.author)
  flag(obj, o.document)
  flag(obj, o.cached_page)
  flagVector(obj, o.attributes)
}

const _webPageNotModified = (o: any) => {
  const flags =
      has(o.cached_page_views)
  i32(flags)
  flag(i32, o.cached_page_views)
}

const _authorization = (o: any) => {
  const flags =
      has(o.current)
    | (has(o.official_app) << 1)
    | (has(o.password_pending) << 2)
    | (has(o.encrypted_requests_disabled) << 3)
    | (has(o.call_requests_disabled) << 4)
    | (has(o.unconfirmed) << 5)
  i32(flags)
  i64(o.hash)
  str(o.device_model)
  str(o.platform)
  str(o.system_version)
  i32(o.api_id)
  str(o.app_name)
  str(o.app_version)
  i32(o.date_created)
  i32(o.date_active)
  str(o.ip)
  str(o.country)
  str(o.region)
}

const _accountAuthorizations = (o: any) => {
  i32(o.authorization_ttl_days)
  vector(obj, o.authorizations)
}

const _accountPassword = (o: any) => {
  const flags =
      has(o.has_recovery)
    | (has(o.has_secure_values) << 1)
    | (has(o.has_password) << 2)
    | (has(o.current_algo) << 2)
    | (has(o.srp_B) << 2)
    | (has(o.srp_id) << 2)
    | (has(o.hint) << 3)
    | (has(o.email_unconfirmed_pattern) << 4)
    | (has(o.pending_reset_date) << 5)
    | (has(o.login_email_pattern) << 6)
  i32(flags)
  flag(obj, o.current_algo)
  flag(bytes, o.srp_B)
  flag(i64, o.srp_id)
  flag(str, o.hint)
  flag(str, o.email_unconfirmed_pattern)
  obj(o.new_algo)
  obj(o.new_secure_algo)
  bytes(o.secure_random)
  flag(i32, o.pending_reset_date)
  flag(str, o.login_email_pattern)
}

const _accountPasswordSettings = (o: any) => {
  const flags =
      has(o.email)
    | (has(o.secure_settings) << 1)
  i32(flags)
  flag(str, o.email)
  flag(obj, o.secure_settings)
}

const _accountPasswordInputSettings = (o: any) => {
  const flags =
      has(o.new_algo)
    | has(o.new_password_hash)
    | has(o.hint)
    | (has(o.email) << 1)
    | (has(o.new_secure_settings) << 2)
  i32(flags)
  flag(obj, o.new_algo)
  flag(bytes, o.new_password_hash)
  flag(str, o.hint)
  flag(str, o.email)
  flag(obj, o.new_secure_settings)
}

const _authPasswordRecovery = (o: any) => {
  str(o.email_pattern)
}

const _receivedNotifyMessage = (o: any) => {
  i32(o.id)
}

const _chatInviteExported = (o: any) => {
  const flags =
      has(o.revoked)
    | (has(o.permanent) << 5)
    | (has(o.request_needed) << 6)
    | (has(o.start_date) << 4)
    | (has(o.expire_date) << 1)
    | (has(o.usage_limit) << 2)
    | (has(o.usage) << 3)
    | (has(o.requested) << 7)
    | (has(o.title) << 8)
  i32(flags)
  str(o.link)
  i64(o.admin_id)
  i32(o.date)
  flag(i32, o.start_date)
  flag(i32, o.expire_date)
  flag(i32, o.usage_limit)
  flag(i32, o.usage)
  flag(i32, o.requested)
  flag(str, o.title)
}

const _chatInviteAlready = (o: any) => {
  obj(o.chat)
}

const _chatInvite = (o: any) => {
  const flags =
      has(o.channel)
    | (has(o.broadcast) << 1)
    | (has(o.public) << 2)
    | (has(o.megagroup) << 3)
    | (has(o.request_needed) << 6)
    | (has(o.verified) << 7)
    | (has(o.scam) << 8)
    | (has(o.fake) << 9)
    | (has(o.about) << 5)
    | (has(o.participants) << 4)
  i32(flags)
  str(o.title)
  flag(str, o.about)
  obj(o.photo)
  i32(o.participants_count)
  flagVector(obj, o.participants)
  i32(o.color)
}

const _chatInvitePeek = (o: any) => {
  obj(o.chat)
  i32(o.expires)
}

const _inputStickerSetID = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _inputStickerSetShortName = (o: any) => {
  str(o.short_name)
}

const _inputStickerSetDice = (o: any) => {
  str(o.emoticon)
}

const _stickerSet = (o: any) => {
  const flags =
      (has(o.archived) << 1)
    | (has(o.official) << 2)
    | (has(o.masks) << 3)
    | (has(o.animated) << 5)
    | (has(o.videos) << 6)
    | (has(o.emojis) << 7)
    | (has(o.text_color) << 9)
    | has(o.installed_date)
    | (has(o.thumbs) << 4)
    | (has(o.thumb_dc_id) << 4)
    | (has(o.thumb_version) << 4)
    | (has(o.thumb_document_id) << 8)
  i32(flags)
  flag(i32, o.installed_date)
  i64(o.id)
  i64(o.access_hash)
  str(o.title)
  str(o.short_name)
  flagVector(obj, o.thumbs)
  flag(i32, o.thumb_dc_id)
  flag(i32, o.thumb_version)
  flag(i64, o.thumb_document_id)
  i32(o.count)
  i32(o.hash)
}

const _messagesStickerSet = (o: any) => {
  obj(o.set)
  vector(obj, o.packs)
  vector(obj, o.keywords)
  vector(obj, o.documents)
}

const _botCommand = (o: any) => {
  str(o.command)
  str(o.description)
}

const _botInfo = (o: any) => {
  const flags =
      has(o.user_id)
    | (has(o.description) << 1)
    | (has(o.description_photo) << 4)
    | (has(o.description_document) << 5)
    | (has(o.commands) << 2)
    | (has(o.menu_button) << 3)
  i32(flags)
  flag(i64, o.user_id)
  flag(str, o.description)
  flag(obj, o.description_photo)
  flag(obj, o.description_document)
  flagVector(obj, o.commands)
  flag(obj, o.menu_button)
}

const _keyboardButton = (o: any) => {
  str(o.text)
}

const _keyboardButtonUrl = (o: any) => {
  str(o.text)
  str(o.url)
}

const _keyboardButtonCallback = (o: any) => {
  const flags =
      has(o.requires_password)
  i32(flags)
  str(o.text)
  bytes(o.data)
}

const _keyboardButtonRequestPhone = (o: any) => {
  str(o.text)
}

const _keyboardButtonRequestGeoLocation = (o: any) => {
  str(o.text)
}

const _keyboardButtonSwitchInline = (o: any) => {
  const flags =
      has(o.same_peer)
    | (has(o.peer_types) << 1)
  i32(flags)
  str(o.text)
  str(o.query)
  flagVector(obj, o.peer_types)
}

const _keyboardButtonGame = (o: any) => {
  str(o.text)
}

const _keyboardButtonBuy = (o: any) => {
  str(o.text)
}

const _keyboardButtonUrlAuth = (o: any) => {
  const flags =
      has(o.fwd_text)
  i32(flags)
  str(o.text)
  flag(str, o.fwd_text)
  str(o.url)
  i32(o.button_id)
}

const _inputKeyboardButtonUrlAuth = (o: any) => {
  const flags =
      has(o.request_write_access)
    | (has(o.fwd_text) << 1)
  i32(flags)
  str(o.text)
  flag(str, o.fwd_text)
  str(o.url)
  obj(o.bot)
}

const _keyboardButtonRequestPoll = (o: any) => {
  const flags =
      has(o.quiz)
  i32(flags)
  flag(bool, o.quiz)
  str(o.text)
}

const _inputKeyboardButtonUserProfile = (o: any) => {
  str(o.text)
  obj(o.user_id)
}

const _keyboardButtonUserProfile = (o: any) => {
  str(o.text)
  i64(o.user_id)
}

const _keyboardButtonWebView = (o: any) => {
  str(o.text)
  str(o.url)
}

const _keyboardButtonSimpleWebView = (o: any) => {
  str(o.text)
  str(o.url)
}

const _keyboardButtonRequestPeer = (o: any) => {
  str(o.text)
  i32(o.button_id)
  obj(o.peer_type)
}

const _keyboardButtonRow = (o: any) => {
  vector(obj, o.buttons)
}

const _replyKeyboardHide = (o: any) => {
  const flags =
      (has(o.selective) << 2)
  i32(flags)
}

const _replyKeyboardForceReply = (o: any) => {
  const flags =
      (has(o.single_use) << 1)
    | (has(o.selective) << 2)
    | (has(o.placeholder) << 3)
  i32(flags)
  flag(str, o.placeholder)
}

const _replyKeyboardMarkup = (o: any) => {
  const flags =
      has(o.resize)
    | (has(o.single_use) << 1)
    | (has(o.selective) << 2)
    | (has(o.persistent) << 4)
    | (has(o.placeholder) << 3)
  i32(flags)
  vector(obj, o.rows)
  flag(str, o.placeholder)
}

const _replyInlineMarkup = (o: any) => {
  vector(obj, o.rows)
}

const _messageEntityUnknown = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityMention = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityHashtag = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityBotCommand = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityUrl = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityEmail = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityBold = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityItalic = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityCode = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityPre = (o: any) => {
  i32(o.offset)
  i32(o.length)
  str(o.language)
}

const _messageEntityTextUrl = (o: any) => {
  i32(o.offset)
  i32(o.length)
  str(o.url)
}

const _messageEntityMentionName = (o: any) => {
  i32(o.offset)
  i32(o.length)
  i64(o.user_id)
}

const _inputMessageEntityMentionName = (o: any) => {
  i32(o.offset)
  i32(o.length)
  obj(o.user_id)
}

const _messageEntityPhone = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityCashtag = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityUnderline = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityStrike = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityBankCard = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntitySpoiler = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _messageEntityCustomEmoji = (o: any) => {
  i32(o.offset)
  i32(o.length)
  i64(o.document_id)
}

const _messageEntityBlockquote = (o: any) => {
  i32(o.offset)
  i32(o.length)
}

const _inputChannel = (o: any) => {
  i64(o.channel_id)
  i64(o.access_hash)
}

const _inputChannelFromMessage = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  i64(o.channel_id)
}

const _contactsResolvedPeer = (o: any) => {
  obj(o.peer)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messageRange = (o: any) => {
  i32(o.min_id)
  i32(o.max_id)
}

const _updatesChannelDifferenceEmpty = (o: any) => {
  const flags =
      has(o.final)
    | (has(o.timeout) << 1)
  i32(flags)
  i32(o.pts)
  flag(i32, o.timeout)
}

const _updatesChannelDifferenceTooLong = (o: any) => {
  const flags =
      has(o.final)
    | (has(o.timeout) << 1)
  i32(flags)
  flag(i32, o.timeout)
  obj(o.dialog)
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _updatesChannelDifference = (o: any) => {
  const flags =
      has(o.final)
    | (has(o.timeout) << 1)
  i32(flags)
  i32(o.pts)
  flag(i32, o.timeout)
  vector(obj, o.new_messages)
  vector(obj, o.other_updates)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _channelMessagesFilter = (o: any) => {
  const flags =
      (has(o.exclude_new_messages) << 1)
  i32(flags)
  vector(obj, o.ranges)
}

const _channelParticipant = (o: any) => {
  i64(o.user_id)
  i32(o.date)
}

const _channelParticipantSelf = (o: any) => {
  const flags =
      has(o.via_request)
  i32(flags)
  i64(o.user_id)
  i64(o.inviter_id)
  i32(o.date)
}

const _channelParticipantCreator = (o: any) => {
  const flags =
      has(o.rank)
  i32(flags)
  i64(o.user_id)
  obj(o.admin_rights)
  flag(str, o.rank)
}

const _channelParticipantAdmin = (o: any) => {
  const flags =
      has(o.can_edit)
    | (has(o.self) << 1)
    | (has(o.inviter_id) << 1)
    | (has(o.rank) << 2)
  i32(flags)
  i64(o.user_id)
  flag(i64, o.inviter_id)
  i64(o.promoted_by)
  i32(o.date)
  obj(o.admin_rights)
  flag(str, o.rank)
}

const _channelParticipantBanned = (o: any) => {
  const flags =
      has(o.left)
  i32(flags)
  obj(o.peer)
  i64(o.kicked_by)
  i32(o.date)
  obj(o.banned_rights)
}

const _channelParticipantLeft = (o: any) => {
  obj(o.peer)
}

const _channelParticipantsKicked = (o: any) => {
  str(o.q)
}

const _channelParticipantsBanned = (o: any) => {
  str(o.q)
}

const _channelParticipantsSearch = (o: any) => {
  str(o.q)
}

const _channelParticipantsContacts = (o: any) => {
  str(o.q)
}

const _channelParticipantsMentions = (o: any) => {
  const flags =
      has(o.q)
    | (has(o.top_msg_id) << 1)
  i32(flags)
  flag(str, o.q)
  flag(i32, o.top_msg_id)
}

const _channelsChannelParticipants = (o: any) => {
  i32(o.count)
  vector(obj, o.participants)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _channelsChannelParticipant = (o: any) => {
  obj(o.participant)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _helpTermsOfService = (o: any) => {
  const flags =
      has(o.popup)
    | (has(o.min_age_confirm) << 1)
  i32(flags)
  obj(o.id)
  str(o.text)
  vector(obj, o.entities)
  flag(i32, o.min_age_confirm)
}

const _messagesSavedGifs = (o: any) => {
  i64(o.hash)
  vector(obj, o.gifs)
}

const _inputBotInlineMessageMediaAuto = (o: any) => {
  const flags =
      (has(o.invert_media) << 3)
    | (has(o.entities) << 1)
    | (has(o.reply_markup) << 2)
  i32(flags)
  str(o.message)
  flagVector(obj, o.entities)
  flag(obj, o.reply_markup)
}

const _inputBotInlineMessageText = (o: any) => {
  const flags =
      has(o.no_webpage)
    | (has(o.invert_media) << 3)
    | (has(o.entities) << 1)
    | (has(o.reply_markup) << 2)
  i32(flags)
  str(o.message)
  flagVector(obj, o.entities)
  flag(obj, o.reply_markup)
}

const _inputBotInlineMessageMediaGeo = (o: any) => {
  const flags =
      has(o.heading)
    | (has(o.period) << 1)
    | (has(o.proximity_notification_radius) << 3)
    | (has(o.reply_markup) << 2)
  i32(flags)
  obj(o.geo_point)
  flag(i32, o.heading)
  flag(i32, o.period)
  flag(i32, o.proximity_notification_radius)
  flag(obj, o.reply_markup)
}

const _inputBotInlineMessageMediaVenue = (o: any) => {
  const flags =
      (has(o.reply_markup) << 2)
  i32(flags)
  obj(o.geo_point)
  str(o.title)
  str(o.address)
  str(o.provider)
  str(o.venue_id)
  str(o.venue_type)
  flag(obj, o.reply_markup)
}

const _inputBotInlineMessageMediaContact = (o: any) => {
  const flags =
      (has(o.reply_markup) << 2)
  i32(flags)
  str(o.phone_number)
  str(o.first_name)
  str(o.last_name)
  str(o.vcard)
  flag(obj, o.reply_markup)
}

const _inputBotInlineMessageGame = (o: any) => {
  const flags =
      (has(o.reply_markup) << 2)
  i32(flags)
  flag(obj, o.reply_markup)
}

const _inputBotInlineMessageMediaInvoice = (o: any) => {
  const flags =
      has(o.photo)
    | (has(o.reply_markup) << 2)
  i32(flags)
  str(o.title)
  str(o.description)
  flag(obj, o.photo)
  obj(o.invoice)
  bytes(o.payload)
  str(o.provider)
  obj(o.provider_data)
  flag(obj, o.reply_markup)
}

const _inputBotInlineMessageMediaWebPage = (o: any) => {
  const flags =
      (has(o.invert_media) << 3)
    | (has(o.force_large_media) << 4)
    | (has(o.force_small_media) << 5)
    | (has(o.optional) << 6)
    | (has(o.entities) << 1)
    | (has(o.reply_markup) << 2)
  i32(flags)
  str(o.message)
  flagVector(obj, o.entities)
  str(o.url)
  flag(obj, o.reply_markup)
}

const _inputBotInlineResult = (o: any) => {
  const flags =
      (has(o.title) << 1)
    | (has(o.description) << 2)
    | (has(o.url) << 3)
    | (has(o.thumb) << 4)
    | (has(o.content) << 5)
  i32(flags)
  str(o.id)
  str(o.type)
  flag(str, o.title)
  flag(str, o.description)
  flag(str, o.url)
  flag(obj, o.thumb)
  flag(obj, o.content)
  obj(o.send_message)
}

const _inputBotInlineResultPhoto = (o: any) => {
  str(o.id)
  str(o.type)
  obj(o.photo)
  obj(o.send_message)
}

const _inputBotInlineResultDocument = (o: any) => {
  const flags =
      (has(o.title) << 1)
    | (has(o.description) << 2)
  i32(flags)
  str(o.id)
  str(o.type)
  flag(str, o.title)
  flag(str, o.description)
  obj(o.document)
  obj(o.send_message)
}

const _inputBotInlineResultGame = (o: any) => {
  str(o.id)
  str(o.short_name)
  obj(o.send_message)
}

const _botInlineMessageMediaAuto = (o: any) => {
  const flags =
      (has(o.invert_media) << 3)
    | (has(o.entities) << 1)
    | (has(o.reply_markup) << 2)
  i32(flags)
  str(o.message)
  flagVector(obj, o.entities)
  flag(obj, o.reply_markup)
}

const _botInlineMessageText = (o: any) => {
  const flags =
      has(o.no_webpage)
    | (has(o.invert_media) << 3)
    | (has(o.entities) << 1)
    | (has(o.reply_markup) << 2)
  i32(flags)
  str(o.message)
  flagVector(obj, o.entities)
  flag(obj, o.reply_markup)
}

const _botInlineMessageMediaGeo = (o: any) => {
  const flags =
      has(o.heading)
    | (has(o.period) << 1)
    | (has(o.proximity_notification_radius) << 3)
    | (has(o.reply_markup) << 2)
  i32(flags)
  obj(o.geo)
  flag(i32, o.heading)
  flag(i32, o.period)
  flag(i32, o.proximity_notification_radius)
  flag(obj, o.reply_markup)
}

const _botInlineMessageMediaVenue = (o: any) => {
  const flags =
      (has(o.reply_markup) << 2)
  i32(flags)
  obj(o.geo)
  str(o.title)
  str(o.address)
  str(o.provider)
  str(o.venue_id)
  str(o.venue_type)
  flag(obj, o.reply_markup)
}

const _botInlineMessageMediaContact = (o: any) => {
  const flags =
      (has(o.reply_markup) << 2)
  i32(flags)
  str(o.phone_number)
  str(o.first_name)
  str(o.last_name)
  str(o.vcard)
  flag(obj, o.reply_markup)
}

const _botInlineMessageMediaInvoice = (o: any) => {
  const flags =
      (has(o.shipping_address_requested) << 1)
    | (has(o.test) << 3)
    | has(o.photo)
    | (has(o.reply_markup) << 2)
  i32(flags)
  str(o.title)
  str(o.description)
  flag(obj, o.photo)
  str(o.currency)
  i64(o.total_amount)
  flag(obj, o.reply_markup)
}

const _botInlineMessageMediaWebPage = (o: any) => {
  const flags =
      (has(o.invert_media) << 3)
    | (has(o.force_large_media) << 4)
    | (has(o.force_small_media) << 5)
    | (has(o.manual) << 7)
    | (has(o.safe) << 8)
    | (has(o.entities) << 1)
    | (has(o.reply_markup) << 2)
  i32(flags)
  str(o.message)
  flagVector(obj, o.entities)
  str(o.url)
  flag(obj, o.reply_markup)
}

const _botInlineResult = (o: any) => {
  const flags =
      (has(o.title) << 1)
    | (has(o.description) << 2)
    | (has(o.url) << 3)
    | (has(o.thumb) << 4)
    | (has(o.content) << 5)
  i32(flags)
  str(o.id)
  str(o.type)
  flag(str, o.title)
  flag(str, o.description)
  flag(str, o.url)
  flag(obj, o.thumb)
  flag(obj, o.content)
  obj(o.send_message)
}

const _botInlineMediaResult = (o: any) => {
  const flags =
      has(o.photo)
    | (has(o.document) << 1)
    | (has(o.title) << 2)
    | (has(o.description) << 3)
  i32(flags)
  str(o.id)
  str(o.type)
  flag(obj, o.photo)
  flag(obj, o.document)
  flag(str, o.title)
  flag(str, o.description)
  obj(o.send_message)
}

const _messagesBotResults = (o: any) => {
  const flags =
      has(o.gallery)
    | (has(o.next_offset) << 1)
    | (has(o.switch_pm) << 2)
    | (has(o.switch_webview) << 3)
  i32(flags)
  i64(o.query_id)
  flag(str, o.next_offset)
  flag(obj, o.switch_pm)
  flag(obj, o.switch_webview)
  vector(obj, o.results)
  i32(o.cache_time)
  vector(obj, o.users)
}

const _exportedMessageLink = (o: any) => {
  str(o.link)
  str(o.html)
}

const _messageFwdHeader = (o: any) => {
  const flags =
      (has(o.imported) << 7)
    | has(o.from_id)
    | (has(o.from_name) << 5)
    | (has(o.channel_post) << 2)
    | (has(o.post_author) << 3)
    | (has(o.saved_from_peer) << 4)
    | (has(o.saved_from_msg_id) << 4)
    | (has(o.psa_type) << 6)
  i32(flags)
  flag(obj, o.from_id)
  flag(str, o.from_name)
  i32(o.date)
  flag(i32, o.channel_post)
  flag(str, o.post_author)
  flag(obj, o.saved_from_peer)
  flag(i32, o.saved_from_msg_id)
  flag(str, o.psa_type)
}

const _authSentCodeTypeApp = (o: any) => {
  i32(o.length)
}

const _authSentCodeTypeSms = (o: any) => {
  i32(o.length)
}

const _authSentCodeTypeCall = (o: any) => {
  i32(o.length)
}

const _authSentCodeTypeFlashCall = (o: any) => {
  str(o.pattern)
}

const _authSentCodeTypeMissedCall = (o: any) => {
  str(o.prefix)
  i32(o.length)
}

const _authSentCodeTypeEmailCode = (o: any) => {
  const flags =
      has(o.apple_signin_allowed)
    | (has(o.google_signin_allowed) << 1)
    | (has(o.reset_available_period) << 3)
    | (has(o.reset_pending_date) << 4)
  i32(flags)
  str(o.email_pattern)
  i32(o.length)
  flag(i32, o.reset_available_period)
  flag(i32, o.reset_pending_date)
}

const _authSentCodeTypeSetUpEmailRequired = (o: any) => {
  const flags =
      has(o.apple_signin_allowed)
    | (has(o.google_signin_allowed) << 1)
  i32(flags)
}

const _authSentCodeTypeFragmentSms = (o: any) => {
  str(o.url)
  i32(o.length)
}

const _authSentCodeTypeFirebaseSms = (o: any) => {
  const flags =
      has(o.nonce)
    | (has(o.receipt) << 1)
    | (has(o.push_timeout) << 1)
  i32(flags)
  flag(bytes, o.nonce)
  flag(str, o.receipt)
  flag(i32, o.push_timeout)
  i32(o.length)
}

const _messagesBotCallbackAnswer = (o: any) => {
  const flags =
      (has(o.alert) << 1)
    | (has(o.has_url) << 3)
    | (has(o.native_ui) << 4)
    | has(o.message)
    | (has(o.url) << 2)
  i32(flags)
  flag(str, o.message)
  flag(str, o.url)
  i32(o.cache_time)
}

const _messagesMessageEditData = (o: any) => {
  const flags =
      has(o.caption)
  i32(flags)
}

const _inputBotInlineMessageID = (o: any) => {
  i32(o.dc_id)
  i64(o.id)
  i64(o.access_hash)
}

const _inputBotInlineMessageID64 = (o: any) => {
  i32(o.dc_id)
  i64(o.owner_id)
  i32(o.id)
  i64(o.access_hash)
}

const _inlineBotSwitchPM = (o: any) => {
  str(o.text)
  str(o.start_param)
}

const _messagesPeerDialogs = (o: any) => {
  vector(obj, o.dialogs)
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
  obj(o.state)
}

const _topPeer = (o: any) => {
  obj(o.peer)
  f64(o.rating)
}

const _topPeerCategoryPeers = (o: any) => {
  obj(o.category)
  i32(o.count)
  vector(obj, o.peers)
}

const _contactsTopPeers = (o: any) => {
  vector(obj, o.categories)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _draftMessageEmpty = (o: any) => {
  const flags =
      has(o.date)
  i32(flags)
  flag(i32, o.date)
}

const _draftMessage = (o: any) => {
  const flags =
      (has(o.no_webpage) << 1)
    | (has(o.invert_media) << 6)
    | (has(o.reply_to) << 4)
    | (has(o.entities) << 3)
    | (has(o.media) << 5)
  i32(flags)
  flag(obj, o.reply_to)
  str(o.message)
  flagVector(obj, o.entities)
  flag(obj, o.media)
  i32(o.date)
}

const _messagesFeaturedStickersNotModified = (o: any) => {
  i32(o.count)
}

const _messagesFeaturedStickers = (o: any) => {
  const flags =
      has(o.premium)
  i32(flags)
  i64(o.hash)
  i32(o.count)
  vector(obj, o.sets)
  vector(i64, o.unread)
}

const _messagesRecentStickers = (o: any) => {
  i64(o.hash)
  vector(obj, o.packs)
  vector(obj, o.stickers)
  vector(i32, o.dates)
}

const _messagesArchivedStickers = (o: any) => {
  i32(o.count)
  vector(obj, o.sets)
}

const _messagesStickerSetInstallResultArchive = (o: any) => {
  vector(obj, o.sets)
}

const _stickerSetCovered = (o: any) => {
  obj(o.set)
  obj(o.cover)
}

const _stickerSetMultiCovered = (o: any) => {
  obj(o.set)
  vector(obj, o.covers)
}

const _stickerSetFullCovered = (o: any) => {
  obj(o.set)
  vector(obj, o.packs)
  vector(obj, o.keywords)
  vector(obj, o.documents)
}

const _stickerSetNoCovered = (o: any) => {
  obj(o.set)
}

const _maskCoords = (o: any) => {
  i32(o.n)
  f64(o.x)
  f64(o.y)
  f64(o.zoom)
}

const _inputStickeredMediaPhoto = (o: any) => {
  obj(o.id)
}

const _inputStickeredMediaDocument = (o: any) => {
  obj(o.id)
}

const _game = (o: any) => {
  const flags =
      has(o.document)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  str(o.short_name)
  str(o.title)
  str(o.description)
  obj(o.photo)
  flag(obj, o.document)
}

const _inputGameID = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _inputGameShortName = (o: any) => {
  obj(o.bot_id)
  str(o.short_name)
}

const _highScore = (o: any) => {
  i32(o.pos)
  i64(o.user_id)
  i32(o.score)
}

const _messagesHighScores = (o: any) => {
  vector(obj, o.scores)
  vector(obj, o.users)
}

const _textPlain = (o: any) => {
  str(o.text)
}

const _textBold = (o: any) => {
  obj(o.text)
}

const _textItalic = (o: any) => {
  obj(o.text)
}

const _textUnderline = (o: any) => {
  obj(o.text)
}

const _textStrike = (o: any) => {
  obj(o.text)
}

const _textFixed = (o: any) => {
  obj(o.text)
}

const _textUrl = (o: any) => {
  obj(o.text)
  str(o.url)
  i64(o.webpage_id)
}

const _textEmail = (o: any) => {
  obj(o.text)
  str(o.email)
}

const _textConcat = (o: any) => {
  vector(obj, o.texts)
}

const _textSubscript = (o: any) => {
  obj(o.text)
}

const _textSuperscript = (o: any) => {
  obj(o.text)
}

const _textMarked = (o: any) => {
  obj(o.text)
}

const _textPhone = (o: any) => {
  obj(o.text)
  str(o.phone)
}

const _textImage = (o: any) => {
  i64(o.document_id)
  i32(o.w)
  i32(o.h)
}

const _textAnchor = (o: any) => {
  obj(o.text)
  str(o.name)
}

const _pageBlockTitle = (o: any) => {
  obj(o.text)
}

const _pageBlockSubtitle = (o: any) => {
  obj(o.text)
}

const _pageBlockAuthorDate = (o: any) => {
  obj(o.author)
  i32(o.published_date)
}

const _pageBlockHeader = (o: any) => {
  obj(o.text)
}

const _pageBlockSubheader = (o: any) => {
  obj(o.text)
}

const _pageBlockParagraph = (o: any) => {
  obj(o.text)
}

const _pageBlockPreformatted = (o: any) => {
  obj(o.text)
  str(o.language)
}

const _pageBlockFooter = (o: any) => {
  obj(o.text)
}

const _pageBlockAnchor = (o: any) => {
  str(o.name)
}

const _pageBlockList = (o: any) => {
  vector(obj, o.items)
}

const _pageBlockBlockquote = (o: any) => {
  obj(o.text)
  obj(o.caption)
}

const _pageBlockPullquote = (o: any) => {
  obj(o.text)
  obj(o.caption)
}

const _pageBlockPhoto = (o: any) => {
  const flags =
      has(o.url)
    | has(o.webpage_id)
  i32(flags)
  i64(o.photo_id)
  obj(o.caption)
  flag(str, o.url)
  flag(i64, o.webpage_id)
}

const _pageBlockVideo = (o: any) => {
  const flags =
      has(o.autoplay)
    | (has(o.loop) << 1)
  i32(flags)
  i64(o.video_id)
  obj(o.caption)
}

const _pageBlockCover = (o: any) => {
  obj(o.cover)
}

const _pageBlockEmbed = (o: any) => {
  const flags =
      has(o.full_width)
    | (has(o.allow_scrolling) << 3)
    | (has(o.url) << 1)
    | (has(o.html) << 2)
    | (has(o.poster_photo_id) << 4)
    | (has(o.w) << 5)
    | (has(o.h) << 5)
  i32(flags)
  flag(str, o.url)
  flag(str, o.html)
  flag(i64, o.poster_photo_id)
  flag(i32, o.w)
  flag(i32, o.h)
  obj(o.caption)
}

const _pageBlockEmbedPost = (o: any) => {
  str(o.url)
  i64(o.webpage_id)
  i64(o.author_photo_id)
  str(o.author)
  i32(o.date)
  vector(obj, o.blocks)
  obj(o.caption)
}

const _pageBlockCollage = (o: any) => {
  vector(obj, o.items)
  obj(o.caption)
}

const _pageBlockSlideshow = (o: any) => {
  vector(obj, o.items)
  obj(o.caption)
}

const _pageBlockChannel = (o: any) => {
  obj(o.channel)
}

const _pageBlockAudio = (o: any) => {
  i64(o.audio_id)
  obj(o.caption)
}

const _pageBlockKicker = (o: any) => {
  obj(o.text)
}

const _pageBlockTable = (o: any) => {
  const flags =
      has(o.bordered)
    | (has(o.striped) << 1)
  i32(flags)
  obj(o.title)
  vector(obj, o.rows)
}

const _pageBlockOrderedList = (o: any) => {
  vector(obj, o.items)
}

const _pageBlockDetails = (o: any) => {
  const flags =
      has(o.open)
  i32(flags)
  vector(obj, o.blocks)
  obj(o.title)
}

const _pageBlockRelatedArticles = (o: any) => {
  obj(o.title)
  vector(obj, o.articles)
}

const _pageBlockMap = (o: any) => {
  obj(o.geo)
  i32(o.zoom)
  i32(o.w)
  i32(o.h)
  obj(o.caption)
}

const _dataJSON = (o: any) => {
  str(o.data)
}

const _labeledPrice = (o: any) => {
  str(o.label)
  i64(o.amount)
}

const _invoice = (o: any) => {
  const flags =
      has(o.test)
    | (has(o.name_requested) << 1)
    | (has(o.phone_requested) << 2)
    | (has(o.email_requested) << 3)
    | (has(o.shipping_address_requested) << 4)
    | (has(o.flexible) << 5)
    | (has(o.phone_to_provider) << 6)
    | (has(o.email_to_provider) << 7)
    | (has(o.recurring) << 9)
    | (has(o.max_tip_amount) << 8)
    | (has(o.suggested_tip_amounts) << 8)
    | (has(o.terms_url) << 10)
  i32(flags)
  str(o.currency)
  vector(obj, o.prices)
  flag(i64, o.max_tip_amount)
  flagVector(i64, o.suggested_tip_amounts)
  flag(str, o.terms_url)
}

const _paymentCharge = (o: any) => {
  str(o.id)
  str(o.provider_charge_id)
}

const _postAddress = (o: any) => {
  str(o.street_line1)
  str(o.street_line2)
  str(o.city)
  str(o.state)
  str(o.country_iso2)
  str(o.post_code)
}

const _paymentRequestedInfo = (o: any) => {
  const flags =
      has(o.name)
    | (has(o.phone) << 1)
    | (has(o.email) << 2)
    | (has(o.shipping_address) << 3)
  i32(flags)
  flag(str, o.name)
  flag(str, o.phone)
  flag(str, o.email)
  flag(obj, o.shipping_address)
}

const _paymentSavedCredentialsCard = (o: any) => {
  str(o.id)
  str(o.title)
}

const _webDocument = (o: any) => {
  str(o.url)
  i64(o.access_hash)
  i32(o.size)
  str(o.mime_type)
  vector(obj, o.attributes)
}

const _webDocumentNoProxy = (o: any) => {
  str(o.url)
  i32(o.size)
  str(o.mime_type)
  vector(obj, o.attributes)
}

const _inputWebDocument = (o: any) => {
  str(o.url)
  i32(o.size)
  str(o.mime_type)
  vector(obj, o.attributes)
}

const _inputWebFileLocation = (o: any) => {
  str(o.url)
  i64(o.access_hash)
}

const _inputWebFileGeoPointLocation = (o: any) => {
  obj(o.geo_point)
  i64(o.access_hash)
  i32(o.w)
  i32(o.h)
  i32(o.zoom)
  i32(o.scale)
}

const _inputWebFileAudioAlbumThumbLocation = (o: any) => {
  const flags =
      (has(o.small) << 2)
    | has(o.document)
    | (has(o.title) << 1)
    | (has(o.performer) << 1)
  i32(flags)
  flag(obj, o.document)
  flag(str, o.title)
  flag(str, o.performer)
}

const _uploadWebFile = (o: any) => {
  i32(o.size)
  str(o.mime_type)
  obj(o.file_type)
  i32(o.mtime)
  bytes(o.bytes)
}

const _paymentsPaymentForm = (o: any) => {
  const flags =
      (has(o.can_save_credentials) << 2)
    | (has(o.password_missing) << 3)
    | (has(o.photo) << 5)
    | (has(o.native_provider) << 4)
    | (has(o.native_params) << 4)
    | (has(o.additional_methods) << 6)
    | has(o.saved_info)
    | (has(o.saved_credentials) << 1)
  i32(flags)
  i64(o.form_id)
  i64(o.bot_id)
  str(o.title)
  str(o.description)
  flag(obj, o.photo)
  obj(o.invoice)
  i64(o.provider_id)
  str(o.url)
  flag(str, o.native_provider)
  flag(obj, o.native_params)
  flagVector(obj, o.additional_methods)
  flag(obj, o.saved_info)
  flagVector(obj, o.saved_credentials)
  vector(obj, o.users)
}

const _paymentsValidatedRequestedInfo = (o: any) => {
  const flags =
      has(o.id)
    | (has(o.shipping_options) << 1)
  i32(flags)
  flag(str, o.id)
  flagVector(obj, o.shipping_options)
}

const _paymentsPaymentResult = (o: any) => {
  obj(o.updates)
}

const _paymentsPaymentVerificationNeeded = (o: any) => {
  str(o.url)
}

const _paymentsPaymentReceipt = (o: any) => {
  const flags =
      (has(o.photo) << 2)
    | has(o.info)
    | (has(o.shipping) << 1)
    | (has(o.tip_amount) << 3)
  i32(flags)
  i32(o.date)
  i64(o.bot_id)
  i64(o.provider_id)
  str(o.title)
  str(o.description)
  flag(obj, o.photo)
  obj(o.invoice)
  flag(obj, o.info)
  flag(obj, o.shipping)
  flag(i64, o.tip_amount)
  str(o.currency)
  i64(o.total_amount)
  str(o.credentials_title)
  vector(obj, o.users)
}

const _paymentsSavedInfo = (o: any) => {
  const flags =
      (has(o.has_saved_credentials) << 1)
    | has(o.saved_info)
  i32(flags)
  flag(obj, o.saved_info)
}

const _inputPaymentCredentialsSaved = (o: any) => {
  str(o.id)
  bytes(o.tmp_password)
}

const _inputPaymentCredentials = (o: any) => {
  const flags =
      has(o.save)
  i32(flags)
  obj(o.data)
}

const _inputPaymentCredentialsApplePay = (o: any) => {
  obj(o.payment_data)
}

const _inputPaymentCredentialsGooglePay = (o: any) => {
  obj(o.payment_token)
}

const _accountTmpPassword = (o: any) => {
  bytes(o.tmp_password)
  i32(o.valid_until)
}

const _shippingOption = (o: any) => {
  str(o.id)
  str(o.title)
  vector(obj, o.prices)
}

const _inputStickerSetItem = (o: any) => {
  const flags =
      has(o.mask_coords)
    | (has(o.keywords) << 1)
  i32(flags)
  obj(o.document)
  str(o.emoji)
  flag(obj, o.mask_coords)
  flag(str, o.keywords)
}

const _inputPhoneCall = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _phoneCallEmpty = (o: any) => {
  i64(o.id)
}

const _phoneCallWaiting = (o: any) => {
  const flags =
      (has(o.video) << 6)
    | has(o.receive_date)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  i32(o.date)
  i64(o.admin_id)
  i64(o.participant_id)
  obj(o.protocol)
  flag(i32, o.receive_date)
}

const _phoneCallRequested = (o: any) => {
  const flags =
      (has(o.video) << 6)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  i32(o.date)
  i64(o.admin_id)
  i64(o.participant_id)
  bytes(o.g_a_hash)
  obj(o.protocol)
}

const _phoneCallAccepted = (o: any) => {
  const flags =
      (has(o.video) << 6)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  i32(o.date)
  i64(o.admin_id)
  i64(o.participant_id)
  bytes(o.g_b)
  obj(o.protocol)
}

const _phoneCall = (o: any) => {
  const flags =
      (has(o.p2p_allowed) << 5)
    | (has(o.video) << 6)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  i32(o.date)
  i64(o.admin_id)
  i64(o.participant_id)
  bytes(o.g_a_or_b)
  i64(o.key_fingerprint)
  obj(o.protocol)
  vector(obj, o.connections)
  i32(o.start_date)
}

const _phoneCallDiscarded = (o: any) => {
  const flags =
      (has(o.need_rating) << 2)
    | (has(o.need_debug) << 3)
    | (has(o.video) << 6)
    | has(o.reason)
    | (has(o.duration) << 1)
  i32(flags)
  i64(o.id)
  flag(obj, o.reason)
  flag(i32, o.duration)
}

const _phoneConnection = (o: any) => {
  const flags =
      has(o.tcp)
  i32(flags)
  i64(o.id)
  str(o.ip)
  str(o.ipv6)
  i32(o.port)
  bytes(o.peer_tag)
}

const _phoneConnectionWebrtc = (o: any) => {
  const flags =
      has(o.turn)
    | (has(o.stun) << 1)
  i32(flags)
  i64(o.id)
  str(o.ip)
  str(o.ipv6)
  i32(o.port)
  str(o.username)
  str(o.password)
}

const _phoneCallProtocol = (o: any) => {
  const flags =
      has(o.udp_p2p)
    | (has(o.udp_reflector) << 1)
  i32(flags)
  i32(o.min_layer)
  i32(o.max_layer)
  vector(str, o.library_versions)
}

const _phonePhoneCall = (o: any) => {
  obj(o.phone_call)
  vector(obj, o.users)
}

const _uploadCdnFileReuploadNeeded = (o: any) => {
  bytes(o.request_token)
}

const _uploadCdnFile = (o: any) => {
  bytes(o.bytes)
}

const _cdnPublicKey = (o: any) => {
  i32(o.dc_id)
  str(o.public_key)
}

const _cdnConfig = (o: any) => {
  vector(obj, o.public_keys)
}

const _langPackString = (o: any) => {
  str(o.key)
  str(o.value)
}

const _langPackStringPluralized = (o: any) => {
  const flags =
      has(o.zero_value)
    | (has(o.one_value) << 1)
    | (has(o.two_value) << 2)
    | (has(o.few_value) << 3)
    | (has(o.many_value) << 4)
  i32(flags)
  str(o.key)
  flag(str, o.zero_value)
  flag(str, o.one_value)
  flag(str, o.two_value)
  flag(str, o.few_value)
  flag(str, o.many_value)
  str(o.other_value)
}

const _langPackStringDeleted = (o: any) => {
  str(o.key)
}

const _langPackDifference = (o: any) => {
  str(o.lang_code)
  i32(o.from_version)
  i32(o.version)
  vector(obj, o.strings)
}

const _langPackLanguage = (o: any) => {
  const flags =
      has(o.official)
    | (has(o.rtl) << 2)
    | (has(o.beta) << 3)
    | (has(o.base_lang_code) << 1)
  i32(flags)
  str(o.name)
  str(o.native_name)
  str(o.lang_code)
  flag(str, o.base_lang_code)
  str(o.plural_code)
  i32(o.strings_count)
  i32(o.translated_count)
  str(o.translations_url)
}

const _channelAdminLogEventActionChangeTitle = (o: any) => {
  str(o.prev_value)
  str(o.new_value)
}

const _channelAdminLogEventActionChangeAbout = (o: any) => {
  str(o.prev_value)
  str(o.new_value)
}

const _channelAdminLogEventActionChangeUsername = (o: any) => {
  str(o.prev_value)
  str(o.new_value)
}

const _channelAdminLogEventActionChangePhoto = (o: any) => {
  obj(o.prev_photo)
  obj(o.new_photo)
}

const _channelAdminLogEventActionToggleInvites = (o: any) => {
  bool(o.new_value)
}

const _channelAdminLogEventActionToggleSignatures = (o: any) => {
  bool(o.new_value)
}

const _channelAdminLogEventActionUpdatePinned = (o: any) => {
  obj(o.message)
}

const _channelAdminLogEventActionEditMessage = (o: any) => {
  obj(o.prev_message)
  obj(o.new_message)
}

const _channelAdminLogEventActionDeleteMessage = (o: any) => {
  obj(o.message)
}

const _channelAdminLogEventActionParticipantInvite = (o: any) => {
  obj(o.participant)
}

const _channelAdminLogEventActionParticipantToggleBan = (o: any) => {
  obj(o.prev_participant)
  obj(o.new_participant)
}

const _channelAdminLogEventActionParticipantToggleAdmin = (o: any) => {
  obj(o.prev_participant)
  obj(o.new_participant)
}

const _channelAdminLogEventActionChangeStickerSet = (o: any) => {
  obj(o.prev_stickerset)
  obj(o.new_stickerset)
}

const _channelAdminLogEventActionTogglePreHistoryHidden = (o: any) => {
  bool(o.new_value)
}

const _channelAdminLogEventActionDefaultBannedRights = (o: any) => {
  obj(o.prev_banned_rights)
  obj(o.new_banned_rights)
}

const _channelAdminLogEventActionStopPoll = (o: any) => {
  obj(o.message)
}

const _channelAdminLogEventActionChangeLinkedChat = (o: any) => {
  i64(o.prev_value)
  i64(o.new_value)
}

const _channelAdminLogEventActionChangeLocation = (o: any) => {
  obj(o.prev_value)
  obj(o.new_value)
}

const _channelAdminLogEventActionToggleSlowMode = (o: any) => {
  i32(o.prev_value)
  i32(o.new_value)
}

const _channelAdminLogEventActionStartGroupCall = (o: any) => {
  obj(o.call)
}

const _channelAdminLogEventActionDiscardGroupCall = (o: any) => {
  obj(o.call)
}

const _channelAdminLogEventActionParticipantMute = (o: any) => {
  obj(o.participant)
}

const _channelAdminLogEventActionParticipantUnmute = (o: any) => {
  obj(o.participant)
}

const _channelAdminLogEventActionToggleGroupCallSetting = (o: any) => {
  bool(o.join_muted)
}

const _channelAdminLogEventActionParticipantJoinByInvite = (o: any) => {
  const flags =
      has(o.via_chatlist)
  i32(flags)
  obj(o.invite)
}

const _channelAdminLogEventActionExportedInviteDelete = (o: any) => {
  obj(o.invite)
}

const _channelAdminLogEventActionExportedInviteRevoke = (o: any) => {
  obj(o.invite)
}

const _channelAdminLogEventActionExportedInviteEdit = (o: any) => {
  obj(o.prev_invite)
  obj(o.new_invite)
}

const _channelAdminLogEventActionParticipantVolume = (o: any) => {
  obj(o.participant)
}

const _channelAdminLogEventActionChangeHistoryTTL = (o: any) => {
  i32(o.prev_value)
  i32(o.new_value)
}

const _channelAdminLogEventActionParticipantJoinByRequest = (o: any) => {
  obj(o.invite)
  i64(o.approved_by)
}

const _channelAdminLogEventActionToggleNoForwards = (o: any) => {
  bool(o.new_value)
}

const _channelAdminLogEventActionSendMessage = (o: any) => {
  obj(o.message)
}

const _channelAdminLogEventActionChangeAvailableReactions = (o: any) => {
  obj(o.prev_value)
  obj(o.new_value)
}

const _channelAdminLogEventActionChangeUsernames = (o: any) => {
  vector(str, o.prev_value)
  vector(str, o.new_value)
}

const _channelAdminLogEventActionToggleForum = (o: any) => {
  bool(o.new_value)
}

const _channelAdminLogEventActionCreateTopic = (o: any) => {
  obj(o.topic)
}

const _channelAdminLogEventActionEditTopic = (o: any) => {
  obj(o.prev_topic)
  obj(o.new_topic)
}

const _channelAdminLogEventActionDeleteTopic = (o: any) => {
  obj(o.topic)
}

const _channelAdminLogEventActionPinTopic = (o: any) => {
  const flags =
      has(o.prev_topic)
    | (has(o.new_topic) << 1)
  i32(flags)
  flag(obj, o.prev_topic)
  flag(obj, o.new_topic)
}

const _channelAdminLogEventActionToggleAntiSpam = (o: any) => {
  bool(o.new_value)
}

const _channelAdminLogEventActionChangeColor = (o: any) => {
  i32(o.prev_value)
  i32(o.new_value)
}

const _channelAdminLogEventActionChangeBackgroundEmoji = (o: any) => {
  i64(o.prev_value)
  i64(o.new_value)
}

const _channelAdminLogEvent = (o: any) => {
  i64(o.id)
  i32(o.date)
  i64(o.user_id)
  obj(o.action)
}

const _channelsAdminLogResults = (o: any) => {
  vector(obj, o.events)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _channelAdminLogEventsFilter = (o: any) => {
  const flags =
      has(o.join)
    | (has(o.leave) << 1)
    | (has(o.invite) << 2)
    | (has(o.ban) << 3)
    | (has(o.unban) << 4)
    | (has(o.kick) << 5)
    | (has(o.unkick) << 6)
    | (has(o.promote) << 7)
    | (has(o.demote) << 8)
    | (has(o.info) << 9)
    | (has(o.settings) << 10)
    | (has(o.pinned) << 11)
    | (has(o.edit) << 12)
    | (has(o.delete) << 13)
    | (has(o.group_call) << 14)
    | (has(o.invites) << 15)
    | (has(o.send) << 16)
    | (has(o.forums) << 17)
  i32(flags)
}

const _popularContact = (o: any) => {
  i64(o.client_id)
  i32(o.importers)
}

const _messagesFavedStickers = (o: any) => {
  i64(o.hash)
  vector(obj, o.packs)
  vector(obj, o.stickers)
}

const _recentMeUrlUnknown = (o: any) => {
  str(o.url)
}

const _recentMeUrlUser = (o: any) => {
  str(o.url)
  i64(o.user_id)
}

const _recentMeUrlChat = (o: any) => {
  str(o.url)
  i64(o.chat_id)
}

const _recentMeUrlChatInvite = (o: any) => {
  str(o.url)
  obj(o.chat_invite)
}

const _recentMeUrlStickerSet = (o: any) => {
  str(o.url)
  obj(o.set)
}

const _helpRecentMeUrls = (o: any) => {
  vector(obj, o.urls)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _inputSingleMedia = (o: any) => {
  const flags =
      has(o.entities)
  i32(flags)
  obj(o.media)
  i64(o.random_id)
  str(o.message)
  flagVector(obj, o.entities)
}

const _webAuthorization = (o: any) => {
  i64(o.hash)
  i64(o.bot_id)
  str(o.domain)
  str(o.browser)
  str(o.platform)
  i32(o.date_created)
  i32(o.date_active)
  str(o.ip)
  str(o.region)
}

const _accountWebAuthorizations = (o: any) => {
  vector(obj, o.authorizations)
  vector(obj, o.users)
}

const _inputMessageID = (o: any) => {
  i32(o.id)
}

const _inputMessageReplyTo = (o: any) => {
  i32(o.id)
}

const _inputMessageCallbackQuery = (o: any) => {
  i32(o.id)
  i64(o.query_id)
}

const _inputDialogPeer = (o: any) => {
  obj(o.peer)
}

const _inputDialogPeerFolder = (o: any) => {
  i32(o.folder_id)
}

const _dialogPeer = (o: any) => {
  obj(o.peer)
}

const _dialogPeerFolder = (o: any) => {
  i32(o.folder_id)
}

const _messagesFoundStickerSets = (o: any) => {
  i64(o.hash)
  vector(obj, o.sets)
}

const _fileHash = (o: any) => {
  i64(o.offset)
  i32(o.limit)
  bytes(o.hash)
}

const _inputClientProxy = (o: any) => {
  str(o.address)
  i32(o.port)
}

const _helpTermsOfServiceUpdateEmpty = (o: any) => {
  i32(o.expires)
}

const _helpTermsOfServiceUpdate = (o: any) => {
  i32(o.expires)
  obj(o.terms_of_service)
}

const _inputSecureFileUploaded = (o: any) => {
  i64(o.id)
  i32(o.parts)
  str(o.md5_checksum)
  bytes(o.file_hash)
  bytes(o.secret)
}

const _inputSecureFile = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _secureFile = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
  i64(o.size)
  i32(o.dc_id)
  i32(o.date)
  bytes(o.file_hash)
  bytes(o.secret)
}

const _secureData = (o: any) => {
  bytes(o.data)
  bytes(o.data_hash)
  bytes(o.secret)
}

const _securePlainPhone = (o: any) => {
  str(o.phone)
}

const _securePlainEmail = (o: any) => {
  str(o.email)
}

const _secureValue = (o: any) => {
  const flags =
      has(o.data)
    | (has(o.front_side) << 1)
    | (has(o.reverse_side) << 2)
    | (has(o.selfie) << 3)
    | (has(o.translation) << 6)
    | (has(o.files) << 4)
    | (has(o.plain_data) << 5)
  i32(flags)
  obj(o.type)
  flag(obj, o.data)
  flag(obj, o.front_side)
  flag(obj, o.reverse_side)
  flag(obj, o.selfie)
  flagVector(obj, o.translation)
  flagVector(obj, o.files)
  flag(obj, o.plain_data)
  bytes(o.hash)
}

const _inputSecureValue = (o: any) => {
  const flags =
      has(o.data)
    | (has(o.front_side) << 1)
    | (has(o.reverse_side) << 2)
    | (has(o.selfie) << 3)
    | (has(o.translation) << 6)
    | (has(o.files) << 4)
    | (has(o.plain_data) << 5)
  i32(flags)
  obj(o.type)
  flag(obj, o.data)
  flag(obj, o.front_side)
  flag(obj, o.reverse_side)
  flag(obj, o.selfie)
  flagVector(obj, o.translation)
  flagVector(obj, o.files)
  flag(obj, o.plain_data)
}

const _secureValueHash = (o: any) => {
  obj(o.type)
  bytes(o.hash)
}

const _secureValueErrorData = (o: any) => {
  obj(o.type)
  bytes(o.data_hash)
  str(o.field)
  str(o.text)
}

const _secureValueErrorFrontSide = (o: any) => {
  obj(o.type)
  bytes(o.file_hash)
  str(o.text)
}

const _secureValueErrorReverseSide = (o: any) => {
  obj(o.type)
  bytes(o.file_hash)
  str(o.text)
}

const _secureValueErrorSelfie = (o: any) => {
  obj(o.type)
  bytes(o.file_hash)
  str(o.text)
}

const _secureValueErrorFile = (o: any) => {
  obj(o.type)
  bytes(o.file_hash)
  str(o.text)
}

const _secureValueErrorFiles = (o: any) => {
  obj(o.type)
  vector(bytes, o.file_hash)
  str(o.text)
}

const _secureValueError = (o: any) => {
  obj(o.type)
  bytes(o.hash)
  str(o.text)
}

const _secureValueErrorTranslationFile = (o: any) => {
  obj(o.type)
  bytes(o.file_hash)
  str(o.text)
}

const _secureValueErrorTranslationFiles = (o: any) => {
  obj(o.type)
  vector(bytes, o.file_hash)
  str(o.text)
}

const _secureCredentialsEncrypted = (o: any) => {
  bytes(o.data)
  bytes(o.hash)
  bytes(o.secret)
}

const _accountAuthorizationForm = (o: any) => {
  const flags =
      has(o.privacy_policy_url)
  i32(flags)
  vector(obj, o.required_types)
  vector(obj, o.values)
  vector(obj, o.errors)
  vector(obj, o.users)
  flag(str, o.privacy_policy_url)
}

const _accountSentEmailCode = (o: any) => {
  str(o.email_pattern)
  i32(o.length)
}

const _helpDeepLinkInfo = (o: any) => {
  const flags =
      has(o.update_app)
    | (has(o.entities) << 1)
  i32(flags)
  str(o.message)
  flagVector(obj, o.entities)
}

const _savedPhoneContact = (o: any) => {
  str(o.phone)
  str(o.first_name)
  str(o.last_name)
  i32(o.date)
}

const _accountTakeout = (o: any) => {
  i64(o.id)
}

const _passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow = (o: any) => {
  bytes(o.salt1)
  bytes(o.salt2)
  i32(o.g)
  bytes(o.p)
}

const _securePasswordKdfAlgoPBKDF2HMACSHA512iter100000 = (o: any) => {
  bytes(o.salt)
}

const _securePasswordKdfAlgoSHA512 = (o: any) => {
  bytes(o.salt)
}

const _secureSecretSettings = (o: any) => {
  obj(o.secure_algo)
  bytes(o.secure_secret)
  i64(o.secure_secret_id)
}

const _inputCheckPasswordSRP = (o: any) => {
  i64(o.srp_id)
  bytes(o.A)
  bytes(o.M1)
}

const _secureRequiredType = (o: any) => {
  const flags =
      has(o.native_names)
    | (has(o.selfie_required) << 1)
    | (has(o.translation_required) << 2)
  i32(flags)
  obj(o.type)
}

const _secureRequiredTypeOneOf = (o: any) => {
  vector(obj, o.types)
}

const _helpPassportConfig = (o: any) => {
  i32(o.hash)
  obj(o.countries_langs)
}

const _inputAppEvent = (o: any) => {
  f64(o.time)
  str(o.type)
  i64(o.peer)
  obj(o.data)
}

const _jsonObjectValue = (o: any) => {
  str(o.key)
  obj(o.value)
}

const _jsonBool = (o: any) => {
  bool(o.value)
}

const _jsonNumber = (o: any) => {
  f64(o.value)
}

const _jsonString = (o: any) => {
  str(o.value)
}

const _jsonArray = (o: any) => {
  vector(obj, o.value)
}

const _jsonObject = (o: any) => {
  vector(obj, o.value)
}

const _pageTableCell = (o: any) => {
  const flags =
      has(o.header)
    | (has(o.align_center) << 3)
    | (has(o.align_right) << 4)
    | (has(o.valign_middle) << 5)
    | (has(o.valign_bottom) << 6)
    | (has(o.text) << 7)
    | (has(o.colspan) << 1)
    | (has(o.rowspan) << 2)
  i32(flags)
  flag(obj, o.text)
  flag(i32, o.colspan)
  flag(i32, o.rowspan)
}

const _pageTableRow = (o: any) => {
  vector(obj, o.cells)
}

const _pageCaption = (o: any) => {
  obj(o.text)
  obj(o.credit)
}

const _pageListItemText = (o: any) => {
  obj(o.text)
}

const _pageListItemBlocks = (o: any) => {
  vector(obj, o.blocks)
}

const _pageListOrderedItemText = (o: any) => {
  str(o.num)
  obj(o.text)
}

const _pageListOrderedItemBlocks = (o: any) => {
  str(o.num)
  vector(obj, o.blocks)
}

const _pageRelatedArticle = (o: any) => {
  const flags =
      has(o.title)
    | (has(o.description) << 1)
    | (has(o.photo_id) << 2)
    | (has(o.author) << 3)
    | (has(o.published_date) << 4)
  i32(flags)
  str(o.url)
  i64(o.webpage_id)
  flag(str, o.title)
  flag(str, o.description)
  flag(i64, o.photo_id)
  flag(str, o.author)
  flag(i32, o.published_date)
}

const _page = (o: any) => {
  const flags =
      has(o.part)
    | (has(o.rtl) << 1)
    | (has(o.v2) << 2)
    | (has(o.views) << 3)
  i32(flags)
  str(o.url)
  vector(obj, o.blocks)
  vector(obj, o.photos)
  vector(obj, o.documents)
  flag(i32, o.views)
}

const _helpSupportName = (o: any) => {
  str(o.name)
}

const _helpUserInfo = (o: any) => {
  str(o.message)
  vector(obj, o.entities)
  str(o.author)
  i32(o.date)
}

const _pollAnswer = (o: any) => {
  str(o.text)
  bytes(o.option)
}

const _poll = (o: any) => {
  const flags =
      has(o.closed)
    | (has(o.public_voters) << 1)
    | (has(o.multiple_choice) << 2)
    | (has(o.quiz) << 3)
    | (has(o.close_period) << 4)
    | (has(o.close_date) << 5)
  i32(flags)
  i64(o.id)
  str(o.question)
  vector(obj, o.answers)
  flag(i32, o.close_period)
  flag(i32, o.close_date)
}

const _pollAnswerVoters = (o: any) => {
  const flags =
      has(o.chosen)
    | (has(o.correct) << 1)
  i32(flags)
  bytes(o.option)
  i32(o.voters)
}

const _pollResults = (o: any) => {
  const flags =
      has(o.min)
    | (has(o.results) << 1)
    | (has(o.total_voters) << 2)
    | (has(o.recent_voters) << 3)
    | (has(o.solution) << 4)
    | (has(o.solution_entities) << 4)
  i32(flags)
  flagVector(obj, o.results)
  flag(i32, o.total_voters)
  flagVector(obj, o.recent_voters)
  flag(str, o.solution)
  flagVector(obj, o.solution_entities)
}

const _chatOnlines = (o: any) => {
  i32(o.onlines)
}

const _statsURL = (o: any) => {
  str(o.url)
}

const _chatAdminRights = (o: any) => {
  const flags =
      has(o.change_info)
    | (has(o.post_messages) << 1)
    | (has(o.edit_messages) << 2)
    | (has(o.delete_messages) << 3)
    | (has(o.ban_users) << 4)
    | (has(o.invite_users) << 5)
    | (has(o.pin_messages) << 7)
    | (has(o.add_admins) << 9)
    | (has(o.anonymous) << 10)
    | (has(o.manage_call) << 11)
    | (has(o.other) << 12)
    | (has(o.manage_topics) << 13)
    | (has(o.post_stories) << 14)
    | (has(o.edit_stories) << 15)
    | (has(o.delete_stories) << 16)
  i32(flags)
}

const _chatBannedRights = (o: any) => {
  const flags =
      has(o.view_messages)
    | (has(o.send_messages) << 1)
    | (has(o.send_media) << 2)
    | (has(o.send_stickers) << 3)
    | (has(o.send_gifs) << 4)
    | (has(o.send_games) << 5)
    | (has(o.send_inline) << 6)
    | (has(o.embed_links) << 7)
    | (has(o.send_polls) << 8)
    | (has(o.change_info) << 10)
    | (has(o.invite_users) << 15)
    | (has(o.pin_messages) << 17)
    | (has(o.manage_topics) << 18)
    | (has(o.send_photos) << 19)
    | (has(o.send_videos) << 20)
    | (has(o.send_roundvideos) << 21)
    | (has(o.send_audios) << 22)
    | (has(o.send_voices) << 23)
    | (has(o.send_docs) << 24)
    | (has(o.send_plain) << 25)
  i32(flags)
  i32(o.until_date)
}

const _inputWallPaper = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _inputWallPaperSlug = (o: any) => {
  str(o.slug)
}

const _inputWallPaperNoFile = (o: any) => {
  i64(o.id)
}

const _accountWallPapers = (o: any) => {
  i64(o.hash)
  vector(obj, o.wallpapers)
}

const _codeSettings = (o: any) => {
  const flags =
      has(o.allow_flashcall)
    | (has(o.current_number) << 1)
    | (has(o.allow_app_hash) << 4)
    | (has(o.allow_missed_call) << 5)
    | (has(o.allow_firebase) << 7)
    | (has(o.logout_tokens) << 6)
    | (has(o.token) << 8)
    | (has(o.app_sandbox) << 8)
  i32(flags)
  flagVector(bytes, o.logout_tokens)
  flag(str, o.token)
  flag(bool, o.app_sandbox)
}

const _wallPaperSettings = (o: any) => {
  const flags =
      (has(o.blur) << 1)
    | (has(o.motion) << 2)
    | has(o.background_color)
    | (has(o.second_background_color) << 4)
    | (has(o.third_background_color) << 5)
    | (has(o.fourth_background_color) << 6)
    | (has(o.intensity) << 3)
    | (has(o.rotation) << 4)
  i32(flags)
  flag(i32, o.background_color)
  flag(i32, o.second_background_color)
  flag(i32, o.third_background_color)
  flag(i32, o.fourth_background_color)
  flag(i32, o.intensity)
  flag(i32, o.rotation)
}

const _autoDownloadSettings = (o: any) => {
  const flags =
      has(o.disabled)
    | (has(o.video_preload_large) << 1)
    | (has(o.audio_preload_next) << 2)
    | (has(o.phonecalls_less_data) << 3)
    | (has(o.stories_preload) << 4)
  i32(flags)
  i32(o.photo_size_max)
  i64(o.video_size_max)
  i64(o.file_size_max)
  i32(o.video_upload_maxbitrate)
  i32(o.small_queue_active_operations_max)
  i32(o.large_queue_active_operations_max)
}

const _accountAutoDownloadSettings = (o: any) => {
  obj(o.low)
  obj(o.medium)
  obj(o.high)
}

const _emojiKeyword = (o: any) => {
  str(o.keyword)
  vector(str, o.emoticons)
}

const _emojiKeywordDeleted = (o: any) => {
  str(o.keyword)
  vector(str, o.emoticons)
}

const _emojiKeywordsDifference = (o: any) => {
  str(o.lang_code)
  i32(o.from_version)
  i32(o.version)
  vector(obj, o.keywords)
}

const _emojiURL = (o: any) => {
  str(o.url)
}

const _emojiLanguage = (o: any) => {
  str(o.lang_code)
}

const _folder = (o: any) => {
  const flags =
      has(o.autofill_new_broadcasts)
    | (has(o.autofill_public_groups) << 1)
    | (has(o.autofill_new_correspondents) << 2)
    | (has(o.photo) << 3)
  i32(flags)
  i32(o.id)
  str(o.title)
  flag(obj, o.photo)
}

const _inputFolderPeer = (o: any) => {
  obj(o.peer)
  i32(o.folder_id)
}

const _folderPeer = (o: any) => {
  obj(o.peer)
  i32(o.folder_id)
}

const _messagesSearchCounter = (o: any) => {
  const flags =
      (has(o.inexact) << 1)
  i32(flags)
  obj(o.filter)
  i32(o.count)
}

const _urlAuthResultRequest = (o: any) => {
  const flags =
      has(o.request_write_access)
  i32(flags)
  obj(o.bot)
  str(o.domain)
}

const _urlAuthResultAccepted = (o: any) => {
  str(o.url)
}

const _channelLocation = (o: any) => {
  obj(o.geo_point)
  str(o.address)
}

const _peerLocated = (o: any) => {
  obj(o.peer)
  i32(o.expires)
  i32(o.distance)
}

const _peerSelfLocated = (o: any) => {
  i32(o.expires)
}

const _restrictionReason = (o: any) => {
  str(o.platform)
  str(o.reason)
  str(o.text)
}

const _inputTheme = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _inputThemeSlug = (o: any) => {
  str(o.slug)
}

const _theme = (o: any) => {
  const flags =
      has(o.creator)
    | (has(o.default) << 1)
    | (has(o.for_chat) << 5)
    | (has(o.document) << 2)
    | (has(o.settings) << 3)
    | (has(o.emoticon) << 6)
    | (has(o.installs_count) << 4)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  str(o.slug)
  str(o.title)
  flag(obj, o.document)
  flagVector(obj, o.settings)
  flag(str, o.emoticon)
  flag(i32, o.installs_count)
}

const _accountThemes = (o: any) => {
  i64(o.hash)
  vector(obj, o.themes)
}

const _authLoginToken = (o: any) => {
  i32(o.expires)
  bytes(o.token)
}

const _authLoginTokenMigrateTo = (o: any) => {
  i32(o.dc_id)
  bytes(o.token)
}

const _authLoginTokenSuccess = (o: any) => {
  obj(o.authorization)
}

const _accountContentSettings = (o: any) => {
  const flags =
      has(o.sensitive_enabled)
    | (has(o.sensitive_can_change) << 1)
  i32(flags)
}

const _messagesInactiveChats = (o: any) => {
  vector(i32, o.dates)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _inputThemeSettings = (o: any) => {
  const flags =
      (has(o.message_colors_animated) << 2)
    | (has(o.outbox_accent_color) << 3)
    | has(o.message_colors)
    | (has(o.wallpaper) << 1)
    | (has(o.wallpaper_settings) << 1)
  i32(flags)
  obj(o.base_theme)
  i32(o.accent_color)
  flag(i32, o.outbox_accent_color)
  flagVector(i32, o.message_colors)
  flag(obj, o.wallpaper)
  flag(obj, o.wallpaper_settings)
}

const _themeSettings = (o: any) => {
  const flags =
      (has(o.message_colors_animated) << 2)
    | (has(o.outbox_accent_color) << 3)
    | has(o.message_colors)
    | (has(o.wallpaper) << 1)
  i32(flags)
  obj(o.base_theme)
  i32(o.accent_color)
  flag(i32, o.outbox_accent_color)
  flagVector(i32, o.message_colors)
  flag(obj, o.wallpaper)
}

const _webPageAttributeTheme = (o: any) => {
  const flags =
      has(o.documents)
    | (has(o.settings) << 1)
  i32(flags)
  flagVector(obj, o.documents)
  flag(obj, o.settings)
}

const _webPageAttributeStory = (o: any) => {
  const flags =
      has(o.story)
  i32(flags)
  obj(o.peer)
  i32(o.id)
  flag(obj, o.story)
}

const _messagesVotesList = (o: any) => {
  const flags =
      has(o.next_offset)
  i32(flags)
  i32(o.count)
  vector(obj, o.votes)
  vector(obj, o.chats)
  vector(obj, o.users)
  flag(str, o.next_offset)
}

const _bankCardOpenUrl = (o: any) => {
  str(o.url)
  str(o.name)
}

const _paymentsBankCardData = (o: any) => {
  str(o.title)
  vector(obj, o.open_urls)
}

const _dialogFilter = (o: any) => {
  const flags =
      has(o.contacts)
    | (has(o.non_contacts) << 1)
    | (has(o.groups) << 2)
    | (has(o.broadcasts) << 3)
    | (has(o.bots) << 4)
    | (has(o.exclude_muted) << 11)
    | (has(o.exclude_read) << 12)
    | (has(o.exclude_archived) << 13)
    | (has(o.emoticon) << 25)
  i32(flags)
  i32(o.id)
  str(o.title)
  flag(str, o.emoticon)
  vector(obj, o.pinned_peers)
  vector(obj, o.include_peers)
  vector(obj, o.exclude_peers)
}

const _dialogFilterChatlist = (o: any) => {
  const flags =
      (has(o.has_my_invites) << 26)
    | (has(o.emoticon) << 25)
  i32(flags)
  i32(o.id)
  str(o.title)
  flag(str, o.emoticon)
  vector(obj, o.pinned_peers)
  vector(obj, o.include_peers)
}

const _dialogFilterSuggested = (o: any) => {
  obj(o.filter)
  str(o.description)
}

const _statsDateRangeDays = (o: any) => {
  i32(o.min_date)
  i32(o.max_date)
}

const _statsAbsValueAndPrev = (o: any) => {
  f64(o.current)
  f64(o.previous)
}

const _statsPercentValue = (o: any) => {
  f64(o.part)
  f64(o.total)
}

const _statsGraphAsync = (o: any) => {
  str(o.token)
}

const _statsGraphError = (o: any) => {
  str(o.error)
}

const _statsGraph = (o: any) => {
  const flags =
      has(o.zoom_token)
  i32(flags)
  obj(o.json)
  flag(str, o.zoom_token)
}

const _messageInteractionCounters = (o: any) => {
  i32(o.msg_id)
  i32(o.views)
  i32(o.forwards)
}

const _statsBroadcastStats = (o: any) => {
  obj(o.period)
  obj(o.followers)
  obj(o.views_per_post)
  obj(o.shares_per_post)
  obj(o.enabled_notifications)
  obj(o.growth_graph)
  obj(o.followers_graph)
  obj(o.mute_graph)
  obj(o.top_hours_graph)
  obj(o.interactions_graph)
  obj(o.iv_interactions_graph)
  obj(o.views_by_source_graph)
  obj(o.new_followers_by_source_graph)
  obj(o.languages_graph)
  vector(obj, o.recent_message_interactions)
}

const _helpPromoDataEmpty = (o: any) => {
  i32(o.expires)
}

const _helpPromoData = (o: any) => {
  const flags =
      has(o.proxy)
    | (has(o.psa_type) << 1)
    | (has(o.psa_message) << 2)
  i32(flags)
  i32(o.expires)
  obj(o.peer)
  vector(obj, o.chats)
  vector(obj, o.users)
  flag(str, o.psa_type)
  flag(str, o.psa_message)
}

const _videoSize = (o: any) => {
  const flags =
      has(o.video_start_ts)
  i32(flags)
  str(o.type)
  i32(o.w)
  i32(o.h)
  i32(o.size)
  flag(f64, o.video_start_ts)
}

const _videoSizeEmojiMarkup = (o: any) => {
  i64(o.emoji_id)
  vector(i32, o.background_colors)
}

const _videoSizeStickerMarkup = (o: any) => {
  obj(o.stickerset)
  i64(o.sticker_id)
  vector(i32, o.background_colors)
}

const _statsGroupTopPoster = (o: any) => {
  i64(o.user_id)
  i32(o.messages)
  i32(o.avg_chars)
}

const _statsGroupTopAdmin = (o: any) => {
  i64(o.user_id)
  i32(o.deleted)
  i32(o.kicked)
  i32(o.banned)
}

const _statsGroupTopInviter = (o: any) => {
  i64(o.user_id)
  i32(o.invitations)
}

const _statsMegagroupStats = (o: any) => {
  obj(o.period)
  obj(o.members)
  obj(o.messages)
  obj(o.viewers)
  obj(o.posters)
  obj(o.growth_graph)
  obj(o.members_graph)
  obj(o.new_members_by_source_graph)
  obj(o.languages_graph)
  obj(o.messages_graph)
  obj(o.actions_graph)
  obj(o.top_hours_graph)
  obj(o.weekdays_graph)
  vector(obj, o.top_posters)
  vector(obj, o.top_admins)
  vector(obj, o.top_inviters)
  vector(obj, o.users)
}

const _globalPrivacySettings = (o: any) => {
  const flags =
      has(o.archive_and_mute_new_noncontact_peers)
    | (has(o.keep_archived_unmuted) << 1)
    | (has(o.keep_archived_folders) << 2)
  i32(flags)
}

const _helpCountryCode = (o: any) => {
  const flags =
      has(o.prefixes)
    | (has(o.patterns) << 1)
  i32(flags)
  str(o.country_code)
  flagVector(str, o.prefixes)
  flagVector(str, o.patterns)
}

const _helpCountry = (o: any) => {
  const flags =
      has(o.hidden)
    | (has(o.name) << 1)
  i32(flags)
  str(o.iso2)
  str(o.default_name)
  flag(str, o.name)
  vector(obj, o.country_codes)
}

const _helpCountriesList = (o: any) => {
  vector(obj, o.countries)
  i32(o.hash)
}

const _messageViews = (o: any) => {
  const flags =
      has(o.views)
    | (has(o.forwards) << 1)
    | (has(o.replies) << 2)
  i32(flags)
  flag(i32, o.views)
  flag(i32, o.forwards)
  flag(obj, o.replies)
}

const _messagesMessageViews = (o: any) => {
  vector(obj, o.views)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesDiscussionMessage = (o: any) => {
  const flags =
      has(o.max_id)
    | (has(o.read_inbox_max_id) << 1)
    | (has(o.read_outbox_max_id) << 2)
  i32(flags)
  vector(obj, o.messages)
  flag(i32, o.max_id)
  flag(i32, o.read_inbox_max_id)
  flag(i32, o.read_outbox_max_id)
  i32(o.unread_count)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messageReplyHeader = (o: any) => {
  const flags =
      (has(o.reply_to_scheduled) << 2)
    | (has(o.forum_topic) << 3)
    | (has(o.quote) << 9)
    | (has(o.reply_to_msg_id) << 4)
    | has(o.reply_to_peer_id)
    | (has(o.reply_from) << 5)
    | (has(o.reply_media) << 8)
    | (has(o.reply_to_top_id) << 1)
    | (has(o.quote_text) << 6)
    | (has(o.quote_entities) << 7)
  i32(flags)
  flag(i32, o.reply_to_msg_id)
  flag(obj, o.reply_to_peer_id)
  flag(obj, o.reply_from)
  flag(obj, o.reply_media)
  flag(i32, o.reply_to_top_id)
  flag(str, o.quote_text)
  flagVector(obj, o.quote_entities)
}

const _messageReplyStoryHeader = (o: any) => {
  i64(o.user_id)
  i32(o.story_id)
}

const _messageReplies = (o: any) => {
  const flags =
      has(o.comments)
    | (has(o.recent_repliers) << 1)
    | has(o.channel_id)
    | (has(o.max_id) << 2)
    | (has(o.read_max_id) << 3)
  i32(flags)
  i32(o.replies)
  i32(o.replies_pts)
  flagVector(obj, o.recent_repliers)
  flag(i64, o.channel_id)
  flag(i32, o.max_id)
  flag(i32, o.read_max_id)
}

const _peerBlocked = (o: any) => {
  obj(o.peer_id)
  i32(o.date)
}

const _statsMessageStats = (o: any) => {
  obj(o.views_graph)
}

const _groupCallDiscarded = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
  i32(o.duration)
}

const _groupCall = (o: any) => {
  const flags =
      (has(o.join_muted) << 1)
    | (has(o.can_change_join_muted) << 2)
    | (has(o.join_date_asc) << 6)
    | (has(o.schedule_start_subscribed) << 8)
    | (has(o.can_start_video) << 9)
    | (has(o.record_video_active) << 11)
    | (has(o.rtmp_stream) << 12)
    | (has(o.listeners_hidden) << 13)
    | (has(o.title) << 3)
    | (has(o.stream_dc_id) << 4)
    | (has(o.record_start_date) << 5)
    | (has(o.schedule_date) << 7)
    | (has(o.unmuted_video_count) << 10)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  i32(o.participants_count)
  flag(str, o.title)
  flag(i32, o.stream_dc_id)
  flag(i32, o.record_start_date)
  flag(i32, o.schedule_date)
  flag(i32, o.unmuted_video_count)
  i32(o.unmuted_video_limit)
  i32(o.version)
}

const _inputGroupCall = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _groupCallParticipant = (o: any) => {
  const flags =
      has(o.muted)
    | (has(o.left) << 1)
    | (has(o.can_self_unmute) << 2)
    | (has(o.just_joined) << 4)
    | (has(o.versioned) << 5)
    | (has(o.min) << 8)
    | (has(o.muted_by_you) << 9)
    | (has(o.volume_by_admin) << 10)
    | (has(o.self) << 12)
    | (has(o.video_joined) << 15)
    | (has(o.active_date) << 3)
    | (has(o.volume) << 7)
    | (has(o.about) << 11)
    | (has(o.raise_hand_rating) << 13)
    | (has(o.video) << 6)
    | (has(o.presentation) << 14)
  i32(flags)
  obj(o.peer)
  i32(o.date)
  flag(i32, o.active_date)
  i32(o.source)
  flag(i32, o.volume)
  flag(str, o.about)
  flag(i64, o.raise_hand_rating)
  flag(obj, o.video)
  flag(obj, o.presentation)
}

const _phoneGroupCall = (o: any) => {
  obj(o.call)
  vector(obj, o.participants)
  str(o.participants_next_offset)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _phoneGroupParticipants = (o: any) => {
  i32(o.count)
  vector(obj, o.participants)
  str(o.next_offset)
  vector(obj, o.chats)
  vector(obj, o.users)
  i32(o.version)
}

const _messagesHistoryImport = (o: any) => {
  i64(o.id)
}

const _messagesHistoryImportParsed = (o: any) => {
  const flags =
      has(o.pm)
    | (has(o.group) << 1)
    | (has(o.title) << 2)
  i32(flags)
  flag(str, o.title)
}

const _messagesAffectedFoundMessages = (o: any) => {
  i32(o.pts)
  i32(o.pts_count)
  i32(o.offset)
  vector(i32, o.messages)
}

const _chatInviteImporter = (o: any) => {
  const flags =
      has(o.requested)
    | (has(o.via_chatlist) << 3)
    | (has(o.about) << 2)
    | (has(o.approved_by) << 1)
  i32(flags)
  i64(o.user_id)
  i32(o.date)
  flag(str, o.about)
  flag(i64, o.approved_by)
}

const _messagesExportedChatInvites = (o: any) => {
  i32(o.count)
  vector(obj, o.invites)
  vector(obj, o.users)
}

const _messagesExportedChatInvite = (o: any) => {
  obj(o.invite)
  vector(obj, o.users)
}

const _messagesExportedChatInviteReplaced = (o: any) => {
  obj(o.invite)
  obj(o.new_invite)
  vector(obj, o.users)
}

const _messagesChatInviteImporters = (o: any) => {
  i32(o.count)
  vector(obj, o.importers)
  vector(obj, o.users)
}

const _chatAdminWithInvites = (o: any) => {
  i64(o.admin_id)
  i32(o.invites_count)
  i32(o.revoked_invites_count)
}

const _messagesChatAdminsWithInvites = (o: any) => {
  vector(obj, o.admins)
  vector(obj, o.users)
}

const _messagesCheckedHistoryImportPeer = (o: any) => {
  str(o.confirm_text)
}

const _phoneJoinAsPeers = (o: any) => {
  vector(obj, o.peers)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _phoneExportedGroupCallInvite = (o: any) => {
  str(o.link)
}

const _groupCallParticipantVideoSourceGroup = (o: any) => {
  str(o.semantics)
  vector(i32, o.sources)
}

const _groupCallParticipantVideo = (o: any) => {
  const flags =
      has(o.paused)
    | (has(o.audio_source) << 1)
  i32(flags)
  str(o.endpoint)
  vector(obj, o.source_groups)
  flag(i32, o.audio_source)
}

const _stickersSuggestedShortName = (o: any) => {
  str(o.short_name)
}

const _botCommandScopePeer = (o: any) => {
  obj(o.peer)
}

const _botCommandScopePeerAdmins = (o: any) => {
  obj(o.peer)
}

const _botCommandScopePeerUser = (o: any) => {
  obj(o.peer)
  obj(o.user_id)
}

const _accountResetPasswordFailedWait = (o: any) => {
  i32(o.retry_date)
}

const _accountResetPasswordRequestedWait = (o: any) => {
  i32(o.until_date)
}

const _sponsoredMessage = (o: any) => {
  const flags =
      (has(o.recommended) << 5)
    | (has(o.show_peer_photo) << 6)
    | (has(o.from_id) << 3)
    | (has(o.chat_invite) << 4)
    | (has(o.chat_invite_hash) << 4)
    | (has(o.channel_post) << 2)
    | has(o.start_param)
    | (has(o.webpage) << 9)
    | (has(o.entities) << 1)
    | (has(o.sponsor_info) << 7)
    | (has(o.additional_info) << 8)
  i32(flags)
  bytes(o.random_id)
  flag(obj, o.from_id)
  flag(obj, o.chat_invite)
  flag(str, o.chat_invite_hash)
  flag(i32, o.channel_post)
  flag(str, o.start_param)
  flag(obj, o.webpage)
  str(o.message)
  flagVector(obj, o.entities)
  flag(str, o.sponsor_info)
  flag(str, o.additional_info)
}

const _messagesSponsoredMessages = (o: any) => {
  const flags =
      has(o.posts_between)
  i32(flags)
  flag(i32, o.posts_between)
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _searchResultsCalendarPeriod = (o: any) => {
  i32(o.date)
  i32(o.min_msg_id)
  i32(o.max_msg_id)
  i32(o.count)
}

const _messagesSearchResultsCalendar = (o: any) => {
  const flags =
      has(o.inexact)
    | (has(o.offset_id_offset) << 1)
  i32(flags)
  i32(o.count)
  i32(o.min_date)
  i32(o.min_msg_id)
  flag(i32, o.offset_id_offset)
  vector(obj, o.periods)
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _searchResultPosition = (o: any) => {
  i32(o.msg_id)
  i32(o.date)
  i32(o.offset)
}

const _messagesSearchResultsPositions = (o: any) => {
  i32(o.count)
  vector(obj, o.positions)
}

const _channelsSendAsPeers = (o: any) => {
  vector(obj, o.peers)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _usersUserFull = (o: any) => {
  obj(o.full_user)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesPeerSettings = (o: any) => {
  obj(o.settings)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _authLoggedOut = (o: any) => {
  const flags =
      has(o.future_auth_token)
  i32(flags)
  flag(bytes, o.future_auth_token)
}

const _reactionCount = (o: any) => {
  const flags =
      has(o.chosen_order)
  i32(flags)
  flag(i32, o.chosen_order)
  obj(o.reaction)
  i32(o.count)
}

const _messageReactions = (o: any) => {
  const flags =
      has(o.min)
    | (has(o.can_see_list) << 2)
    | (has(o.recent_reactions) << 1)
  i32(flags)
  vector(obj, o.results)
  flagVector(obj, o.recent_reactions)
}

const _messagesMessageReactionsList = (o: any) => {
  const flags =
      has(o.next_offset)
  i32(flags)
  i32(o.count)
  vector(obj, o.reactions)
  vector(obj, o.chats)
  vector(obj, o.users)
  flag(str, o.next_offset)
}

const _availableReaction = (o: any) => {
  const flags =
      has(o.inactive)
    | (has(o.premium) << 2)
    | (has(o.around_animation) << 1)
    | (has(o.center_icon) << 1)
  i32(flags)
  str(o.reaction)
  str(o.title)
  obj(o.static_icon)
  obj(o.appear_animation)
  obj(o.select_animation)
  obj(o.activate_animation)
  obj(o.effect_animation)
  flag(obj, o.around_animation)
  flag(obj, o.center_icon)
}

const _messagesAvailableReactions = (o: any) => {
  i32(o.hash)
  vector(obj, o.reactions)
}

const _messagePeerReaction = (o: any) => {
  const flags =
      has(o.big)
    | (has(o.unread) << 1)
    | (has(o.my) << 2)
  i32(flags)
  obj(o.peer_id)
  i32(o.date)
  obj(o.reaction)
}

const _groupCallStreamChannel = (o: any) => {
  i32(o.channel)
  i32(o.scale)
  i64(o.last_timestamp_ms)
}

const _phoneGroupCallStreamChannels = (o: any) => {
  vector(obj, o.channels)
}

const _phoneGroupCallStreamRtmpUrl = (o: any) => {
  str(o.url)
  str(o.key)
}

const _attachMenuBotIconColor = (o: any) => {
  str(o.name)
  i32(o.color)
}

const _attachMenuBotIcon = (o: any) => {
  const flags =
      has(o.colors)
  i32(flags)
  str(o.name)
  obj(o.icon)
  flagVector(obj, o.colors)
}

const _attachMenuBot = (o: any) => {
  const flags =
      has(o.inactive)
    | (has(o.has_settings) << 1)
    | (has(o.request_write_access) << 2)
    | (has(o.show_in_attach_menu) << 3)
    | (has(o.show_in_side_menu) << 4)
    | (has(o.side_menu_disclaimer_needed) << 5)
    | (has(o.peer_types) << 3)
  i32(flags)
  i64(o.bot_id)
  str(o.short_name)
  flagVector(obj, o.peer_types)
  vector(obj, o.icons)
}

const _attachMenuBots = (o: any) => {
  i64(o.hash)
  vector(obj, o.bots)
  vector(obj, o.users)
}

const _attachMenuBotsBot = (o: any) => {
  obj(o.bot)
  vector(obj, o.users)
}

const _webViewResultUrl = (o: any) => {
  i64(o.query_id)
  str(o.url)
}

const _simpleWebViewResultUrl = (o: any) => {
  str(o.url)
}

const _webViewMessageSent = (o: any) => {
  const flags =
      has(o.msg_id)
  i32(flags)
  flag(obj, o.msg_id)
}

const _botMenuButton = (o: any) => {
  str(o.text)
  str(o.url)
}

const _accountSavedRingtones = (o: any) => {
  i64(o.hash)
  vector(obj, o.ringtones)
}

const _notificationSoundLocal = (o: any) => {
  str(o.title)
  str(o.data)
}

const _notificationSoundRingtone = (o: any) => {
  i64(o.id)
}

const _accountSavedRingtoneConverted = (o: any) => {
  obj(o.document)
}

const _inputInvoiceMessage = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
}

const _inputInvoiceSlug = (o: any) => {
  str(o.slug)
}

const _inputInvoicePremiumGiftCode = (o: any) => {
  obj(o.purpose)
  obj(o.option)
}

const _paymentsExportedInvoice = (o: any) => {
  str(o.url)
}

const _messagesTranscribedAudio = (o: any) => {
  const flags =
      has(o.pending)
  i32(flags)
  i64(o.transcription_id)
  str(o.text)
}

const _helpPremiumPromo = (o: any) => {
  str(o.status_text)
  vector(obj, o.status_entities)
  vector(str, o.video_sections)
  vector(obj, o.videos)
  vector(obj, o.period_options)
  vector(obj, o.users)
}

const _inputStorePaymentPremiumSubscription = (o: any) => {
  const flags =
      has(o.restore)
    | (has(o.upgrade) << 1)
  i32(flags)
}

const _inputStorePaymentGiftPremium = (o: any) => {
  obj(o.user_id)
  str(o.currency)
  i64(o.amount)
}

const _inputStorePaymentPremiumGiftCode = (o: any) => {
  const flags =
      has(o.boost_peer)
  i32(flags)
  vector(obj, o.users)
  flag(obj, o.boost_peer)
  str(o.currency)
  i64(o.amount)
}

const _inputStorePaymentPremiumGiveaway = (o: any) => {
  const flags =
      has(o.only_new_subscribers)
    | (has(o.additional_peers) << 1)
    | (has(o.countries_iso2) << 2)
  i32(flags)
  obj(o.boost_peer)
  flagVector(obj, o.additional_peers)
  flagVector(str, o.countries_iso2)
  i64(o.random_id)
  i32(o.until_date)
  str(o.currency)
  i64(o.amount)
}

const _premiumGiftOption = (o: any) => {
  const flags =
      has(o.store_product)
  i32(flags)
  i32(o.months)
  str(o.currency)
  i64(o.amount)
  str(o.bot_url)
  flag(str, o.store_product)
}

const _paymentFormMethod = (o: any) => {
  str(o.url)
  str(o.title)
}

const _emojiStatus = (o: any) => {
  i64(o.document_id)
}

const _emojiStatusUntil = (o: any) => {
  i64(o.document_id)
  i32(o.until)
}

const _accountEmojiStatuses = (o: any) => {
  i64(o.hash)
  vector(obj, o.statuses)
}

const _reactionEmoji = (o: any) => {
  str(o.emoticon)
}

const _reactionCustomEmoji = (o: any) => {
  i64(o.document_id)
}

const _chatReactionsAll = (o: any) => {
  const flags =
      has(o.allow_custom)
  i32(flags)
}

const _chatReactionsSome = (o: any) => {
  vector(obj, o.reactions)
}

const _messagesReactions = (o: any) => {
  i64(o.hash)
  vector(obj, o.reactions)
}

const _emailVerifyPurposeLoginSetup = (o: any) => {
  str(o.phone_number)
  str(o.phone_code_hash)
}

const _emailVerificationCode = (o: any) => {
  str(o.code)
}

const _emailVerificationGoogle = (o: any) => {
  str(o.token)
}

const _emailVerificationApple = (o: any) => {
  str(o.token)
}

const _accountEmailVerified = (o: any) => {
  str(o.email)
}

const _accountEmailVerifiedLogin = (o: any) => {
  str(o.email)
  obj(o.sent_code)
}

const _premiumSubscriptionOption = (o: any) => {
  const flags =
      (has(o.current) << 1)
    | (has(o.can_purchase_upgrade) << 2)
    | (has(o.transaction) << 3)
    | has(o.store_product)
  i32(flags)
  flag(str, o.transaction)
  i32(o.months)
  str(o.currency)
  i64(o.amount)
  str(o.bot_url)
  flag(str, o.store_product)
}

const _sendAsPeer = (o: any) => {
  const flags =
      has(o.premium_required)
  i32(flags)
  obj(o.peer)
}

const _messageExtendedMediaPreview = (o: any) => {
  const flags =
      has(o.w)
    | has(o.h)
    | (has(o.thumb) << 1)
    | (has(o.video_duration) << 2)
  i32(flags)
  flag(i32, o.w)
  flag(i32, o.h)
  flag(obj, o.thumb)
  flag(i32, o.video_duration)
}

const _messageExtendedMedia = (o: any) => {
  obj(o.media)
}

const _stickerKeyword = (o: any) => {
  i64(o.document_id)
  vector(str, o.keyword)
}

const _username = (o: any) => {
  const flags =
      has(o.editable)
    | (has(o.active) << 1)
  i32(flags)
  str(o.username)
}

const _forumTopicDeleted = (o: any) => {
  i32(o.id)
}

const _forumTopic = (o: any) => {
  const flags =
      (has(o.my) << 1)
    | (has(o.closed) << 2)
    | (has(o.pinned) << 3)
    | (has(o.short) << 5)
    | (has(o.hidden) << 6)
    | has(o.icon_emoji_id)
    | (has(o.draft) << 4)
  i32(flags)
  i32(o.id)
  i32(o.date)
  str(o.title)
  i32(o.icon_color)
  flag(i64, o.icon_emoji_id)
  i32(o.top_message)
  i32(o.read_inbox_max_id)
  i32(o.read_outbox_max_id)
  i32(o.unread_count)
  i32(o.unread_mentions_count)
  i32(o.unread_reactions_count)
  obj(o.from_id)
  obj(o.notify_settings)
  flag(obj, o.draft)
}

const _messagesForumTopics = (o: any) => {
  const flags =
      has(o.order_by_create_date)
  i32(flags)
  i32(o.count)
  vector(obj, o.topics)
  vector(obj, o.messages)
  vector(obj, o.chats)
  vector(obj, o.users)
  i32(o.pts)
}

const _defaultHistoryTTL = (o: any) => {
  i32(o.period)
}

const _exportedContactToken = (o: any) => {
  str(o.url)
  i32(o.expires)
}

const _requestPeerTypeUser = (o: any) => {
  const flags =
      has(o.bot)
    | (has(o.premium) << 1)
  i32(flags)
  flag(bool, o.bot)
  flag(bool, o.premium)
}

const _requestPeerTypeChat = (o: any) => {
  const flags =
      has(o.creator)
    | (has(o.bot_participant) << 5)
    | (has(o.has_username) << 3)
    | (has(o.forum) << 4)
    | (has(o.user_admin_rights) << 1)
    | (has(o.bot_admin_rights) << 2)
  i32(flags)
  flag(bool, o.has_username)
  flag(bool, o.forum)
  flag(obj, o.user_admin_rights)
  flag(obj, o.bot_admin_rights)
}

const _requestPeerTypeBroadcast = (o: any) => {
  const flags =
      has(o.creator)
    | (has(o.has_username) << 3)
    | (has(o.user_admin_rights) << 1)
    | (has(o.bot_admin_rights) << 2)
  i32(flags)
  flag(bool, o.has_username)
  flag(obj, o.user_admin_rights)
  flag(obj, o.bot_admin_rights)
}

const _emojiList = (o: any) => {
  i64(o.hash)
  vector(i64, o.document_id)
}

const _emojiGroup = (o: any) => {
  str(o.title)
  i64(o.icon_emoji_id)
  vector(str, o.emoticons)
}

const _messagesEmojiGroups = (o: any) => {
  i32(o.hash)
  vector(obj, o.groups)
}

const _textWithEntities = (o: any) => {
  str(o.text)
  vector(obj, o.entities)
}

const _messagesTranslateResult = (o: any) => {
  vector(obj, o.result)
}

const _autoSaveSettings = (o: any) => {
  const flags =
      has(o.photos)
    | (has(o.videos) << 1)
    | (has(o.video_max_size) << 2)
  i32(flags)
  flag(i64, o.video_max_size)
}

const _autoSaveException = (o: any) => {
  obj(o.peer)
  obj(o.settings)
}

const _accountAutoSaveSettings = (o: any) => {
  obj(o.users_settings)
  obj(o.chats_settings)
  obj(o.broadcasts_settings)
  vector(obj, o.exceptions)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _helpAppConfig = (o: any) => {
  i32(o.hash)
  obj(o.config)
}

const _inputBotAppID = (o: any) => {
  i64(o.id)
  i64(o.access_hash)
}

const _inputBotAppShortName = (o: any) => {
  obj(o.bot_id)
  str(o.short_name)
}

const _botApp = (o: any) => {
  const flags =
      has(o.document)
  i32(flags)
  i64(o.id)
  i64(o.access_hash)
  str(o.short_name)
  str(o.title)
  str(o.description)
  obj(o.photo)
  flag(obj, o.document)
  i64(o.hash)
}

const _messagesBotApp = (o: any) => {
  const flags =
      has(o.inactive)
    | (has(o.request_write_access) << 1)
    | (has(o.has_settings) << 2)
  i32(flags)
  obj(o.app)
}

const _appWebViewResultUrl = (o: any) => {
  str(o.url)
}

const _inlineBotWebView = (o: any) => {
  str(o.text)
  str(o.url)
}

const _readParticipantDate = (o: any) => {
  i64(o.user_id)
  i32(o.date)
}

const _inputChatlistDialogFilter = (o: any) => {
  i32(o.filter_id)
}

const _exportedChatlistInvite = (o: any) => {
  const flags =
    0
  i32(flags)
  str(o.title)
  str(o.url)
  vector(obj, o.peers)
}

const _chatlistsExportedChatlistInvite = (o: any) => {
  obj(o.filter)
  obj(o.invite)
}

const _chatlistsExportedInvites = (o: any) => {
  vector(obj, o.invites)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _chatlistsChatlistInviteAlready = (o: any) => {
  i32(o.filter_id)
  vector(obj, o.missing_peers)
  vector(obj, o.already_peers)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _chatlistsChatlistInvite = (o: any) => {
  const flags =
      has(o.emoticon)
  i32(flags)
  str(o.title)
  flag(str, o.emoticon)
  vector(obj, o.peers)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _chatlistsChatlistUpdates = (o: any) => {
  vector(obj, o.missing_peers)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _botsBotInfo = (o: any) => {
  str(o.name)
  str(o.about)
  str(o.description)
}

const _messagePeerVote = (o: any) => {
  obj(o.peer)
  bytes(o.option)
  i32(o.date)
}

const _messagePeerVoteInputOption = (o: any) => {
  obj(o.peer)
  i32(o.date)
}

const _messagePeerVoteMultiple = (o: any) => {
  obj(o.peer)
  vector(bytes, o.options)
  i32(o.date)
}

const _sponsoredWebPage = (o: any) => {
  const flags =
      has(o.photo)
  i32(flags)
  str(o.url)
  str(o.site_name)
  flag(obj, o.photo)
}

const _storyViews = (o: any) => {
  const flags =
      (has(o.has_viewers) << 1)
    | (has(o.forwards_count) << 2)
    | (has(o.reactions) << 3)
    | (has(o.reactions_count) << 4)
    | has(o.recent_viewers)
  i32(flags)
  i32(o.views_count)
  flag(i32, o.forwards_count)
  flagVector(obj, o.reactions)
  flag(i32, o.reactions_count)
  flagVector(i64, o.recent_viewers)
}

const _storyItemDeleted = (o: any) => {
  i32(o.id)
}

const _storyItemSkipped = (o: any) => {
  const flags =
      (has(o.close_friends) << 8)
  i32(flags)
  i32(o.id)
  i32(o.date)
  i32(o.expire_date)
}

const _storyItem = (o: any) => {
  const flags =
      (has(o.pinned) << 5)
    | (has(o.public) << 7)
    | (has(o.close_friends) << 8)
    | (has(o.min) << 9)
    | (has(o.noforwards) << 10)
    | (has(o.edited) << 11)
    | (has(o.contacts) << 12)
    | (has(o.selected_contacts) << 13)
    | (has(o.out) << 16)
    | has(o.caption)
    | (has(o.entities) << 1)
    | (has(o.media_areas) << 14)
    | (has(o.privacy) << 2)
    | (has(o.views) << 3)
    | (has(o.sent_reaction) << 15)
  i32(flags)
  i32(o.id)
  i32(o.date)
  i32(o.expire_date)
  flag(str, o.caption)
  flagVector(obj, o.entities)
  obj(o.media)
  flagVector(obj, o.media_areas)
  flagVector(obj, o.privacy)
  flag(obj, o.views)
  flag(obj, o.sent_reaction)
}

const _storiesAllStoriesNotModified = (o: any) => {
  const flags =
    0
  i32(flags)
  str(o.state)
  obj(o.stealth_mode)
}

const _storiesAllStories = (o: any) => {
  const flags =
      has(o.has_more)
  i32(flags)
  i32(o.count)
  str(o.state)
  vector(obj, o.peer_stories)
  vector(obj, o.chats)
  vector(obj, o.users)
  obj(o.stealth_mode)
}

const _storiesStories = (o: any) => {
  i32(o.count)
  vector(obj, o.stories)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _storyView = (o: any) => {
  const flags =
      has(o.blocked)
    | (has(o.blocked_my_stories_from) << 1)
    | (has(o.reaction) << 2)
  i32(flags)
  i64(o.user_id)
  i32(o.date)
  flag(obj, o.reaction)
}

const _storiesStoryViewsList = (o: any) => {
  const flags =
      has(o.next_offset)
  i32(flags)
  i32(o.count)
  i32(o.reactions_count)
  vector(obj, o.views)
  vector(obj, o.users)
  flag(str, o.next_offset)
}

const _storiesStoryViews = (o: any) => {
  vector(obj, o.views)
  vector(obj, o.users)
}

const _inputReplyToMessage = (o: any) => {
  const flags =
      has(o.top_msg_id)
    | (has(o.reply_to_peer_id) << 1)
    | (has(o.quote_text) << 2)
    | (has(o.quote_entities) << 3)
  i32(flags)
  i32(o.reply_to_msg_id)
  flag(i32, o.top_msg_id)
  flag(obj, o.reply_to_peer_id)
  flag(str, o.quote_text)
  flagVector(obj, o.quote_entities)
}

const _inputReplyToStory = (o: any) => {
  obj(o.user_id)
  i32(o.story_id)
}

const _exportedStoryLink = (o: any) => {
  str(o.link)
}

const _storiesStealthMode = (o: any) => {
  const flags =
      has(o.active_until_date)
    | (has(o.cooldown_until_date) << 1)
  i32(flags)
  flag(i32, o.active_until_date)
  flag(i32, o.cooldown_until_date)
}

const _mediaAreaCoordinates = (o: any) => {
  f64(o.x)
  f64(o.y)
  f64(o.w)
  f64(o.h)
  f64(o.rotation)
}

const _mediaAreaVenue = (o: any) => {
  obj(o.coordinates)
  obj(o.geo)
  str(o.title)
  str(o.address)
  str(o.provider)
  str(o.venue_id)
  str(o.venue_type)
}

const _inputMediaAreaVenue = (o: any) => {
  obj(o.coordinates)
  i64(o.query_id)
  str(o.result_id)
}

const _mediaAreaGeoPoint = (o: any) => {
  obj(o.coordinates)
  obj(o.geo)
}

const _mediaAreaSuggestedReaction = (o: any) => {
  const flags =
      has(o.dark)
    | (has(o.flipped) << 1)
  i32(flags)
  obj(o.coordinates)
  obj(o.reaction)
}

const _peerStories = (o: any) => {
  const flags =
      has(o.max_read_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.max_read_id)
  vector(obj, o.stories)
}

const _storiesPeerStories = (o: any) => {
  obj(o.stories)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _messagesWebPage = (o: any) => {
  obj(o.webpage)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _premiumGiftCodeOption = (o: any) => {
  const flags =
      has(o.store_product)
    | (has(o.store_quantity) << 1)
  i32(flags)
  i32(o.users)
  i32(o.months)
  flag(str, o.store_product)
  flag(i32, o.store_quantity)
  str(o.currency)
  i64(o.amount)
}

const _paymentsCheckedGiftCode = (o: any) => {
  const flags =
      (has(o.via_giveaway) << 2)
    | (has(o.giveaway_msg_id) << 3)
    | has(o.to_id)
    | (has(o.used_date) << 1)
  i32(flags)
  obj(o.from_id)
  flag(i32, o.giveaway_msg_id)
  flag(i64, o.to_id)
  i32(o.date)
  i32(o.months)
  flag(i32, o.used_date)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _paymentsGiveawayInfo = (o: any) => {
  const flags =
      has(o.participating)
    | (has(o.preparing_results) << 3)
    | (has(o.joined_too_early_date) << 1)
    | (has(o.admin_disallowed_chat_id) << 2)
    | (has(o.disallowed_country) << 4)
  i32(flags)
  i32(o.start_date)
  flag(i32, o.joined_too_early_date)
  flag(i64, o.admin_disallowed_chat_id)
  flag(str, o.disallowed_country)
}

const _paymentsGiveawayInfoResults = (o: any) => {
  const flags =
      has(o.winner)
    | (has(o.refunded) << 1)
    | has(o.gift_code_slug)
  i32(flags)
  i32(o.start_date)
  flag(str, o.gift_code_slug)
  i32(o.finish_date)
  i32(o.winners_count)
  i32(o.activated_count)
}

const _prepaidGiveaway = (o: any) => {
  i64(o.id)
  i32(o.months)
  i32(o.quantity)
  i32(o.date)
}

const _boost = (o: any) => {
  const flags =
      (has(o.gift) << 1)
    | (has(o.giveaway) << 2)
    | (has(o.unclaimed) << 3)
    | has(o.user_id)
    | (has(o.giveaway_msg_id) << 2)
    | (has(o.used_gift_slug) << 4)
    | (has(o.multiplier) << 5)
  i32(flags)
  str(o.id)
  flag(i64, o.user_id)
  flag(i32, o.giveaway_msg_id)
  i32(o.date)
  i32(o.expires)
  flag(str, o.used_gift_slug)
  flag(i32, o.multiplier)
}

const _premiumBoostsList = (o: any) => {
  const flags =
      has(o.next_offset)
  i32(flags)
  i32(o.count)
  vector(obj, o.boosts)
  flag(str, o.next_offset)
  vector(obj, o.users)
}

const _myBoost = (o: any) => {
  const flags =
      has(o.peer)
    | (has(o.cooldown_until_date) << 1)
  i32(flags)
  i32(o.slot)
  flag(obj, o.peer)
  i32(o.date)
  i32(o.expires)
  flag(i32, o.cooldown_until_date)
}

const _premiumMyBoosts = (o: any) => {
  vector(obj, o.my_boosts)
  vector(obj, o.chats)
  vector(obj, o.users)
}

const _premiumBoostsStatus = (o: any) => {
  const flags =
      (has(o.my_boost) << 2)
    | (has(o.gift_boosts) << 4)
    | has(o.next_level_boosts)
    | (has(o.premium_audience) << 1)
    | (has(o.prepaid_giveaways) << 3)
    | (has(o.my_boost_slots) << 2)
  i32(flags)
  i32(o.level)
  i32(o.current_level_boosts)
  i32(o.boosts)
  flag(i32, o.gift_boosts)
  flag(i32, o.next_level_boosts)
  flag(obj, o.premium_audience)
  str(o.boost_url)
  flagVector(obj, o.prepaid_giveaways)
  flagVector(i32, o.my_boost_slots)
}

const _invokeAfterMsg = (o: any) => {
  i64(o.msg_id)
  obj(o.query)
}

const _invokeAfterMsgs = (o: any) => {
  vector(i64, o.msg_ids)
  obj(o.query)
}

const _initConnection = (o: any) => {
  const flags =
      has(o.proxy)
    | (has(o.params) << 1)
  i32(flags)
  i32(o.api_id)
  str(o.device_model)
  str(o.system_version)
  str(o.app_version)
  str(o.system_lang_code)
  str(o.lang_pack)
  str(o.lang_code)
  flag(obj, o.proxy)
  flag(obj, o.params)
  obj(o.query)
}

const _invokeWithLayer = (o: any) => {
  i32(o.layer)
  obj(o.query)
}

const _invokeWithoutUpdates = (o: any) => {
  obj(o.query)
}

const _invokeWithMessagesRange = (o: any) => {
  obj(o.range)
  obj(o.query)
}

const _invokeWithTakeout = (o: any) => {
  i64(o.takeout_id)
  obj(o.query)
}

const _authSendCode = (o: any) => {
  str(o.phone_number)
  i32(o.api_id)
  str(o.api_hash)
  obj(o.settings)
}

const _authSignUp = (o: any) => {
  str(o.phone_number)
  str(o.phone_code_hash)
  str(o.first_name)
  str(o.last_name)
}

const _authSignIn = (o: any) => {
  const flags =
      has(o.phone_code)
    | (has(o.email_verification) << 1)
  i32(flags)
  str(o.phone_number)
  str(o.phone_code_hash)
  flag(str, o.phone_code)
  flag(obj, o.email_verification)
}

const _authExportAuthorization = (o: any) => {
  i32(o.dc_id)
}

const _authImportAuthorization = (o: any) => {
  i64(o.id)
  bytes(o.bytes)
}

const _authBindTempAuthKey = (o: any) => {
  i64(o.perm_auth_key_id)
  i64(o.nonce)
  i32(o.expires_at)
  bytes(o.encrypted_message)
}

const _authImportBotAuthorization = (o: any) => {
  i32(o.api_id)
  str(o.api_hash)
  str(o.bot_auth_token)
}

const _authCheckPassword = (o: any) => {
  obj(o.password)
}

const _authRecoverPassword = (o: any) => {
  const flags =
      has(o.new_settings)
  i32(flags)
  str(o.code)
  flag(obj, o.new_settings)
}

const _authResendCode = (o: any) => {
  str(o.phone_number)
  str(o.phone_code_hash)
}

const _authCancelCode = (o: any) => {
  str(o.phone_number)
  str(o.phone_code_hash)
}

const _authDropTempAuthKeys = (o: any) => {
  vector(i64, o.except_auth_keys)
}

const _authExportLoginToken = (o: any) => {
  i32(o.api_id)
  str(o.api_hash)
  vector(i64, o.except_ids)
}

const _authImportLoginToken = (o: any) => {
  bytes(o.token)
}

const _authAcceptLoginToken = (o: any) => {
  bytes(o.token)
}

const _authCheckRecoveryPassword = (o: any) => {
  str(o.code)
}

const _authImportWebTokenAuthorization = (o: any) => {
  i32(o.api_id)
  str(o.api_hash)
  str(o.web_auth_token)
}

const _authRequestFirebaseSms = (o: any) => {
  const flags =
      has(o.safety_net_token)
    | (has(o.ios_push_secret) << 1)
  i32(flags)
  str(o.phone_number)
  str(o.phone_code_hash)
  flag(str, o.safety_net_token)
  flag(str, o.ios_push_secret)
}

const _authResetLoginEmail = (o: any) => {
  str(o.phone_number)
  str(o.phone_code_hash)
}

const _accountRegisterDevice = (o: any) => {
  const flags =
      has(o.no_muted)
  i32(flags)
  i32(o.token_type)
  str(o.token)
  bool(o.app_sandbox)
  bytes(o.secret)
  vector(i64, o.other_uids)
}

const _accountUnregisterDevice = (o: any) => {
  i32(o.token_type)
  str(o.token)
  vector(i64, o.other_uids)
}

const _accountUpdateNotifySettings = (o: any) => {
  obj(o.peer)
  obj(o.settings)
}

const _accountGetNotifySettings = (o: any) => {
  obj(o.peer)
}

const _accountUpdateProfile = (o: any) => {
  const flags =
      has(o.first_name)
    | (has(o.last_name) << 1)
    | (has(o.about) << 2)
  i32(flags)
  flag(str, o.first_name)
  flag(str, o.last_name)
  flag(str, o.about)
}

const _accountUpdateStatus = (o: any) => {
  bool(o.offline)
}

const _accountGetWallPapers = (o: any) => {
  i64(o.hash)
}

const _accountReportPeer = (o: any) => {
  obj(o.peer)
  obj(o.reason)
  str(o.message)
}

const _accountCheckUsername = (o: any) => {
  str(o.username)
}

const _accountUpdateUsername = (o: any) => {
  str(o.username)
}

const _accountGetPrivacy = (o: any) => {
  obj(o.key)
}

const _accountSetPrivacy = (o: any) => {
  obj(o.key)
  vector(obj, o.rules)
}

const _accountDeleteAccount = (o: any) => {
  const flags =
      has(o.password)
  i32(flags)
  str(o.reason)
  flag(obj, o.password)
}

const _accountSetAccountTTL = (o: any) => {
  obj(o.ttl)
}

const _accountSendChangePhoneCode = (o: any) => {
  str(o.phone_number)
  obj(o.settings)
}

const _accountChangePhone = (o: any) => {
  str(o.phone_number)
  str(o.phone_code_hash)
  str(o.phone_code)
}

const _accountUpdateDeviceLocked = (o: any) => {
  i32(o.period)
}

const _accountResetAuthorization = (o: any) => {
  i64(o.hash)
}

const _accountGetPasswordSettings = (o: any) => {
  obj(o.password)
}

const _accountUpdatePasswordSettings = (o: any) => {
  obj(o.password)
  obj(o.new_settings)
}

const _accountSendConfirmPhoneCode = (o: any) => {
  str(o.hash)
  obj(o.settings)
}

const _accountConfirmPhone = (o: any) => {
  str(o.phone_code_hash)
  str(o.phone_code)
}

const _accountGetTmpPassword = (o: any) => {
  obj(o.password)
  i32(o.period)
}

const _accountResetWebAuthorization = (o: any) => {
  i64(o.hash)
}

const _accountGetSecureValue = (o: any) => {
  vector(obj, o.types)
}

const _accountSaveSecureValue = (o: any) => {
  obj(o.value)
  i64(o.secure_secret_id)
}

const _accountDeleteSecureValue = (o: any) => {
  vector(obj, o.types)
}

const _accountGetAuthorizationForm = (o: any) => {
  i64(o.bot_id)
  str(o.scope)
  str(o.public_key)
}

const _accountAcceptAuthorization = (o: any) => {
  i64(o.bot_id)
  str(o.scope)
  str(o.public_key)
  vector(obj, o.value_hashes)
  obj(o.credentials)
}

const _accountSendVerifyPhoneCode = (o: any) => {
  str(o.phone_number)
  obj(o.settings)
}

const _accountVerifyPhone = (o: any) => {
  str(o.phone_number)
  str(o.phone_code_hash)
  str(o.phone_code)
}

const _accountSendVerifyEmailCode = (o: any) => {
  obj(o.purpose)
  str(o.email)
}

const _accountVerifyEmail = (o: any) => {
  obj(o.purpose)
  obj(o.verification)
}

const _accountInitTakeoutSession = (o: any) => {
  const flags =
      has(o.contacts)
    | (has(o.message_users) << 1)
    | (has(o.message_chats) << 2)
    | (has(o.message_megagroups) << 3)
    | (has(o.message_channels) << 4)
    | (has(o.files) << 5)
    | (has(o.file_max_size) << 5)
  i32(flags)
  flag(i64, o.file_max_size)
}

const _accountFinishTakeoutSession = (o: any) => {
  const flags =
      has(o.success)
  i32(flags)
}

const _accountConfirmPasswordEmail = (o: any) => {
  str(o.code)
}

const _accountSetContactSignUpNotification = (o: any) => {
  bool(o.silent)
}

const _accountGetNotifyExceptions = (o: any) => {
  const flags =
      (has(o.compare_sound) << 1)
    | (has(o.compare_stories) << 2)
    | has(o.peer)
  i32(flags)
  flag(obj, o.peer)
}

const _accountGetWallPaper = (o: any) => {
  obj(o.wallpaper)
}

const _accountUploadWallPaper = (o: any) => {
  const flags =
      has(o.for_chat)
  i32(flags)
  obj(o.file)
  str(o.mime_type)
  obj(o.settings)
}

const _accountSaveWallPaper = (o: any) => {
  obj(o.wallpaper)
  bool(o.unsave)
  obj(o.settings)
}

const _accountInstallWallPaper = (o: any) => {
  obj(o.wallpaper)
  obj(o.settings)
}

const _accountSaveAutoDownloadSettings = (o: any) => {
  const flags =
      has(o.low)
    | (has(o.high) << 1)
  i32(flags)
  obj(o.settings)
}

const _accountUploadTheme = (o: any) => {
  const flags =
      has(o.thumb)
  i32(flags)
  obj(o.file)
  flag(obj, o.thumb)
  str(o.file_name)
  str(o.mime_type)
}

const _accountCreateTheme = (o: any) => {
  const flags =
      (has(o.document) << 2)
    | (has(o.settings) << 3)
  i32(flags)
  str(o.slug)
  str(o.title)
  flag(obj, o.document)
  flagVector(obj, o.settings)
}

const _accountUpdateTheme = (o: any) => {
  const flags =
      has(o.slug)
    | (has(o.title) << 1)
    | (has(o.document) << 2)
    | (has(o.settings) << 3)
  i32(flags)
  str(o.format)
  obj(o.theme)
  flag(str, o.slug)
  flag(str, o.title)
  flag(obj, o.document)
  flagVector(obj, o.settings)
}

const _accountSaveTheme = (o: any) => {
  obj(o.theme)
  bool(o.unsave)
}

const _accountInstallTheme = (o: any) => {
  const flags =
      has(o.dark)
    | (has(o.theme) << 1)
    | (has(o.format) << 2)
    | (has(o.base_theme) << 3)
  i32(flags)
  flag(obj, o.theme)
  flag(str, o.format)
  flag(obj, o.base_theme)
}

const _accountGetTheme = (o: any) => {
  str(o.format)
  obj(o.theme)
}

const _accountGetThemes = (o: any) => {
  str(o.format)
  i64(o.hash)
}

const _accountSetContentSettings = (o: any) => {
  const flags =
      has(o.sensitive_enabled)
  i32(flags)
}

const _accountGetMultiWallPapers = (o: any) => {
  vector(obj, o.wallpapers)
}

const _accountSetGlobalPrivacySettings = (o: any) => {
  obj(o.settings)
}

const _accountReportProfilePhoto = (o: any) => {
  obj(o.peer)
  obj(o.photo_id)
  obj(o.reason)
  str(o.message)
}

const _accountGetChatThemes = (o: any) => {
  i64(o.hash)
}

const _accountSetAuthorizationTTL = (o: any) => {
  i32(o.authorization_ttl_days)
}

const _accountChangeAuthorizationSettings = (o: any) => {
  const flags =
      (has(o.confirmed) << 3)
    | has(o.encrypted_requests_disabled)
    | (has(o.call_requests_disabled) << 1)
  i32(flags)
  i64(o.hash)
  flag(bool, o.encrypted_requests_disabled)
  flag(bool, o.call_requests_disabled)
}

const _accountGetSavedRingtones = (o: any) => {
  i64(o.hash)
}

const _accountSaveRingtone = (o: any) => {
  obj(o.id)
  bool(o.unsave)
}

const _accountUploadRingtone = (o: any) => {
  obj(o.file)
  str(o.file_name)
  str(o.mime_type)
}

const _accountUpdateEmojiStatus = (o: any) => {
  obj(o.emoji_status)
}

const _accountGetDefaultEmojiStatuses = (o: any) => {
  i64(o.hash)
}

const _accountGetRecentEmojiStatuses = (o: any) => {
  i64(o.hash)
}

const _accountReorderUsernames = (o: any) => {
  vector(str, o.order)
}

const _accountToggleUsername = (o: any) => {
  str(o.username)
  bool(o.active)
}

const _accountGetDefaultProfilePhotoEmojis = (o: any) => {
  i64(o.hash)
}

const _accountGetDefaultGroupPhotoEmojis = (o: any) => {
  i64(o.hash)
}

const _accountSaveAutoSaveSettings = (o: any) => {
  const flags =
      has(o.users)
    | (has(o.chats) << 1)
    | (has(o.broadcasts) << 2)
    | (has(o.peer) << 3)
  i32(flags)
  flag(obj, o.peer)
  obj(o.settings)
}

const _accountInvalidateSignInCodes = (o: any) => {
  vector(str, o.codes)
}

const _accountUpdateColor = (o: any) => {
  const flags =
      has(o.background_emoji_id)
  i32(flags)
  i32(o.color)
  flag(i64, o.background_emoji_id)
}

const _accountGetDefaultBackgroundEmojis = (o: any) => {
  i64(o.hash)
}

const _usersGetUsers = (o: any) => {
  vector(obj, o.id)
}

const _usersGetFullUser = (o: any) => {
  obj(o.id)
}

const _usersSetSecureValueErrors = (o: any) => {
  obj(o.id)
  vector(obj, o.errors)
}

const _contactsGetContactIDs = (o: any) => {
  i64(o.hash)
}

const _contactsGetContacts = (o: any) => {
  i64(o.hash)
}

const _contactsImportContacts = (o: any) => {
  vector(obj, o.contacts)
}

const _contactsDeleteContacts = (o: any) => {
  vector(obj, o.id)
}

const _contactsDeleteByPhones = (o: any) => {
  vector(str, o.phones)
}

const _contactsBlock = (o: any) => {
  const flags =
      has(o.my_stories_from)
  i32(flags)
  obj(o.id)
}

const _contactsUnblock = (o: any) => {
  const flags =
      has(o.my_stories_from)
  i32(flags)
  obj(o.id)
}

const _contactsGetBlocked = (o: any) => {
  const flags =
      has(o.my_stories_from)
  i32(flags)
  i32(o.offset)
  i32(o.limit)
}

const _contactsSearch = (o: any) => {
  str(o.q)
  i32(o.limit)
}

const _contactsResolveUsername = (o: any) => {
  str(o.username)
}

const _contactsGetTopPeers = (o: any) => {
  const flags =
      has(o.correspondents)
    | (has(o.bots_pm) << 1)
    | (has(o.bots_inline) << 2)
    | (has(o.phone_calls) << 3)
    | (has(o.forward_users) << 4)
    | (has(o.forward_chats) << 5)
    | (has(o.groups) << 10)
    | (has(o.channels) << 15)
  i32(flags)
  i32(o.offset)
  i32(o.limit)
  i64(o.hash)
}

const _contactsResetTopPeerRating = (o: any) => {
  obj(o.category)
  obj(o.peer)
}

const _contactsToggleTopPeers = (o: any) => {
  bool(o.enabled)
}

const _contactsAddContact = (o: any) => {
  const flags =
      has(o.add_phone_privacy_exception)
  i32(flags)
  obj(o.id)
  str(o.first_name)
  str(o.last_name)
  str(o.phone)
}

const _contactsAcceptContact = (o: any) => {
  obj(o.id)
}

const _contactsGetLocated = (o: any) => {
  const flags =
      (has(o.background) << 1)
    | has(o.self_expires)
  i32(flags)
  obj(o.geo_point)
  flag(i32, o.self_expires)
}

const _contactsBlockFromReplies = (o: any) => {
  const flags =
      has(o.delete_message)
    | (has(o.delete_history) << 1)
    | (has(o.report_spam) << 2)
  i32(flags)
  i32(o.msg_id)
}

const _contactsResolvePhone = (o: any) => {
  str(o.phone)
}

const _contactsImportContactToken = (o: any) => {
  str(o.token)
}

const _contactsEditCloseFriends = (o: any) => {
  vector(i64, o.id)
}

const _contactsSetBlocked = (o: any) => {
  const flags =
      has(o.my_stories_from)
  i32(flags)
  vector(obj, o.id)
  i32(o.limit)
}

const _messagesGetMessages = (o: any) => {
  vector(obj, o.id)
}

const _messagesGetDialogs = (o: any) => {
  const flags =
      has(o.exclude_pinned)
    | (has(o.folder_id) << 1)
  i32(flags)
  flag(i32, o.folder_id)
  i32(o.offset_date)
  i32(o.offset_id)
  obj(o.offset_peer)
  i32(o.limit)
  i64(o.hash)
}

const _messagesGetHistory = (o: any) => {
  obj(o.peer)
  i32(o.offset_id)
  i32(o.offset_date)
  i32(o.add_offset)
  i32(o.limit)
  i32(o.max_id)
  i32(o.min_id)
  i64(o.hash)
}

const _messagesSearch = (o: any) => {
  const flags =
      has(o.from_id)
    | (has(o.top_msg_id) << 1)
  i32(flags)
  obj(o.peer)
  str(o.q)
  flag(obj, o.from_id)
  flag(i32, o.top_msg_id)
  obj(o.filter)
  i32(o.min_date)
  i32(o.max_date)
  i32(o.offset_id)
  i32(o.add_offset)
  i32(o.limit)
  i32(o.max_id)
  i32(o.min_id)
  i64(o.hash)
}

const _messagesReadHistory = (o: any) => {
  obj(o.peer)
  i32(o.max_id)
}

const _messagesDeleteHistory = (o: any) => {
  const flags =
      has(o.just_clear)
    | (has(o.revoke) << 1)
    | (has(o.min_date) << 2)
    | (has(o.max_date) << 3)
  i32(flags)
  obj(o.peer)
  i32(o.max_id)
  flag(i32, o.min_date)
  flag(i32, o.max_date)
}

const _messagesDeleteMessages = (o: any) => {
  const flags =
      has(o.revoke)
  i32(flags)
  vector(i32, o.id)
}

const _messagesReceivedMessages = (o: any) => {
  i32(o.max_id)
}

const _messagesSetTyping = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.top_msg_id)
  obj(o.action)
}

const _messagesSendMessage = (o: any) => {
  const flags =
      (has(o.no_webpage) << 1)
    | (has(o.silent) << 5)
    | (has(o.background) << 6)
    | (has(o.clear_draft) << 7)
    | (has(o.noforwards) << 14)
    | (has(o.update_stickersets_order) << 15)
    | (has(o.invert_media) << 16)
    | has(o.reply_to)
    | (has(o.reply_markup) << 2)
    | (has(o.entities) << 3)
    | (has(o.schedule_date) << 10)
    | (has(o.send_as) << 13)
  i32(flags)
  obj(o.peer)
  flag(obj, o.reply_to)
  str(o.message)
  i64(o.random_id)
  flag(obj, o.reply_markup)
  flagVector(obj, o.entities)
  flag(i32, o.schedule_date)
  flag(obj, o.send_as)
}

const _messagesSendMedia = (o: any) => {
  const flags =
      (has(o.silent) << 5)
    | (has(o.background) << 6)
    | (has(o.clear_draft) << 7)
    | (has(o.noforwards) << 14)
    | (has(o.update_stickersets_order) << 15)
    | (has(o.invert_media) << 16)
    | has(o.reply_to)
    | (has(o.reply_markup) << 2)
    | (has(o.entities) << 3)
    | (has(o.schedule_date) << 10)
    | (has(o.send_as) << 13)
  i32(flags)
  obj(o.peer)
  flag(obj, o.reply_to)
  obj(o.media)
  str(o.message)
  i64(o.random_id)
  flag(obj, o.reply_markup)
  flagVector(obj, o.entities)
  flag(i32, o.schedule_date)
  flag(obj, o.send_as)
}

const _messagesForwardMessages = (o: any) => {
  const flags =
      (has(o.silent) << 5)
    | (has(o.background) << 6)
    | (has(o.with_my_score) << 8)
    | (has(o.drop_author) << 11)
    | (has(o.drop_media_captions) << 12)
    | (has(o.noforwards) << 14)
    | (has(o.top_msg_id) << 9)
    | (has(o.schedule_date) << 10)
    | (has(o.send_as) << 13)
  i32(flags)
  obj(o.from_peer)
  vector(i32, o.id)
  vector(i64, o.random_id)
  obj(o.to_peer)
  flag(i32, o.top_msg_id)
  flag(i32, o.schedule_date)
  flag(obj, o.send_as)
}

const _messagesReportSpam = (o: any) => {
  obj(o.peer)
}

const _messagesGetPeerSettings = (o: any) => {
  obj(o.peer)
}

const _messagesReport = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
  obj(o.reason)
  str(o.message)
}

const _messagesGetChats = (o: any) => {
  vector(i64, o.id)
}

const _messagesGetFullChat = (o: any) => {
  i64(o.chat_id)
}

const _messagesEditChatTitle = (o: any) => {
  i64(o.chat_id)
  str(o.title)
}

const _messagesEditChatPhoto = (o: any) => {
  i64(o.chat_id)
  obj(o.photo)
}

const _messagesAddChatUser = (o: any) => {
  i64(o.chat_id)
  obj(o.user_id)
  i32(o.fwd_limit)
}

const _messagesDeleteChatUser = (o: any) => {
  const flags =
      has(o.revoke_history)
  i32(flags)
  i64(o.chat_id)
  obj(o.user_id)
}

const _messagesCreateChat = (o: any) => {
  const flags =
      has(o.ttl_period)
  i32(flags)
  vector(obj, o.users)
  str(o.title)
  flag(i32, o.ttl_period)
}

const _messagesGetDhConfig = (o: any) => {
  i32(o.version)
  i32(o.random_length)
}

const _messagesRequestEncryption = (o: any) => {
  obj(o.user_id)
  i32(o.random_id)
  bytes(o.g_a)
}

const _messagesAcceptEncryption = (o: any) => {
  obj(o.peer)
  bytes(o.g_b)
  i64(o.key_fingerprint)
}

const _messagesDiscardEncryption = (o: any) => {
  const flags =
      has(o.delete_history)
  i32(flags)
  i32(o.chat_id)
}

const _messagesSetEncryptedTyping = (o: any) => {
  obj(o.peer)
  bool(o.typing)
}

const _messagesReadEncryptedHistory = (o: any) => {
  obj(o.peer)
  i32(o.max_date)
}

const _messagesSendEncrypted = (o: any) => {
  const flags =
      has(o.silent)
  i32(flags)
  obj(o.peer)
  i64(o.random_id)
  bytes(o.data)
}

const _messagesSendEncryptedFile = (o: any) => {
  const flags =
      has(o.silent)
  i32(flags)
  obj(o.peer)
  i64(o.random_id)
  bytes(o.data)
  obj(o.file)
}

const _messagesSendEncryptedService = (o: any) => {
  obj(o.peer)
  i64(o.random_id)
  bytes(o.data)
}

const _messagesReceivedQueue = (o: any) => {
  i32(o.max_qts)
}

const _messagesReportEncryptedSpam = (o: any) => {
  obj(o.peer)
}

const _messagesReadMessageContents = (o: any) => {
  vector(i32, o.id)
}

const _messagesGetStickers = (o: any) => {
  str(o.emoticon)
  i64(o.hash)
}

const _messagesGetAllStickers = (o: any) => {
  i64(o.hash)
}

const _messagesGetWebPagePreview = (o: any) => {
  const flags =
      (has(o.entities) << 3)
  i32(flags)
  str(o.message)
  flagVector(obj, o.entities)
}

const _messagesExportChatInvite = (o: any) => {
  const flags =
      (has(o.legacy_revoke_permanent) << 2)
    | (has(o.request_needed) << 3)
    | has(o.expire_date)
    | (has(o.usage_limit) << 1)
    | (has(o.title) << 4)
  i32(flags)
  obj(o.peer)
  flag(i32, o.expire_date)
  flag(i32, o.usage_limit)
  flag(str, o.title)
}

const _messagesCheckChatInvite = (o: any) => {
  str(o.hash)
}

const _messagesImportChatInvite = (o: any) => {
  str(o.hash)
}

const _messagesGetStickerSet = (o: any) => {
  obj(o.stickerset)
  i32(o.hash)
}

const _messagesInstallStickerSet = (o: any) => {
  obj(o.stickerset)
  bool(o.archived)
}

const _messagesUninstallStickerSet = (o: any) => {
  obj(o.stickerset)
}

const _messagesStartBot = (o: any) => {
  obj(o.bot)
  obj(o.peer)
  i64(o.random_id)
  str(o.start_param)
}

const _messagesGetMessagesViews = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
  bool(o.increment)
}

const _messagesEditChatAdmin = (o: any) => {
  i64(o.chat_id)
  obj(o.user_id)
  bool(o.is_admin)
}

const _messagesMigrateChat = (o: any) => {
  i64(o.chat_id)
}

const _messagesSearchGlobal = (o: any) => {
  const flags =
      has(o.folder_id)
  i32(flags)
  flag(i32, o.folder_id)
  str(o.q)
  obj(o.filter)
  i32(o.min_date)
  i32(o.max_date)
  i32(o.offset_rate)
  obj(o.offset_peer)
  i32(o.offset_id)
  i32(o.limit)
}

const _messagesReorderStickerSets = (o: any) => {
  const flags =
      has(o.masks)
    | (has(o.emojis) << 1)
  i32(flags)
  vector(i64, o.order)
}

const _messagesGetDocumentByHash = (o: any) => {
  bytes(o.sha256)
  i64(o.size)
  str(o.mime_type)
}

const _messagesGetSavedGifs = (o: any) => {
  i64(o.hash)
}

const _messagesSaveGif = (o: any) => {
  obj(o.id)
  bool(o.unsave)
}

const _messagesGetInlineBotResults = (o: any) => {
  const flags =
      has(o.geo_point)
  i32(flags)
  obj(o.bot)
  obj(o.peer)
  flag(obj, o.geo_point)
  str(o.query)
  str(o.offset)
}

const _messagesSetInlineBotResults = (o: any) => {
  const flags =
      has(o.gallery)
    | (has(o.private) << 1)
    | (has(o.next_offset) << 2)
    | (has(o.switch_pm) << 3)
    | (has(o.switch_webview) << 4)
  i32(flags)
  i64(o.query_id)
  vector(obj, o.results)
  i32(o.cache_time)
  flag(str, o.next_offset)
  flag(obj, o.switch_pm)
  flag(obj, o.switch_webview)
}

const _messagesSendInlineBotResult = (o: any) => {
  const flags =
      (has(o.silent) << 5)
    | (has(o.background) << 6)
    | (has(o.clear_draft) << 7)
    | (has(o.hide_via) << 11)
    | has(o.reply_to)
    | (has(o.schedule_date) << 10)
    | (has(o.send_as) << 13)
  i32(flags)
  obj(o.peer)
  flag(obj, o.reply_to)
  i64(o.random_id)
  i64(o.query_id)
  str(o.id)
  flag(i32, o.schedule_date)
  flag(obj, o.send_as)
}

const _messagesGetMessageEditData = (o: any) => {
  obj(o.peer)
  i32(o.id)
}

const _messagesEditMessage = (o: any) => {
  const flags =
      (has(o.no_webpage) << 1)
    | (has(o.invert_media) << 16)
    | (has(o.message) << 11)
    | (has(o.media) << 14)
    | (has(o.reply_markup) << 2)
    | (has(o.entities) << 3)
    | (has(o.schedule_date) << 15)
  i32(flags)
  obj(o.peer)
  i32(o.id)
  flag(str, o.message)
  flag(obj, o.media)
  flag(obj, o.reply_markup)
  flagVector(obj, o.entities)
  flag(i32, o.schedule_date)
}

const _messagesEditInlineBotMessage = (o: any) => {
  const flags =
      (has(o.no_webpage) << 1)
    | (has(o.invert_media) << 16)
    | (has(o.message) << 11)
    | (has(o.media) << 14)
    | (has(o.reply_markup) << 2)
    | (has(o.entities) << 3)
  i32(flags)
  obj(o.id)
  flag(str, o.message)
  flag(obj, o.media)
  flag(obj, o.reply_markup)
  flagVector(obj, o.entities)
}

const _messagesGetBotCallbackAnswer = (o: any) => {
  const flags =
      (has(o.game) << 1)
    | has(o.data)
    | (has(o.password) << 2)
  i32(flags)
  obj(o.peer)
  i32(o.msg_id)
  flag(bytes, o.data)
  flag(obj, o.password)
}

const _messagesSetBotCallbackAnswer = (o: any) => {
  const flags =
      (has(o.alert) << 1)
    | has(o.message)
    | (has(o.url) << 2)
  i32(flags)
  i64(o.query_id)
  flag(str, o.message)
  flag(str, o.url)
  i32(o.cache_time)
}

const _messagesGetPeerDialogs = (o: any) => {
  vector(obj, o.peers)
}

const _messagesSaveDraft = (o: any) => {
  const flags =
      (has(o.no_webpage) << 1)
    | (has(o.invert_media) << 6)
    | (has(o.reply_to) << 4)
    | (has(o.entities) << 3)
    | (has(o.media) << 5)
  i32(flags)
  flag(obj, o.reply_to)
  obj(o.peer)
  str(o.message)
  flagVector(obj, o.entities)
  flag(obj, o.media)
}

const _messagesGetFeaturedStickers = (o: any) => {
  i64(o.hash)
}

const _messagesReadFeaturedStickers = (o: any) => {
  vector(i64, o.id)
}

const _messagesGetRecentStickers = (o: any) => {
  const flags =
      has(o.attached)
  i32(flags)
  i64(o.hash)
}

const _messagesSaveRecentSticker = (o: any) => {
  const flags =
      has(o.attached)
  i32(flags)
  obj(o.id)
  bool(o.unsave)
}

const _messagesClearRecentStickers = (o: any) => {
  const flags =
      has(o.attached)
  i32(flags)
}

const _messagesGetArchivedStickers = (o: any) => {
  const flags =
      has(o.masks)
    | (has(o.emojis) << 1)
  i32(flags)
  i64(o.offset_id)
  i32(o.limit)
}

const _messagesGetMaskStickers = (o: any) => {
  i64(o.hash)
}

const _messagesGetAttachedStickers = (o: any) => {
  obj(o.media)
}

const _messagesSetGameScore = (o: any) => {
  const flags =
      has(o.edit_message)
    | (has(o.force) << 1)
  i32(flags)
  obj(o.peer)
  i32(o.id)
  obj(o.user_id)
  i32(o.score)
}

const _messagesSetInlineGameScore = (o: any) => {
  const flags =
      has(o.edit_message)
    | (has(o.force) << 1)
  i32(flags)
  obj(o.id)
  obj(o.user_id)
  i32(o.score)
}

const _messagesGetGameHighScores = (o: any) => {
  obj(o.peer)
  i32(o.id)
  obj(o.user_id)
}

const _messagesGetInlineGameHighScores = (o: any) => {
  obj(o.id)
  obj(o.user_id)
}

const _messagesGetCommonChats = (o: any) => {
  obj(o.user_id)
  i64(o.max_id)
  i32(o.limit)
}

const _messagesGetWebPage = (o: any) => {
  str(o.url)
  i32(o.hash)
}

const _messagesToggleDialogPin = (o: any) => {
  const flags =
      has(o.pinned)
  i32(flags)
  obj(o.peer)
}

const _messagesReorderPinnedDialogs = (o: any) => {
  const flags =
      has(o.force)
  i32(flags)
  i32(o.folder_id)
  vector(obj, o.order)
}

const _messagesGetPinnedDialogs = (o: any) => {
  i32(o.folder_id)
}

const _messagesSetBotShippingResults = (o: any) => {
  const flags =
      has(o.error)
    | (has(o.shipping_options) << 1)
  i32(flags)
  i64(o.query_id)
  flag(str, o.error)
  flagVector(obj, o.shipping_options)
}

const _messagesSetBotPrecheckoutResults = (o: any) => {
  const flags =
      (has(o.success) << 1)
    | has(o.error)
  i32(flags)
  i64(o.query_id)
  flag(str, o.error)
}

const _messagesUploadMedia = (o: any) => {
  obj(o.peer)
  obj(o.media)
}

const _messagesSendScreenshotNotification = (o: any) => {
  obj(o.peer)
  obj(o.reply_to)
  i64(o.random_id)
}

const _messagesGetFavedStickers = (o: any) => {
  i64(o.hash)
}

const _messagesFaveSticker = (o: any) => {
  obj(o.id)
  bool(o.unfave)
}

const _messagesGetUnreadMentions = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.top_msg_id)
  i32(o.offset_id)
  i32(o.add_offset)
  i32(o.limit)
  i32(o.max_id)
  i32(o.min_id)
}

const _messagesReadMentions = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.top_msg_id)
}

const _messagesGetRecentLocations = (o: any) => {
  obj(o.peer)
  i32(o.limit)
  i64(o.hash)
}

const _messagesSendMultiMedia = (o: any) => {
  const flags =
      (has(o.silent) << 5)
    | (has(o.background) << 6)
    | (has(o.clear_draft) << 7)
    | (has(o.noforwards) << 14)
    | (has(o.update_stickersets_order) << 15)
    | (has(o.invert_media) << 16)
    | has(o.reply_to)
    | (has(o.schedule_date) << 10)
    | (has(o.send_as) << 13)
  i32(flags)
  obj(o.peer)
  flag(obj, o.reply_to)
  vector(obj, o.multi_media)
  flag(i32, o.schedule_date)
  flag(obj, o.send_as)
}

const _messagesUploadEncryptedFile = (o: any) => {
  obj(o.peer)
  obj(o.file)
}

const _messagesSearchStickerSets = (o: any) => {
  const flags =
      has(o.exclude_featured)
  i32(flags)
  str(o.q)
  i64(o.hash)
}

const _messagesMarkDialogUnread = (o: any) => {
  const flags =
      has(o.unread)
  i32(flags)
  obj(o.peer)
}

const _messagesUpdatePinnedMessage = (o: any) => {
  const flags =
      has(o.silent)
    | (has(o.unpin) << 1)
    | (has(o.pm_oneside) << 2)
  i32(flags)
  obj(o.peer)
  i32(o.id)
}

const _messagesSendVote = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  vector(bytes, o.options)
}

const _messagesGetPollResults = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
}

const _messagesGetOnlines = (o: any) => {
  obj(o.peer)
}

const _messagesEditChatAbout = (o: any) => {
  obj(o.peer)
  str(o.about)
}

const _messagesEditChatDefaultBannedRights = (o: any) => {
  obj(o.peer)
  obj(o.banned_rights)
}

const _messagesGetEmojiKeywords = (o: any) => {
  str(o.lang_code)
}

const _messagesGetEmojiKeywordsDifference = (o: any) => {
  str(o.lang_code)
  i32(o.from_version)
}

const _messagesGetEmojiKeywordsLanguages = (o: any) => {
  vector(str, o.lang_codes)
}

const _messagesGetEmojiURL = (o: any) => {
  str(o.lang_code)
}

const _messagesGetSearchCounters = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.top_msg_id)
  vector(obj, o.filters)
}

const _messagesRequestUrlAuth = (o: any) => {
  const flags =
      (has(o.peer) << 1)
    | (has(o.msg_id) << 1)
    | (has(o.button_id) << 1)
    | (has(o.url) << 2)
  i32(flags)
  flag(obj, o.peer)
  flag(i32, o.msg_id)
  flag(i32, o.button_id)
  flag(str, o.url)
}

const _messagesAcceptUrlAuth = (o: any) => {
  const flags =
      has(o.write_allowed)
    | (has(o.peer) << 1)
    | (has(o.msg_id) << 1)
    | (has(o.button_id) << 1)
    | (has(o.url) << 2)
  i32(flags)
  flag(obj, o.peer)
  flag(i32, o.msg_id)
  flag(i32, o.button_id)
  flag(str, o.url)
}

const _messagesHidePeerSettingsBar = (o: any) => {
  obj(o.peer)
}

const _messagesGetScheduledHistory = (o: any) => {
  obj(o.peer)
  i64(o.hash)
}

const _messagesGetScheduledMessages = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _messagesSendScheduledMessages = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _messagesDeleteScheduledMessages = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _messagesGetPollVotes = (o: any) => {
  const flags =
      has(o.option)
    | (has(o.offset) << 1)
  i32(flags)
  obj(o.peer)
  i32(o.id)
  flag(bytes, o.option)
  flag(str, o.offset)
  i32(o.limit)
}

const _messagesToggleStickerSets = (o: any) => {
  const flags =
      has(o.uninstall)
    | (has(o.archive) << 1)
    | (has(o.unarchive) << 2)
  i32(flags)
  vector(obj, o.stickersets)
}

const _messagesUpdateDialogFilter = (o: any) => {
  const flags =
      has(o.filter)
  i32(flags)
  i32(o.id)
  flag(obj, o.filter)
}

const _messagesUpdateDialogFiltersOrder = (o: any) => {
  vector(i32, o.order)
}

const _messagesGetOldFeaturedStickers = (o: any) => {
  i32(o.offset)
  i32(o.limit)
  i64(o.hash)
}

const _messagesGetReplies = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  i32(o.offset_id)
  i32(o.offset_date)
  i32(o.add_offset)
  i32(o.limit)
  i32(o.max_id)
  i32(o.min_id)
  i64(o.hash)
}

const _messagesGetDiscussionMessage = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
}

const _messagesReadDiscussion = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  i32(o.read_max_id)
}

const _messagesUnpinAllMessages = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.top_msg_id)
}

const _messagesDeleteChat = (o: any) => {
  i64(o.chat_id)
}

const _messagesDeletePhoneCallHistory = (o: any) => {
  const flags =
      has(o.revoke)
  i32(flags)
}

const _messagesCheckHistoryImport = (o: any) => {
  str(o.import_head)
}

const _messagesInitHistoryImport = (o: any) => {
  obj(o.peer)
  obj(o.file)
  i32(o.media_count)
}

const _messagesUploadImportedMedia = (o: any) => {
  obj(o.peer)
  i64(o.import_id)
  str(o.file_name)
  obj(o.media)
}

const _messagesStartHistoryImport = (o: any) => {
  obj(o.peer)
  i64(o.import_id)
}

const _messagesGetExportedChatInvites = (o: any) => {
  const flags =
      (has(o.revoked) << 3)
    | (has(o.offset_date) << 2)
    | (has(o.offset_link) << 2)
  i32(flags)
  obj(o.peer)
  obj(o.admin_id)
  flag(i32, o.offset_date)
  flag(str, o.offset_link)
  i32(o.limit)
}

const _messagesGetExportedChatInvite = (o: any) => {
  obj(o.peer)
  str(o.link)
}

const _messagesEditExportedChatInvite = (o: any) => {
  const flags =
      (has(o.revoked) << 2)
    | has(o.expire_date)
    | (has(o.usage_limit) << 1)
    | (has(o.request_needed) << 3)
    | (has(o.title) << 4)
  i32(flags)
  obj(o.peer)
  str(o.link)
  flag(i32, o.expire_date)
  flag(i32, o.usage_limit)
  flag(bool, o.request_needed)
  flag(str, o.title)
}

const _messagesDeleteRevokedExportedChatInvites = (o: any) => {
  obj(o.peer)
  obj(o.admin_id)
}

const _messagesDeleteExportedChatInvite = (o: any) => {
  obj(o.peer)
  str(o.link)
}

const _messagesGetAdminsWithInvites = (o: any) => {
  obj(o.peer)
}

const _messagesGetChatInviteImporters = (o: any) => {
  const flags =
      has(o.requested)
    | (has(o.link) << 1)
    | (has(o.q) << 2)
  i32(flags)
  obj(o.peer)
  flag(str, o.link)
  flag(str, o.q)
  i32(o.offset_date)
  obj(o.offset_user)
  i32(o.limit)
}

const _messagesSetHistoryTTL = (o: any) => {
  obj(o.peer)
  i32(o.period)
}

const _messagesCheckHistoryImportPeer = (o: any) => {
  obj(o.peer)
}

const _messagesSetChatTheme = (o: any) => {
  obj(o.peer)
  str(o.emoticon)
}

const _messagesGetMessageReadParticipants = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
}

const _messagesGetSearchResultsCalendar = (o: any) => {
  obj(o.peer)
  obj(o.filter)
  i32(o.offset_id)
  i32(o.offset_date)
}

const _messagesGetSearchResultsPositions = (o: any) => {
  obj(o.peer)
  obj(o.filter)
  i32(o.offset_id)
  i32(o.limit)
}

const _messagesHideChatJoinRequest = (o: any) => {
  const flags =
      has(o.approved)
  i32(flags)
  obj(o.peer)
  obj(o.user_id)
}

const _messagesHideAllChatJoinRequests = (o: any) => {
  const flags =
      has(o.approved)
    | (has(o.link) << 1)
  i32(flags)
  obj(o.peer)
  flag(str, o.link)
}

const _messagesToggleNoForwards = (o: any) => {
  obj(o.peer)
  bool(o.enabled)
}

const _messagesSaveDefaultSendAs = (o: any) => {
  obj(o.peer)
  obj(o.send_as)
}

const _messagesSendReaction = (o: any) => {
  const flags =
      (has(o.big) << 1)
    | (has(o.add_to_recent) << 2)
    | has(o.reaction)
  i32(flags)
  obj(o.peer)
  i32(o.msg_id)
  flagVector(obj, o.reaction)
}

const _messagesGetMessagesReactions = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _messagesGetMessageReactionsList = (o: any) => {
  const flags =
      has(o.reaction)
    | (has(o.offset) << 1)
  i32(flags)
  obj(o.peer)
  i32(o.id)
  flag(obj, o.reaction)
  flag(str, o.offset)
  i32(o.limit)
}

const _messagesSetChatAvailableReactions = (o: any) => {
  obj(o.peer)
  obj(o.available_reactions)
}

const _messagesGetAvailableReactions = (o: any) => {
  i32(o.hash)
}

const _messagesSetDefaultReaction = (o: any) => {
  obj(o.reaction)
}

const _messagesTranslateText = (o: any) => {
  const flags =
      has(o.peer)
    | has(o.id)
    | (has(o.text) << 1)
  i32(flags)
  flag(obj, o.peer)
  flagVector(i32, o.id)
  flagVector(obj, o.text)
  str(o.to_lang)
}

const _messagesGetUnreadReactions = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.top_msg_id)
  i32(o.offset_id)
  i32(o.add_offset)
  i32(o.limit)
  i32(o.max_id)
  i32(o.min_id)
}

const _messagesReadReactions = (o: any) => {
  const flags =
      has(o.top_msg_id)
  i32(flags)
  obj(o.peer)
  flag(i32, o.top_msg_id)
}

const _messagesSearchSentMedia = (o: any) => {
  str(o.q)
  obj(o.filter)
  i32(o.limit)
}

const _messagesGetAttachMenuBots = (o: any) => {
  i64(o.hash)
}

const _messagesGetAttachMenuBot = (o: any) => {
  obj(o.bot)
}

const _messagesToggleBotInAttachMenu = (o: any) => {
  const flags =
      has(o.write_allowed)
  i32(flags)
  obj(o.bot)
  bool(o.enabled)
}

const _messagesRequestWebView = (o: any) => {
  const flags =
      (has(o.from_bot_menu) << 4)
    | (has(o.silent) << 5)
    | (has(o.url) << 1)
    | (has(o.start_param) << 3)
    | (has(o.theme_params) << 2)
    | has(o.reply_to)
    | (has(o.send_as) << 13)
  i32(flags)
  obj(o.peer)
  obj(o.bot)
  flag(str, o.url)
  flag(str, o.start_param)
  flag(obj, o.theme_params)
  str(o.platform)
  flag(obj, o.reply_to)
  flag(obj, o.send_as)
}

const _messagesProlongWebView = (o: any) => {
  const flags =
      (has(o.silent) << 5)
    | has(o.reply_to)
    | (has(o.send_as) << 13)
  i32(flags)
  obj(o.peer)
  obj(o.bot)
  i64(o.query_id)
  flag(obj, o.reply_to)
  flag(obj, o.send_as)
}

const _messagesRequestSimpleWebView = (o: any) => {
  const flags =
      (has(o.from_switch_webview) << 1)
    | (has(o.from_side_menu) << 2)
    | (has(o.url) << 3)
    | (has(o.start_param) << 4)
    | has(o.theme_params)
  i32(flags)
  obj(o.bot)
  flag(str, o.url)
  flag(str, o.start_param)
  flag(obj, o.theme_params)
  str(o.platform)
}

const _messagesSendWebViewResultMessage = (o: any) => {
  str(o.bot_query_id)
  obj(o.result)
}

const _messagesSendWebViewData = (o: any) => {
  obj(o.bot)
  i64(o.random_id)
  str(o.button_text)
  str(o.data)
}

const _messagesTranscribeAudio = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
}

const _messagesRateTranscribedAudio = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  i64(o.transcription_id)
  bool(o.good)
}

const _messagesGetCustomEmojiDocuments = (o: any) => {
  vector(i64, o.document_id)
}

const _messagesGetEmojiStickers = (o: any) => {
  i64(o.hash)
}

const _messagesGetFeaturedEmojiStickers = (o: any) => {
  i64(o.hash)
}

const _messagesReportReaction = (o: any) => {
  obj(o.peer)
  i32(o.id)
  obj(o.reaction_peer)
}

const _messagesGetTopReactions = (o: any) => {
  i32(o.limit)
  i64(o.hash)
}

const _messagesGetRecentReactions = (o: any) => {
  i32(o.limit)
  i64(o.hash)
}

const _messagesGetExtendedMedia = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _messagesSetDefaultHistoryTTL = (o: any) => {
  i32(o.period)
}

const _messagesSendBotRequestedPeer = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
  i32(o.button_id)
  obj(o.requested_peer)
}

const _messagesGetEmojiGroups = (o: any) => {
  i32(o.hash)
}

const _messagesGetEmojiStatusGroups = (o: any) => {
  i32(o.hash)
}

const _messagesGetEmojiProfilePhotoGroups = (o: any) => {
  i32(o.hash)
}

const _messagesSearchCustomEmoji = (o: any) => {
  str(o.emoticon)
  i64(o.hash)
}

const _messagesTogglePeerTranslations = (o: any) => {
  const flags =
      has(o.disabled)
  i32(flags)
  obj(o.peer)
}

const _messagesGetBotApp = (o: any) => {
  obj(o.app)
  i64(o.hash)
}

const _messagesRequestAppWebView = (o: any) => {
  const flags =
      has(o.write_allowed)
    | (has(o.start_param) << 1)
    | (has(o.theme_params) << 2)
  i32(flags)
  obj(o.peer)
  obj(o.app)
  flag(str, o.start_param)
  flag(obj, o.theme_params)
  str(o.platform)
}

const _messagesSetChatWallPaper = (o: any) => {
  const flags =
      has(o.wallpaper)
    | (has(o.settings) << 2)
    | (has(o.id) << 1)
  i32(flags)
  obj(o.peer)
  flag(obj, o.wallpaper)
  flag(obj, o.settings)
  flag(i32, o.id)
}

const _updatesGetDifference = (o: any) => {
  const flags =
      (has(o.pts_limit) << 1)
    | has(o.pts_total_limit)
    | (has(o.qts_limit) << 2)
  i32(flags)
  i32(o.pts)
  flag(i32, o.pts_limit)
  flag(i32, o.pts_total_limit)
  i32(o.date)
  i32(o.qts)
  flag(i32, o.qts_limit)
}

const _updatesGetChannelDifference = (o: any) => {
  const flags =
      has(o.force)
  i32(flags)
  obj(o.channel)
  obj(o.filter)
  i32(o.pts)
  i32(o.limit)
}

const _photosUpdateProfilePhoto = (o: any) => {
  const flags =
      has(o.fallback)
    | (has(o.bot) << 1)
  i32(flags)
  flag(obj, o.bot)
  obj(o.id)
}

const _photosUploadProfilePhoto = (o: any) => {
  const flags =
      (has(o.fallback) << 3)
    | (has(o.bot) << 5)
    | has(o.file)
    | (has(o.video) << 1)
    | (has(o.video_start_ts) << 2)
    | (has(o.video_emoji_markup) << 4)
  i32(flags)
  flag(obj, o.bot)
  flag(obj, o.file)
  flag(obj, o.video)
  flag(f64, o.video_start_ts)
  flag(obj, o.video_emoji_markup)
}

const _photosDeletePhotos = (o: any) => {
  vector(obj, o.id)
}

const _photosGetUserPhotos = (o: any) => {
  obj(o.user_id)
  i32(o.offset)
  i64(o.max_id)
  i32(o.limit)
}

const _photosUploadContactProfilePhoto = (o: any) => {
  const flags =
      (has(o.suggest) << 3)
    | (has(o.save) << 4)
    | has(o.file)
    | (has(o.video) << 1)
    | (has(o.video_start_ts) << 2)
    | (has(o.video_emoji_markup) << 5)
  i32(flags)
  obj(o.user_id)
  flag(obj, o.file)
  flag(obj, o.video)
  flag(f64, o.video_start_ts)
  flag(obj, o.video_emoji_markup)
}

const _uploadSaveFilePart = (o: any) => {
  i64(o.file_id)
  i32(o.file_part)
  bytes(o.bytes)
}

const _uploadGetFile = (o: any) => {
  const flags =
      has(o.precise)
    | (has(o.cdn_supported) << 1)
  i32(flags)
  obj(o.location)
  i64(o.offset)
  i32(o.limit)
}

const _uploadSaveBigFilePart = (o: any) => {
  i64(o.file_id)
  i32(o.file_part)
  i32(o.file_total_parts)
  bytes(o.bytes)
}

const _uploadGetWebFile = (o: any) => {
  obj(o.location)
  i32(o.offset)
  i32(o.limit)
}

const _uploadGetCdnFile = (o: any) => {
  bytes(o.file_token)
  i64(o.offset)
  i32(o.limit)
}

const _uploadReuploadCdnFile = (o: any) => {
  bytes(o.file_token)
  bytes(o.request_token)
}

const _uploadGetCdnFileHashes = (o: any) => {
  bytes(o.file_token)
  i64(o.offset)
}

const _uploadGetFileHashes = (o: any) => {
  obj(o.location)
  i64(o.offset)
}

const _helpGetAppUpdate = (o: any) => {
  str(o.source)
}

const _helpGetAppChangelog = (o: any) => {
  str(o.prev_app_version)
}

const _helpSetBotUpdatesStatus = (o: any) => {
  i32(o.pending_updates_count)
  str(o.message)
}

const _helpGetRecentMeUrls = (o: any) => {
  str(o.referer)
}

const _helpAcceptTermsOfService = (o: any) => {
  obj(o.id)
}

const _helpGetDeepLinkInfo = (o: any) => {
  str(o.path)
}

const _helpGetAppConfig = (o: any) => {
  i32(o.hash)
}

const _helpSaveAppLog = (o: any) => {
  vector(obj, o.events)
}

const _helpGetPassportConfig = (o: any) => {
  i32(o.hash)
}

const _helpGetUserInfo = (o: any) => {
  obj(o.user_id)
}

const _helpEditUserInfo = (o: any) => {
  obj(o.user_id)
  str(o.message)
  vector(obj, o.entities)
}

const _helpHidePromoData = (o: any) => {
  obj(o.peer)
}

const _helpDismissSuggestion = (o: any) => {
  obj(o.peer)
  str(o.suggestion)
}

const _helpGetCountriesList = (o: any) => {
  str(o.lang_code)
  i32(o.hash)
}

const _channelsReadHistory = (o: any) => {
  obj(o.channel)
  i32(o.max_id)
}

const _channelsDeleteMessages = (o: any) => {
  obj(o.channel)
  vector(i32, o.id)
}

const _channelsReportSpam = (o: any) => {
  obj(o.channel)
  obj(o.participant)
  vector(i32, o.id)
}

const _channelsGetMessages = (o: any) => {
  obj(o.channel)
  vector(obj, o.id)
}

const _channelsGetParticipants = (o: any) => {
  obj(o.channel)
  obj(o.filter)
  i32(o.offset)
  i32(o.limit)
  i64(o.hash)
}

const _channelsGetParticipant = (o: any) => {
  obj(o.channel)
  obj(o.participant)
}

const _channelsGetChannels = (o: any) => {
  vector(obj, o.id)
}

const _channelsGetFullChannel = (o: any) => {
  obj(o.channel)
}

const _channelsCreateChannel = (o: any) => {
  const flags =
      has(o.broadcast)
    | (has(o.megagroup) << 1)
    | (has(o.for_import) << 3)
    | (has(o.forum) << 5)
    | (has(o.geo_point) << 2)
    | (has(o.address) << 2)
    | (has(o.ttl_period) << 4)
  i32(flags)
  str(o.title)
  str(o.about)
  flag(obj, o.geo_point)
  flag(str, o.address)
  flag(i32, o.ttl_period)
}

const _channelsEditAdmin = (o: any) => {
  obj(o.channel)
  obj(o.user_id)
  obj(o.admin_rights)
  str(o.rank)
}

const _channelsEditTitle = (o: any) => {
  obj(o.channel)
  str(o.title)
}

const _channelsEditPhoto = (o: any) => {
  obj(o.channel)
  obj(o.photo)
}

const _channelsCheckUsername = (o: any) => {
  obj(o.channel)
  str(o.username)
}

const _channelsUpdateUsername = (o: any) => {
  obj(o.channel)
  str(o.username)
}

const _channelsJoinChannel = (o: any) => {
  obj(o.channel)
}

const _channelsLeaveChannel = (o: any) => {
  obj(o.channel)
}

const _channelsInviteToChannel = (o: any) => {
  obj(o.channel)
  vector(obj, o.users)
}

const _channelsDeleteChannel = (o: any) => {
  obj(o.channel)
}

const _channelsExportMessageLink = (o: any) => {
  const flags =
      has(o.grouped)
    | (has(o.thread) << 1)
  i32(flags)
  obj(o.channel)
  i32(o.id)
}

const _channelsToggleSignatures = (o: any) => {
  obj(o.channel)
  bool(o.enabled)
}

const _channelsGetAdminedPublicChannels = (o: any) => {
  const flags =
      has(o.by_location)
    | (has(o.check_limit) << 1)
  i32(flags)
}

const _channelsEditBanned = (o: any) => {
  obj(o.channel)
  obj(o.participant)
  obj(o.banned_rights)
}

const _channelsGetAdminLog = (o: any) => {
  const flags =
      has(o.events_filter)
    | (has(o.admins) << 1)
  i32(flags)
  obj(o.channel)
  str(o.q)
  flag(obj, o.events_filter)
  flagVector(obj, o.admins)
  i64(o.max_id)
  i64(o.min_id)
  i32(o.limit)
}

const _channelsSetStickers = (o: any) => {
  obj(o.channel)
  obj(o.stickerset)
}

const _channelsReadMessageContents = (o: any) => {
  obj(o.channel)
  vector(i32, o.id)
}

const _channelsDeleteHistory = (o: any) => {
  const flags =
      has(o.for_everyone)
  i32(flags)
  obj(o.channel)
  i32(o.max_id)
}

const _channelsTogglePreHistoryHidden = (o: any) => {
  obj(o.channel)
  bool(o.enabled)
}

const _channelsGetLeftChannels = (o: any) => {
  i32(o.offset)
}

const _channelsSetDiscussionGroup = (o: any) => {
  obj(o.broadcast)
  obj(o.group)
}

const _channelsEditCreator = (o: any) => {
  obj(o.channel)
  obj(o.user_id)
  obj(o.password)
}

const _channelsEditLocation = (o: any) => {
  obj(o.channel)
  obj(o.geo_point)
  str(o.address)
}

const _channelsToggleSlowMode = (o: any) => {
  obj(o.channel)
  i32(o.seconds)
}

const _channelsConvertToGigagroup = (o: any) => {
  obj(o.channel)
}

const _channelsViewSponsoredMessage = (o: any) => {
  obj(o.channel)
  bytes(o.random_id)
}

const _channelsGetSponsoredMessages = (o: any) => {
  obj(o.channel)
}

const _channelsGetSendAs = (o: any) => {
  obj(o.peer)
}

const _channelsDeleteParticipantHistory = (o: any) => {
  obj(o.channel)
  obj(o.participant)
}

const _channelsToggleJoinToSend = (o: any) => {
  obj(o.channel)
  bool(o.enabled)
}

const _channelsToggleJoinRequest = (o: any) => {
  obj(o.channel)
  bool(o.enabled)
}

const _channelsReorderUsernames = (o: any) => {
  obj(o.channel)
  vector(str, o.order)
}

const _channelsToggleUsername = (o: any) => {
  obj(o.channel)
  str(o.username)
  bool(o.active)
}

const _channelsDeactivateAllUsernames = (o: any) => {
  obj(o.channel)
}

const _channelsToggleForum = (o: any) => {
  obj(o.channel)
  bool(o.enabled)
}

const _channelsCreateForumTopic = (o: any) => {
  const flags =
      has(o.icon_color)
    | (has(o.icon_emoji_id) << 3)
    | (has(o.send_as) << 2)
  i32(flags)
  obj(o.channel)
  str(o.title)
  flag(i32, o.icon_color)
  flag(i64, o.icon_emoji_id)
  i64(o.random_id)
  flag(obj, o.send_as)
}

const _channelsGetForumTopics = (o: any) => {
  const flags =
      has(o.q)
  i32(flags)
  obj(o.channel)
  flag(str, o.q)
  i32(o.offset_date)
  i32(o.offset_id)
  i32(o.offset_topic)
  i32(o.limit)
}

const _channelsGetForumTopicsByID = (o: any) => {
  obj(o.channel)
  vector(i32, o.topics)
}

const _channelsEditForumTopic = (o: any) => {
  const flags =
      has(o.title)
    | (has(o.icon_emoji_id) << 1)
    | (has(o.closed) << 2)
    | (has(o.hidden) << 3)
  i32(flags)
  obj(o.channel)
  i32(o.topic_id)
  flag(str, o.title)
  flag(i64, o.icon_emoji_id)
  flag(bool, o.closed)
  flag(bool, o.hidden)
}

const _channelsUpdatePinnedForumTopic = (o: any) => {
  obj(o.channel)
  i32(o.topic_id)
  bool(o.pinned)
}

const _channelsDeleteTopicHistory = (o: any) => {
  obj(o.channel)
  i32(o.top_msg_id)
}

const _channelsReorderPinnedForumTopics = (o: any) => {
  const flags =
      has(o.force)
  i32(flags)
  obj(o.channel)
  vector(i32, o.order)
}

const _channelsToggleAntiSpam = (o: any) => {
  obj(o.channel)
  bool(o.enabled)
}

const _channelsReportAntiSpamFalsePositive = (o: any) => {
  obj(o.channel)
  i32(o.msg_id)
}

const _channelsToggleParticipantsHidden = (o: any) => {
  obj(o.channel)
  bool(o.enabled)
}

const _channelsClickSponsoredMessage = (o: any) => {
  obj(o.channel)
  bytes(o.random_id)
}

const _channelsUpdateColor = (o: any) => {
  const flags =
      has(o.background_emoji_id)
  i32(flags)
  obj(o.channel)
  i32(o.color)
  flag(i64, o.background_emoji_id)
}

const _botsSendCustomRequest = (o: any) => {
  str(o.custom_method)
  obj(o.params)
}

const _botsAnswerWebhookJSONQuery = (o: any) => {
  i64(o.query_id)
  obj(o.data)
}

const _botsSetBotCommands = (o: any) => {
  obj(o.scope)
  str(o.lang_code)
  vector(obj, o.commands)
}

const _botsResetBotCommands = (o: any) => {
  obj(o.scope)
  str(o.lang_code)
}

const _botsGetBotCommands = (o: any) => {
  obj(o.scope)
  str(o.lang_code)
}

const _botsSetBotMenuButton = (o: any) => {
  obj(o.user_id)
  obj(o.button)
}

const _botsGetBotMenuButton = (o: any) => {
  obj(o.user_id)
}

const _botsSetBotBroadcastDefaultAdminRights = (o: any) => {
  obj(o.admin_rights)
}

const _botsSetBotGroupDefaultAdminRights = (o: any) => {
  obj(o.admin_rights)
}

const _botsSetBotInfo = (o: any) => {
  const flags =
      (has(o.bot) << 2)
    | (has(o.name) << 3)
    | has(o.about)
    | (has(o.description) << 1)
  i32(flags)
  flag(obj, o.bot)
  str(o.lang_code)
  flag(str, o.name)
  flag(str, o.about)
  flag(str, o.description)
}

const _botsGetBotInfo = (o: any) => {
  const flags =
      has(o.bot)
  i32(flags)
  flag(obj, o.bot)
  str(o.lang_code)
}

const _botsReorderUsernames = (o: any) => {
  obj(o.bot)
  vector(str, o.order)
}

const _botsToggleUsername = (o: any) => {
  obj(o.bot)
  str(o.username)
  bool(o.active)
}

const _botsCanSendMessage = (o: any) => {
  obj(o.bot)
}

const _botsAllowSendMessage = (o: any) => {
  obj(o.bot)
}

const _botsInvokeWebViewCustomMethod = (o: any) => {
  obj(o.bot)
  str(o.custom_method)
  obj(o.params)
}

const _paymentsGetPaymentForm = (o: any) => {
  const flags =
      has(o.theme_params)
  i32(flags)
  obj(o.invoice)
  flag(obj, o.theme_params)
}

const _paymentsGetPaymentReceipt = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
}

const _paymentsValidateRequestedInfo = (o: any) => {
  const flags =
      has(o.save)
  i32(flags)
  obj(o.invoice)
  obj(o.info)
}

const _paymentsSendPaymentForm = (o: any) => {
  const flags =
      has(o.requested_info_id)
    | (has(o.shipping_option_id) << 1)
    | (has(o.tip_amount) << 2)
  i32(flags)
  i64(o.form_id)
  obj(o.invoice)
  flag(str, o.requested_info_id)
  flag(str, o.shipping_option_id)
  obj(o.credentials)
  flag(i64, o.tip_amount)
}

const _paymentsClearSavedInfo = (o: any) => {
  const flags =
      has(o.credentials)
    | (has(o.info) << 1)
  i32(flags)
}

const _paymentsGetBankCardData = (o: any) => {
  str(o.number)
}

const _paymentsExportInvoice = (o: any) => {
  obj(o.invoice_media)
}

const _paymentsAssignAppStoreTransaction = (o: any) => {
  bytes(o.receipt)
  obj(o.purpose)
}

const _paymentsAssignPlayMarketTransaction = (o: any) => {
  obj(o.receipt)
  obj(o.purpose)
}

const _paymentsCanPurchasePremium = (o: any) => {
  obj(o.purpose)
}

const _paymentsGetPremiumGiftCodeOptions = (o: any) => {
  const flags =
      has(o.boost_peer)
  i32(flags)
  flag(obj, o.boost_peer)
}

const _paymentsCheckGiftCode = (o: any) => {
  str(o.slug)
}

const _paymentsApplyGiftCode = (o: any) => {
  str(o.slug)
}

const _paymentsGetGiveawayInfo = (o: any) => {
  obj(o.peer)
  i32(o.msg_id)
}

const _paymentsLaunchPrepaidGiveaway = (o: any) => {
  obj(o.peer)
  i64(o.giveaway_id)
  obj(o.purpose)
}

const _stickersCreateStickerSet = (o: any) => {
  const flags =
      has(o.masks)
    | (has(o.animated) << 1)
    | (has(o.videos) << 4)
    | (has(o.emojis) << 5)
    | (has(o.text_color) << 6)
    | (has(o.thumb) << 2)
    | (has(o.software) << 3)
  i32(flags)
  obj(o.user_id)
  str(o.title)
  str(o.short_name)
  flag(obj, o.thumb)
  vector(obj, o.stickers)
  flag(str, o.software)
}

const _stickersRemoveStickerFromSet = (o: any) => {
  obj(o.sticker)
}

const _stickersChangeStickerPosition = (o: any) => {
  obj(o.sticker)
  i32(o.position)
}

const _stickersAddStickerToSet = (o: any) => {
  obj(o.stickerset)
  obj(o.sticker)
}

const _stickersSetStickerSetThumb = (o: any) => {
  const flags =
      has(o.thumb)
    | (has(o.thumb_document_id) << 1)
  i32(flags)
  obj(o.stickerset)
  flag(obj, o.thumb)
  flag(i64, o.thumb_document_id)
}

const _stickersCheckShortName = (o: any) => {
  str(o.short_name)
}

const _stickersSuggestShortName = (o: any) => {
  str(o.title)
}

const _stickersChangeSticker = (o: any) => {
  const flags =
      has(o.emoji)
    | (has(o.mask_coords) << 1)
    | (has(o.keywords) << 2)
  i32(flags)
  obj(o.sticker)
  flag(str, o.emoji)
  flag(obj, o.mask_coords)
  flag(str, o.keywords)
}

const _stickersRenameStickerSet = (o: any) => {
  obj(o.stickerset)
  str(o.title)
}

const _stickersDeleteStickerSet = (o: any) => {
  obj(o.stickerset)
}

const _phoneRequestCall = (o: any) => {
  const flags =
      has(o.video)
  i32(flags)
  obj(o.user_id)
  i32(o.random_id)
  bytes(o.g_a_hash)
  obj(o.protocol)
}

const _phoneAcceptCall = (o: any) => {
  obj(o.peer)
  bytes(o.g_b)
  obj(o.protocol)
}

const _phoneConfirmCall = (o: any) => {
  obj(o.peer)
  bytes(o.g_a)
  i64(o.key_fingerprint)
  obj(o.protocol)
}

const _phoneReceivedCall = (o: any) => {
  obj(o.peer)
}

const _phoneDiscardCall = (o: any) => {
  const flags =
      has(o.video)
  i32(flags)
  obj(o.peer)
  i32(o.duration)
  obj(o.reason)
  i64(o.connection_id)
}

const _phoneSetCallRating = (o: any) => {
  const flags =
      has(o.user_initiative)
  i32(flags)
  obj(o.peer)
  i32(o.rating)
  str(o.comment)
}

const _phoneSaveCallDebug = (o: any) => {
  obj(o.peer)
  obj(o.debug)
}

const _phoneSendSignalingData = (o: any) => {
  obj(o.peer)
  bytes(o.data)
}

const _phoneCreateGroupCall = (o: any) => {
  const flags =
      (has(o.rtmp_stream) << 2)
    | has(o.title)
    | (has(o.schedule_date) << 1)
  i32(flags)
  obj(o.peer)
  i32(o.random_id)
  flag(str, o.title)
  flag(i32, o.schedule_date)
}

const _phoneJoinGroupCall = (o: any) => {
  const flags =
      has(o.muted)
    | (has(o.video_stopped) << 2)
    | (has(o.invite_hash) << 1)
  i32(flags)
  obj(o.call)
  obj(o.join_as)
  flag(str, o.invite_hash)
  obj(o.params)
}

const _phoneLeaveGroupCall = (o: any) => {
  obj(o.call)
  i32(o.source)
}

const _phoneInviteToGroupCall = (o: any) => {
  obj(o.call)
  vector(obj, o.users)
}

const _phoneDiscardGroupCall = (o: any) => {
  obj(o.call)
}

const _phoneToggleGroupCallSettings = (o: any) => {
  const flags =
      (has(o.reset_invite_hash) << 1)
    | has(o.join_muted)
  i32(flags)
  obj(o.call)
  flag(bool, o.join_muted)
}

const _phoneGetGroupCall = (o: any) => {
  obj(o.call)
  i32(o.limit)
}

const _phoneGetGroupParticipants = (o: any) => {
  obj(o.call)
  vector(obj, o.ids)
  vector(i32, o.sources)
  str(o.offset)
  i32(o.limit)
}

const _phoneCheckGroupCall = (o: any) => {
  obj(o.call)
  vector(i32, o.sources)
}

const _phoneToggleGroupCallRecord = (o: any) => {
  const flags =
      has(o.start)
    | (has(o.video) << 2)
    | (has(o.title) << 1)
    | (has(o.video_portrait) << 2)
  i32(flags)
  obj(o.call)
  flag(str, o.title)
  flag(bool, o.video_portrait)
}

const _phoneEditGroupCallParticipant = (o: any) => {
  const flags =
      has(o.muted)
    | (has(o.volume) << 1)
    | (has(o.raise_hand) << 2)
    | (has(o.video_stopped) << 3)
    | (has(o.video_paused) << 4)
    | (has(o.presentation_paused) << 5)
  i32(flags)
  obj(o.call)
  obj(o.participant)
  flag(bool, o.muted)
  flag(i32, o.volume)
  flag(bool, o.raise_hand)
  flag(bool, o.video_stopped)
  flag(bool, o.video_paused)
  flag(bool, o.presentation_paused)
}

const _phoneEditGroupCallTitle = (o: any) => {
  obj(o.call)
  str(o.title)
}

const _phoneGetGroupCallJoinAs = (o: any) => {
  obj(o.peer)
}

const _phoneExportGroupCallInvite = (o: any) => {
  const flags =
      has(o.can_self_unmute)
  i32(flags)
  obj(o.call)
}

const _phoneToggleGroupCallStartSubscription = (o: any) => {
  obj(o.call)
  bool(o.subscribed)
}

const _phoneStartScheduledGroupCall = (o: any) => {
  obj(o.call)
}

const _phoneSaveDefaultGroupCallJoinAs = (o: any) => {
  obj(o.peer)
  obj(o.join_as)
}

const _phoneJoinGroupCallPresentation = (o: any) => {
  obj(o.call)
  obj(o.params)
}

const _phoneLeaveGroupCallPresentation = (o: any) => {
  obj(o.call)
}

const _phoneGetGroupCallStreamChannels = (o: any) => {
  obj(o.call)
}

const _phoneGetGroupCallStreamRtmpUrl = (o: any) => {
  obj(o.peer)
  bool(o.revoke)
}

const _phoneSaveCallLog = (o: any) => {
  obj(o.peer)
  obj(o.file)
}

const _langpackGetLangPack = (o: any) => {
  str(o.lang_pack)
  str(o.lang_code)
}

const _langpackGetStrings = (o: any) => {
  str(o.lang_pack)
  str(o.lang_code)
  vector(str, o.keys)
}

const _langpackGetDifference = (o: any) => {
  str(o.lang_pack)
  str(o.lang_code)
  i32(o.from_version)
}

const _langpackGetLanguages = (o: any) => {
  str(o.lang_pack)
}

const _langpackGetLanguage = (o: any) => {
  str(o.lang_pack)
  str(o.lang_code)
}

const _foldersEditPeerFolders = (o: any) => {
  vector(obj, o.folder_peers)
}

const _statsGetBroadcastStats = (o: any) => {
  const flags =
      has(o.dark)
  i32(flags)
  obj(o.channel)
}

const _statsLoadAsyncGraph = (o: any) => {
  const flags =
      has(o.x)
  i32(flags)
  str(o.token)
  flag(i64, o.x)
}

const _statsGetMegagroupStats = (o: any) => {
  const flags =
      has(o.dark)
  i32(flags)
  obj(o.channel)
}

const _statsGetMessagePublicForwards = (o: any) => {
  obj(o.channel)
  i32(o.msg_id)
  i32(o.offset_rate)
  obj(o.offset_peer)
  i32(o.offset_id)
  i32(o.limit)
}

const _statsGetMessageStats = (o: any) => {
  const flags =
      has(o.dark)
  i32(flags)
  obj(o.channel)
  i32(o.msg_id)
}

const _chatlistsExportChatlistInvite = (o: any) => {
  obj(o.chatlist)
  str(o.title)
  vector(obj, o.peers)
}

const _chatlistsDeleteExportedInvite = (o: any) => {
  obj(o.chatlist)
  str(o.slug)
}

const _chatlistsEditExportedInvite = (o: any) => {
  const flags =
      (has(o.title) << 1)
    | (has(o.peers) << 2)
  i32(flags)
  obj(o.chatlist)
  str(o.slug)
  flag(str, o.title)
  flagVector(obj, o.peers)
}

const _chatlistsGetExportedInvites = (o: any) => {
  obj(o.chatlist)
}

const _chatlistsCheckChatlistInvite = (o: any) => {
  str(o.slug)
}

const _chatlistsJoinChatlistInvite = (o: any) => {
  str(o.slug)
  vector(obj, o.peers)
}

const _chatlistsGetChatlistUpdates = (o: any) => {
  obj(o.chatlist)
}

const _chatlistsJoinChatlistUpdates = (o: any) => {
  obj(o.chatlist)
  vector(obj, o.peers)
}

const _chatlistsHideChatlistUpdates = (o: any) => {
  obj(o.chatlist)
}

const _chatlistsGetLeaveChatlistSuggestions = (o: any) => {
  obj(o.chatlist)
}

const _chatlistsLeaveChatlist = (o: any) => {
  obj(o.chatlist)
  vector(obj, o.peers)
}

const _storiesCanSendStory = (o: any) => {
  obj(o.peer)
}

const _storiesSendStory = (o: any) => {
  const flags =
      (has(o.pinned) << 2)
    | (has(o.noforwards) << 4)
    | (has(o.media_areas) << 5)
    | has(o.caption)
    | (has(o.entities) << 1)
    | (has(o.period) << 3)
  i32(flags)
  obj(o.peer)
  obj(o.media)
  flagVector(obj, o.media_areas)
  flag(str, o.caption)
  flagVector(obj, o.entities)
  vector(obj, o.privacy_rules)
  i64(o.random_id)
  flag(i32, o.period)
}

const _storiesEditStory = (o: any) => {
  const flags =
      has(o.media)
    | (has(o.media_areas) << 3)
    | (has(o.caption) << 1)
    | (has(o.entities) << 1)
    | (has(o.privacy_rules) << 2)
  i32(flags)
  obj(o.peer)
  i32(o.id)
  flag(obj, o.media)
  flagVector(obj, o.media_areas)
  flag(str, o.caption)
  flagVector(obj, o.entities)
  flagVector(obj, o.privacy_rules)
}

const _storiesDeleteStories = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _storiesTogglePinned = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
  bool(o.pinned)
}

const _storiesGetAllStories = (o: any) => {
  const flags =
      (has(o.next) << 1)
    | (has(o.hidden) << 2)
    | has(o.state)
  i32(flags)
  flag(str, o.state)
}

const _storiesGetPinnedStories = (o: any) => {
  obj(o.peer)
  i32(o.offset_id)
  i32(o.limit)
}

const _storiesGetStoriesArchive = (o: any) => {
  obj(o.peer)
  i32(o.offset_id)
  i32(o.limit)
}

const _storiesGetStoriesByID = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _storiesToggleAllStoriesHidden = (o: any) => {
  bool(o.hidden)
}

const _storiesReadStories = (o: any) => {
  obj(o.peer)
  i32(o.max_id)
}

const _storiesIncrementStoryViews = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _storiesGetStoryViewsList = (o: any) => {
  const flags =
      has(o.just_contacts)
    | (has(o.reactions_first) << 2)
    | (has(o.q) << 1)
  i32(flags)
  obj(o.peer)
  flag(str, o.q)
  i32(o.id)
  str(o.offset)
  i32(o.limit)
}

const _storiesGetStoriesViews = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
}

const _storiesExportStoryLink = (o: any) => {
  obj(o.peer)
  i32(o.id)
}

const _storiesReport = (o: any) => {
  obj(o.peer)
  vector(i32, o.id)
  obj(o.reason)
  str(o.message)
}

const _storiesActivateStealthMode = (o: any) => {
  const flags =
      has(o.past)
    | (has(o.future) << 1)
  i32(flags)
}

const _storiesSendReaction = (o: any) => {
  const flags =
      has(o.add_to_recent)
  i32(flags)
  obj(o.peer)
  i32(o.story_id)
  obj(o.reaction)
}

const _storiesGetPeerStories = (o: any) => {
  obj(o.peer)
}

const _storiesGetPeerMaxIDs = (o: any) => {
  vector(obj, o.id)
}

const _storiesTogglePeerStoriesHidden = (o: any) => {
  obj(o.peer)
  bool(o.hidden)
}

const _premiumGetBoostsList = (o: any) => {
  const flags =
      has(o.gifts)
  i32(flags)
  obj(o.peer)
  str(o.offset)
  i32(o.limit)
}

const _premiumApplyBoost = (o: any) => {
  const flags =
      has(o.slots)
  i32(flags)
  flagVector(i32, o.slots)
  obj(o.peer)
}

const _premiumGetBoostsStatus = (o: any) => {
  obj(o.peer)
}


const builderMap: Record<string, [number, ((o: any) => void)?]> = {
  'boolFalse': [0xbc799737],
  'boolTrue': [0x997275b5],
  'true': [0x3fedd339],
  'vector': [0x1cb5c415],
  'error': [0xc4b9f9bb, _error],
  'null': [0x56730bcc],
  'inputPeerEmpty': [0x7f3b18ea],
  'inputPeerSelf': [0x7da07ec9],
  'inputPeerChat': [0x35a95cb9, _inputPeerChat],
  'inputPeerUser': [0xdde8a54c, _inputPeerUser],
  'inputPeerChannel': [0x27bcbbfc, _inputPeerChannel],
  'inputPeerUserFromMessage': [0xa87b0a1c, _inputPeerUserFromMessage],
  'inputPeerChannelFromMessage': [0xbd2a0840, _inputPeerChannelFromMessage],
  'inputUserEmpty': [0xb98886cf],
  'inputUserSelf': [0xf7c1b13f],
  'inputUser': [0xf21158c6, _inputUser],
  'inputUserFromMessage': [0x1da448e2, _inputUserFromMessage],
  'inputPhoneContact': [0xf392b7f4, _inputPhoneContact],
  'inputFile': [0xf52ff27f, _inputFile],
  'inputFileBig': [0xfa4f0bb5, _inputFileBig],
  'inputMediaEmpty': [0x9664f57f],
  'inputMediaUploadedPhoto': [0x1e287d04, _inputMediaUploadedPhoto],
  'inputMediaPhoto': [0xb3ba0635, _inputMediaPhoto],
  'inputMediaGeoPoint': [0xf9c44144, _inputMediaGeoPoint],
  'inputMediaContact': [0xf8ab7dfb, _inputMediaContact],
  'inputMediaUploadedDocument': [0x5b38c6c1, _inputMediaUploadedDocument],
  'inputMediaDocument': [0x33473058, _inputMediaDocument],
  'inputMediaVenue': [0xc13d1c11, _inputMediaVenue],
  'inputMediaPhotoExternal': [0xe5bbfe1a, _inputMediaPhotoExternal],
  'inputMediaDocumentExternal': [0xfb52dc99, _inputMediaDocumentExternal],
  'inputMediaGame': [0xd33f43f3, _inputMediaGame],
  'inputMediaInvoice': [0x8eb5a6d5, _inputMediaInvoice],
  'inputMediaGeoLive': [0x971fa843, _inputMediaGeoLive],
  'inputMediaPoll': [0xf94e5f1, _inputMediaPoll],
  'inputMediaDice': [0xe66fbf7b, _inputMediaDice],
  'inputMediaStory': [0x89fdd778, _inputMediaStory],
  'inputMediaWebPage': [0xc21b8849, _inputMediaWebPage],
  'inputChatPhotoEmpty': [0x1ca48f57],
  'inputChatUploadedPhoto': [0xbdcdaec0, _inputChatUploadedPhoto],
  'inputChatPhoto': [0x8953ad37, _inputChatPhoto],
  'inputGeoPointEmpty': [0xe4c123d6],
  'inputGeoPoint': [0x48222faf, _inputGeoPoint],
  'inputPhotoEmpty': [0x1cd7bf0d],
  'inputPhoto': [0x3bb3b94a, _inputPhoto],
  'inputFileLocation': [0xdfdaabe1, _inputFileLocation],
  'inputEncryptedFileLocation': [0xf5235d55, _inputEncryptedFileLocation],
  'inputDocumentFileLocation': [0xbad07584, _inputDocumentFileLocation],
  'inputSecureFileLocation': [0xcbc7ee28, _inputSecureFileLocation],
  'inputTakeoutFileLocation': [0x29be5899],
  'inputPhotoFileLocation': [0x40181ffe, _inputPhotoFileLocation],
  'inputPhotoLegacyFileLocation': [0xd83466f3, _inputPhotoLegacyFileLocation],
  'inputPeerPhotoFileLocation': [0x37257e99, _inputPeerPhotoFileLocation],
  'inputStickerSetThumb': [0x9d84f3db, _inputStickerSetThumb],
  'inputGroupCallStream': [0x598a92a, _inputGroupCallStream],
  'peerUser': [0x59511722, _peerUser],
  'peerChat': [0x36c6019a, _peerChat],
  'peerChannel': [0xa2a5371e, _peerChannel],
  'storage.fileUnknown': [0xaa963b05],
  'storage.filePartial': [0x40bc6f52],
  'storage.fileJpeg': [0x7efe0e],
  'storage.fileGif': [0xcae1aadf],
  'storage.filePng': [0xa4f63c0],
  'storage.filePdf': [0xae1e508d],
  'storage.fileMp3': [0x528a0677],
  'storage.fileMov': [0x4b09ebbc],
  'storage.fileMp4': [0xb3cea0e4],
  'storage.fileWebp': [0x1081464c],
  'userEmpty': [0xd3bc4b7a, _userEmpty],
  'user': [0xeb602f25, _user],
  'userProfilePhotoEmpty': [0x4f11bae1],
  'userProfilePhoto': [0x82d1f706, _userProfilePhoto],
  'userStatusEmpty': [0x9d05049],
  'userStatusOnline': [0xedb93949, _userStatusOnline],
  'userStatusOffline': [0x8c703f, _userStatusOffline],
  'userStatusRecently': [0xe26f42f1],
  'userStatusLastWeek': [0x7bf09fc],
  'userStatusLastMonth': [0x77ebc742],
  'chatEmpty': [0x29562865, _chatEmpty],
  'chat': [0x41cbf256, _chat],
  'chatForbidden': [0x6592a1a7, _chatForbidden],
  'channel': [0x1981ea7e, _channel],
  'channelForbidden': [0x17d493d5, _channelForbidden],
  'chatFull': [0xc9d31138, _chatFull],
  'channelFull': [0x723027bd, _channelFull],
  'chatParticipant': [0xc02d4007, _chatParticipant],
  'chatParticipantCreator': [0xe46bcee4, _chatParticipantCreator],
  'chatParticipantAdmin': [0xa0933f5b, _chatParticipantAdmin],
  'chatParticipantsForbidden': [0x8763d3e1, _chatParticipantsForbidden],
  'chatParticipants': [0x3cbc93f8, _chatParticipants],
  'chatPhotoEmpty': [0x37c1011c],
  'chatPhoto': [0x1c6e1c11, _chatPhoto],
  'messageEmpty': [0x90a6ca84, _messageEmpty],
  'message': [0x38116ee0, _message],
  'messageService': [0x2b085862, _messageService],
  'messageMediaEmpty': [0x3ded6320],
  'messageMediaPhoto': [0x695150d7, _messageMediaPhoto],
  'messageMediaGeo': [0x56e0d474, _messageMediaGeo],
  'messageMediaContact': [0x70322949, _messageMediaContact],
  'messageMediaUnsupported': [0x9f84f49e],
  'messageMediaDocument': [0x4cf4d72d, _messageMediaDocument],
  'messageMediaWebPage': [0xddf10c3b, _messageMediaWebPage],
  'messageMediaVenue': [0x2ec0533f, _messageMediaVenue],
  'messageMediaGame': [0xfdb19008, _messageMediaGame],
  'messageMediaInvoice': [0xf6a548d3, _messageMediaInvoice],
  'messageMediaGeoLive': [0xb940c666, _messageMediaGeoLive],
  'messageMediaPoll': [0x4bd6e798, _messageMediaPoll],
  'messageMediaDice': [0x3f7ee58b, _messageMediaDice],
  'messageMediaStory': [0x68cb6283, _messageMediaStory],
  'messageMediaGiveaway': [0x58260664, _messageMediaGiveaway],
  'messageActionEmpty': [0xb6aef7b0],
  'messageActionChatCreate': [0xbd47cbad, _messageActionChatCreate],
  'messageActionChatEditTitle': [0xb5a1ce5a, _messageActionChatEditTitle],
  'messageActionChatEditPhoto': [0x7fcb13a8, _messageActionChatEditPhoto],
  'messageActionChatDeletePhoto': [0x95e3fbef],
  'messageActionChatAddUser': [0x15cefd00, _messageActionChatAddUser],
  'messageActionChatDeleteUser': [0xa43f30cc, _messageActionChatDeleteUser],
  'messageActionChatJoinedByLink': [0x31224c3, _messageActionChatJoinedByLink],
  'messageActionChannelCreate': [0x95d2ac92, _messageActionChannelCreate],
  'messageActionChatMigrateTo': [0xe1037f92, _messageActionChatMigrateTo],
  'messageActionChannelMigrateFrom': [0xea3948e9, _messageActionChannelMigrateFrom],
  'messageActionPinMessage': [0x94bd38ed],
  'messageActionHistoryClear': [0x9fbab604],
  'messageActionGameScore': [0x92a72876, _messageActionGameScore],
  'messageActionPaymentSentMe': [0x8f31b327, _messageActionPaymentSentMe],
  'messageActionPaymentSent': [0x96163f56, _messageActionPaymentSent],
  'messageActionPhoneCall': [0x80e11a7f, _messageActionPhoneCall],
  'messageActionScreenshotTaken': [0x4792929b],
  'messageActionCustomAction': [0xfae69f56, _messageActionCustomAction],
  'messageActionBotAllowed': [0xc516d679, _messageActionBotAllowed],
  'messageActionSecureValuesSentMe': [0x1b287353, _messageActionSecureValuesSentMe],
  'messageActionSecureValuesSent': [0xd95c6154, _messageActionSecureValuesSent],
  'messageActionContactSignUp': [0xf3f25f76],
  'messageActionGeoProximityReached': [0x98e0d697, _messageActionGeoProximityReached],
  'messageActionGroupCall': [0x7a0d7f42, _messageActionGroupCall],
  'messageActionInviteToGroupCall': [0x502f92f7, _messageActionInviteToGroupCall],
  'messageActionSetMessagesTTL': [0x3c134d7b, _messageActionSetMessagesTTL],
  'messageActionGroupCallScheduled': [0xb3a07661, _messageActionGroupCallScheduled],
  'messageActionSetChatTheme': [0xaa786345, _messageActionSetChatTheme],
  'messageActionChatJoinedByRequest': [0xebbca3cb],
  'messageActionWebViewDataSentMe': [0x47dd8079, _messageActionWebViewDataSentMe],
  'messageActionWebViewDataSent': [0xb4c38cb5, _messageActionWebViewDataSent],
  'messageActionGiftPremium': [0xc83d6aec, _messageActionGiftPremium],
  'messageActionTopicCreate': [0xd999256, _messageActionTopicCreate],
  'messageActionTopicEdit': [0xc0944820, _messageActionTopicEdit],
  'messageActionSuggestProfilePhoto': [0x57de635e, _messageActionSuggestProfilePhoto],
  'messageActionRequestedPeer': [0xfe77345d, _messageActionRequestedPeer],
  'messageActionSetChatWallPaper': [0xbc44a927, _messageActionSetChatWallPaper],
  'messageActionSetSameChatWallPaper': [0xc0787d6d, _messageActionSetSameChatWallPaper],
  'messageActionGiftCode': [0xd2cfdb0e, _messageActionGiftCode],
  'messageActionGiveawayLaunch': [0x332ba9ed],
  'dialog': [0xd58a08c6, _dialog],
  'dialogFolder': [0x71bd134c, _dialogFolder],
  'photoEmpty': [0x2331b22d, _photoEmpty],
  'photo': [0xfb197a65, _photo],
  'photoSizeEmpty': [0xe17e23c, _photoSizeEmpty],
  'photoSize': [0x75c78e60, _photoSize],
  'photoCachedSize': [0x21e1ad6, _photoCachedSize],
  'photoStrippedSize': [0xe0b0bc2e, _photoStrippedSize],
  'photoSizeProgressive': [0xfa3efb95, _photoSizeProgressive],
  'photoPathSize': [0xd8214d41, _photoPathSize],
  'geoPointEmpty': [0x1117dd5f],
  'geoPoint': [0xb2a2f663, _geoPoint],
  'auth.sentCode': [0x5e002502, _authSentCode],
  'auth.sentCodeSuccess': [0x2390fe44, _authSentCodeSuccess],
  'auth.authorization': [0x2ea2c0d4, _authAuthorization],
  'auth.authorizationSignUpRequired': [0x44747e9a, _authAuthorizationSignUpRequired],
  'auth.exportedAuthorization': [0xb434e2b8, _authExportedAuthorization],
  'inputNotifyPeer': [0xb8bc5b0c, _inputNotifyPeer],
  'inputNotifyUsers': [0x193b4417],
  'inputNotifyChats': [0x4a95e84e],
  'inputNotifyBroadcasts': [0xb1db7c7e],
  'inputNotifyForumTopic': [0x5c467992, _inputNotifyForumTopic],
  'inputPeerNotifySettings': [0xcacb6ae2, _inputPeerNotifySettings],
  'peerNotifySettings': [0x99622c0c, _peerNotifySettings],
  'peerSettings': [0xa518110d, _peerSettings],
  'wallPaper': [0xa437c3ed, _wallPaper],
  'wallPaperNoFile': [0xe0804116, _wallPaperNoFile],
  'inputReportReasonSpam': [0x58dbcab8],
  'inputReportReasonViolence': [0x1e22c78d],
  'inputReportReasonPornography': [0x2e59d922],
  'inputReportReasonChildAbuse': [0xadf44ee3],
  'inputReportReasonOther': [0xc1e4a2b1],
  'inputReportReasonCopyright': [0x9b89f93a],
  'inputReportReasonGeoIrrelevant': [0xdbd4feed],
  'inputReportReasonFake': [0xf5ddd6e7],
  'inputReportReasonIllegalDrugs': [0xa8eb2be],
  'inputReportReasonPersonalDetails': [0x9ec7863d],
  'userFull': [0xb9b12c6c, _userFull],
  'contact': [0x145ade0b, _contact],
  'importedContact': [0xc13e3c50, _importedContact],
  'contactStatus': [0x16d9703b, _contactStatus],
  'contacts.contactsNotModified': [0xb74ba9d2],
  'contacts.contacts': [0xeae87e42, _contactsContacts],
  'contacts.importedContacts': [0x77d01c3b, _contactsImportedContacts],
  'contacts.blocked': [0xade1591, _contactsBlocked],
  'contacts.blockedSlice': [0xe1664194, _contactsBlockedSlice],
  'messages.dialogs': [0x15ba6c40, _messagesDialogs],
  'messages.dialogsSlice': [0x71e094f3, _messagesDialogsSlice],
  'messages.dialogsNotModified': [0xf0e3e596, _messagesDialogsNotModified],
  'messages.messages': [0x8c718e87, _messagesMessages],
  'messages.messagesSlice': [0x3a54685e, _messagesMessagesSlice],
  'messages.channelMessages': [0xc776ba4e, _messagesChannelMessages],
  'messages.messagesNotModified': [0x74535f21, _messagesMessagesNotModified],
  'messages.chats': [0x64ff9fd5, _messagesChats],
  'messages.chatsSlice': [0x9cd81144, _messagesChatsSlice],
  'messages.chatFull': [0xe5d7d19c, _messagesChatFull],
  'messages.affectedHistory': [0xb45c69d1, _messagesAffectedHistory],
  'inputMessagesFilterEmpty': [0x57e2f66c],
  'inputMessagesFilterPhotos': [0x9609a51c],
  'inputMessagesFilterVideo': [0x9fc00e65],
  'inputMessagesFilterPhotoVideo': [0x56e9f0e4],
  'inputMessagesFilterDocument': [0x9eddf188],
  'inputMessagesFilterUrl': [0x7ef0dd87],
  'inputMessagesFilterGif': [0xffc86587],
  'inputMessagesFilterVoice': [0x50f5c392],
  'inputMessagesFilterMusic': [0x3751b49e],
  'inputMessagesFilterChatPhotos': [0x3a20ecb8],
  'inputMessagesFilterPhoneCalls': [0x80c99768, _inputMessagesFilterPhoneCalls],
  'inputMessagesFilterRoundVoice': [0x7a7c17a4],
  'inputMessagesFilterRoundVideo': [0xb549da53],
  'inputMessagesFilterMyMentions': [0xc1f8e69a],
  'inputMessagesFilterGeo': [0xe7026d0d],
  'inputMessagesFilterContacts': [0xe062db83],
  'inputMessagesFilterPinned': [0x1bb00451],
  'updateNewMessage': [0x1f2b0afd, _updateNewMessage],
  'updateMessageID': [0x4e90bfd6, _updateMessageID],
  'updateDeleteMessages': [0xa20db0e5, _updateDeleteMessages],
  'updateUserTyping': [0xc01e857f, _updateUserTyping],
  'updateChatUserTyping': [0x83487af0, _updateChatUserTyping],
  'updateChatParticipants': [0x7761198, _updateChatParticipants],
  'updateUserStatus': [0xe5bdf8de, _updateUserStatus],
  'updateUserName': [0xa7848924, _updateUserName],
  'updateNewAuthorization': [0x8951abef, _updateNewAuthorization],
  'updateNewEncryptedMessage': [0x12bcbd9a, _updateNewEncryptedMessage],
  'updateEncryptedChatTyping': [0x1710f156, _updateEncryptedChatTyping],
  'updateEncryption': [0xb4a2e88d, _updateEncryption],
  'updateEncryptedMessagesRead': [0x38fe25b7, _updateEncryptedMessagesRead],
  'updateChatParticipantAdd': [0x3dda5451, _updateChatParticipantAdd],
  'updateChatParticipantDelete': [0xe32f3d77, _updateChatParticipantDelete],
  'updateDcOptions': [0x8e5e9873, _updateDcOptions],
  'updateNotifySettings': [0xbec268ef, _updateNotifySettings],
  'updateServiceNotification': [0xebe46819, _updateServiceNotification],
  'updatePrivacy': [0xee3b272a, _updatePrivacy],
  'updateUserPhone': [0x5492a13, _updateUserPhone],
  'updateReadHistoryInbox': [0x9c974fdf, _updateReadHistoryInbox],
  'updateReadHistoryOutbox': [0x2f2f21bf, _updateReadHistoryOutbox],
  'updateWebPage': [0x7f891213, _updateWebPage],
  'updateReadMessagesContents': [0xf8227181, _updateReadMessagesContents],
  'updateChannelTooLong': [0x108d941f, _updateChannelTooLong],
  'updateChannel': [0x635b4c09, _updateChannel],
  'updateNewChannelMessage': [0x62ba04d9, _updateNewChannelMessage],
  'updateReadChannelInbox': [0x922e6e10, _updateReadChannelInbox],
  'updateDeleteChannelMessages': [0xc32d5b12, _updateDeleteChannelMessages],
  'updateChannelMessageViews': [0xf226ac08, _updateChannelMessageViews],
  'updateChatParticipantAdmin': [0xd7ca61a2, _updateChatParticipantAdmin],
  'updateNewStickerSet': [0x688a30aa, _updateNewStickerSet],
  'updateStickerSetsOrder': [0xbb2d201, _updateStickerSetsOrder],
  'updateStickerSets': [0x31c24808, _updateStickerSets],
  'updateSavedGifs': [0x9375341e],
  'updateBotInlineQuery': [0x496f379c, _updateBotInlineQuery],
  'updateBotInlineSend': [0x12f12a07, _updateBotInlineSend],
  'updateEditChannelMessage': [0x1b3f4df7, _updateEditChannelMessage],
  'updateBotCallbackQuery': [0xb9cfc48d, _updateBotCallbackQuery],
  'updateEditMessage': [0xe40370a3, _updateEditMessage],
  'updateInlineBotCallbackQuery': [0x691e9052, _updateInlineBotCallbackQuery],
  'updateReadChannelOutbox': [0xb75f99a9, _updateReadChannelOutbox],
  'updateDraftMessage': [0x1b49ec6d, _updateDraftMessage],
  'updateReadFeaturedStickers': [0x571d2742],
  'updateRecentStickers': [0x9a422c20],
  'updateConfig': [0xa229dd06],
  'updatePtsChanged': [0x3354678f],
  'updateChannelWebPage': [0x2f2ba99f, _updateChannelWebPage],
  'updateDialogPinned': [0x6e6fe51c, _updateDialogPinned],
  'updatePinnedDialogs': [0xfa0f3ca2, _updatePinnedDialogs],
  'updateBotWebhookJSON': [0x8317c0c3, _updateBotWebhookJSON],
  'updateBotWebhookJSONQuery': [0x9b9240a6, _updateBotWebhookJSONQuery],
  'updateBotShippingQuery': [0xb5aefd7d, _updateBotShippingQuery],
  'updateBotPrecheckoutQuery': [0x8caa9a96, _updateBotPrecheckoutQuery],
  'updatePhoneCall': [0xab0f6b1e, _updatePhoneCall],
  'updateLangPackTooLong': [0x46560264, _updateLangPackTooLong],
  'updateLangPack': [0x56022f4d, _updateLangPack],
  'updateFavedStickers': [0xe511996d],
  'updateChannelReadMessagesContents': [0xea29055d, _updateChannelReadMessagesContents],
  'updateContactsReset': [0x7084a7be],
  'updateChannelAvailableMessages': [0xb23fc698, _updateChannelAvailableMessages],
  'updateDialogUnreadMark': [0xe16459c3, _updateDialogUnreadMark],
  'updateMessagePoll': [0xaca1657b, _updateMessagePoll],
  'updateChatDefaultBannedRights': [0x54c01850, _updateChatDefaultBannedRights],
  'updateFolderPeers': [0x19360dc0, _updateFolderPeers],
  'updatePeerSettings': [0x6a7e7366, _updatePeerSettings],
  'updatePeerLocated': [0xb4afcfb0, _updatePeerLocated],
  'updateNewScheduledMessage': [0x39a51dfb, _updateNewScheduledMessage],
  'updateDeleteScheduledMessages': [0x90866cee, _updateDeleteScheduledMessages],
  'updateTheme': [0x8216fba3, _updateTheme],
  'updateGeoLiveViewed': [0x871fb939, _updateGeoLiveViewed],
  'updateLoginToken': [0x564fe691],
  'updateMessagePollVote': [0x24f40e77, _updateMessagePollVote],
  'updateDialogFilter': [0x26ffde7d, _updateDialogFilter],
  'updateDialogFilterOrder': [0xa5d72105, _updateDialogFilterOrder],
  'updateDialogFilters': [0x3504914f],
  'updatePhoneCallSignalingData': [0x2661bf09, _updatePhoneCallSignalingData],
  'updateChannelMessageForwards': [0xd29a27f4, _updateChannelMessageForwards],
  'updateReadChannelDiscussionInbox': [0xd6b19546, _updateReadChannelDiscussionInbox],
  'updateReadChannelDiscussionOutbox': [0x695c9e7c, _updateReadChannelDiscussionOutbox],
  'updatePeerBlocked': [0xebe07752, _updatePeerBlocked],
  'updateChannelUserTyping': [0x8c88c923, _updateChannelUserTyping],
  'updatePinnedMessages': [0xed85eab5, _updatePinnedMessages],
  'updatePinnedChannelMessages': [0x5bb98608, _updatePinnedChannelMessages],
  'updateChat': [0xf89a6a4e, _updateChat],
  'updateGroupCallParticipants': [0xf2ebdb4e, _updateGroupCallParticipants],
  'updateGroupCall': [0x14b24500, _updateGroupCall],
  'updatePeerHistoryTTL': [0xbb9bb9a5, _updatePeerHistoryTTL],
  'updateChatParticipant': [0xd087663a, _updateChatParticipant],
  'updateChannelParticipant': [0x985d3abb, _updateChannelParticipant],
  'updateBotStopped': [0xc4870a49, _updateBotStopped],
  'updateGroupCallConnection': [0xb783982, _updateGroupCallConnection],
  'updateBotCommands': [0x4d712f2e, _updateBotCommands],
  'updatePendingJoinRequests': [0x7063c3db, _updatePendingJoinRequests],
  'updateBotChatInviteRequester': [0x11dfa986, _updateBotChatInviteRequester],
  'updateMessageReactions': [0x5e1b3cb8, _updateMessageReactions],
  'updateAttachMenuBots': [0x17b7a20b],
  'updateWebViewResultSent': [0x1592b79d, _updateWebViewResultSent],
  'updateBotMenuButton': [0x14b85813, _updateBotMenuButton],
  'updateSavedRingtones': [0x74d8be99],
  'updateTranscribedAudio': [0x84cd5a, _updateTranscribedAudio],
  'updateReadFeaturedEmojiStickers': [0xfb4c496c],
  'updateUserEmojiStatus': [0x28373599, _updateUserEmojiStatus],
  'updateRecentEmojiStatuses': [0x30f443db],
  'updateRecentReactions': [0x6f7863f4],
  'updateMoveStickerSetToTop': [0x86fccf85, _updateMoveStickerSetToTop],
  'updateMessageExtendedMedia': [0x5a73a98c, _updateMessageExtendedMedia],
  'updateChannelPinnedTopic': [0x192efbe3, _updateChannelPinnedTopic],
  'updateChannelPinnedTopics': [0xfe198602, _updateChannelPinnedTopics],
  'updateUser': [0x20529438, _updateUser],
  'updateAutoSaveSettings': [0xec05b097],
  'updateGroupInvitePrivacyForbidden': [0xccf08ad6, _updateGroupInvitePrivacyForbidden],
  'updateStory': [0x75b3b798, _updateStory],
  'updateReadStories': [0xf74e932b, _updateReadStories],
  'updateStoryID': [0x1bf335b9, _updateStoryID],
  'updateStoriesStealthMode': [0x2c084dc1, _updateStoriesStealthMode],
  'updateSentStoryReaction': [0x7d627683, _updateSentStoryReaction],
  'updates.state': [0xa56c2a3e, _updatesState],
  'updates.differenceEmpty': [0x5d75a138, _updatesDifferenceEmpty],
  'updates.difference': [0xf49ca0, _updatesDifference],
  'updates.differenceSlice': [0xa8fb1981, _updatesDifferenceSlice],
  'updates.differenceTooLong': [0x4afe8f6d, _updatesDifferenceTooLong],
  'updatesTooLong': [0xe317af7e],
  'updateShortMessage': [0x313bc7f8, _updateShortMessage],
  'updateShortChatMessage': [0x4d6deea5, _updateShortChatMessage],
  'updateShort': [0x78d4dec1, _updateShort],
  'updatesCombined': [0x725b04c3, _updatesCombined],
  'updates': [0x74ae4240, _updates],
  'updateShortSentMessage': [0x9015e101, _updateShortSentMessage],
  'photos.photos': [0x8dca6aa5, _photosPhotos],
  'photos.photosSlice': [0x15051f54, _photosPhotosSlice],
  'photos.photo': [0x20212ca8, _photosPhoto],
  'upload.file': [0x96a18d5, _uploadFile],
  'upload.fileCdnRedirect': [0xf18cda44, _uploadFileCdnRedirect],
  'dcOption': [0x18b7a10d, _dcOption],
  'config': [0xcc1a241e, _config],
  'nearestDc': [0x8e1a1775, _nearestDc],
  'help.appUpdate': [0xccbbce30, _helpAppUpdate],
  'help.noAppUpdate': [0xc45a6536],
  'help.inviteText': [0x18cb9f78, _helpInviteText],
  'encryptedChatEmpty': [0xab7ec0a0, _encryptedChatEmpty],
  'encryptedChatWaiting': [0x66b25953, _encryptedChatWaiting],
  'encryptedChatRequested': [0x48f1d94c, _encryptedChatRequested],
  'encryptedChat': [0x61f0d4c7, _encryptedChat],
  'encryptedChatDiscarded': [0x1e1c7c45, _encryptedChatDiscarded],
  'inputEncryptedChat': [0xf141b5e1, _inputEncryptedChat],
  'encryptedFileEmpty': [0xc21f497e],
  'encryptedFile': [0xa8008cd8, _encryptedFile],
  'inputEncryptedFileEmpty': [0x1837c364],
  'inputEncryptedFileUploaded': [0x64bd0306, _inputEncryptedFileUploaded],
  'inputEncryptedFile': [0x5a17b5e5, _inputEncryptedFile],
  'inputEncryptedFileBigUploaded': [0x2dc173c8, _inputEncryptedFileBigUploaded],
  'encryptedMessage': [0xed18c118, _encryptedMessage],
  'encryptedMessageService': [0x23734b06, _encryptedMessageService],
  'messages.dhConfigNotModified': [0xc0e24635, _messagesDhConfigNotModified],
  'messages.dhConfig': [0x2c221edd, _messagesDhConfig],
  'messages.sentEncryptedMessage': [0x560f8935, _messagesSentEncryptedMessage],
  'messages.sentEncryptedFile': [0x9493ff32, _messagesSentEncryptedFile],
  'inputDocumentEmpty': [0x72f0eaae],
  'inputDocument': [0x1abfb575, _inputDocument],
  'documentEmpty': [0x36f8c871, _documentEmpty],
  'document': [0x8fd4c4d8, _document],
  'help.support': [0x17c6b5f6, _helpSupport],
  'notifyPeer': [0x9fd40bd8, _notifyPeer],
  'notifyUsers': [0xb4c83b4c],
  'notifyChats': [0xc007cec3],
  'notifyBroadcasts': [0xd612e8ef],
  'notifyForumTopic': [0x226e6308, _notifyForumTopic],
  'sendMessageTypingAction': [0x16bf744e],
  'sendMessageCancelAction': [0xfd5ec8f5],
  'sendMessageRecordVideoAction': [0xa187d66f],
  'sendMessageUploadVideoAction': [0xe9763aec, _sendMessageUploadVideoAction],
  'sendMessageRecordAudioAction': [0xd52f73f7],
  'sendMessageUploadAudioAction': [0xf351d7ab, _sendMessageUploadAudioAction],
  'sendMessageUploadPhotoAction': [0xd1d34a26, _sendMessageUploadPhotoAction],
  'sendMessageUploadDocumentAction': [0xaa0cd9e4, _sendMessageUploadDocumentAction],
  'sendMessageGeoLocationAction': [0x176f8ba1],
  'sendMessageChooseContactAction': [0x628cbc6f],
  'sendMessageGamePlayAction': [0xdd6a8f48],
  'sendMessageRecordRoundAction': [0x88f27fbc],
  'sendMessageUploadRoundAction': [0x243e1c66, _sendMessageUploadRoundAction],
  'speakingInGroupCallAction': [0xd92c2285],
  'sendMessageHistoryImportAction': [0xdbda9246, _sendMessageHistoryImportAction],
  'sendMessageChooseStickerAction': [0xb05ac6b1],
  'sendMessageEmojiInteraction': [0x25972bcb, _sendMessageEmojiInteraction],
  'sendMessageEmojiInteractionSeen': [0xb665902e, _sendMessageEmojiInteractionSeen],
  'contacts.found': [0xb3134d9d, _contactsFound],
  'inputPrivacyKeyStatusTimestamp': [0x4f96cb18],
  'inputPrivacyKeyChatInvite': [0xbdfb0426],
  'inputPrivacyKeyPhoneCall': [0xfabadc5f],
  'inputPrivacyKeyPhoneP2P': [0xdb9e70d2],
  'inputPrivacyKeyForwards': [0xa4dd4c08],
  'inputPrivacyKeyProfilePhoto': [0x5719bacc],
  'inputPrivacyKeyPhoneNumber': [0x352dafa],
  'inputPrivacyKeyAddedByPhone': [0xd1219bdd],
  'inputPrivacyKeyVoiceMessages': [0xaee69d68],
  'inputPrivacyKeyAbout': [0x3823cc40],
  'privacyKeyStatusTimestamp': [0xbc2eab30],
  'privacyKeyChatInvite': [0x500e6dfa],
  'privacyKeyPhoneCall': [0x3d662b7b],
  'privacyKeyPhoneP2P': [0x39491cc8],
  'privacyKeyForwards': [0x69ec56a3],
  'privacyKeyProfilePhoto': [0x96151fed],
  'privacyKeyPhoneNumber': [0xd19ae46d],
  'privacyKeyAddedByPhone': [0x42ffd42b],
  'privacyKeyVoiceMessages': [0x697f414],
  'privacyKeyAbout': [0xa486b761],
  'inputPrivacyValueAllowContacts': [0xd09e07b],
  'inputPrivacyValueAllowAll': [0x184b35ce],
  'inputPrivacyValueAllowUsers': [0x131cc67f, _inputPrivacyValueAllowUsers],
  'inputPrivacyValueDisallowContacts': [0xba52007],
  'inputPrivacyValueDisallowAll': [0xd66b66c9],
  'inputPrivacyValueDisallowUsers': [0x90110467, _inputPrivacyValueDisallowUsers],
  'inputPrivacyValueAllowChatParticipants': [0x840649cf, _inputPrivacyValueAllowChatParticipants],
  'inputPrivacyValueDisallowChatParticipants': [0xe94f0f86, _inputPrivacyValueDisallowChatParticipants],
  'inputPrivacyValueAllowCloseFriends': [0x2f453e49],
  'privacyValueAllowContacts': [0xfffe1bac],
  'privacyValueAllowAll': [0x65427b82],
  'privacyValueAllowUsers': [0xb8905fb2, _privacyValueAllowUsers],
  'privacyValueDisallowContacts': [0xf888fa1a],
  'privacyValueDisallowAll': [0x8b73e763],
  'privacyValueDisallowUsers': [0xe4621141, _privacyValueDisallowUsers],
  'privacyValueAllowChatParticipants': [0x6b134e8e, _privacyValueAllowChatParticipants],
  'privacyValueDisallowChatParticipants': [0x41c87565, _privacyValueDisallowChatParticipants],
  'privacyValueAllowCloseFriends': [0xf7e8d89b],
  'account.privacyRules': [0x50a04e45, _accountPrivacyRules],
  'accountDaysTTL': [0xb8d0afdf, _accountDaysTTL],
  'documentAttributeImageSize': [0x6c37c15c, _documentAttributeImageSize],
  'documentAttributeAnimated': [0x11b58939],
  'documentAttributeSticker': [0x6319d612, _documentAttributeSticker],
  'documentAttributeVideo': [0xd38ff1c2, _documentAttributeVideo],
  'documentAttributeAudio': [0x9852f9c6, _documentAttributeAudio],
  'documentAttributeFilename': [0x15590068, _documentAttributeFilename],
  'documentAttributeHasStickers': [0x9801d2f7],
  'documentAttributeCustomEmoji': [0xfd149899, _documentAttributeCustomEmoji],
  'messages.stickersNotModified': [0xf1749a22],
  'messages.stickers': [0x30a6ec7e, _messagesStickers],
  'stickerPack': [0x12b299d4, _stickerPack],
  'messages.allStickersNotModified': [0xe86602c3],
  'messages.allStickers': [0xcdbbcebb, _messagesAllStickers],
  'messages.affectedMessages': [0x84d19185, _messagesAffectedMessages],
  'webPageEmpty': [0x211a1788, _webPageEmpty],
  'webPagePending': [0xb0d13e47, _webPagePending],
  'webPage': [0xe89c45b2, _webPage],
  'webPageNotModified': [0x7311ca11, _webPageNotModified],
  'authorization': [0xad01d61d, _authorization],
  'account.authorizations': [0x4bff8ea0, _accountAuthorizations],
  'account.password': [0x957b50fb, _accountPassword],
  'account.passwordSettings': [0x9a5c33e5, _accountPasswordSettings],
  'account.passwordInputSettings': [0xc23727c9, _accountPasswordInputSettings],
  'auth.passwordRecovery': [0x137948a5, _authPasswordRecovery],
  'receivedNotifyMessage': [0xa384b779, _receivedNotifyMessage],
  'chatInviteExported': [0xab4a819, _chatInviteExported],
  'chatInvitePublicJoinRequests': [0xed107ab7],
  'chatInviteAlready': [0x5a686d7c, _chatInviteAlready],
  'chatInvite': [0xcde0ec40, _chatInvite],
  'chatInvitePeek': [0x61695cb0, _chatInvitePeek],
  'inputStickerSetEmpty': [0xffb62b95],
  'inputStickerSetID': [0x9de7a269, _inputStickerSetID],
  'inputStickerSetShortName': [0x861cc8a0, _inputStickerSetShortName],
  'inputStickerSetAnimatedEmoji': [0x28703c8],
  'inputStickerSetDice': [0xe67f520e, _inputStickerSetDice],
  'inputStickerSetAnimatedEmojiAnimations': [0xcde3739],
  'inputStickerSetPremiumGifts': [0xc88b3b02],
  'inputStickerSetEmojiGenericAnimations': [0x4c4d4ce],
  'inputStickerSetEmojiDefaultStatuses': [0x29d0f5ee],
  'inputStickerSetEmojiDefaultTopicIcons': [0x44c1f8e9],
  'stickerSet': [0x2dd14edc, _stickerSet],
  'messages.stickerSet': [0x6e153f16, _messagesStickerSet],
  'messages.stickerSetNotModified': [0xd3f924eb],
  'botCommand': [0xc27ac8c7, _botCommand],
  'botInfo': [0x8f300b57, _botInfo],
  'keyboardButton': [0xa2fa4880, _keyboardButton],
  'keyboardButtonUrl': [0x258aff05, _keyboardButtonUrl],
  'keyboardButtonCallback': [0x35bbdb6b, _keyboardButtonCallback],
  'keyboardButtonRequestPhone': [0xb16a6c29, _keyboardButtonRequestPhone],
  'keyboardButtonRequestGeoLocation': [0xfc796b3f, _keyboardButtonRequestGeoLocation],
  'keyboardButtonSwitchInline': [0x93b9fbb5, _keyboardButtonSwitchInline],
  'keyboardButtonGame': [0x50f41ccf, _keyboardButtonGame],
  'keyboardButtonBuy': [0xafd93fbb, _keyboardButtonBuy],
  'keyboardButtonUrlAuth': [0x10b78d29, _keyboardButtonUrlAuth],
  'inputKeyboardButtonUrlAuth': [0xd02e7fd4, _inputKeyboardButtonUrlAuth],
  'keyboardButtonRequestPoll': [0xbbc7515d, _keyboardButtonRequestPoll],
  'inputKeyboardButtonUserProfile': [0xe988037b, _inputKeyboardButtonUserProfile],
  'keyboardButtonUserProfile': [0x308660c1, _keyboardButtonUserProfile],
  'keyboardButtonWebView': [0x13767230, _keyboardButtonWebView],
  'keyboardButtonSimpleWebView': [0xa0c0505c, _keyboardButtonSimpleWebView],
  'keyboardButtonRequestPeer': [0xd0b468c, _keyboardButtonRequestPeer],
  'keyboardButtonRow': [0x77608b83, _keyboardButtonRow],
  'replyKeyboardHide': [0xa03e5b85, _replyKeyboardHide],
  'replyKeyboardForceReply': [0x86b40b08, _replyKeyboardForceReply],
  'replyKeyboardMarkup': [0x85dd99d1, _replyKeyboardMarkup],
  'replyInlineMarkup': [0x48a30254, _replyInlineMarkup],
  'messageEntityUnknown': [0xbb92ba95, _messageEntityUnknown],
  'messageEntityMention': [0xfa04579d, _messageEntityMention],
  'messageEntityHashtag': [0x6f635b0d, _messageEntityHashtag],
  'messageEntityBotCommand': [0x6cef8ac7, _messageEntityBotCommand],
  'messageEntityUrl': [0x6ed02538, _messageEntityUrl],
  'messageEntityEmail': [0x64e475c2, _messageEntityEmail],
  'messageEntityBold': [0xbd610bc9, _messageEntityBold],
  'messageEntityItalic': [0x826f8b60, _messageEntityItalic],
  'messageEntityCode': [0x28a20571, _messageEntityCode],
  'messageEntityPre': [0x73924be0, _messageEntityPre],
  'messageEntityTextUrl': [0x76a6d327, _messageEntityTextUrl],
  'messageEntityMentionName': [0xdc7b1140, _messageEntityMentionName],
  'inputMessageEntityMentionName': [0x208e68c9, _inputMessageEntityMentionName],
  'messageEntityPhone': [0x9b69e34b, _messageEntityPhone],
  'messageEntityCashtag': [0x4c4e743f, _messageEntityCashtag],
  'messageEntityUnderline': [0x9c4e7e8b, _messageEntityUnderline],
  'messageEntityStrike': [0xbf0693d4, _messageEntityStrike],
  'messageEntityBankCard': [0x761e6af4, _messageEntityBankCard],
  'messageEntitySpoiler': [0x32ca960f, _messageEntitySpoiler],
  'messageEntityCustomEmoji': [0xc8cf05f8, _messageEntityCustomEmoji],
  'messageEntityBlockquote': [0x20df5d0, _messageEntityBlockquote],
  'inputChannelEmpty': [0xee8c1e86],
  'inputChannel': [0xf35aec28, _inputChannel],
  'inputChannelFromMessage': [0x5b934f9d, _inputChannelFromMessage],
  'contacts.resolvedPeer': [0x7f077ad9, _contactsResolvedPeer],
  'messageRange': [0xae30253, _messageRange],
  'updates.channelDifferenceEmpty': [0x3e11affb, _updatesChannelDifferenceEmpty],
  'updates.channelDifferenceTooLong': [0xa4bcc6fe, _updatesChannelDifferenceTooLong],
  'updates.channelDifference': [0x2064674e, _updatesChannelDifference],
  'channelMessagesFilterEmpty': [0x94d42ee7],
  'channelMessagesFilter': [0xcd77d957, _channelMessagesFilter],
  'channelParticipant': [0xc00c07c0, _channelParticipant],
  'channelParticipantSelf': [0x35a8bfa7, _channelParticipantSelf],
  'channelParticipantCreator': [0x2fe601d3, _channelParticipantCreator],
  'channelParticipantAdmin': [0x34c3bb53, _channelParticipantAdmin],
  'channelParticipantBanned': [0x6df8014e, _channelParticipantBanned],
  'channelParticipantLeft': [0x1b03f006, _channelParticipantLeft],
  'channelParticipantsRecent': [0xde3f3c79],
  'channelParticipantsAdmins': [0xb4608969],
  'channelParticipantsKicked': [0xa3b54985, _channelParticipantsKicked],
  'channelParticipantsBots': [0xb0d1865b],
  'channelParticipantsBanned': [0x1427a5e1, _channelParticipantsBanned],
  'channelParticipantsSearch': [0x656ac4b, _channelParticipantsSearch],
  'channelParticipantsContacts': [0xbb6ae88d, _channelParticipantsContacts],
  'channelParticipantsMentions': [0xe04b5ceb, _channelParticipantsMentions],
  'channels.channelParticipants': [0x9ab0feaf, _channelsChannelParticipants],
  'channels.channelParticipantsNotModified': [0xf0173fe9],
  'channels.channelParticipant': [0xdfb80317, _channelsChannelParticipant],
  'help.termsOfService': [0x780a0310, _helpTermsOfService],
  'messages.savedGifsNotModified': [0xe8025ca2],
  'messages.savedGifs': [0x84a02a0d, _messagesSavedGifs],
  'inputBotInlineMessageMediaAuto': [0x3380c786, _inputBotInlineMessageMediaAuto],
  'inputBotInlineMessageText': [0x3dcd7a87, _inputBotInlineMessageText],
  'inputBotInlineMessageMediaGeo': [0x96929a85, _inputBotInlineMessageMediaGeo],
  'inputBotInlineMessageMediaVenue': [0x417bbf11, _inputBotInlineMessageMediaVenue],
  'inputBotInlineMessageMediaContact': [0xa6edbffd, _inputBotInlineMessageMediaContact],
  'inputBotInlineMessageGame': [0x4b425864, _inputBotInlineMessageGame],
  'inputBotInlineMessageMediaInvoice': [0xd7e78225, _inputBotInlineMessageMediaInvoice],
  'inputBotInlineMessageMediaWebPage': [0xbddcc510, _inputBotInlineMessageMediaWebPage],
  'inputBotInlineResult': [0x88bf9319, _inputBotInlineResult],
  'inputBotInlineResultPhoto': [0xa8d864a7, _inputBotInlineResultPhoto],
  'inputBotInlineResultDocument': [0xfff8fdc4, _inputBotInlineResultDocument],
  'inputBotInlineResultGame': [0x4fa417f2, _inputBotInlineResultGame],
  'botInlineMessageMediaAuto': [0x764cf810, _botInlineMessageMediaAuto],
  'botInlineMessageText': [0x8c7f65e2, _botInlineMessageText],
  'botInlineMessageMediaGeo': [0x51846fd, _botInlineMessageMediaGeo],
  'botInlineMessageMediaVenue': [0x8a86659c, _botInlineMessageMediaVenue],
  'botInlineMessageMediaContact': [0x18d1cdc2, _botInlineMessageMediaContact],
  'botInlineMessageMediaInvoice': [0x354a9b09, _botInlineMessageMediaInvoice],
  'botInlineMessageMediaWebPage': [0x809ad9a6, _botInlineMessageMediaWebPage],
  'botInlineResult': [0x11965f3a, _botInlineResult],
  'botInlineMediaResult': [0x17db940b, _botInlineMediaResult],
  'messages.botResults': [0xe021f2f6, _messagesBotResults],
  'exportedMessageLink': [0x5dab1af4, _exportedMessageLink],
  'messageFwdHeader': [0x5f777dce, _messageFwdHeader],
  'auth.codeTypeSms': [0x72a3158c],
  'auth.codeTypeCall': [0x741cd3e3],
  'auth.codeTypeFlashCall': [0x226ccefb],
  'auth.codeTypeMissedCall': [0xd61ad6ee],
  'auth.codeTypeFragmentSms': [0x6ed998c],
  'auth.sentCodeTypeApp': [0x3dbb5986, _authSentCodeTypeApp],
  'auth.sentCodeTypeSms': [0xc000bba2, _authSentCodeTypeSms],
  'auth.sentCodeTypeCall': [0x5353e5a7, _authSentCodeTypeCall],
  'auth.sentCodeTypeFlashCall': [0xab03c6d9, _authSentCodeTypeFlashCall],
  'auth.sentCodeTypeMissedCall': [0x82006484, _authSentCodeTypeMissedCall],
  'auth.sentCodeTypeEmailCode': [0xf450f59b, _authSentCodeTypeEmailCode],
  'auth.sentCodeTypeSetUpEmailRequired': [0xa5491dea, _authSentCodeTypeSetUpEmailRequired],
  'auth.sentCodeTypeFragmentSms': [0xd9565c39, _authSentCodeTypeFragmentSms],
  'auth.sentCodeTypeFirebaseSms': [0xe57b1432, _authSentCodeTypeFirebaseSms],
  'messages.botCallbackAnswer': [0x36585ea4, _messagesBotCallbackAnswer],
  'messages.messageEditData': [0x26b5dde6, _messagesMessageEditData],
  'inputBotInlineMessageID': [0x890c3d89, _inputBotInlineMessageID],
  'inputBotInlineMessageID64': [0xb6d915d7, _inputBotInlineMessageID64],
  'inlineBotSwitchPM': [0x3c20629f, _inlineBotSwitchPM],
  'messages.peerDialogs': [0x3371c354, _messagesPeerDialogs],
  'topPeer': [0xedcdc05b, _topPeer],
  'topPeerCategoryBotsPM': [0xab661b5b],
  'topPeerCategoryBotsInline': [0x148677e2],
  'topPeerCategoryCorrespondents': [0x637b7ed],
  'topPeerCategoryGroups': [0xbd17a14a],
  'topPeerCategoryChannels': [0x161d9628],
  'topPeerCategoryPhoneCalls': [0x1e76a78c],
  'topPeerCategoryForwardUsers': [0xa8406ca9],
  'topPeerCategoryForwardChats': [0xfbeec0f0],
  'topPeerCategoryPeers': [0xfb834291, _topPeerCategoryPeers],
  'contacts.topPeersNotModified': [0xde266ef5],
  'contacts.topPeers': [0x70b772a8, _contactsTopPeers],
  'contacts.topPeersDisabled': [0xb52c939d],
  'draftMessageEmpty': [0x1b0c841a, _draftMessageEmpty],
  'draftMessage': [0x3fccf7ef, _draftMessage],
  'messages.featuredStickersNotModified': [0xc6dc0c66, _messagesFeaturedStickersNotModified],
  'messages.featuredStickers': [0xbe382906, _messagesFeaturedStickers],
  'messages.recentStickersNotModified': [0xb17f890],
  'messages.recentStickers': [0x88d37c56, _messagesRecentStickers],
  'messages.archivedStickers': [0x4fcba9c8, _messagesArchivedStickers],
  'messages.stickerSetInstallResultSuccess': [0x38641628],
  'messages.stickerSetInstallResultArchive': [0x35e410a8, _messagesStickerSetInstallResultArchive],
  'stickerSetCovered': [0x6410a5d2, _stickerSetCovered],
  'stickerSetMultiCovered': [0x3407e51b, _stickerSetMultiCovered],
  'stickerSetFullCovered': [0x40d13c0e, _stickerSetFullCovered],
  'stickerSetNoCovered': [0x77b15d1c, _stickerSetNoCovered],
  'maskCoords': [0xaed6dbb2, _maskCoords],
  'inputStickeredMediaPhoto': [0x4a992157, _inputStickeredMediaPhoto],
  'inputStickeredMediaDocument': [0x438865b, _inputStickeredMediaDocument],
  'game': [0xbdf9653b, _game],
  'inputGameID': [0x32c3e77, _inputGameID],
  'inputGameShortName': [0xc331e80a, _inputGameShortName],
  'highScore': [0x73a379eb, _highScore],
  'messages.highScores': [0x9a3bfd99, _messagesHighScores],
  'textEmpty': [0xdc3d824f],
  'textPlain': [0x744694e0, _textPlain],
  'textBold': [0x6724abc4, _textBold],
  'textItalic': [0xd912a59c, _textItalic],
  'textUnderline': [0xc12622c4, _textUnderline],
  'textStrike': [0x9bf8bb95, _textStrike],
  'textFixed': [0x6c3f19b9, _textFixed],
  'textUrl': [0x3c2884c1, _textUrl],
  'textEmail': [0xde5a0dd6, _textEmail],
  'textConcat': [0x7e6260d7, _textConcat],
  'textSubscript': [0xed6a8504, _textSubscript],
  'textSuperscript': [0xc7fb5e01, _textSuperscript],
  'textMarked': [0x34b8621, _textMarked],
  'textPhone': [0x1ccb966a, _textPhone],
  'textImage': [0x81ccf4f, _textImage],
  'textAnchor': [0x35553762, _textAnchor],
  'pageBlockUnsupported': [0x13567e8a],
  'pageBlockTitle': [0x70abc3fd, _pageBlockTitle],
  'pageBlockSubtitle': [0x8ffa9a1f, _pageBlockSubtitle],
  'pageBlockAuthorDate': [0xbaafe5e0, _pageBlockAuthorDate],
  'pageBlockHeader': [0xbfd064ec, _pageBlockHeader],
  'pageBlockSubheader': [0xf12bb6e1, _pageBlockSubheader],
  'pageBlockParagraph': [0x467a0766, _pageBlockParagraph],
  'pageBlockPreformatted': [0xc070d93e, _pageBlockPreformatted],
  'pageBlockFooter': [0x48870999, _pageBlockFooter],
  'pageBlockDivider': [0xdb20b188],
  'pageBlockAnchor': [0xce0d37b0, _pageBlockAnchor],
  'pageBlockList': [0xe4e88011, _pageBlockList],
  'pageBlockBlockquote': [0x263d7c26, _pageBlockBlockquote],
  'pageBlockPullquote': [0x4f4456d3, _pageBlockPullquote],
  'pageBlockPhoto': [0x1759c560, _pageBlockPhoto],
  'pageBlockVideo': [0x7c8fe7b6, _pageBlockVideo],
  'pageBlockCover': [0x39f23300, _pageBlockCover],
  'pageBlockEmbed': [0xa8718dc5, _pageBlockEmbed],
  'pageBlockEmbedPost': [0xf259a80b, _pageBlockEmbedPost],
  'pageBlockCollage': [0x65a0fa4d, _pageBlockCollage],
  'pageBlockSlideshow': [0x31f9590, _pageBlockSlideshow],
  'pageBlockChannel': [0xef1751b5, _pageBlockChannel],
  'pageBlockAudio': [0x804361ea, _pageBlockAudio],
  'pageBlockKicker': [0x1e148390, _pageBlockKicker],
  'pageBlockTable': [0xbf4dea82, _pageBlockTable],
  'pageBlockOrderedList': [0x9a8ae1e1, _pageBlockOrderedList],
  'pageBlockDetails': [0x76768bed, _pageBlockDetails],
  'pageBlockRelatedArticles': [0x16115a96, _pageBlockRelatedArticles],
  'pageBlockMap': [0xa44f3ef6, _pageBlockMap],
  'phoneCallDiscardReasonMissed': [0x85e42301],
  'phoneCallDiscardReasonDisconnect': [0xe095c1a0],
  'phoneCallDiscardReasonHangup': [0x57adc690],
  'phoneCallDiscardReasonBusy': [0xfaf7e8c9],
  'dataJSON': [0x7d748d04, _dataJSON],
  'labeledPrice': [0xcb296bf8, _labeledPrice],
  'invoice': [0x5db95a15, _invoice],
  'paymentCharge': [0xea02c27e, _paymentCharge],
  'postAddress': [0x1e8caaeb, _postAddress],
  'paymentRequestedInfo': [0x909c3f94, _paymentRequestedInfo],
  'paymentSavedCredentialsCard': [0xcdc27a1f, _paymentSavedCredentialsCard],
  'webDocument': [0x1c570ed1, _webDocument],
  'webDocumentNoProxy': [0xf9c8bcc6, _webDocumentNoProxy],
  'inputWebDocument': [0x9bed434d, _inputWebDocument],
  'inputWebFileLocation': [0xc239d686, _inputWebFileLocation],
  'inputWebFileGeoPointLocation': [0x9f2221c9, _inputWebFileGeoPointLocation],
  'inputWebFileAudioAlbumThumbLocation': [0xf46fe924, _inputWebFileAudioAlbumThumbLocation],
  'upload.webFile': [0x21e753bc, _uploadWebFile],
  'payments.paymentForm': [0xa0058751, _paymentsPaymentForm],
  'payments.validatedRequestedInfo': [0xd1451883, _paymentsValidatedRequestedInfo],
  'payments.paymentResult': [0x4e5f810d, _paymentsPaymentResult],
  'payments.paymentVerificationNeeded': [0xd8411139, _paymentsPaymentVerificationNeeded],
  'payments.paymentReceipt': [0x70c4fe03, _paymentsPaymentReceipt],
  'payments.savedInfo': [0xfb8fe43c, _paymentsSavedInfo],
  'inputPaymentCredentialsSaved': [0xc10eb2cf, _inputPaymentCredentialsSaved],
  'inputPaymentCredentials': [0x3417d728, _inputPaymentCredentials],
  'inputPaymentCredentialsApplePay': [0xaa1c39f, _inputPaymentCredentialsApplePay],
  'inputPaymentCredentialsGooglePay': [0x8ac32801, _inputPaymentCredentialsGooglePay],
  'account.tmpPassword': [0xdb64fd34, _accountTmpPassword],
  'shippingOption': [0xb6213cdf, _shippingOption],
  'inputStickerSetItem': [0x32da9e9c, _inputStickerSetItem],
  'inputPhoneCall': [0x1e36fded, _inputPhoneCall],
  'phoneCallEmpty': [0x5366c915, _phoneCallEmpty],
  'phoneCallWaiting': [0xc5226f17, _phoneCallWaiting],
  'phoneCallRequested': [0x14b0ed0c, _phoneCallRequested],
  'phoneCallAccepted': [0x3660c311, _phoneCallAccepted],
  'phoneCall': [0x967f7c67, _phoneCall],
  'phoneCallDiscarded': [0x50ca4de1, _phoneCallDiscarded],
  'phoneConnection': [0x9cc123c7, _phoneConnection],
  'phoneConnectionWebrtc': [0x635fe375, _phoneConnectionWebrtc],
  'phoneCallProtocol': [0xfc878fc8, _phoneCallProtocol],
  'phone.phoneCall': [0xec82e140, _phonePhoneCall],
  'upload.cdnFileReuploadNeeded': [0xeea8e46e, _uploadCdnFileReuploadNeeded],
  'upload.cdnFile': [0xa99fca4f, _uploadCdnFile],
  'cdnPublicKey': [0xc982eaba, _cdnPublicKey],
  'cdnConfig': [0x5725e40a, _cdnConfig],
  'langPackString': [0xcad181f6, _langPackString],
  'langPackStringPluralized': [0x6c47ac9f, _langPackStringPluralized],
  'langPackStringDeleted': [0x2979eeb2, _langPackStringDeleted],
  'langPackDifference': [0xf385c1f6, _langPackDifference],
  'langPackLanguage': [0xeeca5ce3, _langPackLanguage],
  'channelAdminLogEventActionChangeTitle': [0xe6dfb825, _channelAdminLogEventActionChangeTitle],
  'channelAdminLogEventActionChangeAbout': [0x55188a2e, _channelAdminLogEventActionChangeAbout],
  'channelAdminLogEventActionChangeUsername': [0x6a4afc38, _channelAdminLogEventActionChangeUsername],
  'channelAdminLogEventActionChangePhoto': [0x434bd2af, _channelAdminLogEventActionChangePhoto],
  'channelAdminLogEventActionToggleInvites': [0x1b7907ae, _channelAdminLogEventActionToggleInvites],
  'channelAdminLogEventActionToggleSignatures': [0x26ae0971, _channelAdminLogEventActionToggleSignatures],
  'channelAdminLogEventActionUpdatePinned': [0xe9e82c18, _channelAdminLogEventActionUpdatePinned],
  'channelAdminLogEventActionEditMessage': [0x709b2405, _channelAdminLogEventActionEditMessage],
  'channelAdminLogEventActionDeleteMessage': [0x42e047bb, _channelAdminLogEventActionDeleteMessage],
  'channelAdminLogEventActionParticipantJoin': [0x183040d3],
  'channelAdminLogEventActionParticipantLeave': [0xf89777f2],
  'channelAdminLogEventActionParticipantInvite': [0xe31c34d8, _channelAdminLogEventActionParticipantInvite],
  'channelAdminLogEventActionParticipantToggleBan': [0xe6d83d7e, _channelAdminLogEventActionParticipantToggleBan],
  'channelAdminLogEventActionParticipantToggleAdmin': [0xd5676710, _channelAdminLogEventActionParticipantToggleAdmin],
  'channelAdminLogEventActionChangeStickerSet': [0xb1c3caa7, _channelAdminLogEventActionChangeStickerSet],
  'channelAdminLogEventActionTogglePreHistoryHidden': [0x5f5c95f1, _channelAdminLogEventActionTogglePreHistoryHidden],
  'channelAdminLogEventActionDefaultBannedRights': [0x2df5fc0a, _channelAdminLogEventActionDefaultBannedRights],
  'channelAdminLogEventActionStopPoll': [0x8f079643, _channelAdminLogEventActionStopPoll],
  'channelAdminLogEventActionChangeLinkedChat': [0x50c7ac8, _channelAdminLogEventActionChangeLinkedChat],
  'channelAdminLogEventActionChangeLocation': [0xe6b76ae, _channelAdminLogEventActionChangeLocation],
  'channelAdminLogEventActionToggleSlowMode': [0x53909779, _channelAdminLogEventActionToggleSlowMode],
  'channelAdminLogEventActionStartGroupCall': [0x23209745, _channelAdminLogEventActionStartGroupCall],
  'channelAdminLogEventActionDiscardGroupCall': [0xdb9f9140, _channelAdminLogEventActionDiscardGroupCall],
  'channelAdminLogEventActionParticipantMute': [0xf92424d2, _channelAdminLogEventActionParticipantMute],
  'channelAdminLogEventActionParticipantUnmute': [0xe64429c0, _channelAdminLogEventActionParticipantUnmute],
  'channelAdminLogEventActionToggleGroupCallSetting': [0x56d6a247, _channelAdminLogEventActionToggleGroupCallSetting],
  'channelAdminLogEventActionParticipantJoinByInvite': [0xfe9fc158, _channelAdminLogEventActionParticipantJoinByInvite],
  'channelAdminLogEventActionExportedInviteDelete': [0x5a50fca4, _channelAdminLogEventActionExportedInviteDelete],
  'channelAdminLogEventActionExportedInviteRevoke': [0x410a134e, _channelAdminLogEventActionExportedInviteRevoke],
  'channelAdminLogEventActionExportedInviteEdit': [0xe90ebb59, _channelAdminLogEventActionExportedInviteEdit],
  'channelAdminLogEventActionParticipantVolume': [0x3e7f6847, _channelAdminLogEventActionParticipantVolume],
  'channelAdminLogEventActionChangeHistoryTTL': [0x6e941a38, _channelAdminLogEventActionChangeHistoryTTL],
  'channelAdminLogEventActionParticipantJoinByRequest': [0xafb6144a, _channelAdminLogEventActionParticipantJoinByRequest],
  'channelAdminLogEventActionToggleNoForwards': [0xcb2ac766, _channelAdminLogEventActionToggleNoForwards],
  'channelAdminLogEventActionSendMessage': [0x278f2868, _channelAdminLogEventActionSendMessage],
  'channelAdminLogEventActionChangeAvailableReactions': [0xbe4e0ef8, _channelAdminLogEventActionChangeAvailableReactions],
  'channelAdminLogEventActionChangeUsernames': [0xf04fb3a9, _channelAdminLogEventActionChangeUsernames],
  'channelAdminLogEventActionToggleForum': [0x2cc6383, _channelAdminLogEventActionToggleForum],
  'channelAdminLogEventActionCreateTopic': [0x58707d28, _channelAdminLogEventActionCreateTopic],
  'channelAdminLogEventActionEditTopic': [0xf06fe208, _channelAdminLogEventActionEditTopic],
  'channelAdminLogEventActionDeleteTopic': [0xae168909, _channelAdminLogEventActionDeleteTopic],
  'channelAdminLogEventActionPinTopic': [0x5d8d353b, _channelAdminLogEventActionPinTopic],
  'channelAdminLogEventActionToggleAntiSpam': [0x64f36dfc, _channelAdminLogEventActionToggleAntiSpam],
  'channelAdminLogEventActionChangeColor': [0x3c2b247b, _channelAdminLogEventActionChangeColor],
  'channelAdminLogEventActionChangeBackgroundEmoji': [0x445fc434, _channelAdminLogEventActionChangeBackgroundEmoji],
  'channelAdminLogEvent': [0x1fad68cd, _channelAdminLogEvent],
  'channels.adminLogResults': [0xed8af74d, _channelsAdminLogResults],
  'channelAdminLogEventsFilter': [0xea107ae4, _channelAdminLogEventsFilter],
  'popularContact': [0x5ce14175, _popularContact],
  'messages.favedStickersNotModified': [0x9e8fa6d3],
  'messages.favedStickers': [0x2cb51097, _messagesFavedStickers],
  'recentMeUrlUnknown': [0x46e1d13d, _recentMeUrlUnknown],
  'recentMeUrlUser': [0xb92c09e2, _recentMeUrlUser],
  'recentMeUrlChat': [0xb2da71d2, _recentMeUrlChat],
  'recentMeUrlChatInvite': [0xeb49081d, _recentMeUrlChatInvite],
  'recentMeUrlStickerSet': [0xbc0a57dc, _recentMeUrlStickerSet],
  'help.recentMeUrls': [0xe0310d7, _helpRecentMeUrls],
  'inputSingleMedia': [0x1cc6e91f, _inputSingleMedia],
  'webAuthorization': [0xa6f8f452, _webAuthorization],
  'account.webAuthorizations': [0xed56c9fc, _accountWebAuthorizations],
  'inputMessageID': [0xa676a322, _inputMessageID],
  'inputMessageReplyTo': [0xbad88395, _inputMessageReplyTo],
  'inputMessagePinned': [0x86872538],
  'inputMessageCallbackQuery': [0xacfa1a7e, _inputMessageCallbackQuery],
  'inputDialogPeer': [0xfcaafeb7, _inputDialogPeer],
  'inputDialogPeerFolder': [0x64600527, _inputDialogPeerFolder],
  'dialogPeer': [0xe56dbf05, _dialogPeer],
  'dialogPeerFolder': [0x514519e2, _dialogPeerFolder],
  'messages.foundStickerSetsNotModified': [0xd54b65d],
  'messages.foundStickerSets': [0x8af09dd2, _messagesFoundStickerSets],
  'fileHash': [0xf39b035c, _fileHash],
  'inputClientProxy': [0x75588b3f, _inputClientProxy],
  'help.termsOfServiceUpdateEmpty': [0xe3309f7f, _helpTermsOfServiceUpdateEmpty],
  'help.termsOfServiceUpdate': [0x28ecf961, _helpTermsOfServiceUpdate],
  'inputSecureFileUploaded': [0x3334b0f0, _inputSecureFileUploaded],
  'inputSecureFile': [0x5367e5be, _inputSecureFile],
  'secureFileEmpty': [0x64199744],
  'secureFile': [0x7d09c27e, _secureFile],
  'secureData': [0x8aeabec3, _secureData],
  'securePlainPhone': [0x7d6099dd, _securePlainPhone],
  'securePlainEmail': [0x21ec5a5f, _securePlainEmail],
  'secureValueTypePersonalDetails': [0x9d2a81e3],
  'secureValueTypePassport': [0x3dac6a00],
  'secureValueTypeDriverLicense': [0x6e425c4],
  'secureValueTypeIdentityCard': [0xa0d0744b],
  'secureValueTypeInternalPassport': [0x99a48f23],
  'secureValueTypeAddress': [0xcbe31e26],
  'secureValueTypeUtilityBill': [0xfc36954e],
  'secureValueTypeBankStatement': [0x89137c0d],
  'secureValueTypeRentalAgreement': [0x8b883488],
  'secureValueTypePassportRegistration': [0x99e3806a],
  'secureValueTypeTemporaryRegistration': [0xea02ec33],
  'secureValueTypePhone': [0xb320aadb],
  'secureValueTypeEmail': [0x8e3ca7ee],
  'secureValue': [0x187fa0ca, _secureValue],
  'inputSecureValue': [0xdb21d0a7, _inputSecureValue],
  'secureValueHash': [0xed1ecdb0, _secureValueHash],
  'secureValueErrorData': [0xe8a40bd9, _secureValueErrorData],
  'secureValueErrorFrontSide': [0xbe3dfa, _secureValueErrorFrontSide],
  'secureValueErrorReverseSide': [0x868a2aa5, _secureValueErrorReverseSide],
  'secureValueErrorSelfie': [0xe537ced6, _secureValueErrorSelfie],
  'secureValueErrorFile': [0x7a700873, _secureValueErrorFile],
  'secureValueErrorFiles': [0x666220e9, _secureValueErrorFiles],
  'secureValueError': [0x869d758f, _secureValueError],
  'secureValueErrorTranslationFile': [0xa1144770, _secureValueErrorTranslationFile],
  'secureValueErrorTranslationFiles': [0x34636dd8, _secureValueErrorTranslationFiles],
  'secureCredentialsEncrypted': [0x33f0ea47, _secureCredentialsEncrypted],
  'account.authorizationForm': [0xad2e1cd8, _accountAuthorizationForm],
  'account.sentEmailCode': [0x811f854f, _accountSentEmailCode],
  'help.deepLinkInfoEmpty': [0x66afa166],
  'help.deepLinkInfo': [0x6a4ee832, _helpDeepLinkInfo],
  'savedPhoneContact': [0x1142bd56, _savedPhoneContact],
  'account.takeout': [0x4dba4501, _accountTakeout],
  'passwordKdfAlgoUnknown': [0xd45ab096],
  'passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow': [0x3a912d4a, _passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow],
  'securePasswordKdfAlgoUnknown': [0x4a8537],
  'securePasswordKdfAlgoPBKDF2HMACSHA512iter100000': [0xbbf2dda0, _securePasswordKdfAlgoPBKDF2HMACSHA512iter100000],
  'securePasswordKdfAlgoSHA512': [0x86471d92, _securePasswordKdfAlgoSHA512],
  'secureSecretSettings': [0x1527bcac, _secureSecretSettings],
  'inputCheckPasswordEmpty': [0x9880f658],
  'inputCheckPasswordSRP': [0xd27ff082, _inputCheckPasswordSRP],
  'secureRequiredType': [0x829d99da, _secureRequiredType],
  'secureRequiredTypeOneOf': [0x27477b4, _secureRequiredTypeOneOf],
  'help.passportConfigNotModified': [0xbfb9f457],
  'help.passportConfig': [0xa098d6af, _helpPassportConfig],
  'inputAppEvent': [0x1d1b1245, _inputAppEvent],
  'jsonObjectValue': [0xc0de1bd9, _jsonObjectValue],
  'jsonNull': [0x3f6d7b68],
  'jsonBool': [0xc7345e6a, _jsonBool],
  'jsonNumber': [0x2be0dfa4, _jsonNumber],
  'jsonString': [0xb71e767a, _jsonString],
  'jsonArray': [0xf7444763, _jsonArray],
  'jsonObject': [0x99c1d49d, _jsonObject],
  'pageTableCell': [0x34566b6a, _pageTableCell],
  'pageTableRow': [0xe0c0c5e5, _pageTableRow],
  'pageCaption': [0x6f747657, _pageCaption],
  'pageListItemText': [0xb92fb6cd, _pageListItemText],
  'pageListItemBlocks': [0x25e073fc, _pageListItemBlocks],
  'pageListOrderedItemText': [0x5e068047, _pageListOrderedItemText],
  'pageListOrderedItemBlocks': [0x98dd8936, _pageListOrderedItemBlocks],
  'pageRelatedArticle': [0xb390dc08, _pageRelatedArticle],
  'page': [0x98657f0d, _page],
  'help.supportName': [0x8c05f1c9, _helpSupportName],
  'help.userInfoEmpty': [0xf3ae2eed],
  'help.userInfo': [0x1eb3758, _helpUserInfo],
  'pollAnswer': [0x6ca9c2e9, _pollAnswer],
  'poll': [0x86e18161, _poll],
  'pollAnswerVoters': [0x3b6ddad2, _pollAnswerVoters],
  'pollResults': [0x7adf2420, _pollResults],
  'chatOnlines': [0xf041e250, _chatOnlines],
  'statsURL': [0x47a971e0, _statsURL],
  'chatAdminRights': [0x5fb224d5, _chatAdminRights],
  'chatBannedRights': [0x9f120418, _chatBannedRights],
  'inputWallPaper': [0xe630b979, _inputWallPaper],
  'inputWallPaperSlug': [0x72091c80, _inputWallPaperSlug],
  'inputWallPaperNoFile': [0x967a462e, _inputWallPaperNoFile],
  'account.wallPapersNotModified': [0x1c199183],
  'account.wallPapers': [0xcdc3858c, _accountWallPapers],
  'codeSettings': [0xad253d78, _codeSettings],
  'wallPaperSettings': [0x1dc1bca4, _wallPaperSettings],
  'autoDownloadSettings': [0xbaa57628, _autoDownloadSettings],
  'account.autoDownloadSettings': [0x63cacf26, _accountAutoDownloadSettings],
  'emojiKeyword': [0xd5b3b9f9, _emojiKeyword],
  'emojiKeywordDeleted': [0x236df622, _emojiKeywordDeleted],
  'emojiKeywordsDifference': [0x5cc761bd, _emojiKeywordsDifference],
  'emojiURL': [0xa575739d, _emojiURL],
  'emojiLanguage': [0xb3fb5361, _emojiLanguage],
  'folder': [0xff544e65, _folder],
  'inputFolderPeer': [0xfbd2c296, _inputFolderPeer],
  'folderPeer': [0xe9baa668, _folderPeer],
  'messages.searchCounter': [0xe844ebff, _messagesSearchCounter],
  'urlAuthResultRequest': [0x92d33a0e, _urlAuthResultRequest],
  'urlAuthResultAccepted': [0x8f8c0e4e, _urlAuthResultAccepted],
  'urlAuthResultDefault': [0xa9d6db1f],
  'channelLocationEmpty': [0xbfb5ad8b],
  'channelLocation': [0x209b82db, _channelLocation],
  'peerLocated': [0xca461b5d, _peerLocated],
  'peerSelfLocated': [0xf8ec284b, _peerSelfLocated],
  'restrictionReason': [0xd072acb4, _restrictionReason],
  'inputTheme': [0x3c5693e9, _inputTheme],
  'inputThemeSlug': [0xf5890df1, _inputThemeSlug],
  'theme': [0xa00e67d6, _theme],
  'account.themesNotModified': [0xf41eb622],
  'account.themes': [0x9a3d8c6d, _accountThemes],
  'auth.loginToken': [0x629f1980, _authLoginToken],
  'auth.loginTokenMigrateTo': [0x68e9916, _authLoginTokenMigrateTo],
  'auth.loginTokenSuccess': [0x390d5c5e, _authLoginTokenSuccess],
  'account.contentSettings': [0x57e28221, _accountContentSettings],
  'messages.inactiveChats': [0xa927fec5, _messagesInactiveChats],
  'baseThemeClassic': [0xc3a12462],
  'baseThemeDay': [0xfbd81688],
  'baseThemeNight': [0xb7b31ea8],
  'baseThemeTinted': [0x6d5f77ee],
  'baseThemeArctic': [0x5b11125a],
  'inputThemeSettings': [0x8fde504f, _inputThemeSettings],
  'themeSettings': [0xfa58b6d4, _themeSettings],
  'webPageAttributeTheme': [0x54b56617, _webPageAttributeTheme],
  'webPageAttributeStory': [0x2e94c3e7, _webPageAttributeStory],
  'messages.votesList': [0x4899484e, _messagesVotesList],
  'bankCardOpenUrl': [0xf568028a, _bankCardOpenUrl],
  'payments.bankCardData': [0x3e24e573, _paymentsBankCardData],
  'dialogFilter': [0x7438f7e8, _dialogFilter],
  'dialogFilterDefault': [0x363293ae],
  'dialogFilterChatlist': [0xd64a04a8, _dialogFilterChatlist],
  'dialogFilterSuggested': [0x77744d4a, _dialogFilterSuggested],
  'statsDateRangeDays': [0xb637edaf, _statsDateRangeDays],
  'statsAbsValueAndPrev': [0xcb43acde, _statsAbsValueAndPrev],
  'statsPercentValue': [0xcbce2fe0, _statsPercentValue],
  'statsGraphAsync': [0x4a27eb2d, _statsGraphAsync],
  'statsGraphError': [0xbedc9822, _statsGraphError],
  'statsGraph': [0x8ea464b6, _statsGraph],
  'messageInteractionCounters': [0xad4fc9bd, _messageInteractionCounters],
  'stats.broadcastStats': [0xbdf78394, _statsBroadcastStats],
  'help.promoDataEmpty': [0x98f6ac75, _helpPromoDataEmpty],
  'help.promoData': [0x8c39793f, _helpPromoData],
  'videoSize': [0xde33b094, _videoSize],
  'videoSizeEmojiMarkup': [0xf85c413c, _videoSizeEmojiMarkup],
  'videoSizeStickerMarkup': [0xda082fe, _videoSizeStickerMarkup],
  'statsGroupTopPoster': [0x9d04af9b, _statsGroupTopPoster],
  'statsGroupTopAdmin': [0xd7584c87, _statsGroupTopAdmin],
  'statsGroupTopInviter': [0x535f779d, _statsGroupTopInviter],
  'stats.megagroupStats': [0xef7ff916, _statsMegagroupStats],
  'globalPrivacySettings': [0x734c4ccb, _globalPrivacySettings],
  'help.countryCode': [0x4203c5ef, _helpCountryCode],
  'help.country': [0xc3878e23, _helpCountry],
  'help.countriesListNotModified': [0x93cc1f32],
  'help.countriesList': [0x87d0759e, _helpCountriesList],
  'messageViews': [0x455b853d, _messageViews],
  'messages.messageViews': [0xb6c4f543, _messagesMessageViews],
  'messages.discussionMessage': [0xa6341782, _messagesDiscussionMessage],
  'messageReplyHeader': [0x6eebcabd, _messageReplyHeader],
  'messageReplyStoryHeader': [0x9c98bfc1, _messageReplyStoryHeader],
  'messageReplies': [0x83d60fc2, _messageReplies],
  'peerBlocked': [0xe8fd8014, _peerBlocked],
  'stats.messageStats': [0x8999f295, _statsMessageStats],
  'groupCallDiscarded': [0x7780bcb4, _groupCallDiscarded],
  'groupCall': [0xd597650c, _groupCall],
  'inputGroupCall': [0xd8aa840f, _inputGroupCall],
  'groupCallParticipant': [0xeba636fe, _groupCallParticipant],
  'phone.groupCall': [0x9e727aad, _phoneGroupCall],
  'phone.groupParticipants': [0xf47751b6, _phoneGroupParticipants],
  'inlineQueryPeerTypeSameBotPM': [0x3081ed9d],
  'inlineQueryPeerTypePM': [0x833c0fac],
  'inlineQueryPeerTypeChat': [0xd766c50a],
  'inlineQueryPeerTypeMegagroup': [0x5ec4be43],
  'inlineQueryPeerTypeBroadcast': [0x6334ee9a],
  'inlineQueryPeerTypeBotPM': [0xe3b2d0c],
  'messages.historyImport': [0x1662af0b, _messagesHistoryImport],
  'messages.historyImportParsed': [0x5e0fb7b9, _messagesHistoryImportParsed],
  'messages.affectedFoundMessages': [0xef8d3e6c, _messagesAffectedFoundMessages],
  'chatInviteImporter': [0x8c5adfd9, _chatInviteImporter],
  'messages.exportedChatInvites': [0xbdc62dcc, _messagesExportedChatInvites],
  'messages.exportedChatInvite': [0x1871be50, _messagesExportedChatInvite],
  'messages.exportedChatInviteReplaced': [0x222600ef, _messagesExportedChatInviteReplaced],
  'messages.chatInviteImporters': [0x81b6b00a, _messagesChatInviteImporters],
  'chatAdminWithInvites': [0xf2ecef23, _chatAdminWithInvites],
  'messages.chatAdminsWithInvites': [0xb69b72d7, _messagesChatAdminsWithInvites],
  'messages.checkedHistoryImportPeer': [0xa24de717, _messagesCheckedHistoryImportPeer],
  'phone.joinAsPeers': [0xafe5623f, _phoneJoinAsPeers],
  'phone.exportedGroupCallInvite': [0x204bd158, _phoneExportedGroupCallInvite],
  'groupCallParticipantVideoSourceGroup': [0xdcb118b7, _groupCallParticipantVideoSourceGroup],
  'groupCallParticipantVideo': [0x67753ac8, _groupCallParticipantVideo],
  'stickers.suggestedShortName': [0x85fea03f, _stickersSuggestedShortName],
  'botCommandScopeDefault': [0x2f6cb2ab],
  'botCommandScopeUsers': [0x3c4f04d8],
  'botCommandScopeChats': [0x6fe1a881],
  'botCommandScopeChatAdmins': [0xb9aa606a],
  'botCommandScopePeer': [0xdb9d897d, _botCommandScopePeer],
  'botCommandScopePeerAdmins': [0x3fd863d1, _botCommandScopePeerAdmins],
  'botCommandScopePeerUser': [0xa1321f3, _botCommandScopePeerUser],
  'account.resetPasswordFailedWait': [0xe3779861, _accountResetPasswordFailedWait],
  'account.resetPasswordRequestedWait': [0xe9effc7d, _accountResetPasswordRequestedWait],
  'account.resetPasswordOk': [0xe926d63e],
  'sponsoredMessage': [0xdaafff6b, _sponsoredMessage],
  'messages.sponsoredMessages': [0xc9ee1d87, _messagesSponsoredMessages],
  'messages.sponsoredMessagesEmpty': [0x1839490f],
  'searchResultsCalendarPeriod': [0xc9b0539f, _searchResultsCalendarPeriod],
  'messages.searchResultsCalendar': [0x147ee23c, _messagesSearchResultsCalendar],
  'searchResultPosition': [0x7f648b67, _searchResultPosition],
  'messages.searchResultsPositions': [0x53b22baf, _messagesSearchResultsPositions],
  'channels.sendAsPeers': [0xf496b0c6, _channelsSendAsPeers],
  'users.userFull': [0x3b6d152e, _usersUserFull],
  'messages.peerSettings': [0x6880b94d, _messagesPeerSettings],
  'auth.loggedOut': [0xc3a2835f, _authLoggedOut],
  'reactionCount': [0xa3d1cb80, _reactionCount],
  'messageReactions': [0x4f2b9479, _messageReactions],
  'messages.messageReactionsList': [0x31bd492d, _messagesMessageReactionsList],
  'availableReaction': [0xc077ec01, _availableReaction],
  'messages.availableReactionsNotModified': [0x9f071957],
  'messages.availableReactions': [0x768e3aad, _messagesAvailableReactions],
  'messagePeerReaction': [0x8c79b63c, _messagePeerReaction],
  'groupCallStreamChannel': [0x80eb48af, _groupCallStreamChannel],
  'phone.groupCallStreamChannels': [0xd0e482b2, _phoneGroupCallStreamChannels],
  'phone.groupCallStreamRtmpUrl': [0x2dbf3432, _phoneGroupCallStreamRtmpUrl],
  'attachMenuBotIconColor': [0x4576f3f0, _attachMenuBotIconColor],
  'attachMenuBotIcon': [0xb2a7386b, _attachMenuBotIcon],
  'attachMenuBot': [0xd90d8dfe, _attachMenuBot],
  'attachMenuBotsNotModified': [0xf1d88a5c],
  'attachMenuBots': [0x3c4301c0, _attachMenuBots],
  'attachMenuBotsBot': [0x93bf667f, _attachMenuBotsBot],
  'webViewResultUrl': [0xc14557c, _webViewResultUrl],
  'simpleWebViewResultUrl': [0x882f76bb, _simpleWebViewResultUrl],
  'webViewMessageSent': [0xc94511c, _webViewMessageSent],
  'botMenuButtonDefault': [0x7533a588],
  'botMenuButtonCommands': [0x4258c205],
  'botMenuButton': [0xc7b57ce6, _botMenuButton],
  'account.savedRingtonesNotModified': [0xfbf6e8b1],
  'account.savedRingtones': [0xc1e92cc5, _accountSavedRingtones],
  'notificationSoundDefault': [0x97e8bebe],
  'notificationSoundNone': [0x6f0c34df],
  'notificationSoundLocal': [0x830b9ae4, _notificationSoundLocal],
  'notificationSoundRingtone': [0xff6c8049, _notificationSoundRingtone],
  'account.savedRingtone': [0xb7263f6d],
  'account.savedRingtoneConverted': [0x1f307eb7, _accountSavedRingtoneConverted],
  'attachMenuPeerTypeSameBotPM': [0x7d6be90e],
  'attachMenuPeerTypeBotPM': [0xc32bfa1a],
  'attachMenuPeerTypePM': [0xf146d31f],
  'attachMenuPeerTypeChat': [0x509113f],
  'attachMenuPeerTypeBroadcast': [0x7bfbdefc],
  'inputInvoiceMessage': [0xc5b56859, _inputInvoiceMessage],
  'inputInvoiceSlug': [0xc326caef, _inputInvoiceSlug],
  'inputInvoicePremiumGiftCode': [0x98986c0d, _inputInvoicePremiumGiftCode],
  'payments.exportedInvoice': [0xaed0cbd9, _paymentsExportedInvoice],
  'messages.transcribedAudio': [0x93752c52, _messagesTranscribedAudio],
  'help.premiumPromo': [0x5334759c, _helpPremiumPromo],
  'inputStorePaymentPremiumSubscription': [0xa6751e66, _inputStorePaymentPremiumSubscription],
  'inputStorePaymentGiftPremium': [0x616f7fe8, _inputStorePaymentGiftPremium],
  'inputStorePaymentPremiumGiftCode': [0xa3805f3f, _inputStorePaymentPremiumGiftCode],
  'inputStorePaymentPremiumGiveaway': [0x7c9375e6, _inputStorePaymentPremiumGiveaway],
  'premiumGiftOption': [0x74c34319, _premiumGiftOption],
  'paymentFormMethod': [0x88f8f21b, _paymentFormMethod],
  'emojiStatusEmpty': [0x2de11aae],
  'emojiStatus': [0x929b619d, _emojiStatus],
  'emojiStatusUntil': [0xfa30a8c7, _emojiStatusUntil],
  'account.emojiStatusesNotModified': [0xd08ce645],
  'account.emojiStatuses': [0x90c467d1, _accountEmojiStatuses],
  'reactionEmpty': [0x79f5d419],
  'reactionEmoji': [0x1b2286b8, _reactionEmoji],
  'reactionCustomEmoji': [0x8935fc73, _reactionCustomEmoji],
  'chatReactionsNone': [0xeafc32bc],
  'chatReactionsAll': [0x52928bca, _chatReactionsAll],
  'chatReactionsSome': [0x661d4037, _chatReactionsSome],
  'messages.reactionsNotModified': [0xb06fdbdf],
  'messages.reactions': [0xeafdf716, _messagesReactions],
  'emailVerifyPurposeLoginSetup': [0x4345be73, _emailVerifyPurposeLoginSetup],
  'emailVerifyPurposeLoginChange': [0x527d22eb],
  'emailVerifyPurposePassport': [0xbbf51685],
  'emailVerificationCode': [0x922e55a9, _emailVerificationCode],
  'emailVerificationGoogle': [0xdb909ec2, _emailVerificationGoogle],
  'emailVerificationApple': [0x96d074fd, _emailVerificationApple],
  'account.emailVerified': [0x2b96cd1b, _accountEmailVerified],
  'account.emailVerifiedLogin': [0xe1bb0d61, _accountEmailVerifiedLogin],
  'premiumSubscriptionOption': [0x5f2d1df2, _premiumSubscriptionOption],
  'sendAsPeer': [0xb81c7034, _sendAsPeer],
  'messageExtendedMediaPreview': [0xad628cc8, _messageExtendedMediaPreview],
  'messageExtendedMedia': [0xee479c64, _messageExtendedMedia],
  'stickerKeyword': [0xfcfeb29c, _stickerKeyword],
  'username': [0xb4073647, _username],
  'forumTopicDeleted': [0x23f109b, _forumTopicDeleted],
  'forumTopic': [0x71701da9, _forumTopic],
  'messages.forumTopics': [0x367617d3, _messagesForumTopics],
  'defaultHistoryTTL': [0x43b46b20, _defaultHistoryTTL],
  'exportedContactToken': [0x41bf109b, _exportedContactToken],
  'requestPeerTypeUser': [0x5f3b8a00, _requestPeerTypeUser],
  'requestPeerTypeChat': [0xc9f06e1b, _requestPeerTypeChat],
  'requestPeerTypeBroadcast': [0x339bef6c, _requestPeerTypeBroadcast],
  'emojiListNotModified': [0x481eadfa],
  'emojiList': [0x7a1e11d1, _emojiList],
  'emojiGroup': [0x7a9abda9, _emojiGroup],
  'messages.emojiGroupsNotModified': [0x6fb4ad87],
  'messages.emojiGroups': [0x881fb94b, _messagesEmojiGroups],
  'textWithEntities': [0x751f3146, _textWithEntities],
  'messages.translateResult': [0x33db32f8, _messagesTranslateResult],
  'autoSaveSettings': [0xc84834ce, _autoSaveSettings],
  'autoSaveException': [0x81602d47, _autoSaveException],
  'account.autoSaveSettings': [0x4c3e069d, _accountAutoSaveSettings],
  'help.appConfigNotModified': [0x7cde641d],
  'help.appConfig': [0xdd18782e, _helpAppConfig],
  'inputBotAppID': [0xa920bd7a, _inputBotAppID],
  'inputBotAppShortName': [0x908c0407, _inputBotAppShortName],
  'botAppNotModified': [0x5da674b7],
  'botApp': [0x95fcd1d6, _botApp],
  'messages.botApp': [0xeb50adf5, _messagesBotApp],
  'appWebViewResultUrl': [0x3c1b4f0d, _appWebViewResultUrl],
  'inlineBotWebView': [0xb57295d5, _inlineBotWebView],
  'readParticipantDate': [0x4a4ff172, _readParticipantDate],
  'inputChatlistDialogFilter': [0xf3e0da33, _inputChatlistDialogFilter],
  'exportedChatlistInvite': [0xc5181ac, _exportedChatlistInvite],
  'chatlists.exportedChatlistInvite': [0x10e6e3a6, _chatlistsExportedChatlistInvite],
  'chatlists.exportedInvites': [0x10ab6dc7, _chatlistsExportedInvites],
  'chatlists.chatlistInviteAlready': [0xfa87f659, _chatlistsChatlistInviteAlready],
  'chatlists.chatlistInvite': [0x1dcd839d, _chatlistsChatlistInvite],
  'chatlists.chatlistUpdates': [0x93bd878d, _chatlistsChatlistUpdates],
  'bots.botInfo': [0xe8a775b0, _botsBotInfo],
  'messagePeerVote': [0xb6cc2d5c, _messagePeerVote],
  'messagePeerVoteInputOption': [0x74cda504, _messagePeerVoteInputOption],
  'messagePeerVoteMultiple': [0x4628f6e6, _messagePeerVoteMultiple],
  'sponsoredWebPage': [0x3db8ec63, _sponsoredWebPage],
  'storyViews': [0x8d595cd6, _storyViews],
  'storyItemDeleted': [0x51e6ee4f, _storyItemDeleted],
  'storyItemSkipped': [0xffadc913, _storyItemSkipped],
  'storyItem': [0x44c457ce, _storyItem],
  'stories.allStoriesNotModified': [0x1158fe3e, _storiesAllStoriesNotModified],
  'stories.allStories': [0x6efc5e81, _storiesAllStories],
  'stories.stories': [0x5dd8c3c8, _storiesStories],
  'storyView': [0xb0bdeac5, _storyView],
  'stories.storyViewsList': [0x46e9b9ec, _storiesStoryViewsList],
  'stories.storyViews': [0xde9eed1d, _storiesStoryViews],
  'inputReplyToMessage': [0x73ec805, _inputReplyToMessage],
  'inputReplyToStory': [0x15b0f283, _inputReplyToStory],
  'exportedStoryLink': [0x3fc9053b, _exportedStoryLink],
  'storiesStealthMode': [0x712e27fd, _storiesStealthMode],
  'mediaAreaCoordinates': [0x3d1ea4e, _mediaAreaCoordinates],
  'mediaAreaVenue': [0xbe82db9c, _mediaAreaVenue],
  'inputMediaAreaVenue': [0xb282217f, _inputMediaAreaVenue],
  'mediaAreaGeoPoint': [0xdf8b3b22, _mediaAreaGeoPoint],
  'mediaAreaSuggestedReaction': [0x14455871, _mediaAreaSuggestedReaction],
  'peerStories': [0x9a35e999, _peerStories],
  'stories.peerStories': [0xcae68768, _storiesPeerStories],
  'messages.webPage': [0xfd5e12bd, _messagesWebPage],
  'premiumGiftCodeOption': [0x257e962b, _premiumGiftCodeOption],
  'payments.checkedGiftCode': [0xb722f158, _paymentsCheckedGiftCode],
  'payments.giveawayInfo': [0x4367daa0, _paymentsGiveawayInfo],
  'payments.giveawayInfoResults': [0xcd5570, _paymentsGiveawayInfoResults],
  'prepaidGiveaway': [0xb2539d54, _prepaidGiveaway],
  'boost': [0x2a1c8c71, _boost],
  'premium.boostsList': [0x86f8613c, _premiumBoostsList],
  'myBoost': [0xc448415c, _myBoost],
  'premium.myBoosts': [0x9ae228e2, _premiumMyBoosts],
  'premium.boostsStatus': [0x4959427a, _premiumBoostsStatus],
  'invokeAfterMsg': [0xcb9f372d, _invokeAfterMsg],
  'invokeAfterMsgs': [0x3dc4b4f0, _invokeAfterMsgs],
  'initConnection': [0xc1cd5ea9, _initConnection],
  'invokeWithLayer': [0xda9b0d0d, _invokeWithLayer],
  'invokeWithoutUpdates': [0xbf9459b7, _invokeWithoutUpdates],
  'invokeWithMessagesRange': [0x365275f2, _invokeWithMessagesRange],
  'invokeWithTakeout': [0xaca9fd2e, _invokeWithTakeout],
  'auth.sendCode': [0xa677244f, _authSendCode],
  'auth.signUp': [0x80eee427, _authSignUp],
  'auth.signIn': [0x8d52a951, _authSignIn],
  'auth.logOut': [0x3e72ba19],
  'auth.resetAuthorizations': [0x9fab0d1a],
  'auth.exportAuthorization': [0xe5bfffcd, _authExportAuthorization],
  'auth.importAuthorization': [0xa57a7dad, _authImportAuthorization],
  'auth.bindTempAuthKey': [0xcdd42a05, _authBindTempAuthKey],
  'auth.importBotAuthorization': [0x67a3ff2c, _authImportBotAuthorization],
  'auth.checkPassword': [0xd18b4d16, _authCheckPassword],
  'auth.requestPasswordRecovery': [0xd897bc66],
  'auth.recoverPassword': [0x37096c70, _authRecoverPassword],
  'auth.resendCode': [0x3ef1a9bf, _authResendCode],
  'auth.cancelCode': [0x1f040578, _authCancelCode],
  'auth.dropTempAuthKeys': [0x8e48a188, _authDropTempAuthKeys],
  'auth.exportLoginToken': [0xb7e085fe, _authExportLoginToken],
  'auth.importLoginToken': [0x95ac5ce4, _authImportLoginToken],
  'auth.acceptLoginToken': [0xe894ad4d, _authAcceptLoginToken],
  'auth.checkRecoveryPassword': [0xd36bf79, _authCheckRecoveryPassword],
  'auth.importWebTokenAuthorization': [0x2db873a9, _authImportWebTokenAuthorization],
  'auth.requestFirebaseSms': [0x89464b50, _authRequestFirebaseSms],
  'auth.resetLoginEmail': [0x7e960193, _authResetLoginEmail],
  'account.registerDevice': [0xec86017a, _accountRegisterDevice],
  'account.unregisterDevice': [0x6a0d3206, _accountUnregisterDevice],
  'account.updateNotifySettings': [0x84be5b93, _accountUpdateNotifySettings],
  'account.getNotifySettings': [0x12b3ad31, _accountGetNotifySettings],
  'account.resetNotifySettings': [0xdb7e1747],
  'account.updateProfile': [0x78515775, _accountUpdateProfile],
  'account.updateStatus': [0x6628562c, _accountUpdateStatus],
  'account.getWallPapers': [0x7967d36, _accountGetWallPapers],
  'account.reportPeer': [0xc5ba3d86, _accountReportPeer],
  'account.checkUsername': [0x2714d86c, _accountCheckUsername],
  'account.updateUsername': [0x3e0bdd7c, _accountUpdateUsername],
  'account.getPrivacy': [0xdadbc950, _accountGetPrivacy],
  'account.setPrivacy': [0xc9f81ce8, _accountSetPrivacy],
  'account.deleteAccount': [0xa2c0cf74, _accountDeleteAccount],
  'account.getAccountTTL': [0x8fc711d],
  'account.setAccountTTL': [0x2442485e, _accountSetAccountTTL],
  'account.sendChangePhoneCode': [0x82574ae5, _accountSendChangePhoneCode],
  'account.changePhone': [0x70c32edb, _accountChangePhone],
  'account.updateDeviceLocked': [0x38df3532, _accountUpdateDeviceLocked],
  'account.getAuthorizations': [0xe320c158],
  'account.resetAuthorization': [0xdf77f3bc, _accountResetAuthorization],
  'account.getPassword': [0x548a30f5],
  'account.getPasswordSettings': [0x9cd4eaf9, _accountGetPasswordSettings],
  'account.updatePasswordSettings': [0xa59b102f, _accountUpdatePasswordSettings],
  'account.sendConfirmPhoneCode': [0x1b3faa88, _accountSendConfirmPhoneCode],
  'account.confirmPhone': [0x5f2178c3, _accountConfirmPhone],
  'account.getTmpPassword': [0x449e0b51, _accountGetTmpPassword],
  'account.getWebAuthorizations': [0x182e6d6f],
  'account.resetWebAuthorization': [0x2d01b9ef, _accountResetWebAuthorization],
  'account.resetWebAuthorizations': [0x682d2594],
  'account.getAllSecureValues': [0xb288bc7d],
  'account.getSecureValue': [0x73665bc2, _accountGetSecureValue],
  'account.saveSecureValue': [0x899fe31d, _accountSaveSecureValue],
  'account.deleteSecureValue': [0xb880bc4b, _accountDeleteSecureValue],
  'account.getAuthorizationForm': [0xa929597a, _accountGetAuthorizationForm],
  'account.acceptAuthorization': [0xf3ed4c73, _accountAcceptAuthorization],
  'account.sendVerifyPhoneCode': [0xa5a356f9, _accountSendVerifyPhoneCode],
  'account.verifyPhone': [0x4dd3a7f6, _accountVerifyPhone],
  'account.sendVerifyEmailCode': [0x98e037bb, _accountSendVerifyEmailCode],
  'account.verifyEmail': [0x32da4cf, _accountVerifyEmail],
  'account.initTakeoutSession': [0x8ef3eab0, _accountInitTakeoutSession],
  'account.finishTakeoutSession': [0x1d2652ee, _accountFinishTakeoutSession],
  'account.confirmPasswordEmail': [0x8fdf1920, _accountConfirmPasswordEmail],
  'account.resendPasswordEmail': [0x7a7f2a15],
  'account.cancelPasswordEmail': [0xc1cbd5b6],
  'account.getContactSignUpNotification': [0x9f07c728],
  'account.setContactSignUpNotification': [0xcff43f61, _accountSetContactSignUpNotification],
  'account.getNotifyExceptions': [0x53577479, _accountGetNotifyExceptions],
  'account.getWallPaper': [0xfc8ddbea, _accountGetWallPaper],
  'account.uploadWallPaper': [0xe39a8f03, _accountUploadWallPaper],
  'account.saveWallPaper': [0x6c5a5b37, _accountSaveWallPaper],
  'account.installWallPaper': [0xfeed5769, _accountInstallWallPaper],
  'account.resetWallPapers': [0xbb3b9804],
  'account.getAutoDownloadSettings': [0x56da0b3f],
  'account.saveAutoDownloadSettings': [0x76f36233, _accountSaveAutoDownloadSettings],
  'account.uploadTheme': [0x1c3db333, _accountUploadTheme],
  'account.createTheme': [0x652e4400, _accountCreateTheme],
  'account.updateTheme': [0x2bf40ccc, _accountUpdateTheme],
  'account.saveTheme': [0xf257106c, _accountSaveTheme],
  'account.installTheme': [0xc727bb3b, _accountInstallTheme],
  'account.getTheme': [0x3a5869ec, _accountGetTheme],
  'account.getThemes': [0x7206e458, _accountGetThemes],
  'account.setContentSettings': [0xb574b16b, _accountSetContentSettings],
  'account.getContentSettings': [0x8b9b4dae],
  'account.getMultiWallPapers': [0x65ad71dc, _accountGetMultiWallPapers],
  'account.getGlobalPrivacySettings': [0xeb2b4cf6],
  'account.setGlobalPrivacySettings': [0x1edaaac2, _accountSetGlobalPrivacySettings],
  'account.reportProfilePhoto': [0xfa8cc6f5, _accountReportProfilePhoto],
  'account.resetPassword': [0x9308ce1b],
  'account.declinePasswordReset': [0x4c9409f6],
  'account.getChatThemes': [0xd638de89, _accountGetChatThemes],
  'account.setAuthorizationTTL': [0xbf899aa0, _accountSetAuthorizationTTL],
  'account.changeAuthorizationSettings': [0x40f48462, _accountChangeAuthorizationSettings],
  'account.getSavedRingtones': [0xe1902288, _accountGetSavedRingtones],
  'account.saveRingtone': [0x3dea5b03, _accountSaveRingtone],
  'account.uploadRingtone': [0x831a83a2, _accountUploadRingtone],
  'account.updateEmojiStatus': [0xfbd3de6b, _accountUpdateEmojiStatus],
  'account.getDefaultEmojiStatuses': [0xd6753386, _accountGetDefaultEmojiStatuses],
  'account.getRecentEmojiStatuses': [0xf578105, _accountGetRecentEmojiStatuses],
  'account.clearRecentEmojiStatuses': [0x18201aae],
  'account.reorderUsernames': [0xef500eab, _accountReorderUsernames],
  'account.toggleUsername': [0x58d6b376, _accountToggleUsername],
  'account.getDefaultProfilePhotoEmojis': [0xe2750328, _accountGetDefaultProfilePhotoEmojis],
  'account.getDefaultGroupPhotoEmojis': [0x915860ae, _accountGetDefaultGroupPhotoEmojis],
  'account.getAutoSaveSettings': [0xadcbbcda],
  'account.saveAutoSaveSettings': [0xd69b8361, _accountSaveAutoSaveSettings],
  'account.deleteAutoSaveExceptions': [0x53bc0020],
  'account.invalidateSignInCodes': [0xca8ae8ba, _accountInvalidateSignInCodes],
  'account.updateColor': [0xa001cc43, _accountUpdateColor],
  'account.getDefaultBackgroundEmojis': [0xa60ab9ce, _accountGetDefaultBackgroundEmojis],
  'users.getUsers': [0xd91a548, _usersGetUsers],
  'users.getFullUser': [0xb60f5918, _usersGetFullUser],
  'users.setSecureValueErrors': [0x90c894b5, _usersSetSecureValueErrors],
  'contacts.getContactIDs': [0x7adc669d, _contactsGetContactIDs],
  'contacts.getStatuses': [0xc4a353ee],
  'contacts.getContacts': [0x5dd69e12, _contactsGetContacts],
  'contacts.importContacts': [0x2c800be5, _contactsImportContacts],
  'contacts.deleteContacts': [0x96a0e00, _contactsDeleteContacts],
  'contacts.deleteByPhones': [0x1013fd9e, _contactsDeleteByPhones],
  'contacts.block': [0x2e2e8734, _contactsBlock],
  'contacts.unblock': [0xb550d328, _contactsUnblock],
  'contacts.getBlocked': [0x9a868f80, _contactsGetBlocked],
  'contacts.search': [0x11f812d8, _contactsSearch],
  'contacts.resolveUsername': [0xf93ccba3, _contactsResolveUsername],
  'contacts.getTopPeers': [0x973478b6, _contactsGetTopPeers],
  'contacts.resetTopPeerRating': [0x1ae373ac, _contactsResetTopPeerRating],
  'contacts.resetSaved': [0x879537f1],
  'contacts.getSaved': [0x82f1e39f],
  'contacts.toggleTopPeers': [0x8514bdda, _contactsToggleTopPeers],
  'contacts.addContact': [0xe8f463d0, _contactsAddContact],
  'contacts.acceptContact': [0xf831a20f, _contactsAcceptContact],
  'contacts.getLocated': [0xd348bc44, _contactsGetLocated],
  'contacts.blockFromReplies': [0x29a8962c, _contactsBlockFromReplies],
  'contacts.resolvePhone': [0x8af94344, _contactsResolvePhone],
  'contacts.exportContactToken': [0xf8654027],
  'contacts.importContactToken': [0x13005788, _contactsImportContactToken],
  'contacts.editCloseFriends': [0xba6705f0, _contactsEditCloseFriends],
  'contacts.setBlocked': [0x94c65c76, _contactsSetBlocked],
  'messages.getMessages': [0x63c66506, _messagesGetMessages],
  'messages.getDialogs': [0xa0f4cb4f, _messagesGetDialogs],
  'messages.getHistory': [0x4423e6c5, _messagesGetHistory],
  'messages.search': [0xa0fda762, _messagesSearch],
  'messages.readHistory': [0xe306d3a, _messagesReadHistory],
  'messages.deleteHistory': [0xb08f922a, _messagesDeleteHistory],
  'messages.deleteMessages': [0xe58e95d2, _messagesDeleteMessages],
  'messages.receivedMessages': [0x5a954c0, _messagesReceivedMessages],
  'messages.setTyping': [0x58943ee2, _messagesSetTyping],
  'messages.sendMessage': [0x280d096f, _messagesSendMessage],
  'messages.sendMedia': [0x72ccc23d, _messagesSendMedia],
  'messages.forwardMessages': [0xc661bbc4, _messagesForwardMessages],
  'messages.reportSpam': [0xcf1592db, _messagesReportSpam],
  'messages.getPeerSettings': [0xefd9a6a2, _messagesGetPeerSettings],
  'messages.report': [0x8953ab4e, _messagesReport],
  'messages.getChats': [0x49e9528f, _messagesGetChats],
  'messages.getFullChat': [0xaeb00b34, _messagesGetFullChat],
  'messages.editChatTitle': [0x73783ffd, _messagesEditChatTitle],
  'messages.editChatPhoto': [0x35ddd674, _messagesEditChatPhoto],
  'messages.addChatUser': [0xf24753e3, _messagesAddChatUser],
  'messages.deleteChatUser': [0xa2185cab, _messagesDeleteChatUser],
  'messages.createChat': [0x34a818, _messagesCreateChat],
  'messages.getDhConfig': [0x26cf8950, _messagesGetDhConfig],
  'messages.requestEncryption': [0xf64daf43, _messagesRequestEncryption],
  'messages.acceptEncryption': [0x3dbc0415, _messagesAcceptEncryption],
  'messages.discardEncryption': [0xf393aea0, _messagesDiscardEncryption],
  'messages.setEncryptedTyping': [0x791451ed, _messagesSetEncryptedTyping],
  'messages.readEncryptedHistory': [0x7f4b690a, _messagesReadEncryptedHistory],
  'messages.sendEncrypted': [0x44fa7a15, _messagesSendEncrypted],
  'messages.sendEncryptedFile': [0x5559481d, _messagesSendEncryptedFile],
  'messages.sendEncryptedService': [0x32d439a4, _messagesSendEncryptedService],
  'messages.receivedQueue': [0x55a5bb66, _messagesReceivedQueue],
  'messages.reportEncryptedSpam': [0x4b0c8c0f, _messagesReportEncryptedSpam],
  'messages.readMessageContents': [0x36a73f77, _messagesReadMessageContents],
  'messages.getStickers': [0xd5a5d3a1, _messagesGetStickers],
  'messages.getAllStickers': [0xb8a0a1a8, _messagesGetAllStickers],
  'messages.getWebPagePreview': [0x8b68b0cc, _messagesGetWebPagePreview],
  'messages.exportChatInvite': [0xa02ce5d5, _messagesExportChatInvite],
  'messages.checkChatInvite': [0x3eadb1bb, _messagesCheckChatInvite],
  'messages.importChatInvite': [0x6c50051c, _messagesImportChatInvite],
  'messages.getStickerSet': [0xc8a0ec74, _messagesGetStickerSet],
  'messages.installStickerSet': [0xc78fe460, _messagesInstallStickerSet],
  'messages.uninstallStickerSet': [0xf96e55de, _messagesUninstallStickerSet],
  'messages.startBot': [0xe6df7378, _messagesStartBot],
  'messages.getMessagesViews': [0x5784d3e1, _messagesGetMessagesViews],
  'messages.editChatAdmin': [0xa85bd1c2, _messagesEditChatAdmin],
  'messages.migrateChat': [0xa2875319, _messagesMigrateChat],
  'messages.searchGlobal': [0x4bc6589a, _messagesSearchGlobal],
  'messages.reorderStickerSets': [0x78337739, _messagesReorderStickerSets],
  'messages.getDocumentByHash': [0xb1f2061f, _messagesGetDocumentByHash],
  'messages.getSavedGifs': [0x5cf09635, _messagesGetSavedGifs],
  'messages.saveGif': [0x327a30cb, _messagesSaveGif],
  'messages.getInlineBotResults': [0x514e999d, _messagesGetInlineBotResults],
  'messages.setInlineBotResults': [0xbb12a419, _messagesSetInlineBotResults],
  'messages.sendInlineBotResult': [0xf7bc68ba, _messagesSendInlineBotResult],
  'messages.getMessageEditData': [0xfda68d36, _messagesGetMessageEditData],
  'messages.editMessage': [0x48f71778, _messagesEditMessage],
  'messages.editInlineBotMessage': [0x83557dba, _messagesEditInlineBotMessage],
  'messages.getBotCallbackAnswer': [0x9342ca07, _messagesGetBotCallbackAnswer],
  'messages.setBotCallbackAnswer': [0xd58f130a, _messagesSetBotCallbackAnswer],
  'messages.getPeerDialogs': [0xe470bcfd, _messagesGetPeerDialogs],
  'messages.saveDraft': [0x7ff3b806, _messagesSaveDraft],
  'messages.getAllDrafts': [0x6a3f8d65],
  'messages.getFeaturedStickers': [0x64780b14, _messagesGetFeaturedStickers],
  'messages.readFeaturedStickers': [0x5b118126, _messagesReadFeaturedStickers],
  'messages.getRecentStickers': [0x9da9403b, _messagesGetRecentStickers],
  'messages.saveRecentSticker': [0x392718f8, _messagesSaveRecentSticker],
  'messages.clearRecentStickers': [0x8999602d, _messagesClearRecentStickers],
  'messages.getArchivedStickers': [0x57f17692, _messagesGetArchivedStickers],
  'messages.getMaskStickers': [0x640f82b8, _messagesGetMaskStickers],
  'messages.getAttachedStickers': [0xcc5b67cc, _messagesGetAttachedStickers],
  'messages.setGameScore': [0x8ef8ecc0, _messagesSetGameScore],
  'messages.setInlineGameScore': [0x15ad9f64, _messagesSetInlineGameScore],
  'messages.getGameHighScores': [0xe822649d, _messagesGetGameHighScores],
  'messages.getInlineGameHighScores': [0xf635e1b, _messagesGetInlineGameHighScores],
  'messages.getCommonChats': [0xe40ca104, _messagesGetCommonChats],
  'messages.getWebPage': [0x8d9692a3, _messagesGetWebPage],
  'messages.toggleDialogPin': [0xa731e257, _messagesToggleDialogPin],
  'messages.reorderPinnedDialogs': [0x3b1adf37, _messagesReorderPinnedDialogs],
  'messages.getPinnedDialogs': [0xd6b94df2, _messagesGetPinnedDialogs],
  'messages.setBotShippingResults': [0xe5f672fa, _messagesSetBotShippingResults],
  'messages.setBotPrecheckoutResults': [0x9c2dd95, _messagesSetBotPrecheckoutResults],
  'messages.uploadMedia': [0x519bc2b1, _messagesUploadMedia],
  'messages.sendScreenshotNotification': [0xa1405817, _messagesSendScreenshotNotification],
  'messages.getFavedStickers': [0x4f1aaa9, _messagesGetFavedStickers],
  'messages.faveSticker': [0xb9ffc55b, _messagesFaveSticker],
  'messages.getUnreadMentions': [0xf107e790, _messagesGetUnreadMentions],
  'messages.readMentions': [0x36e5bf4d, _messagesReadMentions],
  'messages.getRecentLocations': [0x702a40e0, _messagesGetRecentLocations],
  'messages.sendMultiMedia': [0x456e8987, _messagesSendMultiMedia],
  'messages.uploadEncryptedFile': [0x5057c497, _messagesUploadEncryptedFile],
  'messages.searchStickerSets': [0x35705b8a, _messagesSearchStickerSets],
  'messages.getSplitRanges': [0x1cff7e08],
  'messages.markDialogUnread': [0xc286d98f, _messagesMarkDialogUnread],
  'messages.getDialogUnreadMarks': [0x22e24e22],
  'messages.clearAllDrafts': [0x7e58ee9c],
  'messages.updatePinnedMessage': [0xd2aaf7ec, _messagesUpdatePinnedMessage],
  'messages.sendVote': [0x10ea6184, _messagesSendVote],
  'messages.getPollResults': [0x73bb643b, _messagesGetPollResults],
  'messages.getOnlines': [0x6e2be050, _messagesGetOnlines],
  'messages.editChatAbout': [0xdef60797, _messagesEditChatAbout],
  'messages.editChatDefaultBannedRights': [0xa5866b41, _messagesEditChatDefaultBannedRights],
  'messages.getEmojiKeywords': [0x35a0e062, _messagesGetEmojiKeywords],
  'messages.getEmojiKeywordsDifference': [0x1508b6af, _messagesGetEmojiKeywordsDifference],
  'messages.getEmojiKeywordsLanguages': [0x4e9963b2, _messagesGetEmojiKeywordsLanguages],
  'messages.getEmojiURL': [0xd5b10c26, _messagesGetEmojiURL],
  'messages.getSearchCounters': [0xae7cc1, _messagesGetSearchCounters],
  'messages.requestUrlAuth': [0x198fb446, _messagesRequestUrlAuth],
  'messages.acceptUrlAuth': [0xb12c7125, _messagesAcceptUrlAuth],
  'messages.hidePeerSettingsBar': [0x4facb138, _messagesHidePeerSettingsBar],
  'messages.getScheduledHistory': [0xf516760b, _messagesGetScheduledHistory],
  'messages.getScheduledMessages': [0xbdbb0464, _messagesGetScheduledMessages],
  'messages.sendScheduledMessages': [0xbd38850a, _messagesSendScheduledMessages],
  'messages.deleteScheduledMessages': [0x59ae2b16, _messagesDeleteScheduledMessages],
  'messages.getPollVotes': [0xb86e380e, _messagesGetPollVotes],
  'messages.toggleStickerSets': [0xb5052fea, _messagesToggleStickerSets],
  'messages.getDialogFilters': [0xf19ed96d],
  'messages.getSuggestedDialogFilters': [0xa29cd42c],
  'messages.updateDialogFilter': [0x1ad4a04a, _messagesUpdateDialogFilter],
  'messages.updateDialogFiltersOrder': [0xc563c1e4, _messagesUpdateDialogFiltersOrder],
  'messages.getOldFeaturedStickers': [0x7ed094a1, _messagesGetOldFeaturedStickers],
  'messages.getReplies': [0x22ddd30c, _messagesGetReplies],
  'messages.getDiscussionMessage': [0x446972fd, _messagesGetDiscussionMessage],
  'messages.readDiscussion': [0xf731a9f4, _messagesReadDiscussion],
  'messages.unpinAllMessages': [0xee22b9a8, _messagesUnpinAllMessages],
  'messages.deleteChat': [0x5bd0ee50, _messagesDeleteChat],
  'messages.deletePhoneCallHistory': [0xf9cbe409, _messagesDeletePhoneCallHistory],
  'messages.checkHistoryImport': [0x43fe19f3, _messagesCheckHistoryImport],
  'messages.initHistoryImport': [0x34090c3b, _messagesInitHistoryImport],
  'messages.uploadImportedMedia': [0x2a862092, _messagesUploadImportedMedia],
  'messages.startHistoryImport': [0xb43df344, _messagesStartHistoryImport],
  'messages.getExportedChatInvites': [0xa2b5a3f6, _messagesGetExportedChatInvites],
  'messages.getExportedChatInvite': [0x73746f5c, _messagesGetExportedChatInvite],
  'messages.editExportedChatInvite': [0xbdca2f75, _messagesEditExportedChatInvite],
  'messages.deleteRevokedExportedChatInvites': [0x56987bd5, _messagesDeleteRevokedExportedChatInvites],
  'messages.deleteExportedChatInvite': [0xd464a42b, _messagesDeleteExportedChatInvite],
  'messages.getAdminsWithInvites': [0x3920e6ef, _messagesGetAdminsWithInvites],
  'messages.getChatInviteImporters': [0xdf04dd4e, _messagesGetChatInviteImporters],
  'messages.setHistoryTTL': [0xb80e5fe4, _messagesSetHistoryTTL],
  'messages.checkHistoryImportPeer': [0x5dc60f03, _messagesCheckHistoryImportPeer],
  'messages.setChatTheme': [0xe63be13f, _messagesSetChatTheme],
  'messages.getMessageReadParticipants': [0x31c1c44f, _messagesGetMessageReadParticipants],
  'messages.getSearchResultsCalendar': [0x49f0bde9, _messagesGetSearchResultsCalendar],
  'messages.getSearchResultsPositions': [0x6e9583a3, _messagesGetSearchResultsPositions],
  'messages.hideChatJoinRequest': [0x7fe7e815, _messagesHideChatJoinRequest],
  'messages.hideAllChatJoinRequests': [0xe085f4ea, _messagesHideAllChatJoinRequests],
  'messages.toggleNoForwards': [0xb11eafa2, _messagesToggleNoForwards],
  'messages.saveDefaultSendAs': [0xccfddf96, _messagesSaveDefaultSendAs],
  'messages.sendReaction': [0xd30d78d4, _messagesSendReaction],
  'messages.getMessagesReactions': [0x8bba90e6, _messagesGetMessagesReactions],
  'messages.getMessageReactionsList': [0x461b3f48, _messagesGetMessageReactionsList],
  'messages.setChatAvailableReactions': [0xfeb16771, _messagesSetChatAvailableReactions],
  'messages.getAvailableReactions': [0x18dea0ac, _messagesGetAvailableReactions],
  'messages.setDefaultReaction': [0x4f47a016, _messagesSetDefaultReaction],
  'messages.translateText': [0x63183030, _messagesTranslateText],
  'messages.getUnreadReactions': [0x3223495b, _messagesGetUnreadReactions],
  'messages.readReactions': [0x54aa7f8e, _messagesReadReactions],
  'messages.searchSentMedia': [0x107e31a0, _messagesSearchSentMedia],
  'messages.getAttachMenuBots': [0x16fcc2cb, _messagesGetAttachMenuBots],
  'messages.getAttachMenuBot': [0x77216192, _messagesGetAttachMenuBot],
  'messages.toggleBotInAttachMenu': [0x69f59d69, _messagesToggleBotInAttachMenu],
  'messages.requestWebView': [0x269dc2c1, _messagesRequestWebView],
  'messages.prolongWebView': [0xb0d81a83, _messagesProlongWebView],
  'messages.requestSimpleWebView': [0x1a46500a, _messagesRequestSimpleWebView],
  'messages.sendWebViewResultMessage': [0xa4314f5, _messagesSendWebViewResultMessage],
  'messages.sendWebViewData': [0xdc0242c8, _messagesSendWebViewData],
  'messages.transcribeAudio': [0x269e9a49, _messagesTranscribeAudio],
  'messages.rateTranscribedAudio': [0x7f1d072f, _messagesRateTranscribedAudio],
  'messages.getCustomEmojiDocuments': [0xd9ab0f54, _messagesGetCustomEmojiDocuments],
  'messages.getEmojiStickers': [0xfbfca18f, _messagesGetEmojiStickers],
  'messages.getFeaturedEmojiStickers': [0xecf6736, _messagesGetFeaturedEmojiStickers],
  'messages.reportReaction': [0x3f64c076, _messagesReportReaction],
  'messages.getTopReactions': [0xbb8125ba, _messagesGetTopReactions],
  'messages.getRecentReactions': [0x39461db2, _messagesGetRecentReactions],
  'messages.clearRecentReactions': [0x9dfeefb4],
  'messages.getExtendedMedia': [0x84f80814, _messagesGetExtendedMedia],
  'messages.setDefaultHistoryTTL': [0x9eb51445, _messagesSetDefaultHistoryTTL],
  'messages.getDefaultHistoryTTL': [0x658b7188],
  'messages.sendBotRequestedPeer': [0xfe38d01b, _messagesSendBotRequestedPeer],
  'messages.getEmojiGroups': [0x7488ce5b, _messagesGetEmojiGroups],
  'messages.getEmojiStatusGroups': [0x2ecd56cd, _messagesGetEmojiStatusGroups],
  'messages.getEmojiProfilePhotoGroups': [0x21a548f3, _messagesGetEmojiProfilePhotoGroups],
  'messages.searchCustomEmoji': [0x2c11c0d7, _messagesSearchCustomEmoji],
  'messages.togglePeerTranslations': [0xe47cb579, _messagesTogglePeerTranslations],
  'messages.getBotApp': [0x34fdc5c3, _messagesGetBotApp],
  'messages.requestAppWebView': [0x8c5a3b3c, _messagesRequestAppWebView],
  'messages.setChatWallPaper': [0x8ffacae1, _messagesSetChatWallPaper],
  'updates.getState': [0xedd4882a],
  'updates.getDifference': [0x19c2f763, _updatesGetDifference],
  'updates.getChannelDifference': [0x3173d78, _updatesGetChannelDifference],
  'photos.updateProfilePhoto': [0x9e82039, _photosUpdateProfilePhoto],
  'photos.uploadProfilePhoto': [0x388a3b5, _photosUploadProfilePhoto],
  'photos.deletePhotos': [0x87cf7f2f, _photosDeletePhotos],
  'photos.getUserPhotos': [0x91cd32a8, _photosGetUserPhotos],
  'photos.uploadContactProfilePhoto': [0xe14c4a71, _photosUploadContactProfilePhoto],
  'upload.saveFilePart': [0xb304a621, _uploadSaveFilePart],
  'upload.getFile': [0xbe5335be, _uploadGetFile],
  'upload.saveBigFilePart': [0xde7b673d, _uploadSaveBigFilePart],
  'upload.getWebFile': [0x24e6818d, _uploadGetWebFile],
  'upload.getCdnFile': [0x395f69da, _uploadGetCdnFile],
  'upload.reuploadCdnFile': [0x9b2754a8, _uploadReuploadCdnFile],
  'upload.getCdnFileHashes': [0x91dc3f31, _uploadGetCdnFileHashes],
  'upload.getFileHashes': [0x9156982a, _uploadGetFileHashes],
  'help.getConfig': [0xc4f9186b],
  'help.getNearestDc': [0x1fb33026],
  'help.getAppUpdate': [0x522d5a7d, _helpGetAppUpdate],
  'help.getInviteText': [0x4d392343],
  'help.getSupport': [0x9cdf08cd],
  'help.getAppChangelog': [0x9010ef6f, _helpGetAppChangelog],
  'help.setBotUpdatesStatus': [0xec22cfcd, _helpSetBotUpdatesStatus],
  'help.getCdnConfig': [0x52029342],
  'help.getRecentMeUrls': [0x3dc0f114, _helpGetRecentMeUrls],
  'help.getTermsOfServiceUpdate': [0x2ca51fd1],
  'help.acceptTermsOfService': [0xee72f79a, _helpAcceptTermsOfService],
  'help.getDeepLinkInfo': [0x3fedc75f, _helpGetDeepLinkInfo],
  'help.getAppConfig': [0x61e3f854, _helpGetAppConfig],
  'help.saveAppLog': [0x6f02f748, _helpSaveAppLog],
  'help.getPassportConfig': [0xc661ad08, _helpGetPassportConfig],
  'help.getSupportName': [0xd360e72c],
  'help.getUserInfo': [0x38a08d3, _helpGetUserInfo],
  'help.editUserInfo': [0x66b91b70, _helpEditUserInfo],
  'help.getPromoData': [0xc0977421],
  'help.hidePromoData': [0x1e251c95, _helpHidePromoData],
  'help.dismissSuggestion': [0xf50dbaa1, _helpDismissSuggestion],
  'help.getCountriesList': [0x735787a8, _helpGetCountriesList],
  'help.getPremiumPromo': [0xb81b93d4],
  'channels.readHistory': [0xcc104937, _channelsReadHistory],
  'channels.deleteMessages': [0x84c1fd4e, _channelsDeleteMessages],
  'channels.reportSpam': [0xf44a8315, _channelsReportSpam],
  'channels.getMessages': [0xad8c9a23, _channelsGetMessages],
  'channels.getParticipants': [0x77ced9d0, _channelsGetParticipants],
  'channels.getParticipant': [0xa0ab6cc6, _channelsGetParticipant],
  'channels.getChannels': [0xa7f6bbb, _channelsGetChannels],
  'channels.getFullChannel': [0x8736a09, _channelsGetFullChannel],
  'channels.createChannel': [0x91006707, _channelsCreateChannel],
  'channels.editAdmin': [0xd33c8902, _channelsEditAdmin],
  'channels.editTitle': [0x566decd0, _channelsEditTitle],
  'channels.editPhoto': [0xf12e57c9, _channelsEditPhoto],
  'channels.checkUsername': [0x10e6bd2c, _channelsCheckUsername],
  'channels.updateUsername': [0x3514b3de, _channelsUpdateUsername],
  'channels.joinChannel': [0x24b524c5, _channelsJoinChannel],
  'channels.leaveChannel': [0xf836aa95, _channelsLeaveChannel],
  'channels.inviteToChannel': [0x199f3a6c, _channelsInviteToChannel],
  'channels.deleteChannel': [0xc0111fe3, _channelsDeleteChannel],
  'channels.exportMessageLink': [0xe63fadeb, _channelsExportMessageLink],
  'channels.toggleSignatures': [0x1f69b606, _channelsToggleSignatures],
  'channels.getAdminedPublicChannels': [0xf8b036af, _channelsGetAdminedPublicChannels],
  'channels.editBanned': [0x96e6cd81, _channelsEditBanned],
  'channels.getAdminLog': [0x33ddf480, _channelsGetAdminLog],
  'channels.setStickers': [0xea8ca4f9, _channelsSetStickers],
  'channels.readMessageContents': [0xeab5dc38, _channelsReadMessageContents],
  'channels.deleteHistory': [0x9baa9647, _channelsDeleteHistory],
  'channels.togglePreHistoryHidden': [0xeabbb94c, _channelsTogglePreHistoryHidden],
  'channels.getLeftChannels': [0x8341ecc0, _channelsGetLeftChannels],
  'channels.getGroupsForDiscussion': [0xf5dad378],
  'channels.setDiscussionGroup': [0x40582bb2, _channelsSetDiscussionGroup],
  'channels.editCreator': [0x8f38cd1f, _channelsEditCreator],
  'channels.editLocation': [0x58e63f6d, _channelsEditLocation],
  'channels.toggleSlowMode': [0xedd49ef0, _channelsToggleSlowMode],
  'channels.getInactiveChannels': [0x11e831ee],
  'channels.convertToGigagroup': [0xb290c69, _channelsConvertToGigagroup],
  'channels.viewSponsoredMessage': [0xbeaedb94, _channelsViewSponsoredMessage],
  'channels.getSponsoredMessages': [0xec210fbf, _channelsGetSponsoredMessages],
  'channels.getSendAs': [0xdc770ee, _channelsGetSendAs],
  'channels.deleteParticipantHistory': [0x367544db, _channelsDeleteParticipantHistory],
  'channels.toggleJoinToSend': [0xe4cb9580, _channelsToggleJoinToSend],
  'channels.toggleJoinRequest': [0x4c2985b6, _channelsToggleJoinRequest],
  'channels.reorderUsernames': [0xb45ced1d, _channelsReorderUsernames],
  'channels.toggleUsername': [0x50f24105, _channelsToggleUsername],
  'channels.deactivateAllUsernames': [0xa245dd3, _channelsDeactivateAllUsernames],
  'channels.toggleForum': [0xa4298b29, _channelsToggleForum],
  'channels.createForumTopic': [0xf40c0224, _channelsCreateForumTopic],
  'channels.getForumTopics': [0xde560d1, _channelsGetForumTopics],
  'channels.getForumTopicsByID': [0xb0831eb9, _channelsGetForumTopicsByID],
  'channels.editForumTopic': [0xf4dfa185, _channelsEditForumTopic],
  'channels.updatePinnedForumTopic': [0x6c2d9026, _channelsUpdatePinnedForumTopic],
  'channels.deleteTopicHistory': [0x34435f2d, _channelsDeleteTopicHistory],
  'channels.reorderPinnedForumTopics': [0x2950a18f, _channelsReorderPinnedForumTopics],
  'channels.toggleAntiSpam': [0x68f3e4eb, _channelsToggleAntiSpam],
  'channels.reportAntiSpamFalsePositive': [0xa850a693, _channelsReportAntiSpamFalsePositive],
  'channels.toggleParticipantsHidden': [0x6a6e7854, _channelsToggleParticipantsHidden],
  'channels.clickSponsoredMessage': [0x18afbc93, _channelsClickSponsoredMessage],
  'channels.updateColor': [0x621a201f, _channelsUpdateColor],
  'bots.sendCustomRequest': [0xaa2769ed, _botsSendCustomRequest],
  'bots.answerWebhookJSONQuery': [0xe6213f4d, _botsAnswerWebhookJSONQuery],
  'bots.setBotCommands': [0x517165a, _botsSetBotCommands],
  'bots.resetBotCommands': [0x3d8de0f9, _botsResetBotCommands],
  'bots.getBotCommands': [0xe34c0dd6, _botsGetBotCommands],
  'bots.setBotMenuButton': [0x4504d54f, _botsSetBotMenuButton],
  'bots.getBotMenuButton': [0x9c60eb28, _botsGetBotMenuButton],
  'bots.setBotBroadcastDefaultAdminRights': [0x788464e1, _botsSetBotBroadcastDefaultAdminRights],
  'bots.setBotGroupDefaultAdminRights': [0x925ec9ea, _botsSetBotGroupDefaultAdminRights],
  'bots.setBotInfo': [0x10cf3123, _botsSetBotInfo],
  'bots.getBotInfo': [0xdcd914fd, _botsGetBotInfo],
  'bots.reorderUsernames': [0x9709b1c2, _botsReorderUsernames],
  'bots.toggleUsername': [0x53ca973, _botsToggleUsername],
  'bots.canSendMessage': [0x1359f4e6, _botsCanSendMessage],
  'bots.allowSendMessage': [0xf132e3ef, _botsAllowSendMessage],
  'bots.invokeWebViewCustomMethod': [0x87fc5e7, _botsInvokeWebViewCustomMethod],
  'payments.getPaymentForm': [0x37148dbb, _paymentsGetPaymentForm],
  'payments.getPaymentReceipt': [0x2478d1cc, _paymentsGetPaymentReceipt],
  'payments.validateRequestedInfo': [0xb6c8f12b, _paymentsValidateRequestedInfo],
  'payments.sendPaymentForm': [0x2d03522f, _paymentsSendPaymentForm],
  'payments.getSavedInfo': [0x227d824b],
  'payments.clearSavedInfo': [0xd83d70c1, _paymentsClearSavedInfo],
  'payments.getBankCardData': [0x2e79d779, _paymentsGetBankCardData],
  'payments.exportInvoice': [0xf91b065, _paymentsExportInvoice],
  'payments.assignAppStoreTransaction': [0x80ed747d, _paymentsAssignAppStoreTransaction],
  'payments.assignPlayMarketTransaction': [0xdffd50d3, _paymentsAssignPlayMarketTransaction],
  'payments.canPurchasePremium': [0x9fc19eb6, _paymentsCanPurchasePremium],
  'payments.getPremiumGiftCodeOptions': [0x2757ba54, _paymentsGetPremiumGiftCodeOptions],
  'payments.checkGiftCode': [0x8e51b4c1, _paymentsCheckGiftCode],
  'payments.applyGiftCode': [0xf6e26854, _paymentsApplyGiftCode],
  'payments.getGiveawayInfo': [0xf4239425, _paymentsGetGiveawayInfo],
  'payments.launchPrepaidGiveaway': [0x5ff58f20, _paymentsLaunchPrepaidGiveaway],
  'stickers.createStickerSet': [0x9021ab67, _stickersCreateStickerSet],
  'stickers.removeStickerFromSet': [0xf7760f51, _stickersRemoveStickerFromSet],
  'stickers.changeStickerPosition': [0xffb6d4ca, _stickersChangeStickerPosition],
  'stickers.addStickerToSet': [0x8653febe, _stickersAddStickerToSet],
  'stickers.setStickerSetThumb': [0xa76a5392, _stickersSetStickerSetThumb],
  'stickers.checkShortName': [0x284b3639, _stickersCheckShortName],
  'stickers.suggestShortName': [0x4dafc503, _stickersSuggestShortName],
  'stickers.changeSticker': [0xf5537ebc, _stickersChangeSticker],
  'stickers.renameStickerSet': [0x124b1c00, _stickersRenameStickerSet],
  'stickers.deleteStickerSet': [0x87704394, _stickersDeleteStickerSet],
  'phone.getCallConfig': [0x55451fa9],
  'phone.requestCall': [0x42ff96ed, _phoneRequestCall],
  'phone.acceptCall': [0x3bd2b4a0, _phoneAcceptCall],
  'phone.confirmCall': [0x2efe1722, _phoneConfirmCall],
  'phone.receivedCall': [0x17d54f61, _phoneReceivedCall],
  'phone.discardCall': [0xb2cbc1c0, _phoneDiscardCall],
  'phone.setCallRating': [0x59ead627, _phoneSetCallRating],
  'phone.saveCallDebug': [0x277add7e, _phoneSaveCallDebug],
  'phone.sendSignalingData': [0xff7a9383, _phoneSendSignalingData],
  'phone.createGroupCall': [0x48cdc6d8, _phoneCreateGroupCall],
  'phone.joinGroupCall': [0xb132ff7b, _phoneJoinGroupCall],
  'phone.leaveGroupCall': [0x500377f9, _phoneLeaveGroupCall],
  'phone.inviteToGroupCall': [0x7b393160, _phoneInviteToGroupCall],
  'phone.discardGroupCall': [0x7a777135, _phoneDiscardGroupCall],
  'phone.toggleGroupCallSettings': [0x74bbb43d, _phoneToggleGroupCallSettings],
  'phone.getGroupCall': [0x41845db, _phoneGetGroupCall],
  'phone.getGroupParticipants': [0xc558d8ab, _phoneGetGroupParticipants],
  'phone.checkGroupCall': [0xb59cf977, _phoneCheckGroupCall],
  'phone.toggleGroupCallRecord': [0xf128c708, _phoneToggleGroupCallRecord],
  'phone.editGroupCallParticipant': [0xa5273abf, _phoneEditGroupCallParticipant],
  'phone.editGroupCallTitle': [0x1ca6ac0a, _phoneEditGroupCallTitle],
  'phone.getGroupCallJoinAs': [0xef7c213a, _phoneGetGroupCallJoinAs],
  'phone.exportGroupCallInvite': [0xe6aa647f, _phoneExportGroupCallInvite],
  'phone.toggleGroupCallStartSubscription': [0x219c34e6, _phoneToggleGroupCallStartSubscription],
  'phone.startScheduledGroupCall': [0x5680e342, _phoneStartScheduledGroupCall],
  'phone.saveDefaultGroupCallJoinAs': [0x575e1f8c, _phoneSaveDefaultGroupCallJoinAs],
  'phone.joinGroupCallPresentation': [0xcbea6bc4, _phoneJoinGroupCallPresentation],
  'phone.leaveGroupCallPresentation': [0x1c50d144, _phoneLeaveGroupCallPresentation],
  'phone.getGroupCallStreamChannels': [0x1ab21940, _phoneGetGroupCallStreamChannels],
  'phone.getGroupCallStreamRtmpUrl': [0xdeb3abbf, _phoneGetGroupCallStreamRtmpUrl],
  'phone.saveCallLog': [0x41248786, _phoneSaveCallLog],
  'langpack.getLangPack': [0xf2f2330a, _langpackGetLangPack],
  'langpack.getStrings': [0xefea3803, _langpackGetStrings],
  'langpack.getDifference': [0xcd984aa5, _langpackGetDifference],
  'langpack.getLanguages': [0x42c6978f, _langpackGetLanguages],
  'langpack.getLanguage': [0x6a596502, _langpackGetLanguage],
  'folders.editPeerFolders': [0x6847d0ab, _foldersEditPeerFolders],
  'stats.getBroadcastStats': [0xab42441a, _statsGetBroadcastStats],
  'stats.loadAsyncGraph': [0x621d5fa0, _statsLoadAsyncGraph],
  'stats.getMegagroupStats': [0xdcdf8607, _statsGetMegagroupStats],
  'stats.getMessagePublicForwards': [0x5630281b, _statsGetMessagePublicForwards],
  'stats.getMessageStats': [0xb6e0a3f5, _statsGetMessageStats],
  'chatlists.exportChatlistInvite': [0x8472478e, _chatlistsExportChatlistInvite],
  'chatlists.deleteExportedInvite': [0x719c5c5e, _chatlistsDeleteExportedInvite],
  'chatlists.editExportedInvite': [0x653db63d, _chatlistsEditExportedInvite],
  'chatlists.getExportedInvites': [0xce03da83, _chatlistsGetExportedInvites],
  'chatlists.checkChatlistInvite': [0x41c10fff, _chatlistsCheckChatlistInvite],
  'chatlists.joinChatlistInvite': [0xa6b1e39a, _chatlistsJoinChatlistInvite],
  'chatlists.getChatlistUpdates': [0x89419521, _chatlistsGetChatlistUpdates],
  'chatlists.joinChatlistUpdates': [0xe089f8f5, _chatlistsJoinChatlistUpdates],
  'chatlists.hideChatlistUpdates': [0x66e486fb, _chatlistsHideChatlistUpdates],
  'chatlists.getLeaveChatlistSuggestions': [0xfdbcd714, _chatlistsGetLeaveChatlistSuggestions],
  'chatlists.leaveChatlist': [0x74fae13a, _chatlistsLeaveChatlist],
  'stories.canSendStory': [0xc7dfdfdd, _storiesCanSendStory],
  'stories.sendStory': [0xbcb73644, _storiesSendStory],
  'stories.editStory': [0xb583ba46, _storiesEditStory],
  'stories.deleteStories': [0xae59db5f, _storiesDeleteStories],
  'stories.togglePinned': [0x9a75a1ef, _storiesTogglePinned],
  'stories.getAllStories': [0xeeb0d625, _storiesGetAllStories],
  'stories.getPinnedStories': [0x5821a5dc, _storiesGetPinnedStories],
  'stories.getStoriesArchive': [0xb4352016, _storiesGetStoriesArchive],
  'stories.getStoriesByID': [0x5774ca74, _storiesGetStoriesByID],
  'stories.toggleAllStoriesHidden': [0x7c2557c4, _storiesToggleAllStoriesHidden],
  'stories.readStories': [0xa556dac8, _storiesReadStories],
  'stories.incrementStoryViews': [0xb2028afb, _storiesIncrementStoryViews],
  'stories.getStoryViewsList': [0x7ed23c57, _storiesGetStoryViewsList],
  'stories.getStoriesViews': [0x28e16cc8, _storiesGetStoriesViews],
  'stories.exportStoryLink': [0x7b8def20, _storiesExportStoryLink],
  'stories.report': [0x1923fa8c, _storiesReport],
  'stories.activateStealthMode': [0x57bbd166, _storiesActivateStealthMode],
  'stories.sendReaction': [0x7fd736b2, _storiesSendReaction],
  'stories.getPeerStories': [0x2c4ada50, _storiesGetPeerStories],
  'stories.getAllReadPeerStories': [0x9b5ae7f9],
  'stories.getPeerMaxIDs': [0x535983c3, _storiesGetPeerMaxIDs],
  'stories.getChatsToSend': [0xa56a8b60],
  'stories.togglePeerStoriesHidden': [0xbd0415c4, _storiesTogglePeerStoriesHidden],
  'premium.getBoostsList': [0x60f67660, _premiumGetBoostsList],
  'premium.getMyBoosts': [0xbe77b4a],
  'premium.applyBoost': [0x6b7da746, _premiumApplyBoost],
  'premium.getBoostsStatus': [0x42f1f61, _premiumGetBoostsStatus],
}

const i32 = (value: number) => w.int32(value)
const i64 = (value: string) => w.long(value)
const f64 = (value: number) => w.double(value)
const str = (value: string) => w.string(value)
const bytes = (value: ArrayBuffer) => w.bytes(value)
const bool = (value: boolean) => i32(builderMap[value ? 'boolTrue' : 'boolFalse'][0])

const vector = (fn: (value: any) => void, value: Array<any>) => {
  i32(0x1cb5c415)
  i32(value.length)
  for (let i = 0; i < value.length; i++) {
    fn(value[i])
  }
}

function flagVector(fn: (value: any) => void, value: Array<any>) {
  if (value === undefined || value.length === 0) return
  vector(fn, value)
}

function flag(fn: (value: any) => void, value: any) {
  if (has(value)) fn(value)
}

function has(value: any) {
  return Array.isArray(value) ? +!!value.length : +!!value
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
