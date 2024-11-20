import React from 'react';
import { mockGroups } from '@renderer/utils/static/organizations';
import { CustomTable } from '@renderer/components/custom-table';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useNavigate } from '@tanstack/react-router';
import withAuth from '@renderer/hoc/with-auth';
import { groupColumn } from '@renderer/components/formations/groups-columns';
import { useGetAllGroups } from '@renderer/hooks/api/groups/get-all-groups';

const GroupListing: React.FC = () => {
  const { isRtl } = useTranslate();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, isError } = useGetAllGroups();

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

  if (isSuccess) console.log('data', data)
    

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        headTitle="group.group"
        columns={groupColumn(() => {
          navigate({ to: '/participant-listing' as string });
        })}
        // data={data.map((group) => ({
        //   id: Number(group.uid),
        //   facilator: group.action,
        //   trainer: group.themeId,
        //   location: group.location,
        //   date: group.startDate.toString()
        // }))}
        data={mockGroups}
      />
    </div>
  );
};

export default withAuth(GroupListing);
