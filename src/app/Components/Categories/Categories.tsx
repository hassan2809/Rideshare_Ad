import TableBlock from "../Common/Table/TableBlock";
import { useSelector } from "../../Redux/reduxHooks";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../Redux/Slices/categoriesSlice";

const Categories = () => {
  const cats = useSelector(selectCategories);
  const catsLoading = useSelector(selectCategoriesLoading);

  const tableHeaders = [{ text: "Category", key: "name", sortable: true }];

  return (
    <>
      <TableBlock
        heading='Categories'
        subHeading='These are all the categories'
        tableData={cats}
        tableHeaders={tableHeaders}
        emptyStateMessage='There are no categories present.'
        isLoading={catsLoading}
      />
    </>
  );
};

export default Categories;
