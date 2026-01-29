import type { GoogleProps } from './Google.type'

export type { GoogleProps } from './Google.type'

export function Google(props: GoogleProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" {...props}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.3 30.4 0 24 0 14.6 0 6.4 5.4 2.6 13.3l8.4 6.5C13 14.1 18.1 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12.8c-.3 2-1.7 5-4.8 7l7.4 5.7c4.3-4 6.7-9.9 6.7-16.3z"
      />
      <path
        fill="#FBBC05"
        d="M10.9 28.1c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-8.4-6.5C.9 15.8 0 19.7 0 23.5s.9 7.7 2.5 11.1l8.4-6.5z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.4 0 11.8-2.1 15.7-5.7l-7.4-5.7c-2 1.4-4.6 2.3-8.3 2.3-5.9 0-11-4.6-12.8-10.7l-8.4 6.5C6.4 42.6 14.6 48 24 48z"
      />
    </svg>
  )
}
