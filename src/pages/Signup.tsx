import React from "react";
import SignupForm from "../components/auth/SignupForm";
import Navbar from "../components/Navbar";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
