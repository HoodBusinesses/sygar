import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root-route';
import usersListing from '@renderer/containers/users-listing';

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users-listing',
  component: usersListing,
});
