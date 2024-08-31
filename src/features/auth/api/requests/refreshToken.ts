import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { formatError, persistToken } from '@/utils/helpers';
import storage from '@/utils/storage';

import { RefreshTokenResponse } from '../../types';
import { url } from '../url-query';

export type RefreshTokenDTO = {
  token: string;
};

export const refreshToken = async () => {
  const sessionToken = storage.session.getValue('refresh-token');
  const localToken = storage.getValue('refresh-token');
  try {
    if (!(sessionToken || localToken)) {
      throw new Error('Refresh token not found');
    }
    const response = await axios.post<RefreshTokenResponse>(url.refreshToken, {
      token: sessionToken || localToken,
    });
    persistToken(response.data.data, !sessionToken);
    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type UseRefreshTokenOptions = {
  config?: MutationConfig<typeof refreshToken>;
};

export const useRefreshToken = ({ config }: UseRefreshTokenOptions = {}) => {
  const {
    actions: { logout },
  } = useAuth();

  return useMutation({
    onError: () => {
      logout(undefined, undefined);
    },
    onSuccess: (data) => {
      axios.defaults.headers.common['Authorization'] = `${data.data.accessToken}`;
    },
    retry: 0,
    mutationFn: refreshToken,
    ...config,
  });
};
