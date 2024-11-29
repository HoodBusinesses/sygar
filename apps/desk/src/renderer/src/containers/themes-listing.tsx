import ThemeTable from '@renderer/components/theme-table';
import withAuth from '@renderer/hoc/with-auth';
import { useGetAllThemes } from '@renderer/hooks/api/theme/get-alll-thems';
import { useAppSelector } from '@renderer/store/hooks';

const ThemesListing: React.FC = () => {
  const url = new URLSearchParams(window.location.search);

  const orgId = url.get('orgId');
  const organizationId =
    orgId || useAppSelector((state) => state.auth.auth.organizationId);

  const { data, isSuccess, isLoading, isError } =
    useGetAllThemes(organizationId);

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
    return <ThemeTable orgId={organizationId} data={data} />;
  }

  return null;
};

export default withAuth(ThemesListing);
