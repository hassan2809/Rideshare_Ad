"use client";

import EditDriver from "@/app/Components/Drivers/EditDriver";
import withPrivate from "@/app/Routes/withPrivate";

const EditDriverPage = () => {
  return <EditDriver />;
};

export default withPrivate(EditDriverPage, ["admin"]);
