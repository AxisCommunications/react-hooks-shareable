import { PointerEventHandler, useRef, useEffect } from 'react'

type Callback = (e: PointerEvent) => void

/**
 * A hook that fires a callback when a click (pointerdown) was registered outside
 * of a component. Outside is defined as outside of your react tree, which means
 * that this works with portals.
 *
 * Examples:
 *
 * ```tsx
 * const OutsideTest = () => {
 *   const handler = useClickOutside(e => {
 *     console.log('Outside')
 *   })
 *
 *   return (
 *     <div onPointerDown={handler}>
 *       <span>Clicks here is inside</span>
 *       {ReactDOM.createPortal(
 *         <span>Clicks here are also inside</span>,
 *         portalContainer
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export const useClickOutside = (callback: Callback): PointerEventHandler => {
  const inside = useRef(false)

  const handleClick: PointerEventHandler = () => {
    inside.current = true
  }

  useEffect(() => {
    const listener: Callback = e => {
      if (!inside.current) {
        callback(e)
      }
      inside.current = false
    }

    document.addEventListener('pointerdown', listener)
    return () => document.removeEventListener('pointerdown', listener)
  })

  return handleClick
}
