import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CreateThemeParams } from './create-theme';
import { toast } from 'react-toastify';

export interface UpdateThemeParams {
  uid: string;
  data: Partial<CreateThemeParams>;
}

export default function useUpdateTheme(
  organizationId: string,
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, unknown>
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateThemeParams) =>
      api.put(`themes/${params.uid}`, params.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      try {
         queryClient.invalidateQueries({
          queryKey: ['themesData', organizationId],
        });
       toast.success('Success Notification !', {
         position: 'top-center',
       });
      } catch (error) {
        console.log(error);
      }
    },

    ...options,

    onError: () => {
      toast.error('Error Notification !', {
        position: 'top-center',
      });
    },
  });
}
