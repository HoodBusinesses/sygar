import EditProfile from '@renderer/components/EditProfile';

const ProfilePage = (): JSX.Element => {
  return (
    <div className="flex border items-center justify-center bg-white w-full">
      <EditProfile />
    </div>
  );
};

export default ProfilePage;
