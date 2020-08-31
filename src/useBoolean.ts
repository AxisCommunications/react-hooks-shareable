import { useState, useCallback } from 'react'

export const useBoolean = (
  initialValue = false
): readonly [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState(initialValue)

  const enable = useCallback(() => setValue(true), [])
  const disable = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue(oldValue => !oldValue), [])

  return [value, enable, disable, toggle]
}
