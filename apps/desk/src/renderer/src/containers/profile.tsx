import EditProfile from '@renderer/components/EditProfile';
import { useGetMe } from '@renderer/hooks/api/user/me';
import { Loading } from './laoding';

const ProfilePage = (): JSX.Element => {
  const { data, isLoading, isError } = useGetMe();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">Error loading organization data</div>
    );
  }

  return <EditProfile data={data} />;
};

export default ProfilePage;
