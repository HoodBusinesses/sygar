'use client'

import { Card } from "@/components/ui/card";
import { useResetPassword } from "@/hooks/useResetPassword";
import images from "@/public/images";
import Image from "next/image";
import { FiLoader } from "react-icons/fi";
import ResetPassForm from "./reset-pass-form";

export default function ResetPassword() {
  const logo = images.logo;
  const { isPending, isError, isSuccess, mutate } = useResetPassword();


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Image src={logo} width={120} height={120} alt="logo" className="mb-4" />

      <Card className="w-full max-w-md p-8 mt-6">
        {!isSuccess ? (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Create a New Password
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Enter your new password below to reset it.
            </p>
            <ResetPassForm
              isPending={isPending}
              isError={isError}
              mutate={mutate}
            />
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Password reset successful
            </h2>
            <p className="text-gray-600">
              You will be redirected to the login page shortly.
            </p>
            <FiLoader className="animate-spin text-white w-6 h-6" />
          </div>
        )}
      </Card>
    </div>
  );
}
