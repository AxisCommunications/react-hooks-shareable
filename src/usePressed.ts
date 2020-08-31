import { useState, useEffect } from 'react'

export function usePressed(ref: React.RefObject<HTMLElement>): boolean {
  const [pressed, setPressed] = useState<boolean>(false)

  useEffect(() => {
    const el = ref.current
    if (el !== null && !pressed) {
      const setPressedTrue = () => setPressed(true)
      el.addEventListener('pointerdown', setPressedTrue)
      return () => el.removeEventListener('pointerdown', setPressedTrue)
    }
    const setPressedFalse = () => setPressed(false)
    document.addEventListener('pointerup', setPressedFalse)
    return () => document.removeEventListener('pointerup', setPressedFalse)
  }, [pressed, ref])

  return pressed
}
