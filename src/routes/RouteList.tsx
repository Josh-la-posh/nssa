import { RouteObject } from 'react-router-dom';

import { BaseApp } from './BaseApp';

import { RouteError } from '@/components/Error';
import { AuthRoutes } from '@/features/auth';
import { AppRoutes } from '@/features/app';
import { ResultRoutes } from '@/features/CheckResults';
import { DashboardRoutes } from '@/features/Dashboard';
import { OnboardingRoutes } from '@/features/Onboarding';
import { PaymentRoutes } from '@/features/Payments';
import { TeacherRoutes } from '@/features/Teachers';

export const routesList: RouteObject[] = [
  {
    path: '',
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [
      AuthRoutes,
      AppRoutes,
      ResultRoutes,
      DashboardRoutes,
      OnboardingRoutes,
      PaymentRoutes,
      TeacherRoutes,
    ],
  },
];
