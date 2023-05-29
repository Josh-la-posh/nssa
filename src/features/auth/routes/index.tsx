import { Outlet, RouteObject } from 'react-router-dom';

import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';
import { ForgotPassword } from './SignIn/ForgotPassword';
import { ConfirmationPage } from './SignIn/ConfirmationPage';
import { ResetPassword } from './SignIn/ResetPassword';
import { CONFIRMATIONPAGE_ROUTE, FORGOTPASSWORD_ROUTE, RESETPASSWORD_ROUTE } from '@/config';

const { Login } = lazyImport(() => import('./SignIn/Login'), 'Login');

const AuthRouteList: RouteObject[] = [
  {
    index: true,
    element: <Login />,
  },
  {
    path: FORGOTPASSWORD_ROUTE,
    element: <ForgotPassword />,
  },
  {
    path: CONFIRMATIONPAGE_ROUTE,
    element: <ConfirmationPage />,
  },
  {
    path: RESETPASSWORD_ROUTE,
    element: <ResetPassword />,
  },
];

const AuthRouteOutlet = <Outlet />;

export const AuthRoutes: RouteObject = {
  path: '',
  element: AuthRouteOutlet,
  errorElement: <RouteError />,
  children: AuthRouteList,
};
