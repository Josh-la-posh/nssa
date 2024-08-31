import * as React from 'react';
// import { createStore } from 'zustand';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Logo, LogoLoader } from '@/components/Elements';
import { useLogout } from '@/features/auth/api';
import { useCurrentUser } from '@/features/auth/api/requests/getUser';
import { useApiResponseHandler, useNotification } from '@/hooks';
import { resetAllStores } from '@/lib/zustand';
import { clearStorageValues, getToken } from '@/utils/helpers';
import storage from '@/utils/storage';

import authReducer from './mutations';
import { Dispatch, State } from './types';

type AuthProviderProps = { children: React.ReactNode };

const initialState: State = {
  isLoggedIn: !!getToken().token || !!getToken().refresh_token,
  activeRole: undefined,
  user: undefined,
  error: undefined,
  isLoading: false,
};

export type ContextType = {
  state: State;
  actions: {
    logout: (callback_url?: string, message?: ReactNode) => void;
  };
  dispatch: Dispatch;
};

// const _store = createStore<ContextType>((set) => ({
// state:initialState,
// actions:{},dispatch:
// })

export const AuthStateContext = React.createContext<ContextType | undefined>(undefined);

export const AuthP = (props: AuthProviderProps) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(authReducer, { ...initialState });
  const navigate = useNavigate();
  const [shouldChooseRole, setShouldChooseRole] = useState(false);

  const notification = useNotification();

  const getUserQuery = useCurrentUser();

  const getUserQueryOnError = useApiResponseHandler;
  const getUserQueryOnSuccess = useApiResponseHandler;
  getUserQueryOnError({
    runFn: getUserQuery.isError,
    fn: () => {
      logout();
    },
  });
  getUserQueryOnSuccess({
    runFn: getUserQuery.isSuccess,
    fn: () => {
      if (getUserQuery.data?.data) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: getUserQuery.data?.data,
        });
      }
    },
  });

  const { mutate: logoutMutate, isPending: logoutLoading } = useLogout();

  const isAppLoading = getUserQuery.isLoading || logoutLoading;

  const USER_ROLES = state.user?.roles;

  const chooseRole = React.useCallback(
    (role_id: number | string) => {
      storage.setValue('active-role', role_id);

      const activeRole = USER_ROLES?.find(({ id }) => id === role_id);
      dispatch({
        type: 'SET_ACTIVE_ROLE_SUCCESS',
        payload: activeRole,
      });
      setShouldChooseRole(false);
    },
    [USER_ROLES]
  );

  const logout = useCallback(
    (
      callback_url?: string,
      message: ReactNode = (
        <>
          You&apos;ve successfully logged out of Oponeko.
          <br /> We hope to see you again soon.
        </>
      )
    ) => {
      logoutMutate(undefined, {
        onSettled(_, error) {
          clearStorageValues();
          resetAllStores();

          dispatch({ type: 'LOGOUT_SUCCESS' });
          navigate(callback_url || '/auth/login', { replace: true });
          if (message) {
            notification.show({
              type: error ? 'error' : 'success',
              message: error ? "You've been logged out of Oponeko." : message,
            });
          }
        },
      });
    },
    [logoutMutate, navigate, notification]
  );

  const value = React.useMemo(
    () => ({
      state,
      actions: {
        logout,
      },
      dispatch,
    }),
    [logout, state]
  );

  useEffect(() => {
    if (state.user) {
      const activeRoleId = storage.getValue('active-role');
      if (activeRoleId) {
        chooseRole(activeRoleId);
      } else if (USER_ROLES?.length === 1) {
        chooseRole(USER_ROLES?.[0].id);
      } else {
        if (USER_ROLES && USER_ROLES.length > 0) {
          setShouldChooseRole(true);
        }
      }
    }
  }, [USER_ROLES, chooseRole, state.user]);

  if (isAppLoading) {
    return <LogoLoader />;
  }

  if (shouldChooseRole) {
    return <SwitchRole roles={USER_ROLES} logout={logout} select={chooseRole} />;
  }

  return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
};

export const AuthProvider = React.memo(AuthP);

function SwitchRole({ roles, logout, select }: any) {
  return (
    <div className="m-auto flex h-screen w-full max-w-md flex-col items-center justify-center gap-8 p-4">
      <div className="w-full rounded-lg bg-white p-6 shadow-md shadow-gray-300 dark:bg-blue-600">
        <div className="mb-2 border-b pb-2">
          <h1 className="font-semibold text-blue-600 dark:text-white">
            You have more than one role
          </h1>
          <p className="text-sm text-gray-500">Please select a role you want to login as</p>
        </div>
        <div className="divide-y px-2 py-4 sm:px-4">
          {roles.map((role: any) => (
            <div key={role._id} className="flex items-center justify-between gap-4 p-2 ">
              <div>
                <p className="font-medium lowercase first-letter:capitalize">{role.name}</p>
                <p className="text-xs font-medium text-gray-500">{role.description}</p>
              </div>
              <Button
                size="sm"
                className="font-semibold"
                variant="filled"
                onClick={() => select(role._id)}
              >
                Select
              </Button>
            </div>
          ))}
        </div>
        <Button variant="text" className="w-full" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
      <Logo variant="primary-text" />
    </div>
  );
}
