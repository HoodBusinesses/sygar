import { useAppSelector } from '@renderer/store/hooks';
import { api } from '@renderer/utils/api';
import { useQuery } from '@tanstack/react-query';

export type ParticipantsData = {
  id: string;
  cnss: string;
  updatedAt: Date;
  createdAt: Date;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  identityType: string;
  identity: string;
  status: string;
  groupId: string;
};

//TODO: use api Library to get the organizations data
export const useGetAllParticipants = (
  groupId: string,
  organizationId: string,
  search?: string
) => {
  const token = useAppSelector((state) => state.auth.auth.token);
  const { data, isLoading, isError, error, isFetching, isSuccess, refetch } =
    useQuery({
      queryKey: ['participantsData', organizationId, groupId],
      queryFn: () =>
        api.get(
          `group-participants?organizationId=${organizationId}&groupId=${groupId}${search ? '&search=' + search : ''}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
    });

  return {
    data: data?.data.participants as ParticipantsData[],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    isFetching,
  };
};
