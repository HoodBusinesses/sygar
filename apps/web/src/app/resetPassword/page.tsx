import React from "react";
import "../../app/globals.css";
import ResetPassword from "@/components/ResetPassword";

const resetPassword: React.FC = () => {

  return (
    <div className="flex flex-col">
      <ResetPassword />
    </div>
  );
};

export default resetPassword;
