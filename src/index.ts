import { ResizeObserver } from '@juggle/resize-observer'

export * from './useAnalytics'
export * from './useBoolean'
export * from './useDeferredTrigger'
export * from './useDraggable'
export * from './useFocusDetection'
export * from './useId'
export * from './useInterval'
export * from './useLocalStorage'
export * from './usePressed'
export * from './useResetScroll'
export * from './useScrollPosition'
export * from './useSelection'
export * from './useTrigger'
export * from './useUserActive'
export * from './useVisibleFocus'

// Add ResizeObserver polyfill from juggle if not available
if (typeof window !== 'undefined') {
  if (window.ResizeObserver === undefined) {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    window.ResizeObserver = ResizeObserver
  }
}
