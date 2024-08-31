import { useNotification } from '@/hooks';
import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { formatError, persistToken } from '@/utils/helpers';

import { UserResponse } from '../../types';
import { url } from '../url-query';

export type ConfirmEmailViaTokenDTO = {
  token: string;
};

const confirmEmail = async (token: string) => {
  try {
    const response = await axios.post<UserResponse>(url.confirmEmailWithToken, {
      token,
    });
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

type UseConfirmEmailOptions = {
  config?: MutationConfig<typeof confirmEmail>;
};

export const useConfirmEmailViaToken = ({ config }: UseConfirmEmailOptions = {}) => {
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
    onSuccess: (res) => {
      persistToken(res.data, true);

      authSuccess(res.data.user);

      notification.show({
        type: 'success',
        message: res.message,
      });
    },
    ...config,
    mutationFn: confirmEmail,
  });
};
