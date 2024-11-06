import OrganizationsPage from '@renderer/containers/organizations-listing'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root-route'

export const organizationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/organizations',
  component: OrganizationsPage
})
