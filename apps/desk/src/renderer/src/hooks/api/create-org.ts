import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation } from '@tanstack/react-query';

export interface CreateOrganParams {
  cnss: string;
  name: string;
  freeTrial: number;
}

export default function useCreateOrg() {
  const token = useAppSelector((state) => state.auth.auth.token);

  return useMutation({
    mutationKey: ['createOrg'],

    mutationFn: (params: CreateOrganParams) =>
      api.post('/organization/create', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      console.log('wiwiw success');
    },

    onError: () => {
      console.log('wiwiw error');
    },
  });
}
