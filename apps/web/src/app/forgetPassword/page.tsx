import React from "react";
import "../../app/globals.css";
import ForgetPassword from '@/components/ForgetPassword';

const resetPassword: React.FC = () => {

  return (
    <div className='flex flex-col'>
      <ForgetPassword />
    </div>
  );
};

export default resetPassword;
