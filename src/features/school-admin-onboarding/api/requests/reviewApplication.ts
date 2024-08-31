import { useNotification } from '@/hooks';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '..';

export const reviewApplication = async (applicationId: string) => {
  try {
    const response = await axios.post<ApiResponse<{ success: boolean; message: string }>>(
      url.reviewApplication(applicationId)
    );
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type UseReviewApplicationOptions = {
  config?: MutationConfig<typeof reviewApplication>;
};

export const useReviewApplication = ({ config }: UseReviewApplicationOptions = {}) => {
  const notification = useNotification();
  return useMutation({
    mutationFn: reviewApplication,
    ...config,
    onSuccess: (data) => {
      notification.show({ type: 'success', message: data.message });
    },
  });
};
