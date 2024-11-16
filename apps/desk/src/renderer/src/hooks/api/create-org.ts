import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CreateOrganParams {
  cnss: string;
  name: string;
  freeTrial: number;
}

export default function useCreateOrg() {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

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
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      console.log('wiwiw error');
    },
  });
}
