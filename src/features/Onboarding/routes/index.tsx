import { Outlet, RouteObject } from 'react-router-dom';
import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';
import { ONBORARDING_ROUTE } from '@/config';

const { Onboarding } = lazyImport(() => import('./Onboarding'), 'Onboarding');

const OnboardingRouteList: RouteObject[] = [
  {
    path: ONBORARDING_ROUTE,
    element: <Onboarding />,
  },
];

const OnboardingRouteOutlet = <Outlet />;

export const OnboardingRoutes: RouteObject = {
  path: '',
  element: OnboardingRouteOutlet,
  errorElement: <RouteError />,
  children: OnboardingRouteList,
};
