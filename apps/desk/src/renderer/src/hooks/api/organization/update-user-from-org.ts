import { useToast } from '@renderer/hooks/useToast';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

type AddParticipant = {
  cnss: string;
  imageLink?: string;
  role: string;
  identity: string;
  identityType: string;
  organizationId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export interface UpdateParams {
  orgId: string;
  data: Partial<AddParticipant>;
}

export default function useUpdateUserOfOrganization(orgId: string,userId: string, goBack: () => void) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ['UpdateOrg'],

    mutationFn: ({ orgId, data }: UpdateParams) =>
      api.put(`organizations/${orgId}/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        queryClient.refetchQueries({
          queryKey: ['organizationUsers', orgId],
          exact: true,
        });
        toast({
          title: 'success',
          variant: 'success',
          description: 'user Organization updated successfully',
        });
        goBack();
      } catch (error) {
        console.log(error);
      }
    },

    onError: (error) => {
      toast({
        title: 'Error updating user organization',
        description: error.message,
        variant: 'destructive',
      });
      console.log('Error updating user organization:', error);
    },
  });
}
