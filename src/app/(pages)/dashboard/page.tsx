"use client";

import Dashboard from "@/app/Components/Dashboard/Dashboard";
import withPrivate from "@/app/Routes/withPrivate";

const DashboardPage = () => {
  return <Dashboard />;
};

export default withPrivate(DashboardPage);
