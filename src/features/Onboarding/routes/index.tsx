import { Outlet, RouteObject } from 'react-router-dom';
import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';

const { Onboarding } = lazyImport(() => import('./Onboarding'), 'Onboarding');

const OnboardingRouteList: RouteObject[] = [
  {
    path: '/onboarding',
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
