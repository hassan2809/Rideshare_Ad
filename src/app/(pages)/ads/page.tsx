"use client";

import Ads from "@/app/Components/Ads/Ads";
import withPrivate from "@/app/Routes/withPrivate";

const AdsPage = () => {
  return <Ads />;
};

export default withPrivate(AdsPage, ["admin", "brand"]);
