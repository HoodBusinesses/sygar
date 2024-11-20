import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

type Theme = {
  createdAt: number;
  updatedAt: number;
  name: string;
  cost: number;
  groups: {
    interfacePending: boolean;
  }[];
  description: string;
  organizationId: string;
  startDate: number;
  endDate: number;
  uid: string;
  PK: string;
  SK: string;
};

type Themes = {
  themes: Theme[];
  date: string;
};

export default Themes;

export const useGetAllThemes = () => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ['getAllThemes'],
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
    data: data?.data.themes as Theme[],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
