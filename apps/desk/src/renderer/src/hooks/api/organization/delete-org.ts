import { toast } from 'react-toastify';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

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
     toast.success('Success Notification !', {
       position: 'top-center',
     });
    },

    onError: () => {
      toast.error('Error Notification !', {
        position: 'top-center',
      });
    },
  });
}
