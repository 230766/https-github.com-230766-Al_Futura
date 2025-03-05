import React from "react";
import LoginForm from "../components/auth/LoginForm";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
