import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../useToast';

export interface CreateOrganParams {
  cnss: string;
  name: string;
  freeTrial: number;
}

export default function useCreateOrg() {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { toast } = useToast()

  return useMutation({
    mutationKey: ['createOrg'],

    mutationFn: (params: CreateOrganParams) =>
      api.post('/organization/create', params, {
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
        toast({title: 'success', description: 'Organization created successfully'});
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      console.log('wiwiw error');
      toast({title: 'Error', description: 'Error creating organization'});

    },
  });
}
