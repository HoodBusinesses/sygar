import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

export const useGetAllGroups = () => {
  const token = useAppSelector((state) => state.auth.auth.token);
  console.log('token: ', token);
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
};
