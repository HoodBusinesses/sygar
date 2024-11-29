import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../useToast';

export interface CreateParams {
  //   organizationId: string;
  //   themeId: string;
  groupId: string;
  data: Partial<{
    trainerName: string;
    animatorName: string;
    address: string;
    organizationId: string;
  }>
}

export default function useUpdateGroup(goBack: () => void) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ['UpdateGroup'],

    mutationFn: (params: CreateParams) =>
      api.put(`/group/${params.groupId}`, params.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        queryClient.refetchQueries({
          queryKey: ['groupsData'],
          exact: true,
        });
        toast({
          title: 'success',
          variant: 'success',
          description: 'group updated successfully',
        });
        goBack();
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Error updating group',
      });
    },
  });
}
