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

const SignUpPage: React.FC = () => {
  const mutation = useSignup({
    onSuccess: () => setStep(3),
  });

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<{
    orgInfo: orgType | null;
    personalInfo: ownerType | null;
  }>({
    orgInfo: null,
    personalInfo: null,
  });

  const handleOrgInfoSubmit = (data: orgType) => {
    const updatedFormData = { ...formData, orgInfo: data };
    setFormData(updatedFormData);
    setStep(2);
  };

  const handlePersonalInfoSubmit = (data: ownerType) => {
    const combinedData = { ...formData, personalInfo: data };
    setFormData(combinedData);

    mutation.mutate({
      name: combinedData.orgInfo!.rs,
      address: combinedData.orgInfo!.address,
      cnss: combinedData.orgInfo!.cnss,
      ice: combinedData.orgInfo!.ice,
      owner: {
        cnss: combinedData.personalInfo!.cnss,
        identity: combinedData.personalInfo!.identity,
        identityType: combinedData.personalInfo!.identityType,
        firstName: combinedData.personalInfo!.firstName,
        lastName: combinedData.personalInfo!.lastName,
        email: combinedData.personalInfo!.email,
        phone: combinedData.personalInfo!.phoneNumber,
      },
    });
  };

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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200'
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
          <OrgInfosForm setStep={setStep} onSubmit={handleOrgInfoSubmit} />
        )}
        {step === 2 && (
          <PersonalInfosForm
            isLoading={mutation.isPending}
            setStep={setStep}
            onSubmit={handlePersonalInfoSubmit}
          />
        )}
        {step === 3 && <SendEmailStep />}
      </div>
    </div>
  );
};

export default SignUpPage;
