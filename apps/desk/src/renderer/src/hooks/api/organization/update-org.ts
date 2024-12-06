import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { OrganizationsData } from './get-all-organizations';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export interface UpdateOrganParams {
  orgId: string;
  data: Partial<OrganizationsData>;
}

export default function useUpdateOrg(
  orgId?:string,
  options?: UseMutationOptions<
    AxiosResponse<any, any>,
    Error,
    UpdateOrganParams
  >
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgId, data }: UpdateOrganParams) =>
      api.put(`organizations/${orgId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        queryClient.invalidateQueries({
          queryKey: [orgId ? 'organizationData' : 'organizationsData', orgId],
          exact: true,
        });
        toast.success('Success Notification !', {
          position: 'top-center',
        });
      } catch (error) {
        console.log(error);
      }
    },

    ...options,

    onError: (error) => {
      toast.error('Error Notification !', {
        position: 'top-center',
      });
    },
  });
}
