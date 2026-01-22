import { describe, expect, it } from 'vitest'
import { getNestedProperty, isDeepEqual, isEmptyObject, omitKeys, pickKeys } from './object'

describe('Object Utils', () => {
  describe('omitKeys', () => {
    it('should remove specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const result = omitKeys(obj, ['b'])
      expect(result).toEqual({ a: 1, c: 3 })
      expect('b' in result).toBe(false)
    })
  })

  describe('pickKeys', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const result = pickKeys(obj, ['a', 'c'])
      expect(result).toEqual({ a: 1, c: 3 })
    })
  })

  describe('isEmptyObject', () => {
    it('should return true for empty object', () => {
      expect(isEmptyObject({})).toBe(true)
    })

    it('should return false for non-empty object', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false)
    })
  })

  describe('isDeepEqual', () => {
    it('should return true for deeply equal objects', () => {
      const a = { x: 1, y: { z: 2 } }
      const b = { x: 1, y: { z: 2 } }
      expect(isDeepEqual(a, b)).toBe(true)
    })

    it('should return false for different objects', () => {
      const a = { x: 1, y: { z: 2 } }
      const b = { x: 1, y: { z: 3 } }
      expect(isDeepEqual(a, b)).toBe(false)
    })
  })

  describe('getNestedProperty', () => {
    it('should get nested property', () => {
      const obj = { a: { b: { c: 'value' } } }
      expect(getNestedProperty(obj, 'a.b.c')).toBe('value')
    })

    it('should return default value for missing property', () => {
      const obj = { a: { b: {} } }
      expect(getNestedProperty(obj, 'a.b.c', 'default')).toBe('default')
    })

    it('should return undefined for missing property without default', () => {
      const obj = { a: {} }
      expect(getNestedProperty(obj, 'a.b.c')).toBeUndefined()
    })
  })
})
