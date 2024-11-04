"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FiLoader } from "react-icons/fi";
import images from "@/public/images";
import { useActivateAccount } from "@/hooks/useActivateAccount";
import ActivateAccountForm from "./activate-account-form";

const ActivateAccount = () => {
  const { isPending, isError, isSuccess, mutate } = useActivateAccount();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Image
        src={images.logo}
        width={120}
        height={120}
        alt="logo"
        className="mb-4"
      />

      <Card className="w-full max-w-md p-8 mt-6">
        {!isSuccess ? (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Activate Your Account
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Please set your password to activate your account and start using
              our services.
            </p>
            <ActivateAccountForm
              isPending={isPending}
              isError={isError}
              mutate={mutate}
            />
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Account activated successfully
            </h2>
            <p className="text-gray-600 mb-4">
              Your account has been activated. You will be redirected to the
              login page shortly.
            </p>
            <FiLoader className="animate-spin text-blue-600 w-6 h-6 mx-auto" />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ActivateAccount;
