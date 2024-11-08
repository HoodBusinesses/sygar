import ThemesListing from '@renderer/containers/themes-listing';
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root-route';

export const themesListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/themes-listing',
  component: ThemesListing,
});
