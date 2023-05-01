import { Outlet, RouteObject } from 'react-router-dom';

import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('./Login'), 'Login');

const AuthRouteList: RouteObject[] = [
  {
    index: true,
    element: <Login />,
  },
];

const AuthRouteOutlet = <Outlet />;

export const AuthRoutes: RouteObject = {
  path: '/',
  element: AuthRouteOutlet,
  errorElement: <RouteError />,
  children: AuthRouteList,
};
