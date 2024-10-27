import Registration from '@renderer/containers/Registration'
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
        <Link to="/about" className="[&.active]:font-bold">
          About
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
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  }
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return (
      <div className="p-2">
        <h3>Welcome About!</h3>
      </div>
    )
  }
})

const registrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/registration',
  component: Registration
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, registrationRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}
