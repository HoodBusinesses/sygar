import { api } from '@renderer/utils/api'
import { useMutation } from '@tanstack/react-query'


export interface CreateOrganParams {
  cnss: string;
  name: string;
  freeTrial: number;
}

export default function useCreateOrg() {
  return useMutation({
    mutationKey: ['createOrg'],
    mutationFn: (params: CreateOrganParams) =>
      api.post('/organization/create', params),

    onSuccess: () => {
        console.log('wiwiw success')
    },

    onError: () => {
        console.log('ikhan error')
    },
  });
}
