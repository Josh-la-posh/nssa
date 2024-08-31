import { Outlet, RouteObject } from 'react-router-dom';

import { RouteError } from '@/components/Error';
import { DASHBOARD_ROUTE } from '@/config';
import { lazyImport } from '@/utils/lazyImport';

import { Layout } from '../components';

const { Dashboard } = lazyImport(() => import('./Dashboard'), 'Dashboard');

const DashboardRouteList: RouteObject[] = [
  {
    path: DASHBOARD_ROUTE,
    element: <Dashboard />,
  },
];

const DashboardRouteOutlet = (
  <Layout>
    <Outlet />
  </Layout>
);

export const DashboardRoute: RouteObject = {
  path: '',
  element: DashboardRouteOutlet,
  children: DashboardRouteList,
  errorElement: <RouteError />,
};
