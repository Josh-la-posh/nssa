import { Suspense, useCallback } from 'react';
import { Navigate, Outlet, RouteObject, useLocation } from 'react-router-dom';

import { LogoLoader } from '@/components/Elements';
import { RouteError } from '@/components/Error';
import { DashboardLayout } from '@/components/Layout';
import { env } from '@/config';
import { DashboardRoute } from '@/features/dashboard';
import { SchoolAdminOnboardingRoutes } from '@/features/school-admin-onboarding';
import { useAuth } from '@/lib/auth';
// import { useDashboardActions } from '@/stores/dashboard';
import storage from '@/utils/storage';

const Dashboard = () => {
  const location = useLocation();

  const saveRoute = useCallback(
    () => storage.session.setValue('redirect-path', location),
    [location]
  );

  const isLoading = false;

  if (isLoading) {
    saveRoute();
    return (
      <div>
        <LogoLoader text={<p className="p-4 text-sm font-medium">Hang on for a bit...</p>} />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-sm font-semibold">Please wait...</p>
            <span className="sr-only">Loading...</span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
};

const DashboardRoutes: RouteObject = {
  path: '/',
  element: <Dashboard />,
  children: [DashboardRoute, SchoolAdminOnboardingRoutes],
  errorElement: <RouteError />,
};

export const AuthenticatedApp = () => {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();
  // const { updateNotificationMessage } = useDashboardActions();

  const saveRoute = useCallback(
    () => storage.session.setValue('redirect-path', location),
    [location]
  );
  const { SEO_DOMAIN } = env;

  if (isLoggedIn) {
    if (user && !user.emailConfirm) {
      // updateNotificationMessage(
      //   <p className="text-center text-sm font-medium text-white dark:text-blue-600">
      //     Glad you are here! Please confirm your email address to ensure a positive experience.
      //     <Button.Link
      //       variant="text"
      //       size="sm"
      //       className="!text-blue-200 dark:!text-blue-400"
      //       to="/onboarding"
      //     >
      //       Click here
      //     </Button.Link>
      //   </p>
      // );
      saveRoute();
      return <Navigate to="/auth/confirm-email" state={{ resend: true }} replace />;
    }

    return (
      <Suspense fallback={<LogoLoader />}>
        <Outlet />
      </Suspense>
    );
  } else if (location.pathname.includes('community')) {
    window.location.href = SEO_DOMAIN;
    return <></>;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export const authenticatedRoutesList: RouteObject = {
  element: <AuthenticatedApp />,
  errorElement: <RouteError />,
  children: [DashboardRoutes],
};
