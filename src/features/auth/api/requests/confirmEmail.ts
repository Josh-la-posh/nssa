import { useNotification } from '@/hooks';
import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { GenericResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';

export type ConfirmEmailDTO = {
  code: string;
};

export const confirmEmail = async (code: string) => {
  try {
    const response = await axios.post<GenericResponse>(url.confirmEmail, { code });
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

type UseConfirmEmailOptions = {
  config?: MutationConfig<typeof confirmEmail>;
};

export const useConfirmEmail = ({ config }: UseConfirmEmailOptions = {}) => {
  const notification = useNotification();

  const {
    actions: { updateAuthUser },
  } = useAuth();

  return useMutation({
    onError: (err) => {
      notification.show({
        type: 'error',
        message: err.message,
      });
    },
    onSuccess: (res) => {
      updateAuthUser({ emailConfirm: true });

      notification.show({
        type: 'success',
        message: res.message,
      });
    },
    ...config,
    mutationFn: confirmEmail,
  });
};
