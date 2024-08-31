import { AuthRole, AuthUser } from '@/features/auth';

import * as types from './mutation-types';

export type State = {
  isLoggedIn: boolean;
  user: AuthUser | undefined;
  activeRole: AuthRole | undefined;
  error: string | undefined;
  isLoading: boolean;
  token?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

export type Action = {
  type: keyof typeof types;
  payload?: any;
};

export type Dispatch = (action: Action) => void;
