import React from 'react';

const SendEmailStep: React.FC = () => {
  return (
    <div className="text-center space-y-4">
      <div className="text-6xl mb-4">✉️</div>
      <h2 className="text-2xl font-semibold">Verify your email</h2>
      <p className="text-gray-600">
        We've sent a verification email to your address. Please check your inbox
        and follow the instructions to complete your registration.
      </p>
      <p className="text-sm text-gray-500">
        Didn't receive the email?
        <button className="text-blue-600 ml-1 hover:underline">Resend</button>
      </p>
    </div>
  );
};

export default SendEmailStep;
