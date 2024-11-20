import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { OrganizationsData } from './get-all-organizations';
import { AxiosResponse } from 'axios';

export interface UpdateOrganParams {
  cnss: string;
  data: Partial<OrganizationsData>;
}

export default function useUpdateOrg(
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, unknown>
) {
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

    ...options,

    onError: () => {
      console.log('wiwiw error');
    },
  });
}
