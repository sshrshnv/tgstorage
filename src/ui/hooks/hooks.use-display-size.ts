import { useEffect, useMemo } from 'preact/hooks'

import { useStateRef } from '~/tools/hooks'

export type DisplaySize = {
  width: number
  height: number
}

export const useDispaySize = () => {
  const [width, _widthRef, _setWidth, setWidthRef] = useStateRef(self.innerWidth)
  const [height, _heightRef, _setHeight, setHeightRef] = useStateRef(self.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setWidthRef.current?.(self.innerWidth)
      setHeightRef.current?.(self.innerHeight)
    }

    self.addEventListener('resize', handleResize)
    return () => self.removeEventListener('resize', handleResize)
  }, [])

  return useMemo(() => ({
    width,
    height
  }), [width, height])
}
