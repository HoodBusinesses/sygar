import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

export type groupsData = {
  id: string;
  trainerName: string;
  animatorName: string;
  address: string;
  organizationId: string;
  themeId: string;
};

//TODO: use api Library to get the organizations data
export const useGetAllGroups = (themeId: string, organizationId: string, search?: string) => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, error,isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['groupsData', organizationId, themeId], //TODO: add themeId and organizationId
    queryFn: () =>
      api.get(
        `group?organizationId=${organizationId}&themeId=${themeId}${search ? '&search=' + search : ''}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
  });

  return {
    data: data?.data.groups as groupsData[],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    isFetching,
  };
};
