import { Outlet, RouteObject } from 'react-router-dom';

import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';

const { ApplicationsPage } = lazyImport(() => import('./Applications'), 'ApplicationsPage');
const { ViewApplicationPage } = lazyImport(
  () => import('./ViewApplication'),
  'ViewApplicationPage'
);

const OnboardingRouteList: RouteObject[] = [
  {
    path: '/onboarding/school-admin',
    element: <ApplicationsPage />,
  },
  {
    path: '/onboarding/school-admin/:id',
    element: <ViewApplicationPage />,
  },
];

const OnboardingRouteOutlet = <Outlet />;

export const SchoolAdminOnboardingRoutes: RouteObject = {
  path: '',
  element: OnboardingRouteOutlet,
  errorElement: <RouteError />,
  children: OnboardingRouteList,
};
