import { useToast } from '@renderer/hooks/useToast';
import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface UpdateUserParams {
  userId: string;
  data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>;
}

export default function useUpdateUser(
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, UpdateUserParams>
) {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { toast } = useToast();

  return useMutation({
    mutationKey: ['UpdateUser'],

    mutationFn: ({ userId, data }: UpdateUserParams) =>
      api.put(`user/${userId}`, data, {
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
        description: 'Error while changing data',
      });
    },
  });
}
