import { Wrench } from 'lucide-react'

// TODO: Replace with real auth hook when available
export function useMockUser() {
  return {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'JD',
      role: 'Admin',
    },
    appLogo: Wrench,
  }
}
