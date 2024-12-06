import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

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

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: UpdateUserParams) =>
      api.put(`user/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersSygarData'],
        exact: true,
      });
      toast.success('Success Notification !', {
        position: 'top-center',
      });
    },
    ...options,

    onError: () => {
      toast.error('Error Notification !', {
        position: 'top-center',
      });
    },
  });
}
