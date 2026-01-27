export const REGEX = {
  // Username: lowercase letters, numbers, underscores
  USERNAME: /^[a-z0-9_]+$/,

  // Password complexity
  LOWERCASE: /[a-z]/,
  UPPERCASE: /[A-Z]/,
  NUMBER: /[0-9]/,
  SYMBOL: /[!@#$%^&*(),.?":{}|<>]/,

  // Phone: E.164 roughly (plus sign followed by digits, length 10-15)
  // Simple check: starts with +, then 7-15 digits
  PHONE_E164: /^\+[1-9]\d{7,14}$/,
} as const
