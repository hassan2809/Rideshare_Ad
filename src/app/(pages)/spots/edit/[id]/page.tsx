"use client";

import EditSpot from "@/app/Components/Spots/EditSpot";
import withPrivate from "@/app/Routes/withPrivate";

const EditSpotPage = () => {
  return <EditSpot />;
};

export default withPrivate(EditSpotPage, ["admin"]);
