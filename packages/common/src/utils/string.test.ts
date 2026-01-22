import { describe, expect, it } from 'vitest'
import {
  capitalize,
  containsIgnoreCase,
  isEmptyString,
  slugify,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  trimString,
  truncateString,
} from './string'

describe('String Utils', () => {
  describe('toCamelCase', () => {
    it('should convert to camelCase', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld')
      expect(toCamelCase('hello-world')).toBe('helloWorld')
      expect(toCamelCase('hello_world')).toBe('helloWorld')
    })
  })

  describe('toKebabCase', () => {
    it('should convert to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world')
      expect(toKebabCase('hello world')).toBe('hello-world')
      expect(toKebabCase('hello_world')).toBe('hello-world')
    })
  })

  describe('toSnakeCase', () => {
    it('should convert to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world')
      expect(toSnakeCase('hello world')).toBe('hello_world')
      expect(toSnakeCase('hello-world')).toBe('hello_world')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('HELLO')).toBe('Hello')
    })
  })

  describe('trimString', () => {
    it('should trim whitespace', () => {
      expect(trimString('  hello  ')).toBe('hello')
      expect(trimString('\n\thello\t\n')).toBe('hello')
    })
  })

  describe('truncateString', () => {
    it('should truncate to default length', () => {
      const long = 'This is a very long string that needs to be truncated'
      const result = truncateString(long)
      expect(result.length).toBeLessThanOrEqual(30)
      expect(result).toContain('...')
    })

    it('should truncate to custom length', () => {
      const result = truncateString('Hello World', 8)
      expect(result).toBe('Hello...')
    })

    it('should not truncate short strings', () => {
      expect(truncateString('Hello', 10)).toBe('Hello')
    })
  })

  describe('isEmptyString', () => {
    it('should return true for empty or whitespace strings', () => {
      expect(isEmptyString('')).toBe(true)
      expect(isEmptyString('   ')).toBe(true)
      expect(isEmptyString('\n\t')).toBe(true)
    })

    it('should return false for non-empty strings', () => {
      expect(isEmptyString('hello')).toBe(false)
      expect(isEmptyString('  a  ')).toBe(false)
    })
  })

  describe('slugify', () => {
    it('should create URL-safe slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
      expect(slugify('  Hello   World  ')).toBe('hello-world')
      expect(slugify('Hello_World')).toBe('hello-world')
    })

    it('should handle special characters', () => {
      expect(slugify('Hello@World#123')).toBe('helloworld123')
    })
  })

  describe('containsIgnoreCase', () => {
    it('should find substring case-insensitively', () => {
      expect(containsIgnoreCase('Hello World', 'world')).toBe(true)
      expect(containsIgnoreCase('Hello World', 'HELLO')).toBe(true)
    })

    it('should return false when not found', () => {
      expect(containsIgnoreCase('Hello World', 'xyz')).toBe(false)
    })
  })
})
