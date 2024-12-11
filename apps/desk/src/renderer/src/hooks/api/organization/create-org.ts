import { useTranslate } from '@renderer/hooks/useTranslate';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type AddParticipant = {
  cnss: string;
  imageLink?: string;
  identity: string;
  identityType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export interface CreateOrganParams {
  name: string;
  cnss: string;
  imageLink?: string;
  address: string;
  ice: string;
  owner: AddParticipant;
}

export default function useCreateOrg(resetForm: () => void) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const queryClient = useQueryClient();

  const { t } = useTranslate();
  return useMutation({
    mutationFn: (params: CreateOrganParams) =>
      api.post('/organizations', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      try {
        resetForm();
        toast.success(t('notifications.org.add.success'), {
          position: 'top-center',
          className: '!bg-green-200 custom-toast',
        });
        queryClient.refetchQueries({
          queryKey: ['organizationsData'],
          exact: true,
        });
      } catch (error) {
        console.log(error);
      }
    },

    onError: () => {
      toast.error(t('notifications.org.add.error'), {
        position: 'top-center',
        className: '!bg-red-200 custom-toast',
      });
    },
  });
}
