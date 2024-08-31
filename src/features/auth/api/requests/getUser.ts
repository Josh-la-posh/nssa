import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/lib/react-query';
import { ApiResponse } from '@/types/api';
import { formatError, getToken } from '@/utils/helpers';

import { AuthUser } from '../../types';
import { queryKey, url } from '../url-query';

export const getCurrentUser = async () => {
  if (getToken().token) {
    try {
      const response = await axios.get<ApiResponse<AuthUser>>(url.getUser);
      return response.data;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  return null;
};

type QueryFnType = typeof getCurrentUser;

type useUserOptions = QueryConfig<QueryFnType>;

export const useCurrentUser = (config?: useUserOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    ...config,
    queryKey: queryKey.getUser(),
    queryFn: getCurrentUser,
  });
};
