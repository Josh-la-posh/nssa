import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/lib/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { queryKey, url } from '..';
import { TSchoolApplication } from '../../types';

export const getApplication = async (applicationId: string) => {
  try {
    const response = await axios.get<ApiResponse<TSchoolApplication>>(
      url.getApplication(applicationId)
    );
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type QueryFnType = typeof getApplication;

type useGetApplicationOptions = {
  config?: QueryConfig<QueryFnType>;
  applicationId: string;
};

export const useGetApplication = ({ config, applicationId }: useGetApplicationOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getApplication(applicationId),
    queryFn: () => getApplication(applicationId),
  });
};
