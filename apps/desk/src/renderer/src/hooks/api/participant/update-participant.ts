import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

export interface UpdateParticipantParams {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

export default function useUpdateParticipant(
  organizationId: string,
  groupId: string,
  participantId: string,
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, unknown>
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateParticipantParams) =>
      api.put(`/group-participants/${participantId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ...options,
    onSuccess: () => {
      try {
        queryClient.refetchQueries({
          queryKey: ['participantsData', organizationId, groupId],
          exact: true,
        });
        toast.success('Success Notification !', {
          position: 'top-center',
        });
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast.error('Error Notification !', {
        position: 'top-center',
      });
    },
  });
}
