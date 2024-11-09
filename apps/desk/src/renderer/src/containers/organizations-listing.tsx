import RegistrationInfo from '@renderer/components/RegistrationInfo';
import { Columns } from '@renderer/components/organization/Organization-columns';
import { CustomTable } from '@renderer/components/custom-table';
import { Button } from '@renderer/components/ui/button';
import withAuth from '@renderer/hoc/with-auth';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { mockOrganizations } from '@renderer/utils/static/organizations';
import { useState } from 'react';

const OrganizationsPage: React.FC = () => {
  const { isRtl } = useTranslate();
  const [EditOrg, setEditOrg] = useState(false);
  // Memoized filtered data
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 gap-y-">
      {EditOrg ? (
        <>
          {/* Header */}
          <Button onClick={setEditOrg.bind(null, false)}>back to org</Button>
          <RegistrationInfo />
        </>
      ) : (
        <>
          {/* Organization Table Component */}
          <CustomTable
            headTitle={'organization.organizations'}
            columns={Columns}
            data={mockOrganizations}
          />
        </>
      )}
    </div>
  );
};

export default withAuth(OrganizationsPage);