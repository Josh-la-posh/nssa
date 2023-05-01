import { RouteObject } from 'react-router-dom';

import { BaseApp } from './BaseApp';

import { RouteError } from '@/components/Error';
import { AuthRoutes } from '@/features/auth';

const DashboardRoutes: RouteObject = {
  path: '',
  element: <h1>Dashboard</h1>,
  children: [],
  errorElement: <RouteError />,
};

export const routesList: RouteObject[] = [
  {
    path: '',
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [AuthRoutes, DashboardRoutes],
  },
];
