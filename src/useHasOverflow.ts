import { createRef, useLayoutEffect, useState } from 'react'

const hasElementOverflow = (elem: HTMLElement) => {
  const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = elem
  return offsetHeight < scrollHeight || offsetWidth < scrollWidth
}

/**
 * A hook that determines if an element has
 * overflow or not.
 */
export const useHasOverflow = <T extends HTMLElement = HTMLDivElement>() => {
  const [hasOverflow, setHasOverflow] = useState(false)
  const ref = createRef<T>()

  useLayoutEffect(() => {
    if (ref.current === null) {
      return
    }
    setHasOverflow(hasElementOverflow(ref.current))
  }, [ref])

  return {
    hasOverflow,
    ref,
  }
}

/**
 * A hook that determines if an element has
 * overflow or not. Will update on resize event.
 */
export const useHasOverflowWithResizeEvent = <
  T extends HTMLElement = HTMLDivElement
>() => {
  const [hasOverflow, setHasOverflow] = useState(false)
  const ref = createRef<T>()

  // Listen to resize changes on description text to set overflow
  useLayoutEffect(() => {
    if (ref.current === null) {
      return
    }

    const observer = new window.ResizeObserver(() => {
      if (ref.current === null) {
        return
      }
      setHasOverflow(hasElementOverflow(ref.current))
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref])

  return {
    hasOverflow,
    ref,
  }
}
