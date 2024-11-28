import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

export type User = {
    id: string;
    email: string;
    phone: string;
    cnss: number;
    firstName: string;
    lastName: string;
    passwordChangedAt: string;
    resetToken: string | null;
    resetTokenExpiresAt: string | null;
    role: string;
    type: string;
    identityType: string;
    identity: string;
    isActive: boolean;
    organizationId: string;
    updatedAt: string;
    createdAt: string;
};

//TODO: use api Library to get the organization data
export const useGetMe = () => {
  const token = useAppSelector((state) => state.auth.auth.token);

  const { data, isLoading, isError, error, status, isSuccess, refetch } = useQuery({
    queryKey: ['fetch-user-data', token],
    queryFn: () =>
      api.get(`auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return {
    data: data?.data as User,
    isLoading,
    isError,
    error,
    status,
    isSuccess,
    refetch,
  };
};
