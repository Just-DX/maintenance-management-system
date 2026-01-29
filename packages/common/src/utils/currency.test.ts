import { describe, it, expect } from 'vitest'
import { formatCurrency } from './currency'

describe('formatCurrency', () => {
  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats positive numbers with grouping and two decimals', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-5.2)).toBe('-$5.20')
  })

  it('formats large numbers with grouping', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })

  it('rounds to two decimals', () => {
    expect(formatCurrency(1.235)).toBe('$1.24')
  })
})
