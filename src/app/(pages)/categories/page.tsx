"use client";

import Categories from "@/app/Components/Categories/Categories";
import withPrivate from "@/app/Routes/withPrivate";

const CategoriesPage = () => {
  return <Categories />;
};

export default withPrivate(CategoriesPage, ["admin"]);
