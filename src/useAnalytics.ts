import { useCallback } from 'react'

export type AnalyticsGtag = typeof window.gtag

/**
 * You Google Analytics ID.
 *
 * UA-0000...
 */
export type GoogleAnalyticsId = string
export type AnalyticsParams = Gtag.EventParams
export type AnalyticsAction = Gtag.EventNames | string
export type AnalyticsConfig =
  | Gtag.ControlParams
  | Gtag.EventParams
  | Gtag.CustomParams

/**
 *
 * Example of a pageView event:
 *
 * pageView({
 *   page_path: 'my path',
 * })
 */

/**
 *
 * Example of a non-fatal exception event:
 *
 * event('exception', {
 *   'description': 'error_description',
 *   'fatal': false   // set to true if the error is fatal
 * })
 */

export const useAnalytics = (id: GoogleAnalyticsId) => {
  const pageView = useCallback(
    (params: AnalyticsConfig) => {
      if (window.gtag !== undefined && window.navigator.onLine) {
        window.gtag('config', id, params)
      }
    },
    [id]
  )

  const event = useCallback(
    (action: AnalyticsAction, params: AnalyticsParams) => {
      if (window.gtag !== undefined && window.navigator.onLine) {
        window.gtag('event', action, params)
      }
    },
    []
  )

  return { pageView, event }
}
