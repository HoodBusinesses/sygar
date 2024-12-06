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
        toast.success('Success Notification !', {
          position: 'top-center',
        });
        goBack();
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast.error('Error Notification !', {
        position: 'top-center',
      });
    },
  });
}
