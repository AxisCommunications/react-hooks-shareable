import { useState, useCallback, PointerEventHandler } from 'react'

/**
 * A hook that provides a translation vector
 * for an element that is being dragged.
 */
export const useDraggable = (
  onDragEnd: (t: readonly [number, number]) => void
): readonly [readonly [number, number], PointerEventHandler, boolean] => {
  const [dragging, setDragging] = useState<boolean>(false)
  const [t, setTranslation] = useState<readonly [number, number]>([0, 0])

  const onDragStart = useCallback<PointerEventHandler>(
    e => {
      e.stopPropagation()
      e.preventDefault()
      setDragging(true)
      const [mx, my] = [e.pageX, e.pageY]

      const updateMouse = (e2: PointerEvent) => {
        e2.stopPropagation()
        e2.preventDefault()
        setTranslation([e2.pageX - mx, e2.pageY - my])
      }

      const dragEnd = (e3: PointerEvent) => {
        e3.stopPropagation()
        e3.preventDefault()
        setTranslation([0, 0])
        setDragging(false)
        onDragEnd([e3.pageX - mx, e3.pageY - my])

        document.removeEventListener('pointermove', updateMouse)
        document.removeEventListener('pointerup', dragEnd)
      }

      document.addEventListener('pointermove', updateMouse)
      document.addEventListener('pointerup', dragEnd)
    },
    [onDragEnd]
  )

  return [t, onDragStart, dragging]
}
