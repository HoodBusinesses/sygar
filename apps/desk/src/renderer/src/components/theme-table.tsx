import { Components, CustomTable } from '@renderer/components/custom-table';
import EditFormation from '@renderer/components/formations/edit-formation';
import {
  Theme,
  themeColumns,
} from '@renderer/components/formations/themes-columns';
import { ThemesData } from '@renderer/hooks/api/theme/get-alll-thems';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export default function ThemeTable({ data, orgId }: { data: ThemesData[], orgId: string }) {
  const navigate = useNavigate();
  const { isRtl } = useTranslate();
  const [component, setComponent] = useState<Components>('table');
  const [defaultValue, setdefaultValue] = useState<Theme | null>(null);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        component={component}
        EditAndAddRowComponent={
          <EditFormation
            crud={component}
            defaultValues={defaultValue}
            goBack={() => setComponent('table')}
            orgId={orgId}
          />
        }
        setComponent={setComponent}
        headTitle="formation.formation"
        columns={themeColumns(
          (themeId: string, orgId: string) =>
            navigate({
              to: `/group-listing?themeId=${themeId}&organizationId=${orgId}` as string,
            }),
          orgId,
          (rowData: Theme) => {
            setdefaultValue(rowData);
            setComponent('edit');
          }
        )}
        data={data.map((theme) => ({
          id: theme.id,
          name: theme.name,
          year: theme.year.toString(),
          price: theme.price,
        }))}
      />
    </div>
  );
}
