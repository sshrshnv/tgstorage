export const getAnncChannelInvite = () =>
  process.env.CHANNEL_INVITE

export const getAnncChannelInviteLink = () =>
  `https://t.me/+${getAnncChannelInvite()}`
