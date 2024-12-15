import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';
import { User } from '../user/me';
import { Users } from '@renderer/components/formations/users-columns';

type OrgUsersType = {
  page: number;
  totalAmount: number;
  totalPage: number;
  users: User[];
};

//TODO: use api Library to get the organization data
export const useOrganizationUsers = (orgId: string, search?: string) => {
  const token = useAppSelector((state) => state.auth.auth.token);

  const { data, isLoading, isError, error, isSuccess,isFetching, refetch } = useQuery({
    queryKey: ['organizationUsers', orgId],
    queryFn: () =>
      api.get(`organizations/${orgId}/users${search ? '?search=' + search : ''}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return {
    data: data?.data?.users as Users[],
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess,
    refetch,
  };
};
