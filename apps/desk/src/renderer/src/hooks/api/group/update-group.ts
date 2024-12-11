import { useTranslate } from '@renderer/hooks/useTranslate';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface CreateParams {
  //   organizationId: string;
  // themeId: string;
  groupId: string;
  data: Partial<{
    trainerName: string;
    animatorName: string;
    address: string;
    organizationId: string;
  }>;
}

export default function useUpdateGroup(
  organizationId: string,
  themeId: string,
  goBack: () => void
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { t } = useTranslate();

  return useMutation({
    mutationFn: (params: CreateParams) =>
      api.put(`/group/${params.groupId}`, params.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        queryClient.refetchQueries({
          queryKey: ['groupsData', organizationId, themeId],
        });
        toast.success(t('notifications.group.edit.success'), {
          position: 'top-center',
          className: '!bg-green-200 custom-toast',
        });
        goBack();
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast.error(t('notifications.group.edit.error'), {
        position: 'top-center',
        className: '!bg-red-200 custom-toast',
      });
    },
  });
}
