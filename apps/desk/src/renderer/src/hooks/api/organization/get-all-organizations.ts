import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

export type OrganizationsData = {
    id: string;
    uid: string;
    name: string;
    cnss: string;
    freeTrial: string;
    key: string;
    SK: string;
    PK: string;
    createdAt: string;
    updatedAt: string;
};

//TODO: use api Library to get the organizations data
export const useGetAllOrganizations = () => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ['organizationsData'],
    queryFn: () =>
      api.get('organization/get-all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  return {
    data: data?.data.organizations as OrganizationsData[],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
