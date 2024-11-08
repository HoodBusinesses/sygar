import React from 'react';
import '../../app/globals.css';
import ActivateAccount from '@/components/ActivateAccount';

const forgotPassword: React.FC = () => {
  return (
    <div className="flex flex-col">
      <ActivateAccount />
    </div>
  );
};

export default forgotPassword;
