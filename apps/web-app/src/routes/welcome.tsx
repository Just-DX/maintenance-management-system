import { LoadingLayout } from '@layouts/LoadingLayout'
import { createRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { publicRoute } from './public/layout'

export const welcomeRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: WelcomePage,
})

function WelcomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/auth/login' })
  })

  return <LoadingLayout />
}
