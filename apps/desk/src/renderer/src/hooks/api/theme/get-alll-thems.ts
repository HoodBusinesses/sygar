import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

export type ThemesData = {
  id: string;
  name: string;
  price: string;
  year: number;
  organizationId: string | null;
  createdAt: string;
  updatedAt: string;
};

export const useGetAllThemes = (organizationId: string, search?: string) => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, error,isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['themesData', organizationId],
    queryFn: () =>
      api.get(
        `/themes?organizationId=${organizationId}${search ? '&search=' + search : ''}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
  });

  return {
    data: data?.data.themes as ThemesData[],
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
    refetch,
  };
};
