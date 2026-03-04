"use client";

import EditInfluencer from "@/app/Components/Influencers/EditInfluencer";
import withPrivate from "@/app/Routes/withPrivate";

const EditInfluencerPage = () => {
  return <EditInfluencer />;
};

export default withPrivate(EditInfluencerPage, ["admin"]);
