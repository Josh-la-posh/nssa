import { RouterProvider, createBrowserRouter, createMemoryRouter } from 'react-router-dom';

import { LogoLoader } from '@/components/Elements';

import { routesList } from './RouteList';

const routes = [...routesList()];

export const AppRouter = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} fallbackElement={<LogoLoader />} />;
};

type TestAppRouterProps = {
  initialEntries: string[];
};

export const TestAppRouter = ({ initialEntries }: TestAppRouterProps) => {
  const router = createMemoryRouter(routes, { initialEntries: initialEntries });

  return <RouterProvider router={router} />;
};

export const history = createMemoryRouter(routes);
