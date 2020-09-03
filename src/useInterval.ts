import { useEffect, useRef } from 'react'

type Callback = () => void

export const useInterval = (callback: Callback, delay: number) => {
  const savedCallback = useRef<Callback>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current !== undefined) {
        savedCallback.current()
      }
    }

    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
