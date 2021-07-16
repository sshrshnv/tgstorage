export const checkIsLandscape = () =>
  screen?.orientation?.type.startsWith('landscape') || [90, -90].includes(+(self.orientation || 0))
