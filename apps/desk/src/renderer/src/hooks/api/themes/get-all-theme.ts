import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

type Group = {
  interfacePending: boolean;
};

type Theme = {
  createdAt: number;
  updatedAt: number;
  name: string;
  cost: string;
  groups: Group[];
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
    queryFn: async () => {
      const response = await api.get('theme/get-all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Parse groups from the response data
      return response.data.themes.map((theme: any) => ({
        ...theme,
        groups: theme.groups.map((group: any) => ({
          interfacePending: group.M.interfacePending.BOOL,
        })),
      }));
    },
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
