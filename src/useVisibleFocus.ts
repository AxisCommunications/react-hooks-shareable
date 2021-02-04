import { useCallback, useState } from 'react'
import { useBoolean } from './useBoolean'

export const useVisibleFocus = (): {
  readonly isPointerOn: VoidFunction
  readonly isPointerOff: VoidFunction
  readonly determineVisibleFocus: VoidFunction
  readonly visibleFocus: boolean
} => {
  const [isPointer, isPointerOn, isPointerOff] = useBoolean(false)
  const [visibleFocus, setVisibleFocus] = useState(true)

  const determineVisibleFocus = useCallback(() => {
    if (isPointer) {
      return setVisibleFocus(false)
    }

    return setVisibleFocus(true)
  }, [isPointer, setVisibleFocus])

  return { isPointerOn, isPointerOff, determineVisibleFocus, visibleFocus }
}
