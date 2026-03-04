"use client";

import EditAd from "@/app/Components/Ads/EditAd";
import withPrivate from "@/app/Routes/withPrivate";

const EditAdPage = () => {
  return <EditAd />;
};

export default withPrivate(EditAdPage, ['admin', 'brand']);
