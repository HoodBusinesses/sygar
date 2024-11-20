import { useAppSelector } from "@renderer/store/hooks";
import { api } from "@renderer/utils/api";
import { useQuery } from "@tanstack/react-query";

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
  createdAt: number;
  updatedAt: number;
};

type Participants = {
    participants: Participant[];
    date: string;
}

export default Participants;

export const useGetAllParticpants = () => {
    const token = useAppSelector((state) => state.auth.auth.token);
    const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
      queryKey: ['getAllParticipants'],
      queryFn: () =>
        api.get('participant/get-all', {
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
      data: data?.data.participants as Participant[],
      isLoading,
      isError,
      error,
      isSuccess,
      refetch,
    };
  };
