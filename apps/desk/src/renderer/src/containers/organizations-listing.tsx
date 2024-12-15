import OrgTable from '@renderer/components/org-table';
import withAuth from '@renderer/hoc/with-auth';
import { useGetAllOrganizations } from '@renderer/hooks/api/organization/get-all-organizations';
import { useDebounce } from '@renderer/hooks/useDebounce';
import { useEffect, useState } from 'react';

const OrganizationsPage: React.FC = (): JSX.Element => {
  const [search, setSearch] = useState('');

  const { data, isSuccess, isLoading, isFetching, isError, refetch } =
    useGetAllOrganizations(search === '' ? undefined : search);
  
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
    <OrgTable
      data={data || []}
      setSearch={setSearch}
      isReFetching={isFetching || isLoading}
      search={search}
    />
  );
};

export default withAuth(OrganizationsPage);
