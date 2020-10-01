import { useState, useEffect } from 'react'

/**
 * Returns a boolean which tells you if the users browser
 * and your page is in focus.
 * @param pollTime Optional polling time between focus checks
 * @default 5000
 * @returns boolean
 */
export const useFocusDetection = (pollTime = 5000) => {
  const [hasFocus, setHasFocus] = useState(document.hasFocus())

  useEffect(() => {
    const interval = setInterval(() => {
      setHasFocus(document.hasFocus())
    }, pollTime)

    return () => {
      clearInterval(interval)
    }
  }, [pollTime])

  return hasFocus
}
