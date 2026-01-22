import { describe, expect, it } from 'vitest'
import { chunkArray, first, groupByKey, last, sortByKey, uniqueArray } from './array'

describe('Array Utils', () => {
  describe('chunkArray', () => {
    it('should split array into chunks of specified size', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7]
      const result = chunkArray(arr, 3)
      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]])
    })

    it('should handle empty array', () => {
      expect(chunkArray([], 3)).toEqual([])
    })
  })

  describe('uniqueArray', () => {
    it('should remove duplicates from array', () => {
      const arr = [1, 2, 2, 3, 3, 3, 4]
      expect(uniqueArray(arr)).toEqual([1, 2, 3, 4])
    })

    it('should handle array with no duplicates', () => {
      expect(uniqueArray([1, 2, 3])).toEqual([1, 2, 3])
    })
  })

  describe('groupByKey', () => {
    it('should group array items by key', () => {
      const users = [
        { name: 'Alice', role: 'admin' },
        { name: 'Bob', role: 'user' },
        { name: 'Charlie', role: 'admin' },
      ]
      const result = groupByKey(users, 'role')
      expect(result.admin).toHaveLength(2)
      expect(result.user).toHaveLength(1)
    })
  })

  describe('sortByKey', () => {
    it('should sort array by key', () => {
      const users = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 },
      ]
      const result = sortByKey(users, 'age')
      expect(result[0]!.name).toBe('Alice')
      expect(result[2]!.name).toBe('Bob')
    })
  })

  describe('first', () => {
    it('should return first element', () => {
      expect(first([1, 2, 3])).toBe(1)
    })

    it('should return undefined for empty array', () => {
      expect(first([])).toBeUndefined()
    })
  })

  describe('last', () => {
    it('should return last element', () => {
      expect(last([1, 2, 3])).toBe(3)
    })

    it('should return undefined for empty array', () => {
      expect(last([])).toBeUndefined()
    })
  })
})
