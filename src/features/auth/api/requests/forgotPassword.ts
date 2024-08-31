import { useNotification } from '@/hooks';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';

export type ForgotPasswordDTO = {
  email: string;
};

export const forgotPassword = async (data: ForgotPasswordDTO) => {
  try {
    const response = await axios.post<ApiResponse<{ success: boolean }>>(url.forgotPassword, data, {
      params: {
        callbackURL: window.location.origin,
      },
    });
    return response.data;
  } catch (err: any) {
    const errors = err as APIError;
    throw Error(formatError(errors));
  }
};

type UseForgotPasswordOptions = {
  config?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({ config }: UseForgotPasswordOptions = {}) => {
  const notification = useNotification();

  return useMutation({
    onError: (err) => {
      notification.show({
        type: 'error',
        message: err.message,
      });
    },
    onSuccess: (res) => {
      notification.show({
        type: 'success',
        message: res.message,
      });
    },
    mutationFn: forgotPassword,
    ...config,
  });
};
