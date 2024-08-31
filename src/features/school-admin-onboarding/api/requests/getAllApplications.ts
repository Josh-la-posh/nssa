import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/lib/react-query';
import { GenericResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { queryKey, url } from '..';
import { TSchoolApplication } from '../../types';

interface Response extends GenericResponse {
  data: TSchoolApplication[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: number;
    hasNextPage: number;
  };
}

type FilterType = {
  search?: string;
  status?: string;
  sortBy?: string;
  page: number;
  limit?: number;
  itemCount?: number;
  pageCount?: number;
};

const getAllApplications = async (filter?: FilterType) => {
  try {
    const response = await axios.get<Response>(url.getAllSchoolAdminApplications, {
      params: { ...filter },
    });

    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

type QueryFnType = typeof getAllApplications;

type useGetAllSchoolAdminApplicationsOptions = Partial<{
  filter: FilterType;
  config: QueryConfig<QueryFnType>;
}>;

export const useGetAllSchoolAdminApplications = ({
  filter,
  config,
}: useGetAllSchoolAdminApplicationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getAllSchoolAdminApplications(filter),
    queryFn: () => getAllApplications(filter),
  });
};
