import { toast } from 'react-toastify';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AddParticipant = {
  cnss: string;
  imageLink?: string;
  role: string;
  identity: string;
  identityType: string;
  organizationId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export interface UpdateParams {
  orgId: string;
  data: Partial<AddParticipant>;
}

export default function useUpdateUserOfOrganization(
  orgId: string,
  userId: string,
  goBack: () => void
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgId, data }: UpdateParams) =>
      api.put(`organizations/${orgId}/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        queryClient.invalidateQueries({
          queryKey: ['organizationUsers', orgId],
          exact: true,
        });
        toast.success('Success Notification !', {
          position: 'top-center',
        });
        goBack();
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
