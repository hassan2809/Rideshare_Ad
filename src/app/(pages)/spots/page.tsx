"use client";

import Spots from "@/app/Components/Spots/Spots";
import withPrivate from "@/app/Routes/withPrivate";

const SpotsPage = () => {
  return <Spots />;
};

export default withPrivate(SpotsPage, ["admin"]);
