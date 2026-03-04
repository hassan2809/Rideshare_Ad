"use client";

import Login from "@/app/Components/Login/Login";
import withPublic from "@/app/Routes/withPublic";

const LoginPage = () => {
  return <Login />;
};

export default withPublic(LoginPage);
