import { toast } from 'react-toastify';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslate } from '@renderer/hooks/useTranslate';

export interface DeleteOrganParams {
  cnss: string;
}

type DeleteRowProps = {
  rowId: string;
  invalidateKeyData?: QueryKey;
  endpoint: string;
};

export default function useDeleteRowTable({
  endpoint,
  invalidateKeyData,
}: DeleteRowProps) {
  const token = useAppSelector((state) => state.auth.auth.token);
  const queryClient = useQueryClient();
  const { t } = useTranslate();
  return useMutation({
    mutationFn: () =>
      api.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      if (invalidateKeyData) {
        try {
          queryClient.invalidateQueries({
            queryKey: invalidateKeyData,
            exact: true,
          });
        } catch (error) {
          console.log(error);
        }
      }
     toast.success(t('notifications.org.delete.success'), {
       position: 'top-center',
        className: '!bg-green-200 custom-toast',
     });
    },

    onError: () => {
      toast.error(t('notifications.org.delete.error'), {
        position: 'top-center',
        className: '!bg-red-200 custom-toast',
      });
    },
  });
}
