"use client";

import EditBrand from "@/app/Components/Brands/EditBrand";
import withPrivate from "@/app/Routes/withPrivate";

const EditBrandPage = () => {
  return <EditBrand />;
};

export default withPrivate(EditBrandPage, ["admin"]);
