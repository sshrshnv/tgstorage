export const getNewsChannelInvite = () =>
  process.env.NEWS_CHANNEL_INVITE

export const getNewsChannelInviteLink = () =>
  `https://t.me/+${getNewsChannelInvite()}`
