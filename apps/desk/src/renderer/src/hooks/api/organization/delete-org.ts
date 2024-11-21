import { useToast } from '@renderer/hooks/useToast';
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
  const { toast } = useToast();

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

      toast({
        title: 'success',
        description: 'item deleted successfully',
      });
    },

    onError: () => {
      toast({ title: 'Error', description: 'Error deleting item'
    }); 
    },  
  });
}