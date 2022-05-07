import { useLayoutEffect, useRef } from 'react'

export const useSynchronizedAnimation = (options?: GetAnimationsOptions) => {
  const ref = useRef<HTMLElement>()
  useLayoutEffect(() => {
    ref.current
      ?.getAnimations(options)
      .forEach(a => (a.currentTime = document.timeline.currentTime))
  }, [options])
  return ref
}
