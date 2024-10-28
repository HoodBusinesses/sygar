import OrganizationsPage from '@renderer/containers/organizations-listing'
import Registration from '@renderer/containers/Registration'
import Signin from '@renderer/containers/sign-in'
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute
} from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/organizations" className="[&.active]:font-bold">
          organizations
        </Link>{' '}
        <Link to="/registration" className="[&.active]:font-bold">
          Registration
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Signin
})

const organizationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/organizations',
  component: OrganizationsPage
})

const registrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/registration',
  component: Registration
})

const routeTree = rootRoute.addChildren([indexRoute, organizationRoute, registrationRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}
