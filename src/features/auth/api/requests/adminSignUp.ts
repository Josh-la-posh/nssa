import { useNotification } from '@/hooks';
import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation, useQueryClient } from '@/lib/react-query';
import { APIError } from '@/types/api';
import {
  detectUserBrowserDetails,
  detectUserDeviceVersion,
  detectUserOS,
  formatError,
  persistToken,
} from '@/utils/helpers';

import { UserResponse } from '../../types';
import { queryKey, url } from '../url-query';

export type SignUpCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
};

export const signup = async (data: SignUpCredentialsDTO) => {
  try {
    const response = await axios.post<UserResponse>(url.schoolSignup, {
      ...data,
      osName: detectUserOS(),
      osVersion: detectUserDeviceVersion(),
      ...detectUserBrowserDetails(),
      callBackUrl: window.location.origin,
    });
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type UseSignUpOptions = {
  config?: MutationConfig<typeof signup>;
};

export const useSchoolAdminSignUp = ({ config }: UseSignUpOptions = {}) => {
  const notification = useNotification();
  const queryClient = useQueryClient();

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
    onSuccess: (res) => {
      persistToken(res.data, true);
      authSuccess(res.data.user);

      queryClient.setQueryData(queryKey.getUser(), {
        data: res.data.user,
        message: 'User fetched successfully',
        success: 200,
      });

      notification.show({
        type: 'success',
        message: res.message,
      });
    },
    ...config,
    mutationFn: signup,
  });
};
