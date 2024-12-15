import ParticipantsTable from '@renderer/components/participants-table';
import withAuth from '@renderer/hoc/with-auth';
import { useGetAllParticipants } from '@renderer/hooks/api/participant/get-all-participants';
import { useDebounce } from '@renderer/hooks/useDebounce';
import { useEffect, useState } from 'react';

const ParticipantsListing: React.FC = () => {
  const url = new URLSearchParams(window.location.search);

  const groupId = url.get('groupId');

  const organizationId = url.get('organizationId');

  const [search, setSearch] = useState('');

  const { data, isLoading, isSuccess, isFetching, isError, refetch } =
    useGetAllParticipants(groupId || '', organizationId || '', search);

  const debouncedSearch = useDebounce(search, 800);

  useEffect(() => {
    if (search !== '' || isSuccess) {
      refetch();
    }
  }, [debouncedSearch, refetch]);

  if (isError) {
    return (
      <div className="text-red-500 p-4">Error loading organization data</div>
    );
  }

  return (
    <ParticipantsTable
      groupId={groupId || ''}
      data={data || []}
      orgId={organizationId || ''}
      setSearch={setSearch}
      isReFetching={isFetching || isLoading}
      search={search}
    />
  );
};

export default withAuth(ParticipantsListing);
