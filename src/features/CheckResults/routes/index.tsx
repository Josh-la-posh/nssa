import { Outlet, RouteObject } from 'react-router-dom';
import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';

const { CheckResults } = lazyImport(() => import('./CheckResults'), 'CheckResults');

const ResultRouteList: RouteObject[] = [
  {
    path: '/results',
    element: <CheckResults />,
  },
];

const ResultRouteOutlet = <Outlet />;

export const ResultRoutes: RouteObject = {
  path: '',
  element: ResultRouteOutlet,
  errorElement: <RouteError />,
  children: ResultRouteList,
};
