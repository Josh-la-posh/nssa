import { Outlet, RouteObject } from 'react-router-dom';

import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';
import { ForgotPassword } from './SignIn/ForgotPassword';
import { ConfirmationPage } from './SignIn/ConfirmationPage';
import { ResetPassword } from './SignIn/ResetPassword';
import { SignUp } from './SignUp/SignUp';
import { VerificationPage } from './SignUp/VerificationPage';

const { Login } = lazyImport(() => import('./SignIn/Login'), 'Login');

const AuthRouteList: RouteObject[] = [
  {
    index: true,
    // path: '/register',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />,
  },
  {
    path: '/confirm',
    element: <ConfirmationPage />,
  },
  {
    path: '/reset',
    element: <ResetPassword />,
  },
  {
    path: '/verify',
    element: <VerificationPage />,
  },
];

const AuthRouteOutlet = <Outlet />;

export const AuthRoutes: RouteObject = {
  path: '',
  element: AuthRouteOutlet,
  errorElement: <RouteError />,
  children: AuthRouteList,
};
