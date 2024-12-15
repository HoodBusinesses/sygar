import GroupTable from '@renderer/components/group-table';
import withAuth from '@renderer/hoc/with-auth';
import { useGetAllGroups } from '@renderer/hooks/api/group/get-all';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '@renderer/hooks/useDebounce';

const GroupListing: React.FC = () => {
  const url = new URLSearchParams(window.location.search);

  const themId = url.get('themeId');

  const organizationId = url.get('organizationId');

  const [search, setSearch] = useState('');

  const { data, isLoading, isError,refetch, isFetching, isSuccess } = useGetAllGroups(
    themId || '',
    organizationId || '',
    search === '' ? undefined : search
  );

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

  if (isSuccess) {
    return (
      <GroupTable
        data={data || []}
        setSearch={setSearch}
        isReFetching={isFetching || isLoading}
        search={search}
        themeId={themId || ''}
        organizationId={organizationId || ''}
      />
    );
  }
};

export default withAuth(GroupListing);
