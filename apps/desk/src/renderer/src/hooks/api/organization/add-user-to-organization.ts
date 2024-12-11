import { useTranslate } from '@renderer/hooks/useTranslate';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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

export default function useAddUserToOrganization(orgId: string, goBack: () => void) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { t } = useTranslate();
  return useMutation({
    mutationFn: (params: AddParticipant) =>
      api.post(`/organizations/${orgId}/users`, params, {
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
       toast.success(t('notifications.org.addUser.success'), {
         position: 'top-center',
          className: '!bg-green-200 custom-toast',
       });
        goBack();
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast.error(t('notifications.org.addUser.error'), {
        position: 'top-center',
        className: '!bg-red-200 custom-toast',
      });
    },
  });
}