import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';
import { User } from './me';
import { Users } from '@renderer/components/formations/users-columns';

type UsersType = {
  page: number;
  totalAmount: number;
  totalPage: number;
  users: User[];
};

//TODO: use api Library to get the organizations data
export const useGetAllSygarUsers = (search?: string) => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, isFetching, error, isSuccess, refetch } =
    useQuery({
      queryKey: ['usersSygarData'],
      queryFn: () =>
        api.get(`user${search ? '?search=' + search : ''}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
    });

  return {
    data: data?.data.users as Users[],
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
    refetch,
  };
};
