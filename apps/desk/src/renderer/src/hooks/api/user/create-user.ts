import { toast } from 'react-toastify';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useTranslate } from '@renderer/hooks/useTranslate';

export interface UserParams {
  cnss: string;
  imageLink?: string;
  role: string;
  identity: string;
  identityType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function useCreateSygarUser(
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, UserParams>
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { t } = useTranslate();
  return useMutation({
    mutationFn: (params: UserParams) =>
      api.post(`user`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersSygarData'],
        exact: true,
      });

      toast.success(t('notifications.user.add.success'), {
        position: 'top-center',
        className: '!bg-green-200 custom-toast',
      });
    },
    
    ...options,

    onError: () => {
      toast.error(t('notifications.user.add.error'), {
        position: 'top-center',
        
        className: '!bg-red-200 custom-toast',
      });
    },
  });
}
