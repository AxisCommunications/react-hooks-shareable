import { useState, useEffect } from 'react'

/**
 * useScrollPosition
 *
 * Translate the scroll position for an element into `atTop` and `atBottom`
 * boolean values, indicating if the scroll position is at the beginning or end
 * of an element.
 *
 * To signal that the onScroll function hasn't computed any position yet,
 * `atTop` and `atBottom` can be undefined!
 */

// Threshold for deciding when we're at the top or bottom of the scroll.
const THRESHOLD = 1 // pixels

export const useScrollPosition = () => {
  // We use a callback ref here, as we want to be notified whenever
  // an element will be available (as the ref might be passed down
  // and we don't know when it will actually be rendered)
  const [el, scrollRef] = useState<HTMLElement | null>(null)

  const [atTop, setAtTop] = useState<boolean>()
  const [atBottom, setAtBottom] = useState<boolean>()

  useEffect(() => {
    if (el === null) {
      return undefined
    }

    const calculatePosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = el

      // Guard against re-render for every scroll event, we only want to trigger
      // re-render when one of the positions we track actually changed!
      const newAtTop = scrollTop <= THRESHOLD
      if (atTop !== newAtTop) {
        setAtTop(newAtTop)
      }

      // Guard against re-render for every scroll event, we only want to trigger
      // re-render when one of the positions we track actually changed!
      const newAtBottom = scrollHeight - (scrollTop + clientHeight) <= THRESHOLD
      if (atBottom !== newAtBottom) {
        setAtBottom(newAtBottom)
      }
    }

    // Immediately compute the scroll position after render.
    calculatePosition()

    // Set up listeners for when to update the scroll position.
    const observer = new window.ResizeObserver(calculatePosition)
    observer.observe(el)
    el.addEventListener('scroll', calculatePosition)
    window.addEventListener('resize', calculatePosition)
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', calculatePosition)
      window.removeEventListener('resize', calculatePosition)
    }
  }, [atTop, atBottom, setAtTop, setAtBottom, el])

  return { scrollRef, atTop, atBottom }
}
