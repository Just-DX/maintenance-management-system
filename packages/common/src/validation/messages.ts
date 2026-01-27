export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: {
    invalid: 'Please enter a valid email address',
  },
  username: {
    invalid: 'Username must contain only lowercase letters, numbers, and underscores',
    length: (min: number, max: number) => `Username must be between ${min} and ${max} characters`,
  },
  password: {
    min: (min: number) => `Password must be at least ${min} characters`,
    max: (max: number) => `Password must be less than ${max} characters`,
    uppercase: 'Password must contain at least one uppercase letter',
    lowercase: 'Password must contain at least one lowercase letter',
    number: 'Password must contain at least one number',
    symbol: 'Password must contain at least one special character',
  },
  phone: {
    invalid: 'Please enter a valid phone number',
  },
  url: {
    invalid: 'Please enter a valid URL',
  },
} as const
