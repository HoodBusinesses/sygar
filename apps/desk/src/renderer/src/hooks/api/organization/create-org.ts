import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../useToast';

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

export default function useCreateOrg() {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ['createOrg'],

    mutationFn: (params: CreateOrganParams) =>
      api.post('/organizations', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        queryClient.refetchQueries({
          queryKey: ['organizationsData'],
          exact: true,
        });
        toast({
          title: 'success',
          variant: 'success',
          description: 'Organization created successfully',
        });
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Error creating organization',
      });
    },
  });
}
