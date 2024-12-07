import EditeSettings from '@renderer/components/EditeSettings';
import { useOrganizationData } from '@renderer/hooks/api/organization/get-organization-data';
import { useAppSelector } from '@renderer/store/hooks';
import { Loading } from './laoding';

const SettingPage = (): JSX.Element => {
  const orgId = useAppSelector((state) => state.auth.auth.organizationId);

  const { data, isSuccess, isLoading } = useOrganizationData(orgId);

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return <EditeSettings data={data} />;
  }

  return (
    <div className="text-red-500 p-4">Error loading organization data</div>
  );
};

export default SettingPage;
