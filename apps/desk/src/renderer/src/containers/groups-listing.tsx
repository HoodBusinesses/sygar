import React, { useState } from 'react';
import { mockGroups } from '@renderer/utils/static/organizations';
import { Components, CustomTable } from '@renderer/components/custom-table';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useNavigate } from '@tanstack/react-router';
import withAuth from '@renderer/hoc/with-auth';
import { Group, groupColumn } from '@renderer/components/formations/groups-columns';
import EditGroup from '@renderer/components/formations/edit-group';

const GroupListing: React.FC = () => {
  const { isRtl } = useTranslate();
  const navigate = useNavigate();
  const [component, setComponent] = useState<Components>('table');
  const [defaultValue, setdefaultValue] = useState<Group | null>(null);
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        component={component}
        EditAndAddRowComponent={
          <EditGroup crud={component} defaultValues={defaultValue} goBack={()=> setComponent('table')}/>
        }
        setComponent={setComponent}
        headTitle="group.group"
        columns={groupColumn(
          () => navigate({ to: '/participant-listing' as string }),
          (rowData: Group) => {
            setdefaultValue(rowData);
            setComponent('edit');
          }
        )}
        data={mockGroups}
      />
    </div>
  );
};

export default withAuth(GroupListing);
