import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root-route';
import groupsListing from '@renderer/containers/groups-listing';

export const groupListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/group-listing',
  component: groupsListing,
});
