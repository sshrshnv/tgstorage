export const timer = delay => {
  return new Promise(resolve => setTimeout(resolve, delay))
}
