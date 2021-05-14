import { useMemo, useEffect } from 'preact/hooks'
import rafSchedule from 'raf-schd'

const ResizeObserver = window.ResizeObserver || (await import('resize-observer-polyfill')).default

export const useResizeObserver = (handleEl) => {
  const resizeObserver = useMemo(() => new ResizeObserver(rafSchedule(elements => {
    for (const el of elements) {
      handleEl(el)
    }
  })), [])

  useEffect(() => {
    return () => resizeObserver.disconnect()
  }, [resizeObserver])

  return useMemo(() => ({
    resizeObserver
  }), [resizeObserver])
}
