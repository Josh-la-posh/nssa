import { Suspense } from 'react';
import { Outlet, Navigate, RouteObject } from 'react-router-dom';

import { LogoLoader } from '@/components/Elements';
import { RouteError } from '@/components/Error';
import { useAuth } from '@/lib/auth';
import storage from '@/utils/storage';

const UnAuthenticatedApp = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={storage.session.getValue('redirect-path') || '/'} replace />;
  }
  return (
    <Suspense fallback={<LogoLoader />}>
      <Outlet />
    </Suspense>
  );
};

export const unAuthenticatedRoutesList: RouteObject = {
  element: <UnAuthenticatedApp />,
  errorElement: <RouteError />,
  children: [
    {
      path: '/',
      element: <Navigate to={'/auth/login'} />,
    },
    {
      path: '*',
      element: <Navigate to={'/auth/login'} />,
    },
  ],
};
