"use client";

import AccountSettings from "@/app/Components/AccountSettings/AccountSettings";
import withPrivate from "@/app/Routes/withPrivate";

const AccountSettingsPage = () => {
  return <AccountSettings />;
};

export default withPrivate(AccountSettingsPage);
