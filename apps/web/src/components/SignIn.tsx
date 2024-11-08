'use client';

import { Card } from '@/components/ui/card';
import images from '@/public/images';
import Image from 'next/image';
import React from 'react';
import SignInForm from './SignInForm';

const SignIn: React.FC = () => {
  const logo = images.logo;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <Image src={logo} width={120} height={120} alt="logo" className="mb-4 " />
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <SignInForm />
      </Card>
    </div>
  );
};

export default SignIn;
