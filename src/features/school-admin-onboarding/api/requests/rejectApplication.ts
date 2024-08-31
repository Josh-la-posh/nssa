import { useNotification } from '@/hooks';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { APIError, ApiResponse } from '@/types/api';
import { formatError } from '@/utils/helpers';

import { url } from '..';

type Payload = {
  comment: string;
  blockUser: boolean;
  applicationId: string;
};

export const rejectApplication = async (data: Payload) => {
  try {
    const response = await axios.post<ApiResponse<{ success: boolean; message: string }>>(
      url.rejectApplication(data.applicationId),
      { comment: data.comment, blockUser: data.blockUser }
    );
    return response.data;
  } catch (err) {
    const errors = err as APIError;
    throw new Error(formatError(errors));
  }
};

type UseRejectApplicationOptions = {
  config?: MutationConfig<typeof rejectApplication>;
};

export const useRejectSchoolAdminApplication = ({ config }: UseRejectApplicationOptions = {}) => {
  const notification = useNotification();
  return useMutation({
    mutationFn: rejectApplication,
    ...config,
    onSuccess: (data) => {
      notification.show({ type: 'success', message: data.message });
    },
  });
};
