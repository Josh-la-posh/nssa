import { Outlet, RouteObject } from 'react-router-dom';
import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';
import { SchoolAppForm } from './SchoolAppForm';

const { IncompleteApp } = lazyImport(() => import('./IncompleteApp'), 'IncompleteApp');

const AppRouteList: RouteObject[] = [
  {
    path: '/dashboard',
    element: <IncompleteApp />,
  },
  {
    path: '/appform',
    element: <SchoolAppForm />,
  },
];

const AppRouteOutlet = <Outlet />;

export const AppRoutes: RouteObject = {
  path: '',
  element: AppRouteOutlet,
  errorElement: <RouteError />,
  children: AppRouteList,
};
