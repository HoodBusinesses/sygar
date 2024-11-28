import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';
import { OrganizationsData } from './get-all-organizations';

//TODO: use api Library to get the organization data
export const useOrganizationData = (orgId:string) => {
  const token = useAppSelector((state) => state.auth.auth.token);

  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ['organizationData', orgId],
    queryFn: () =>
      api.get(`organizations/${orgId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return {
    data: data?.data as OrganizationsData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
