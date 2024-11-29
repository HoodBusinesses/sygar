import GroupTable from '@renderer/components/group-table';
import withAuth from '@renderer/hoc/with-auth';
import { useGetAllGroups } from '@renderer/hooks/api/group/get-all';
import React from 'react';

const GroupListing: React.FC = () => {
  const url = new URLSearchParams(window.location.search);
  const themId = url.get('themeId');
  const organizationId = url.get('organizationId');

  const { data, isLoading, isError, isSuccess } = useGetAllGroups(
    themId || '',
    organizationId || ''
  );


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">Error loading organization data</div>
    );
  }

  if (isSuccess) {
    return (
     <GroupTable data={data} themeId={themId || ''} organizationId={organizationId || ''} />
    );
  }
};

export default withAuth(GroupListing);
