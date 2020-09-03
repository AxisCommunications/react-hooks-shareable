import { useState, useCallback } from 'react'

export type TriggerEvent = unknown

/**
 * A hook implementing a generic event.
 *
 * The `event` can, for example, be used to trigger changes to effects.
 *
 * The initial state of the `event` is `undefined`, otherwise nothing
 * should be assumed of the `event`
 *
 * @returns a triplet consisting of:
 * 0. an `event`
 * 1. a function to trigger the `event`
 * 2. a function to reset the `event` to its initial state
 */
export const useTrigger = (): readonly [unknown, () => void, () => void] => {
  const [value, setValue] = useState(Number.MIN_SAFE_INTEGER)

  const trigger = useCallback(() => {
    setValue(current =>
      current !== Number.MAX_SAFE_INTEGER
        ? current + 1
        : Number.MIN_SAFE_INTEGER + 1
    )
  }, [])

  const reset = useCallback(() => {
    setValue(Number.MIN_SAFE_INTEGER)
  }, [])

  const event = value !== Number.MIN_SAFE_INTEGER ? value : undefined

  return [event, trigger, reset]
}
