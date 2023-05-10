import { RouteObject } from 'react-router-dom';

import { BaseApp } from './BaseApp';

import { RouteError } from '@/components/Error';
import { AuthRoutes } from '@/features/auth';
import { AppRoutes } from '@/features/app';

export const routesList: RouteObject[] = [
  {
    path: '',
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [AuthRoutes, AppRoutes],
  },
];
