import { listenUpdates } from '~/api'

export const handleUpdates = () => listenUpdates(({ updates }) => {
  updates.filter(({ _ }) => _ === 'updateNewChannelMessage').forEarch()
})

const handleNewMessage = () => {

}
