import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/lib/react-query';
import { ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { CountryState } from '../../types';
import { queryKey, url } from '../url-query';

const getCountryStates = async (countryId?: string) => {
  if (!countryId) {
    return null;
  }
  try {
    const response = await axios.get<ApiResponse<CountryState[]>>(url.getCountryStates(countryId));
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

type QueryFnType = typeof getCountryStates;

type useUserOptions = QueryConfig<QueryFnType>;

export const useCountryStates = (countryId?: string, config?: useUserOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getCountryStates(countryId),
    queryFn: () => getCountryStates(countryId),
  });
};
