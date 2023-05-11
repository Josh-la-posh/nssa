import { Outlet, RouteObject } from 'react-router-dom';
import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';

const { Dashboard } = lazyImport(() => import('./Dashboard'), 'Dashboard');

const DashboardRouteList: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
];

const DashboardRouteOutlet = <Outlet />;

export const DashboardRoutes: RouteObject = {
  path: '',
  element: DashboardRouteOutlet,
  errorElement: <RouteError />,
  children: DashboardRouteList,
};
