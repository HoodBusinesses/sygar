import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { OrganizationsData } from './get-all-organizations';
import { AxiosResponse } from 'axios';

export interface UpdateOrganParams {
  orgId: string;
  data: Partial<OrganizationsData>;
}

export default function useUpdateOrg(
  options?: UseMutationOptions<
    AxiosResponse<any, any>,
    Error,
    UpdateOrganParams
  >
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['UpdateOrg'],

    mutationFn: ({ orgId, data }: UpdateOrganParams) =>
      api.put(`organizations/${orgId}`, data, {
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

    ...options,

    onError: (error) => {
      console.log('Error updating organization:', error);
    },
  });
}
