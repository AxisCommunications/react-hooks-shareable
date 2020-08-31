import { renderHook } from '@testing-library/react-hooks'
import { it, expect } from '@jest/globals'

import { useDeferredTrigger } from './useDeferredTrigger'

const DEFAULT_DELAY = 13
const DEFAULT_TRAILING_DELAY = 26
const TOLERANCE = 5

it('shall turn on the deferred flag after delay', async () => {
  const { result, rerender, waitForNextUpdate } = renderHook(
    value => useDeferredTrigger(value, { delay: DEFAULT_DELAY }),
    { initialProps: false }
  )

  expect(result.current).toBe(false)
  rerender(true)
  expect(result.current).toBe(false)
  await waitForNextUpdate()
  expect(result.current).toBe(true)
})

it('shall not turn on the deferred flag when reset before delay', async () => {
  const { result, rerender, waitForNextUpdate } = renderHook(
    value => useDeferredTrigger(value, { delay: DEFAULT_DELAY }),
    { initialProps: false }
  )

  rerender(true)
  expect(result.current).toBe(false)

  // Reset before it's time
  setTimeout(() => {
    rerender(false)
  }, DEFAULT_DELAY - TOLERANCE)

  await waitForNextUpdate()
  expect(result.current).toBe(false)
})

it('shall wait to turn on the deferred value till after the delay', async () => {
  const { result, rerender, waitForNextUpdate } = renderHook(
    value => useDeferredTrigger(value, { delay: DEFAULT_DELAY }),
    { initialProps: false }
  )

  rerender(true)
  expect(result.current).toBe(false)

  // Wait for delay to pass
  await waitForNextUpdate()
  expect(result.current).toBe(true)
})

it('shall wait to turn off the deferred value till after the delay', async () => {
  const { result, rerender, waitForNextUpdate } = renderHook(
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
  await waitForNextUpdate()
  expect(result.current).toBe(true)

  // Turn off trigger
  rerender(false)
  expect(result.current).toBe(true)

  // Wait for delay to pass
  await waitForNextUpdate()
  expect(result.current).toBe(false)
})
