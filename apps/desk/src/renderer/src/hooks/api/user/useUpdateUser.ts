import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { User } from './me';
import { setUserData } from '@renderer/store/slices/auth.slice';

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
  const user = useAppSelector((state) => state.auth.auth);

  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ userId, data }: UpdateUserParams) =>
      api.put(`user/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),

    onSuccess: (res) => {
      const data: User = res.data;
      data.type === 'SOLUTION_OWNER'
        ? queryClient.invalidateQueries({
            queryKey: ['usersSygarData'],
            exact: true,
          })
        : dispatch(
            setUserData({
              firstName: data.firstName,
              lastName: data.lastName,
              // email: data.email,
              // phone: data.phone,
            })
          );
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
