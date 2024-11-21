import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

export type ThemesData = {
  createdAt: number;
  updatedAt: number;
  name: string;
  cost: number;
  groups: [
    {
      interfacePending: true;
    },
  ];
  description: string;
  organizationId: string;
  startDate: number;
  endDate: number;
  uid: string;
  PK: string;
  SK: string;
};

//TODO: use api Library to get the organizations data
export const useGetAllThemes = () => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ['themesData'],
    queryFn: () =>
      api.get('theme/get-all', {
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
    data: data?.data.themes as ThemesData[],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
