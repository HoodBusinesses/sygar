import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root-route';
import SettingPage from '@renderer/containers/Setting';

export const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingPage,
});
