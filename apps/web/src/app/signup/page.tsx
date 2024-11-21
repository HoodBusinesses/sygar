'use client';
import React, { useState } from 'react';
import '../../app/globals.css';
import Image from 'next/image';
import images from '@/public/images';

const SignUpPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const logo = images.logo;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-[480px]">
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Sygafor" width={120} height={40} />
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center  mb-8">
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
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Organization Information
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                RS
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ICE
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CNSS
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <input type="file" className="mt-1 w-full" />
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Personal Information
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input type="tel" className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input type="file" className="mt-1 w-full" />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">✉️</div>
            <h2 className="text-2xl font-semibold">Verify your email</h2>
            <p className="text-gray-600">
              We've sent a verification email to your address. Please check your
              inbox and follow the instructions to complete your registration.
            </p>
            <p className="text-sm text-gray-500">
              Didn't receive the email?
              <button className="text-blue-600 ml-1 hover:underline">
                Resend
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
