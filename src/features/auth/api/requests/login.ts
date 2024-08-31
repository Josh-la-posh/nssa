import { useNotification } from '@/hooks';
import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import {
  detectUserOS,
  detectUserDeviceVersion,
  detectUserBrowserDetails,
  formatError,
  persistToken,
} from '@/utils/helpers';

import { UserResponse } from '../../types';
import { url } from '../url-query';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO) => {
  try {
    const response = await axios.post<UserResponse>(url.login, {
      ...data,
      osName: detectUserOS(),
      osVersion: detectUserDeviceVersion(),
      ...detectUserBrowserDetails(),
    });
    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type UseLoginOptions = {
  config?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLoginWithEmailAndPassword = ({ config }: UseLoginOptions = {}) => {
  const notification = useNotification();
  const {
    actions: { authSuccess },
  } = useAuth();

  return useMutation({
    onError: (err) => {
      notification.show({
        type: 'error',
        message: err.message,
      });
    },
    onSuccess: (res, req) => {
      persistToken(res.data, req.rememberMe);

      authSuccess(res.data.user);

      notification.show({
        type: 'success',
        message: res.message,
      });
    },
    mutationFn: loginWithEmailAndPassword,
    ...config,
  });
};
