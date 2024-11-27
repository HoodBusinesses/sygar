'use client';
import React, { useState } from 'react';
import '../../app/globals.css';
import Image from 'next/image';
import images from '@/public/images';
import OrgInfosForm from './components/OrgInfosForm';
import PersonalInfosForm from './components/PersonalInfosForm';
import SendEmailStep from './components/SendEmailStep';
import { useSignup } from '@/hooks/useSignUp';
import { orgType, ownerType } from '@/lib/schema/schema';
import useHandleCreateAccount from '@/hooks/useHandleCreateAccount';

const SignUpPage: React.FC = () => {
  const {
    orgMethods,
    personMethods,
    step,
    isPending,
    setStep,
    handleOrgSubmit,
    handlePersonSubmit
  } = useHandleCreateAccount();

  const logo = images.logo;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-[480px]">
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Sygafor" width={120} height={40} />
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  className={`h-1 w-24 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <OrgInfosForm 
            onSubmit={handleOrgSubmit}
            orgMethods={orgMethods}
          />
        )}
        {step === 2 && (
          <PersonalInfosForm
            setStep={setStep}
            isLoading={isPending}
            onSubmit={handlePersonSubmit}
            personMethods={personMethods}
            
          />
        )}
        {step === 3 && <SendEmailStep />}
      </div>
    </div>
  );
};

export default SignUpPage;
