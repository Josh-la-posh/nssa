import { useNavigate } from 'react-router-dom';

import { useNotification } from '@/hooks';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';

export type ResetPasswordTokenDTO = {
  token: string;
};

export const resetPasswordTokenValidity = async (data: ResetPasswordTokenDTO) => {
  try {
    const response = await axios.post<ApiResponse<{ valid: boolean }>>(
      url.resetPasswordTokenValidity,
      data
    );
    return response.data;
  } catch (error) {
    throw Error(formatError(error));
  }
};

type UseResetPasswordTokenOptions = {
  config?: MutationConfig<typeof resetPasswordTokenValidity>;
};

export const useResetPasswordTokenValidity = ({ config }: UseResetPasswordTokenOptions = {}) => {
  const notification = useNotification();
  const navigate = useNavigate();

  return useMutation({
    onError: (err) => {
      notification.show({
        type: 'error',
        message: err.message,
      });
      navigate('/auth/forgot-password');
    },
    onSuccess({ data }) {
      if (!data.valid) {
        navigate('/auth/forgot-password');
        notification.show({
          type: 'error',
          message: "This link is no longer valid. You can't change your password using this link",
        });
      }
    },

    mutationFn: resetPasswordTokenValidity,
    ...config,
  });
};
