import withAuth from '@renderer/hoc/with-auth';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { Components, CustomTable } from '@renderer/components/custom-table';
import { Theme, themeColumns } from '@renderer/components/formations/themes-columns';
import { mockThemes } from '@renderer/utils/static/organizations';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import EditFormation from '@renderer/components/formations/edit-formation';


const ThemesListing: React.FC = () => {
  const { isRtl } = useTranslate();
  const navigate = useNavigate();

  const [component, setComponent] = useState<Components>('table');

  const [defaultValue, setdefaultValue] = useState<Theme | null>(null);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        component={component}
        EditAndAddRow={
          <EditFormation crud={component} defaultValues={defaultValue} />
        }
        setComponent={setComponent}
        headTitle="formation.formation"
        columns={themeColumns(
          () => navigate({ to: '/group-listing' as string }),
          (rowData: Theme) => {
            setdefaultValue(rowData);
            setComponent('edit');
          }
        )}
        data={mockThemes}
      />
    </div>
  );
};

export default withAuth(ThemesListing);
