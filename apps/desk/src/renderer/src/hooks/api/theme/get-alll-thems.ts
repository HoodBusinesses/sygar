import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

export type ThemesData = {
  id: string;
  name: string;
  price: string;
  year: number;
  organizationId: string | null;  
};

//TODO: use api Library to get the organizations data
export const useGetAllThemes = (organizationId: string) => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ['themesData', organizationId],
    queryFn: () =>
      api.get(`/themes?organizationId=${organizationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return {
    data: data?.data.themes as ThemesData[],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
