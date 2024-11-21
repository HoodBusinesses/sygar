import ThemeTable from '@renderer/components/theme-table';
import withAuth from '@renderer/hoc/with-auth';
import { useGetAllThemes } from '@renderer/hooks/api/theme/get-alll-thems';

const ThemesListing: React.FC = () => {
  const { data, isSuccess, isLoading, isError } = useGetAllThemes();

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
    return <ThemeTable data={data} />;
  }

  return null;
};

export default withAuth(ThemesListing);
