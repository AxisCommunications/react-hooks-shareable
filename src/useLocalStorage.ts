// The code is borrowed with small modifications from
// https://usehooks.com/useLocalStorage/
import { useState, useCallback } from 'react'

export const getLocalStorage = () => {
  return new Proxy(localStorage, {
    set: (_, key, value) => {
      if (typeof key !== 'string') {
        throw new Error('The key should be a string')
      }

      localStorage.setItem(key, JSON.stringify(value))

      return true
    },
    get: (_, key) => {
      if (typeof key !== 'string') {
        throw new Error('The key should be a string')
      }

      const value = localStorage.getItem(key)

      if (value === null) {
        return null
      }

      try {
        return JSON.parse(value)
      } catch (err) {
        return value
      }
    },
  })
}

export function useLocalStorage<T = undefined>(
  key: string
): readonly [T | undefined, (value: T) => void] {
  const storage = getLocalStorage()

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => storage[key])

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (value: T) => {
      try {
        // Save state
        setStoredValue(value)
        // Save to local storage
        storage[key] = value
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error)
      }
    },
    [key, storage]
  )

  return [storedValue, setValue]
}
