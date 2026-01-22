import { isEmpty, isEqual, omit, pick } from 'lodash'

/**
 * Remove specified keys from an object
 */
export function omitKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  return omit(obj, keys) as Omit<T, K>
}

/**
 * Pick specified keys from an object
 */
export function pickKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return pick(obj, keys) as Pick<T, K>
}

/**
 * Check if an object is empty
 */
export function isEmptyObject(obj: object): boolean {
  return isEmpty(obj)
}

/**
 * Deep equality check for objects
 */
export function isDeepEqual<T>(a: T, b: T): boolean {
  return isEqual(a, b)
}

/**
 * Safely get a nested property from an object
 */
export function getNestedProperty<T>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.')
  let result: unknown = obj

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      return defaultValue
    }
  }

  return result as T
}
