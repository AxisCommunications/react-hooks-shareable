import { renderHook, waitFor } from '@testing-library/react'
import { expect, test } from '@jest/globals'

import { useDeferredTrigger } from './useDeferredTrigger'

const DEFAULT_DELAY = 50
const DEFAULT_TRAILING_DELAY = 100
const TOLERANCE = 25

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

const wait = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

test('shall turn on the deferred flag after delay', async () => {
  const { result, rerender } = renderHook(
    value => useDeferredTrigger(value, { delay: DEFAULT_DELAY }),
    { initialProps: false }
  )

  expect(result.current).toBe(false)
  rerender(true)
  expect(result.current).toBe(false)
  await waitFor(() => {
    expect(result.current).toBe(true)
  })
})

test('shall not turn on the deferred flag when reset before delay', async () => {
  const { result, rerender } = renderHook(
    value => useDeferredTrigger(value, { delay: DEFAULT_DELAY }),
    { initialProps: false }
  )

  rerender(true)
  expect(result.current).toBe(false)

  // Reset before it's time
  await wait(DEFAULT_DELAY - TOLERANCE)
  rerender(false)

  await waitFor(() => {
    expect(result.current).toBe(false)
  })
})

test('shall wait to turn on the deferred value till after the delay', async () => {
  const { result, rerender } = renderHook(
    value => useDeferredTrigger(value, { delay: DEFAULT_DELAY }),
    { initialProps: false }
  )

  rerender(true)
  expect(result.current).toBe(false)

  // Wait for delay to pass
  await waitFor(() => {
    expect(result.current).toBe(true)
  })
})

test('shall wait to turn off the deferred value till after the delay', async () => {
  const { result, rerender } = renderHook(
    value =>
      useDeferredTrigger(value, {
        delay: DEFAULT_DELAY,
        minDuration: DEFAULT_TRAILING_DELAY,
      }),
    { initialProps: false }
  )

  rerender(true)
  expect(result.current).toBe(false)

  // Wait for delay to pass
  await waitFor(() => {
    expect(result.current).toBe(true)
  })

  // Turn off trigger
  rerender(false)
  expect(result.current).toBe(true)

  // Wait for delay to pass
  await waitFor(() => {
    expect(result.current).toBe(false)
  })
})
