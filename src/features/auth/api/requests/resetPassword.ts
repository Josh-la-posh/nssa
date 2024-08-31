import { useNotification } from '@/hooks';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';

export type ResetPasswordDTO = {
  password: string;
  token: string;
};

export const resetPassword = async (data: ResetPasswordDTO) => {
  try {
    const response = await axios.post<ApiResponse<{ success: boolean }>>(url.resetPassword, data);
    return response.data;
  } catch (err: any) {
    const errors = err as APIError;
    throw Error(formatError(errors));
  }
};

type UseResetPasswordOptions = {
  config?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = ({ config }: UseResetPasswordOptions = {}) => {
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
    mutationFn: resetPassword,
    ...config,
  });
};
