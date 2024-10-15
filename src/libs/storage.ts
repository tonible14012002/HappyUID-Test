const STORAGE_KEY_PREFIX = 'uid-test-'

export class Storage {
  static getValue<T>(key: string, defaultValue?: T | undefined) {
    const internalKey = `${STORAGE_KEY_PREFIX}${key}`
    try {
      const item = localStorage.getItem(internalKey)
      return item ? (parseJSON(item) as T) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${internalKey}”:`, error)
      return defaultValue
    }
  }

  static setValue<T>(key: string, value: T) {
    const internalKey = `${STORAGE_KEY_PREFIX}${key}`
    try {
      localStorage.setItem(internalKey, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key “${internalKey}”:`, error)
    }
  }

  static clearItem(key: string) {
    const internalKey = `${STORAGE_KEY_PREFIX}${key}`
    try {
      localStorage.removeItem(internalKey)
    } catch (error) {
      console.warn(`Error clearning localStorage key “${internalKey}”:`, error)
    }
  }
}

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined | unknown {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    console.log('parsing error on', { value })

    return undefined
  }
}
