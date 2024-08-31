import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/lib/react-query';
import { ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { queryKey, url } from '..';

const getApplicationsStat = async () => {
  try {
    const response = await axios.get<
      ApiResponse<{
        totalApplications: number;
        approvedApplications: number;
        rejectedApplications: number;
        pendingApplications: number;
        inReviewApplications: number;
        blockedApplications: number;
      }>
    >(url.getApplicationsStat);
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

type QueryFnType = typeof getApplicationsStat;

type useGetApplicationsStatOptions = QueryConfig<QueryFnType>;

export const useGetSchoolAdminApplicationsStat = (config?: useGetApplicationsStatOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getApplicationStat(),
    queryFn: getApplicationsStat,
  });
};
