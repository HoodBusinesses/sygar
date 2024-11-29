import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../useToast';

export interface CreateParams {
  trainerName: string;
  animatorName: string;
  address: string;
  organizationId: string;
  themeId: string;
}

export default function useCreateGroup(goBack: () => void) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ['createGroup'],

    mutationFn: (params: CreateParams) =>
      api.post('/group', params, {
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
          description: 'group created successfully',
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
        description: 'Error creating group',
      });
    },
  });
}
