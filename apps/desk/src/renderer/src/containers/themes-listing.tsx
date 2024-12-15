import ThemeTable from '@renderer/components/theme-table';
import withAuth from '@renderer/hoc/with-auth';
import { useGetAllThemes } from '@renderer/hooks/api/theme/get-alll-thems';
import { useAppSelector } from '@renderer/store/hooks';
import { useEffect, useState } from 'react';
import { useDebounce } from '@renderer/hooks/useDebounce';

const ThemesListing: React.FC = () => {
  const url = new URLSearchParams(window.location.search);

  const orgId = url.get('orgId');

  const organizationId =
    orgId || useAppSelector((state) => state.auth.auth.organizationId);

  const [search, setSearch] = useState('');

  const { data, isSuccess, isLoading, isFetching, isError, refetch } =
    useGetAllThemes(organizationId, search === '' ? undefined : search);

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
    <ThemeTable
      orgId={organizationId}
      isReFetching={isFetching || isLoading}
      data={data || []}
      setSearch={setSearch}
      search={search}
    />
  );
};

export default withAuth(ThemesListing);
