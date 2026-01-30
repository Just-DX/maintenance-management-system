import { ThemeProvider } from '@justdx/components'
import { Toaster } from '@justdx/components/atoms/Sonner'
import { queryClient } from '@plugins/react-query/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@shared/auth'
import { router } from './router'

import './styles/globals.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
