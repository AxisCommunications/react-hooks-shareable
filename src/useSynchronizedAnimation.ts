import { useLayoutEffect, useRef } from 'react'

export const useSynchronizedAnimation = <E extends HTMLElement>(
  options?: GetAnimationsOptions
) => {
  const ref = useRef<E | null>(null)
  useLayoutEffect(() => {
    const currentTime = document.timeline?.currentTime ?? 0
    ref.current
      ?.getAnimations(options)
      .forEach(a => (a.currentTime = currentTime))
  }, [options])
  return ref
}
