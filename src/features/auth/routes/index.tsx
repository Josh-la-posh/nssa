import { Outlet, RouteObject } from 'react-router-dom';

import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('./Login'), 'Login');
const { ForgotPassword } = lazyImport(() => import('./ForgotPassword'), 'ForgotPassword');
const { ResetPassword } = lazyImport(() => import('./ResetPassword'), 'ResetPassword');
const { ConfirmEmail } = lazyImport(() => import('./ConfirmEmail'), 'ConfirmEmail');
const { SignUp } = lazyImport(() => import('./SignUp'), 'SignUp');

const AuthRouteList: RouteObject[] = [
  {
    path: 'register',
    element: <SignUp />,
  },
  {
    index: true,
    path: 'login',
    element: <Login />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'confirm-email',
    element: <ConfirmEmail />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
];

const AuthRouteOutlet = <Outlet />;

export const AuthRoutes: RouteObject = {
  path: 'auth',
  element: AuthRouteOutlet,
  errorElement: <RouteError />,
  children: AuthRouteList,
};
