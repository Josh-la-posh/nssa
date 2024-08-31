import { Suspense } from 'react';
import { RouteObject, useOutlet } from 'react-router-dom';

import { LogoLoader } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { AuthRoutes } from '@/features/auth';
import { ComponentShowCase } from '@/features/misc';

import { AuthProvider } from '../providers/AuthProvider';

export const Root = () => {
  const outlet = useOutlet();

  return (
    <MainLayout>
      <Suspense fallback={<LogoLoader />}>
        <AuthProvider>{outlet}</AuthProvider>
      </Suspense>
    </MainLayout>
  );
};

export const commonRoutes: RouteObject[] = [
  {
    path: 'component-showcase',
    element: <ComponentShowCase />,
  },
  AuthRoutes,
];
