import withAuth from '@renderer/hoc/with-auth';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { CustomTable } from '@renderer/components/custom-table';
import { themeColumns } from '@renderer/components/formations/themes-columns';
import { useNavigate } from '@tanstack/react-router';
import { Theme, useThemes } from '@renderer/hooks/Themes/useThems';

const ThemesListing: React.FC = () => {
  const { isRtl } = useTranslate();
  const navigate = useNavigate();

  const { data: themes, isLoading } = useThemes();

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      {isLoading ? (
        <p>Loading themes...</p>
      ) : (
        <CustomTable
          headTitle="formation.formation"
          columns={themeColumns(() => {
            console.log('Navigating to /themes-listing/group-themes');
            navigate({ to: '/group-listing' as string });
          })}
          data={themes as Theme[]}
        />
      )}
    </div>
  );
};

export default withAuth(ThemesListing);
