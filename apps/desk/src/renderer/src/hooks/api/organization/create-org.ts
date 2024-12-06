import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type AddParticipant = {
  cnss: string;
  imageLink?: string;
  identity: string;
  identityType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export interface CreateOrganParams {
  name: string;
  cnss: string;
  imageLink?: string;
  address: string;
  ice: string;
  owner: AddParticipant;
}

export default function useCreateOrg(resetForm: () => void) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateOrganParams) =>
      api.post('/organizations', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        resetForm();
        toast.success('Success Notification !', {
          position: 'top-center',
        });
        queryClient.refetchQueries({
          queryKey: ['organizationsData'],
          exact: true,
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
