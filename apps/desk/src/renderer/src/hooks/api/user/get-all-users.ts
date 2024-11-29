import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';
import { User } from './me';

type UsersType = {
  page: number;
  totalAmount: number;
  totalPage: number;
  users: User[];
};

//TODO: use api Library to get the organizations data
export const useGetAllSygarUsers = () => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ['usersSygarData'],
    queryFn: () =>
      api.get('user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return {
    data: data?.data as UsersType,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
