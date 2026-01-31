export const getCookieValue = (
  cookieHeader: string | undefined,
  name: string
): string | undefined => {
  if (!cookieHeader) return undefined

  const cookies = cookieHeader.split(';')
  for (const cookie of cookies) {
    const [rawKey, ...rawValue] = cookie.trim().split('=')
    if (!rawKey) continue
    if (rawKey === name) {
      const value = rawValue.join('=')
      return value ? decodeURIComponent(value) : undefined
    }
  }

  return undefined
}
