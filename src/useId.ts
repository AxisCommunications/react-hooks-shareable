import { useMemo } from 'react'

let id = 0

/**
 * Returns a unique id
 * If a prefix is supplied a dash is added to separate it from the id
 * @param prefix Optional prefix
 */
export const useId = (prefix = ''): string => {
  const memoizedId = useMemo(() => {
    id += 1
    return prefix.length > 0 ? `${prefix}-${id}` : String(id)
  }, [prefix])

  return memoizedId
}
