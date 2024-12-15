import UsersTable from '@renderer/components/UsersTable';
import withAuth from '@renderer/hoc/with-auth';
import { useOrganizationUsers } from '@renderer/hooks/api/organization/get-organization-users';
import { useGetAllSygarUsers } from '@renderer/hooks/api/user/get-all-users';
import { useDebounce } from '@renderer/hooks/useDebounce';
import { useAppSelector } from '@renderer/store/hooks';
import { useEffect, useState } from 'react';

const UsersListing = () => {
  const url = new URLSearchParams(window.location.search);

  const orgId1 = url.get('orgId');

  const user = useAppSelector((state) => state.auth.auth);

  const [search, setSearch] = useState('');

  const { data, isLoading, isFetching, refetch, isError, isSuccess } =
    user.userType === 'SOLUTION_OWNER'
      ? useGetAllSygarUsers(search === '' ? undefined : search)
      : useOrganizationUsers(
          orgId1 || user.organizationId,
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

  return<UsersTable
    orgId={orgId1 || user.organizationId}
    isReFetching={isFetching || isLoading}
    setSearch={setSearch}
    search={search}
    data={
      data || []
    }
  />;
};

export default withAuth(UsersListing);
