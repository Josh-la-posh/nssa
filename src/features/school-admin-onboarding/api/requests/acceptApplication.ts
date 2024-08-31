import { useNotification } from '@/hooks';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '..';

type Payload = {
  comment: string;
  applicationId: string;
};

export const acceptApplication = async (data: Payload) => {
  try {
    const response = await axios.post<ApiResponse<{ success: boolean; message: string }>>(
      url.acceptApplication(data.applicationId),
      { comment: data.comment }
    );
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type UseAcceptApplicationOptions = {
  config?: MutationConfig<typeof acceptApplication>;
};

export const useAcceptSchoolAdminApplication = ({ config }: UseAcceptApplicationOptions = {}) => {
  const notification = useNotification();
  return useMutation({
    mutationFn: acceptApplication,
    ...config,
    onSuccess: (data) => {
      notification.show({ type: 'success', message: data.message });
    },
  });
};
