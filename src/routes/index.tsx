import { RouterProvider, createBrowserRouter, createMemoryRouter } from 'react-router-dom';

import { routesList } from './RouteList';

import { LogoLoader } from '@/components/Elements';

export const router = createBrowserRouter([...routesList]);

export const AppRouter = () => {
  return <RouterProvider router={router} fallbackElement={<LogoLoader />} />;
};

type TestAppRouterProps = {
  initialEntries: string[];
};

const routes = [...routesList];

export const TestAppRouter = ({ initialEntries }: TestAppRouterProps) => {
  const router = createMemoryRouter(routes, { initialEntries: initialEntries });

  return <RouterProvider router={router} />;
};

export const history = createMemoryRouter(routes);
