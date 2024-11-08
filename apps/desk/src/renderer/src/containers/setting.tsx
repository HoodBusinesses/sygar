import EditProfile from '@renderer/components/EditProfile';
import React from 'react';

const SettingPage = (): JSX.Element => {
  return (
    <div className="flex border items-center justify-center bg-white w-full">
      <EditProfile />
    </div>
  );
};

export default SettingPage;
