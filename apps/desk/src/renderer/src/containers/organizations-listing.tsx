import { Columns, Organization } from '@renderer/components/organization/Organization-columns';
import { Components, CustomTable } from '@renderer/components/custom-table';
import withAuth from '@renderer/hoc/with-auth';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useGetAllOrganizations } from '@renderer/hooks/api/organization/get-all-organizations';
import { useState } from 'react';
import { OrganizationBasicInfo } from '@renderer/components/organization/OrganizationBasicInfo';
import { useNavigate } from '@tanstack/react-router';

const OrganizationsPage: React.FC = (): JSX.Element => {
  const { isRtl } = useTranslate();

  const { data, isSuccess, isLoading, isError } = useGetAllOrganizations();

  const [component, setComponent] = useState<Components>('table');

  const [defaultValue, setdefaultValue] = useState<Organization | null>(null);
  const navigate = useNavigate();

  
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
    console.log('OrganizationsPage -> data', data);
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 gap-y-">
        {/* Organization Table Component */}
        <CustomTable
          headTitle={'organization.organizations'}
          columns={Columns(
            ()=> navigate({ to: '/users-listing' as string }),
            (rowData: Organization) => {
            setdefaultValue(rowData);
            setComponent('edit');
          })}
          component={component}
          setComponent={setComponent}
          EditAndAddRowComponent={
            <OrganizationBasicInfo
              defaultValues={defaultValue}
              goBack={() => setComponent('table')}
            />
          }
          data={data.map((org, index) => ({
            id: org.id,
            logo: '',
            rs: org.name,
            ice: org.ice,
            cnss: org.cnss,
            address: org.address,
            enabled: index % 2 === 0,
          }))}
        />
      </div>
    );
  }
  return <></>;
}

export default withAuth(OrganizationsPage);
