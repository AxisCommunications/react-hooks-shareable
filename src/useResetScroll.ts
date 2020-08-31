import React, { useEffect, useRef } from 'react'

/**
 * When key changes, scroll resets to top on htmlRef
 */
export const useResetScroll = (
  htmlRef: React.RefObject<HTMLElement>,
  key?: string
) => {
  const lastState = useRef(key)

  useEffect(() => {
    if (key !== lastState.current) {
      htmlRef.current?.scrollTo(0, 0)
      lastState.current = key
    }
  }, [htmlRef, key])
}
