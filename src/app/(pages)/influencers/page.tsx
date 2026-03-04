"use client";

import Influencers from "@/app/Components/Influencers/Influencers";
import withPrivate from "@/app/Routes/withPrivate";

const InfluencersPage = () => {
  return <Influencers />;
};

export default withPrivate(InfluencersPage, ["admin"]);
