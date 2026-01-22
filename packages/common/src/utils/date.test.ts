import { describe, expect, it } from 'vitest'
import {
  addDaysToDate,
  formatDate,
  getDaysDifference,
  isValidDate,
  subtractDaysFromDate,
  toISOString,
} from './date'

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date to default pattern', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      expect(formatDate(date)).toBe('2024-01-15')
    })

    it('should format date with custom pattern', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      expect(formatDate(date, 'dd/MM/yyyy')).toBe('15/01/2024')
    })

    it('should handle ISO string input', () => {
      expect(formatDate('2024-01-15T10:30:00Z')).toBe('2024-01-15')
    })
  })

  describe('isValidDate', () => {
    it('should return true for valid date', () => {
      expect(isValidDate(new Date())).toBe(true)
      expect(isValidDate('2024-01-15')).toBe(true)
    })

    it('should return false for invalid date', () => {
      expect(isValidDate('invalid')).toBe(false)
      expect(isValidDate(new Date('invalid'))).toBe(false)
    })
  })

  describe('addDaysToDate', () => {
    it('should add days to date', () => {
      const date = new Date('2024-01-15')
      const result = addDaysToDate(date, 5)
      expect(formatDate(result)).toBe('2024-01-20')
    })

    it('should handle negative days', () => {
      const date = new Date('2024-01-15')
      const result = addDaysToDate(date, -5)
      expect(formatDate(result)).toBe('2024-01-10')
    })
  })

  describe('subtractDaysFromDate', () => {
    it('should subtract days from date', () => {
      const date = new Date('2024-01-15')
      const result = subtractDaysFromDate(date, 5)
      expect(formatDate(result)).toBe('2024-01-10')
    })
  })

  describe('getDaysDifference', () => {
    it('should calculate difference in days', () => {
      const date1 = new Date('2024-01-15')
      const date2 = new Date('2024-01-10')
      expect(getDaysDifference(date1, date2)).toBe(5)
    })

    it('should return negative for reversed dates', () => {
      const date1 = new Date('2024-01-10')
      const date2 = new Date('2024-01-15')
      expect(getDaysDifference(date1, date2)).toBe(-5)
    })
  })

  describe('toISOString', () => {
    it('should convert date to ISO string', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      expect(toISOString(date)).toBe('2024-01-15T10:30:00.000Z')
    })

    it('should handle ISO string input', () => {
      const isoString = '2024-01-15T10:30:00Z'
      expect(toISOString(isoString)).toBe('2024-01-15T10:30:00.000Z')
    })
  })
})
