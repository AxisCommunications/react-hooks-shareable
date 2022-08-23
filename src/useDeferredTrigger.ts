import { useEffect, useState, useRef } from 'react'

/**
 * Deferred trigger
 *
 * Debounce a changing boolean value, with different delays depending on the
 * direction of the trigger (determined by the base value).
 * **Note**: the trailing delay takes into account the time already spent in
 * the "on" state of the trigger.
 *
 * Mainly useful for loading states where one wants to guarantee a period
 * without spinner (delay triggering the loading state), but then when it's
 * loading, make sure the spinner is shown for a minimum amount of time
 * (trailing delay of the trigger).
 */

interface IDeferredTriggerOptions {
  /**
   * Optional delay of the trigger in milliseconds.
   * Use 0 to process immediately within the effect hook.
   *
   * @default 100
   */
  readonly delay?: number
  /**
   * Optional minimum duration in milliseconds (used when trigger returns to
   * base value, to make sure the triggered states doesn't flash).
   *
   * @default 400
   */
  readonly minDuration?: number
  /**
   * Optional base value of the trigger.
   *
   * @default false
   */
  readonly base?: boolean
}

export const useDeferredTrigger = (
  flag: boolean,
  { delay = 100, minDuration = 400, base = false }: IDeferredTriggerOptions = {}
) => {
  const [deferredFlag, setDeferredFlag] = useState(base)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const lastActive = useRef<number>()

  useEffect(() => {
    // Schedule change
    if (flag !== deferredFlag) {
      if (timeoutRef.current === undefined) {
        const toggleFlag = () => {
          // When setting the new deferred trigger value, clear the scheduled
          // change and update the time of the last active state.
          timeoutRef.current = undefined
          if (flag !== base) {
            lastActive.current = Date.now()
          } else {
            lastActive.current = undefined
          }
          setDeferredFlag(flag)
        }
        const scheduledDelay =
          flag === base
            ? lastActive.current !== undefined
              ? Math.max(0, minDuration - (Date.now() - lastActive.current))
              : 0
            : delay
        if (scheduledDelay === 0) {
          // If the scheduled delay is immediate,
          // then process the flag right now (as we're in an effect already)
          // This cannot be prevented, so use delay = 0 to immediately process.
          toggleFlag()
        } else {
          // We need to wait at least a certain amount of time before
          // applying the delay. This can always be canceled by an update
          // that re-triggers this effect (as the timeout can be cleared).
          timeoutRef.current = setTimeout(toggleFlag, scheduledDelay)
        }
      }
    } else {
      // The target flag matches the deferred flag,
      // so clear any scheduled changes to it.
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
    }
  }, [flag, deferredFlag, base, delay, minDuration])

  return deferredFlag
}
