import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useTranslate } from '@renderer/hooks/useTranslate';

export interface CreateParams {
  trainerName: string;
  animatorName: string;
  address: string;
  organizationId: string;
  themeId: string;
}

export default function useCreateGroup(
  organizationId: string,
  themeId: string,
  goBack: () => void
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { t } = useTranslate();

  return useMutation({
    mutationFn: (params: CreateParams) =>
      api.post('/group', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        queryClient.refetchQueries({
          queryKey: ['groupsData', organizationId, themeId],
          exact: true,
        });
        toast.success(t('notifications.group.add.success'), {
          position: 'top-center',
          className : '!bg-green-200 custom-toast'

        });
        goBack();
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast.error(t('notifications.group.add.error'), {
        position: 'top-center',
        className : '!bg-red-200 custom-toast'

      });
    },
  });
}
