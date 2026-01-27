import { describe, expect, it } from 'vitest'
import {
  createPasswordSchema,
  createPhoneSchema,
  emailSchema,
  optionalTrimmedString,
  phoneSchema,
  requiredString,
  urlSchema,
  usernameSchema,
} from '../index'

describe('Validation Schemas', () => {
  describe('emailSchema', () => {
    it('validates correct emails', () => {
      expect(emailSchema.safeParse('test@example.com').success).toBe(true)
      expect(emailSchema.safeParse('  test@example.com  ').success).toBe(true) // trims
    })

    it('rejects invalid emails', () => {
      expect(emailSchema.safeParse('invalid-email').success).toBe(false)
      expect(emailSchema.safeParse('').success).toBe(false)
    })
  })

  describe('usernameSchema', () => {
    it('validates correct usernames', () => {
      expect(usernameSchema.safeParse('john_doe123').success).toBe(true)
      expect(usernameSchema.safeParse('user_name').success).toBe(true)
    })

    it('rejects invalid usernames', () => {
      expect(usernameSchema.safeParse('JohnDoe').success).toBe(false) // uppercase not allowed
      expect(usernameSchema.safeParse('user name').success).toBe(false) // spaces not allowed
      expect(usernameSchema.safeParse('ab').success).toBe(false) // too short
      expect(usernameSchema.safeParse('a'.repeat(31)).success).toBe(false) // too long
    })
  })

  describe('passwordSchema', () => {
    const passwordSchema = createPasswordSchema()

    it('validates correct passwords', () => {
      expect(passwordSchema.safeParse('Password123').success).toBe(true)
    })

    it('rejects weak passwords', () => {
      expect(passwordSchema.safeParse('weak').success).toBe(false) // too short
      expect(passwordSchema.safeParse('password123').success).toBe(false) // no uppercase
      expect(passwordSchema.safeParse('PASSWORD123').success).toBe(false) // no lowercase
      expect(passwordSchema.safeParse('Password').success).toBe(false) // no number
    })

    it('supports custom complexity', () => {
      const simpleSchema = createPasswordSchema({
        requireUpper: false,
        requireLower: false,
        requireNumber: false,
        min: 5,
      })
      expect(simpleSchema.safeParse('abcde').success).toBe(true)
    })
  })

  describe('phoneSchema', () => {
    it('validates E.164 phones', () => {
      expect(phoneSchema.safeParse('+1234567890').success).toBe(true)
    })

    it('rejects invalid phones', () => {
      expect(phoneSchema.safeParse('1234567890').success).toBe(false) // missing +
      expect(phoneSchema.safeParse('+123').success).toBe(false) // too short
    })

    it('supports local phones logic when configured', () => {
      const localSchema = createPhoneSchema({ allowLocal: true })
      expect(localSchema.safeParse('1234567890').success).toBe(true)
    })
  })

  describe('urlSchema', () => {
    it('validates correct URLs', () => {
      expect(urlSchema.safeParse('https://example.com').success).toBe(true)
    })

    it('rejects invalid URLs', () => {
      expect(urlSchema.safeParse('not-a-url').success).toBe(false)
    })
  })

  describe('helpers', () => {
    describe('requiredString', () => {
      it('requires non-empty string', () => {
        const schema = requiredString()
        expect(schema.safeParse('hello').success).toBe(true)
        expect(schema.safeParse('').success).toBe(false)
        expect(schema.safeParse('   ').success).toBe(false) // trims to empty
      })
    })

    describe('optionalTrimmedString', () => {
      it('transforms empty string to undefined', () => {
        expect(optionalTrimmedString.parse('')).toBeUndefined()
        expect(optionalTrimmedString.parse('   ')).toBeUndefined()
        expect(optionalTrimmedString.parse('hello')).toBe('hello')
      })
    })
  })
})
