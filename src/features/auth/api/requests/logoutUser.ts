import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';

export type LogoutDTO = {
  token: string;
};

export const logoutUser = async () => {
  try {
    const response = await axios.post<ApiResponse<{ data: any }>>(url.logout);
    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type UseLogoutOptions = {
  config?: MutationConfig<typeof logoutUser>;
};

export const useLogout = ({ config }: UseLogoutOptions = {}) => {
  return useMutation({
    retry: 0,
    mutationFn: logoutUser,
    ...config,
  });
};
