"use client";

import AddBrand from "@/app/Components/Brands/AddBrand";
import withPrivate from "@/app/Routes/withPrivate";

const AddBrandPage = () => {
  return <AddBrand />;
};

export default withPrivate(AddBrandPage, ["admin"] );
