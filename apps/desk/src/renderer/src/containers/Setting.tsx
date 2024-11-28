import EditeSettings from '@renderer/components/EditeSettings';
import { useOrganizationData } from '@renderer/hooks/api/organization/get-organization-data';
import { useAppSelector } from '@renderer/store/hooks';
import { FaSpinner } from 'react-icons/fa';

const SettingPage = (): JSX.Element => {
  const orgId = useAppSelector((state) => state.auth.auth.organizationId);

  const { data, isSuccess, isLoading } = useOrganizationData(orgId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  if (isSuccess) {
    return <EditeSettings data={data} />;
  }

  return (
    <div className="text-red-500 p-4">Error loading organization data</div>
  );
};

export default SettingPage;
