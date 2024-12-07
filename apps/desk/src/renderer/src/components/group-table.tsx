import { groupsData } from '@renderer/hooks/api/group/get-all';
import { useState } from 'react';
import { Components, CustomTable } from './custom-table';
import EditGroup from './formations/edit-group';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useNavigate } from '@tanstack/react-router';
import { Group, groupColumn } from './formations/groups-columns';

export default function GroupTable({
  data,
  themeId,
  organizationId,
}: {
  data: groupsData[];
  themeId: string;
  organizationId: string;
}) {
  const { isRtl } = useTranslate();
  const navigate = useNavigate();
  const [component, setComponent] = useState<Components>('table');
  const [defaultValue, setdefaultValue] = useState<Group | null>(null);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        component={component}
        EditAndAddRowComponent={
          <EditGroup
            crud={component}
            defaultValues={defaultValue}
            goBack={() => setComponent('table')}
            themeId={themeId}
            organizationId={organizationId}
          />
        }
        setComponent={setComponent}
        headTitle="group.group"
        columns={groupColumn(
          () => navigate({ to: '/participant-listing' as string }),
          organizationId,
          themeId,
          (rowData: Group) => {
            setdefaultValue(rowData);
            setComponent('edit');
          }
        )}
        data={data.map((group) => ({
          id: group.id,
          facilator: group.animatorName,
          trainer: group.trainerName,
          location: group.address,
        }))}
      />
    </div>
  );
}
