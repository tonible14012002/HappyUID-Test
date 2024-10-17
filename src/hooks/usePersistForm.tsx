import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Storage } from '@/libs/storage'

interface UsePersistFormArgs {
  key: string
}

export const usePersistForm = <T,>(args: UsePersistFormArgs) => {
  const { key } = args

  const persistDataLocalStore = useDebouncedCallback((values: T) => {
    Storage.setValue(key, values)
  }, 1000)

  const loadInitData = useCallback((fallBack?: T) => {
    return Storage.getValue<T>(key, fallBack)
  }, [])

  const clearData = useCallback(() => {
    Storage.clearItem(key)
  }, [])

  return {
    persistDataLocalStore,
    loadInitData,
    clearData,
  }
}
