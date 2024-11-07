import Dashboard from '@renderer/containers/dashboard'
import { rootRoute } from './root-route'
import { createRoute } from '@tanstack/react-router'

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard
})
