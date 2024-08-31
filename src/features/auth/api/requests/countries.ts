import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/lib/react-query';
import { ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { Country } from '../../types';
import { queryKey, url } from '../url-query';

export const getCountries = async () => {
  try {
    const response = await axios.get<ApiResponse<Country[]>>(url.getCountries);
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

type QueryFnType = typeof getCountries;

type useUserOptions = QueryConfig<QueryFnType>;

export const useCountries = (config?: useUserOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getCountries(),
    queryFn: getCountries,
  });
};
