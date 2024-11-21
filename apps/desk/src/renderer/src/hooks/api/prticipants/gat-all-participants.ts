import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

type Participant = {
  PK: string;
  SK: string;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  cnss: string;
  status: string;
  organizationId: string;
};

type Participants = {
  participants: {
    items: Participant[];
    total: number;
    page: number;
    limit: number;
  };
  date: string;
};

export default Participants;

export const useGetAllParticpants = () => {
  const token = useAppSelector((state) => state.auth.auth.token);

  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ['getAllParticipants'],
    queryFn: async () =>
      api
        .get('participant/get-all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data as Participants),
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  return {
    data: data?.participants.items ?? [],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
