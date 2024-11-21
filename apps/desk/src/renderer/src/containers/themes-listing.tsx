import { CustomTable } from "@renderer/components/custom-table";
import { themeColumns } from "@renderer/components/formations/themes-columns";
import withAuth from "@renderer/hoc/with-auth";
import { useGetAllThemes } from "@renderer/hooks/api/themes/get-all-theme";
import { useTranslate } from "@renderer/hooks/useTranslate";
import { useNavigate } from "@tanstack/react-router";

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
    return <div className="text-red-500 p-4">Error loading theme data</div>;
  }

  const formattedData = isSuccess
    ? data.map((theme) => ({
        id: theme.uid,
        name: theme.name,
        year: new Date(Number(theme.startDate)).getFullYear().toString(),
        price: theme.cost,
        description: theme.description,
        interfacePending: theme.groups[0]?.interfacePending ? 'Yes' : 'No',
      }))
    : [];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        headTitle="formation.formation"
        columns={themeColumns(() =>
          navigate({ to: '/group-listing' as string })
        )}
        data={formattedData}
      />
    </div>
  );
};

export default withAuth(ThemesListing);
