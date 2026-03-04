"use client";

import Logout from "@/app/Components/Logout/Logout";
import withPrivate from "@/app/Routes/withPrivate";

const LogoutPage = () => {
  return <Logout />;
};

export default withPrivate(LogoutPage);
