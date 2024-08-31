import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthPermission } from '@/features/auth';
import { useNotification } from '@/hooks';
import { useAuth } from '@/lib/auth';

export enum UserAccountTypeEnum {
  SuperAdmin = 'SUPER_ADMIN',
  SuperAdminStaff = 'SUPER_ADMIN_STAFF',
  SchoolOwner = 'SCHOOL_OWNER',
  SchoolAdmin = 'SCHOOL_ADMIN',
  SchoolAdminStaff = 'SCHOOL_STAFF',
  Student = 'STUDENT',
  Guardian = 'GUARDIAN',
}

export enum ActionEnum {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum UserPermissionsScopeEnum {
  SuperAdmin = 'SUPER_ADMIN',
  SchoolAdmin = 'SCHOOL_ADMIN',
  Student = 'STUDENT',
  Guardian = 'Guardian',
}

export enum UserAccountStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  SUSPENDED = 'SUSPENDED',
}

export enum ACTIONS {
  MANAGE = 'manage', // all actions
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export const PERMISSIONS = {
  'comment:delete': '',
};

export type RequiredPermission = {
  permission?: { name: string; actions: ActionEnum[] }[];
  accountType: UserAccountTypeEnum[];
};

export const useAuthorization = () => {
  const { user, activeRole, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const notification = useNotification();

  React.useEffect(() => {
    if (!user && !isLoggedIn) {
      notification.show({ message: 'You are not logged in' });
      navigate('/auth/login');
    }
  }, [navigate, notification, user, isLoggedIn]);

  const checkIfUserHasPermission = (
    userPermissions: AuthPermission[],
    allowedPermissions: { name: string; actions: ActionEnum[] }[]
  ): boolean => {
    const permissionResult = allowedPermissions.every(({ name, actions }) =>
      userPermissions.some(
        ({ name: userPermissionName, actions: userActions }) =>
          userPermissionName === name &&
          userActions.every((userAction) => actions.includes(userAction.action))
      )
    );

    return permissionResult;
  };

  const checkAccess = React.useCallback(
    ({ requiredAccess }: { requiredAccess?: RequiredPermission }) => {
      if (!user) {
        return false;
      }

      if (!requiredAccess) {
        return true;
      }

      if (requiredAccess.accountType.includes(user.accountType) && !requiredAccess.permission) {
        return true;
      }

      const userPermissions: AuthPermission[] = [];

      user.roles.forEach((role) =>
        role.permissions.forEach((rolePermission) => userPermissions.push(rolePermission))
      );

      if (requiredAccess.permission) {
        return requiredAccess.accountType.length > 0
          ? checkIfUserHasPermission(userPermissions, requiredAccess.permission) &&
              requiredAccess.accountType.includes(user.accountType)
          : checkIfUserHasPermission(userPermissions, requiredAccess.permission);
      }

      return false;
    },
    [user]
  );

  return { checkAccess, role: activeRole };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & {
  requiredAccess: RequiredPermission;
};

const DefaultErrorFallback = () => {
  return (
    <div className="inline-flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-6 text-center">
      <h2 className="text-3xl font-medium">Access Denied</h2>
      {/* <p className="mx-auto max-w-md">
        You need to upgrade your subscription plan to access this step
      </p> */}
    </div>
  );
};

export const Authorization = ({
  requiredAccess,
  forbiddenFallback = <DefaultErrorFallback />,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (requiredAccess) {
    canAccess = checkAccess({ requiredAccess });
  }

  // if (typeof checkPermission !== 'undefined') {
  //   canAccess = checkPermission;
  // }

  return <>{canAccess === false ? forbiddenFallback : children}</>;
};
