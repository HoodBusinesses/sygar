import { Dispatch, SetStateAction, useState } from 'react';
import { Components, CustomTable } from '@renderer/components/custom-table';
import { OrganizationBasicInfo } from './organization/OrganizationBasicInfo';
import { OrganizationsData } from '@renderer/hooks/api/organization/get-all-organizations';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { Columns, Organization } from './organization/Organization-columns';
import { useNavigate } from '@tanstack/react-router';

export default function OrgTable({
  data,
  setSearch,
  isReFetching,
  search,
}: {
  data: OrganizationsData[];
  isReFetching: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}) {
  console.log('ikhan:: ', data);

  const navigate = useNavigate();
  const [component, setComponent] = useState<Components>('table');
  const { isRtl } = useTranslate();
  const [defaultValue, setdefaultValue] = useState<Organization | null>(null);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 gap-y-">
      {/* Organization Table Component */}
      <CustomTable
        headTitle={'organization.organizations'}
        setSearch={setSearch}
        isReFetching={isReFetching}
        search={search}
        columns={Columns(
          (orgId: string) =>
            navigate({ to: `/users-listing?orgId=${orgId}` as string }),
          (orgId: string) =>
            navigate({ to: `/themes-listing?orgId=${orgId}` as string }),
          (rowData: Organization) => {
            setdefaultValue(rowData);
            setComponent('edit');
          }
        )}
        component={component}
        setComponent={setComponent}
        EditAndAddRowComponent={
          <OrganizationBasicInfo
            defaultValues={defaultValue}
            goBack={() => setComponent('table')}
          />
        }
        data={Array.isArray(data) ? data.map((org, index) => ({
          id: org.id,
          logo: '',
          rs: org.name,
          ice: org.ice,
          cnss: org.cnss,
          address: org.address,
          enabled: index % 2 === 0,
        })) : []}
      />
    </div>
  );
}
