import { Columns } from '@renderer/components/organization/Organization-columns';
import { CustomTable } from '@renderer/components/custom-table';
import withAuth from '@renderer/hoc/with-auth';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { useGetAllOrganizations } from '@renderer/hooks/api/get-all-organizations';

const OrganizationsPage: React.FC = () => {
  const { isRtl } = useTranslate();

  const { data, isSuccess, isLoading, isError } = useGetAllOrganizations();

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
              columns={Columns}
              // data={mockOrganizations}
              data={data.map((org, index) => ({
                id: org.uid,
                image: '',
                rs: org.name,
                cnss: org.cnss,
                address: `address_${index}`,
                email: `mock_${index}@gmail.com`,
                responsibleName: `mock_${index}`,
                trainingManagerName: `mock_${index}`,
                date: `date_${index}`,
                enabled: index % 2 === 0
              }))}
            />
      </div>
    );
  }
}

export default withAuth(OrganizationsPage);
