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
import { useTranslate } from '@renderer/hooks/useTranslate';

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

  const { t } = useTranslate();
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
       //TODO: add toast notification messages HAMZA amur
       toast.success(t('notifications.theme.edit.success'), {
         position: 'top-center',
         className : '!bg-green-200 custom-toast'
       });
      } catch (error) {
        console.log(error);
      }
    },

    ...options,

    onError: () => {
      toast.error(t('notifications.theme.edit.error'), {
        position: 'top-center',
        className : '!bg-red-200 custom-toast'

      });
    },
  });
}
