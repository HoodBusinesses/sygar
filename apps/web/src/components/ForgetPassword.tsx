'use client'

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Image src={logo} width={120} height={120} alt="logo" className="mb-4 " />

      {/* Main card for the reset password form */}
      <Card className="w-full max-w-md p-8 mt-6">
        {!isSuccess ? (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Reset your password
            </h2>
            <p className="text-center text-gray-600 mb-4">
              To reset your password, enter the email address you use to sign in
              to Sygafor.
            </p>
            <ResetPassForm
              isPending={isPending}
              isError={isError}
              emailSent={isSuccess}
              mutate={mutate}
            />
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Redirecting to the login page
            </h2>
            <p className="text-gray-600">
              We will redirect you to the login page
            </p>
            {/* <div className="w-8 h-8 border-4 border-t-4 border-t-transparent border-gray-800 rounded-full animate-spin mt-4 mx-auto"></div> */}
            <FiLoader className="animate-spin text-white w-6 h-6" />
          </div>
        )}
      </Card>
      <hr />
    </div>
  );
}
