import EditProfile from '@renderer/components/EditProfile';
import { useGetMe } from '@renderer/hooks/api/user/me';
import { Loading } from './laoding';

const ProfilePage = (): JSX.Element => {
  const { data, isLoading, isError, error, isSuccess, refetch } = useGetMe();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">Error loading organization data</div>
    );
  }

  return (
    <div className="flex border items-center justify-center bg-white w-full">
      <EditProfile data={data} />
    </div>
  );
};

export default ProfilePage;
