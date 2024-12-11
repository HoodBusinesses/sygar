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
import { useTranslate } from '@renderer/hooks/useTranslate';

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

  const { t } = useTranslate();
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
        toast.success(t('notifications.org.edit.success'), {
          position: 'top-center',
          className: '!bg-green-200 custom-toast',
        });
      } catch (error) {
        console.log(error);
      }
    },

    ...options,

    onError: (error) => {
      toast.error(t('notifications.org.edit.error'), {
        position: 'top-center',
        className: '!bg-red-200 custom-toast',
      });
    },
  });
}
