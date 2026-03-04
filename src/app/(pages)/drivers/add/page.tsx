"use client";

import AddDriver from "@/app/Components/Drivers/AddDriver";
import withPrivate from "@/app/Routes/withPrivate";

const AddDriverPage = () => {
  return <AddDriver />;
};

export default withPrivate(AddDriverPage, ["admin"]);
