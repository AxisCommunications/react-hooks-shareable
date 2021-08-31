import { createRef, useLayoutEffect, useState } from 'react'

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
    setHasOverflow(
      ref.current.offsetHeight < ref.current.scrollHeight ||
        ref.current.offsetWidth < ref.current.scrollWidth
    )
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

    const observer = new window.ResizeObserver(([entry]) => {
      const el = entry.target
      const [descriptionElement] = el.children

      if (descriptionElement === undefined) {
        return
      }

      const { clientHeight, scrollHeight } = descriptionElement

      setHasOverflow(clientHeight < scrollHeight)
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref])

  return {
    hasOverflow,
    ref,
  }
}
