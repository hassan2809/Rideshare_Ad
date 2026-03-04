import { allRoutes } from "../../Routes/AllRoutes";
import { PageDetailsField } from "../../Utils/types";
import EntityDetailsPage from "../ReusablePages/EntityDetailsPage";

const SpotDetails = () => {
  const fields: PageDetailsField[] = [
    { text: "Name", key: "name" },
    { text: "Information", key: "information" },
    { text: "Location", key: "location" },
    { text: "Phone", key: "phone" },
    { text: "Publish Date", key: "publishDate", type: "date" },
  ];

  return (
    <EntityDetailsPage
      entityType='Spot'
      fields={fields}
      editRoute={allRoutes.EDIT_SPOT}
      backRoute={allRoutes.SPOTS}
    />
  );
};

export default SpotDetails;
