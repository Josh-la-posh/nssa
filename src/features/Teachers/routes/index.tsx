import { Outlet, RouteObject } from 'react-router-dom';
import { RouteError } from '@/components/Error';
import { lazyImport } from '@/utils/lazyImport';
import { TEACHER_ROUTE } from '@/config';

const { Teachers } = lazyImport(() => import('./Teachers'), 'Teachers');

const TeacherRouteList: RouteObject[] = [
  {
    path: TEACHER_ROUTE,
    element: <Teachers />,
  },
];

const TeacherRouteOutlet = <Outlet />;

export const TeacherRoutes: RouteObject = {
  path: '',
  element: TeacherRouteOutlet,
  errorElement: <RouteError />,
  children: TeacherRouteList,
};
