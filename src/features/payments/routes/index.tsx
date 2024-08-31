import { Outlet, RouteObject } from 'react-router-dom';
import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';
import { PAYMENT_ROUTE } from '@/config';

const { Payments } = lazyImport(() => import('./Payments'), 'Payments');

const PaymentRouteList: RouteObject[] = [
  {
    path: PAYMENT_ROUTE,
    element: <Payments />,
  },
];

const PaymentRouteOutlet = <Outlet />;

export const PaymentRoutes: RouteObject = {
  path: '',
  element: PaymentRouteOutlet,
  errorElement: <RouteError />,
  children: PaymentRouteList,
};
