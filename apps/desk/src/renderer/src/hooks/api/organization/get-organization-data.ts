import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';
import { OrganizationsData } from './get-all-organizations';

//TODO: use api Library to get the organization data
export const useOrganizationData = (organizationCnss: string | null) => {
  const token = useAppSelector((state) => state.auth.auth.token);

  const { data, isLoading, isError, error,isSuccess, refetch } = useQuery({
    queryKey: ['organizationData', organizationCnss],
    queryFn: () => api.get(`organization/get?cnss=${organizationCnss}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  return {
    data: data?.data.organization as OrganizationsData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
