"use client";

import { Card } from "@/components/ui/card";
import { useForgotPassword } from "@/hooks/useForgetPassword";
import images from "@/public/images";
import Image from "next/image";
import { FiLoader } from "react-icons/fi";
import ResetPassForm from "./forget-pass-form";

export default function ForgetPassword() {
  // Get Logo from public images
  const logo = images.logo;

  const { isPending, isError, isSuccess, mutate } = useForgotPassword();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Logo */}
      <Image src={logo} width={150} height={150} alt="logo" className="mb-6" />

      {/* Main Card Container */}
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {!isSuccess ? (
          <>
            {/* Title */}
            <h2 className="text-center text-2xl font-semibold text-gray-900 mb-2">
              Forget your password
            </h2>

            {/* Description */}
            <p className="text-center text-gray-600 text-sm mb-6">
              To reset your password, enter the email address you use to sign in
              to Sygafor.
            </p>

            {/* Reset Password Form */}
            <ResetPassForm
              isPending={isPending}
              isError={isError}
              mutate={mutate}
            />
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Redirecting to the login page
            </h2>
            <p className="text-gray-600 mb-4">
              We will redirect you to the login page
            </p>
            <FiLoader className="animate-spin text-gray-600 w-8 h-8 mx-auto" />
          </div>
        )}
      </Card>
    </div>
  );
}
