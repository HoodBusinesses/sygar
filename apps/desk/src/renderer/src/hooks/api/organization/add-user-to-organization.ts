import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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

export default function useAddUserToOrganization(orgId: string, goBack: () => void) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddParticipant) =>
      api.post(`/organizations/${orgId}/users`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        queryClient.refetchQueries({
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