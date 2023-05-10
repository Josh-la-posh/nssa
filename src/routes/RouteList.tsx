import { RouteObject } from 'react-router-dom';

import { BaseApp } from './BaseApp';

import { RouteError } from '@/components/Error';
import { AuthRoutes } from '@/features/auth';
import { DashboardRoutes } from '@/features/dashboard/routes';

export const routesList: RouteObject[] = [
  {
    path: '',
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [AuthRoutes, DashboardRoutes],
  },
];
