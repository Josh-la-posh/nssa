import { RouteObject } from 'react-router-dom';

import { RouteError } from '@/components/Error';

import { authenticatedRoutesList } from './AuthenticatedApp';
import { Root, commonRoutes } from './Root';
import { unAuthenticatedRoutesList } from './UnAuthenticatedApp';

export const routesList = (): RouteObject[] => [
  {
    path: '',
    element: <Root />,
    errorElement: <RouteError />,
    children: [...commonRoutes, authenticatedRoutesList, unAuthenticatedRoutesList],
  },
];
