import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useTranslate } from '@renderer/hooks/useTranslate';

export interface CreateThemeParams {
  price: string;
  name: string;
  year: string;
  organizationId: string;
}

export default function useCreateTheme(
  organizationId: string,
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, unknown>
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();


  const { t } = useTranslate();
  return useMutation({
    mutationFn: (params: CreateThemeParams) =>
      api.post('/themes', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ...options,
    onSuccess: () => {
      try {
        queryClient.refetchQueries({
          queryKey: ['themesData', organizationId],
          exact: true,
        });
        toast.success(t('notifications.theme.add.success'), {
          position: 'top-center',
          className : '!bg-green-200 custom-toast'
        });
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast.error(t('notifications.theme.add.error'), {
        position: 'top-center',
        className : '!bg-red-200 custom-toast'
      });
    },
  });
}
