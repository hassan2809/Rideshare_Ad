"use client";

import Drivers from "@/app/Components/Drivers/Drivers";
import withPrivate from "@/app/Routes/withPrivate";

const DriversPage = () => {
  return <Drivers />;
};

export default withPrivate(DriversPage, ["admin"]);
