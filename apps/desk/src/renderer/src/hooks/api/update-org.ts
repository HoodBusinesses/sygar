import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrganizationsData } from './get-all-organizations';

export interface UpdateOrganParams {
  cnss: string;
  data: Partial<OrganizationsData>;
}

export default function useUpdateOrg() {
  const token = useAppSelector((state) => state.auth.auth.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['UpdateOrg'],

    mutationFn: (params: UpdateOrganParams) =>
      api.put(`organization/update`, params.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { cnss: params.cnss },
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
