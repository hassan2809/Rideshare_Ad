"use client";

import AddSpot from "@/app/Components/Spots/AddSpot";
import withPrivate from "@/app/Routes/withPrivate";

const AddSpotPage = () => {
  return <AddSpot />;
};

export default withPrivate(AddSpotPage, ["admin"]);
