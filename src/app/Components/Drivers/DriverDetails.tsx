"use client";

import { allRoutes } from "../../Routes/AllRoutes";
import EntityDetailsPage from "../ReusablePages/EntityDetailsPage";

const DriverDetails = () => {
  return (
    <EntityDetailsPage
      entityType='Driver'
      editRoute={allRoutes.EDIT_DRIVER}
      backRoute={allRoutes.DRIVERS}
    />
  );
};

export default DriverDetails;
