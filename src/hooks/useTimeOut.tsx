import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'

export const useTimeOut = <T,>(
  value: T,
  setValue: Dispatch<SetStateAction<T>>,
  backValue: T,
  timeOut = 1000,
) => {
  useEffect(() => {
    if (value === backValue) return
    const timeout = setTimeout(() => {
      setValue(backValue)
    }, timeOut)
    return () => clearTimeout(timeout)
  }, [value])

  return value
}
