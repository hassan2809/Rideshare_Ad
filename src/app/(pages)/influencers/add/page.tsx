"use client";

import AddInfluencer from "@/app/Components/Influencers/AddInfluencer";
import withPrivate from "@/app/Routes/withPrivate";

const AddInfluencerPage = () => {
  return <AddInfluencer />;
};

export default withPrivate(AddInfluencerPage, ['admin']);
