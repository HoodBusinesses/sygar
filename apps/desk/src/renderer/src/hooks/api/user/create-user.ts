import { useToast } from '@renderer/hooks/useToast';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface UserParams {
  cnss: string;
  imageLink?: string;
  role: string;
  identity: string;
  identityType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function useCreateSygarUser(
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, UserParams>
) {
  const token = useAppSelector((state) => state.auth.auth.token);

  const { toast } = useToast();

  return useMutation({
    mutationKey: ['UpdateUser'],

    mutationFn: (params: UserParams) =>
      api.post(`user`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      toast({
        title: 'success',
        description: 'user chenges successfully',
      });
    },
    ...options,

    onError: () => {
      toast({
        title: 'error',
        variant: 'destructive',
        description: 'Error while changing data',
      });
    },
  });
}
