import SignIn from "@/components/SignIn";
import React from "react";
import "../../app/globals.css";

const LoginPage: React.FC = () => {

  return (
    <div className="flex flex-col ">
      <SignIn />
    </div>
  );
};

export default LoginPage;
