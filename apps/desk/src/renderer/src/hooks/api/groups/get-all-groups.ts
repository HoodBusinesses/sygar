import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

type Group = {
  PK: string;
  SK: string;
  uid: string;
  themeId: string;
  theme: string;
  location: string;
  action: string;
  startDate: number;
  endDate: number;
};

type Groups = {
  groups: Group[];
  date: string;
}

export default Groups;

export const useGetAllGroups = () => {
  const token = useAppSelector((state) => state.auth.auth.token);
  console.log('token: ', token);
  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ['getAllgroups'],
    queryFn: () =>
      api.get('group/get-all', {
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
    data: data?.data.groups as Group[],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
