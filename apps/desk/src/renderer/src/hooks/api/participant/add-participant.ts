import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

export interface CreateParticipantParams {
  firstName: string;
  lastName: string;
  phone: string;
  identity: string;
  identityType: string;
  role: string;
  groupId: string;
  email: string;
  cnss: string;
}

export default function useCreateParticipant(
  organizationId: string,
  groupId: string,
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, unknown>
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateParticipantParams) =>
      api.post('/group-participants', params, {
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
