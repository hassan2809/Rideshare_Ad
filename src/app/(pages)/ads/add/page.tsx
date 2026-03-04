"use client";

import AddAd from "@/app/Components/Ads/AddAd";
import withPrivate from "@/app/Routes/withPrivate";

const AddAdPage = () => {
  return <AddAd />;
};

export default withPrivate(AddAdPage, ["admin", "brand"]);
