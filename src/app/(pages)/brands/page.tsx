"use client";

import Brands from "@/app/Components/Brands/Brands";
import withPrivate from "@/app/Routes/withPrivate";

const BrandsPage = () => {
  return <Brands />;
};

export default withPrivate(BrandsPage, ["admin"]);
