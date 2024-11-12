import React from 'react';
import { mockGroups } from '@renderer/utils/static/organizations';
import { CustomTable } from '@renderer/components/custom-table';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useNavigate } from '@tanstack/react-router';
import withAuth from '@renderer/hoc/with-auth';
import { groupColumn } from '@renderer/components/formations/groups-columns';

const GroupListing: React.FC = () => {
  const { isRtl } = useTranslate();
  const navigate = useNavigate();
  console.log('GroupThemes -> navigate', navigate);
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        headTitle="group.group"
        columns={groupColumn(() => {
          navigate({ to: '/participant-listing' as string });
        })}
        data={mockGroups}
      />
    </div>
  );
};

export default withAuth(GroupListing);
