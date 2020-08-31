import { RefObject, useEffect } from 'react'

import { useBoolean } from './useBoolean'

const DEFAULT_TIMEOUT = 3000

/**
 * Listen to activity on an element by the user.
 *
 * @param {Object} ref A React ref for the element
 * @param {Number} duration The duration of inactivity before the user is
 *                          determined to be inactive (default 3s)
 * @return {Boolean} The current user activity state
 */
export function useUserActive<T extends HTMLElement>(
  ref: RefObject<T>,
  duration = DEFAULT_TIMEOUT
) {
  const [userActivity, startUserActive, stopUserActive] = useBoolean()

  useEffect(() => {
    if (userActivity) {
      const timer = setTimeout(stopUserActive, duration)
      return () => {
        clearTimeout(timer)
      }
    }
  })

  useEffect(() => {
    const el = ref.current

    if (el === null) {
      return
    }

    el.addEventListener('pointermove', startUserActive)
    if (userActivity) {
      el.addEventListener('pointerleave', stopUserActive)
    }

    return () => {
      el.removeEventListener('pointermove', startUserActive)
      if (userActivity) {
        el.removeEventListener('pointerleave', stopUserActive)
      }
    }
  }, [ref, userActivity, startUserActive, stopUserActive])

  return userActivity
}
