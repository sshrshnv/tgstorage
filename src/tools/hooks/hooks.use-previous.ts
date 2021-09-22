import { useRef, useEffect } from 'preact/hooks'

export const usePrevious = value => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
