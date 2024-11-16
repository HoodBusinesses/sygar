import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface DeleteOrganParams {
  cnss: string;
}

type DeleteRowProps = {
  rowId: string;
  invalidateKeyData?: string;
  endpoint: string;
};

export default function useDeleteRowTable({
  rowId,
  endpoint,
  invalidateKeyData,
}: DeleteRowProps) {
  const token = useAppSelector((state) => state.auth.auth.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['DeleteRow', rowId],

    mutationFn: () =>
      api.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      if (invalidateKeyData) {
        try {
            queryClient.invalidateQueries(
              {
                queryKey: [invalidateKeyData],
                exact: true,
                refetchType: 'active',
              },
            );
        } catch (error) {
            console.log(error);
        }
      }
    },

    onError: () => {
      console.log('wiwiw error');
    },
  });
}
