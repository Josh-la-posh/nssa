import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType } from '@/lib/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url, queryKey } from '../url-query';

export const resendVerificationEmail = async () => {
  try {
    const response = await axios.post<ApiResponse<{ data: { success: boolean } }>>(
      url.resendVerificationEmail,
      { callbackURL: window.location.origin }
    );
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type QueryFnType = typeof resendVerificationEmail;

type useResendVerificationEmailOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useResendVerificationEmail = ({ config }: useResendVerificationEmailOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    // onError: (err: any) => {
    //   notification.show({
    //     type: 'error',
    //     message: err.message,
    //   });
    // },
    // onSuccess: (res) => {
    //   notification.show({
    //     type: 'success',
    //     message: res.message,
    //   });
    // },
    ...config,
    queryKey: queryKey.resendVerificationEmail(),
    queryFn: resendVerificationEmail,
  });
};
