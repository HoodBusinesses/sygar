import withAuth from '@renderer/hoc/with-auth';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { CustomTable } from '@renderer/components/custom-table';
import { themeColumns } from '@renderer/components/formations/themes-columns';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllThemes } from '@renderer/hooks/api/themes/get-all-theme';

const ThemesListing: React.FC = () => {
  const { isRtl } = useTranslate();
  const navigate = useNavigate();
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
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
        <CustomTable
          headTitle="formation.formation"
          columns={themeColumns(() =>
            navigate({ to: '/group-listing' as string })
          )}
          data={data.map((theme) => ({
            id: theme.uid,
            name: theme.name,
            year: theme.startDate.toString(),
            price: theme.cost.toString(),
          }))}
        />
      </div>
    );
  }
};

export default withAuth(ThemesListing);
