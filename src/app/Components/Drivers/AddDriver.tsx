import AddEntityPage from "../ReusablePages/AddEntityPage";
import { FormField } from "../Common/CustomForm";
import { allRoutes } from "../../Routes/AllRoutes";
import { addDriver } from "../../Services/driversService";

const AddDriver = () => {
  const fields: FormField[] = [
    {
      label: "Driver Photo",
      placeholder: "This will be displayed on the profile of Driver",
      name: "picture",
      type: "image",
    },
    {
      required: true,
      label: "Name",
      name: "name",
    },
    {
      required: true,
      label: "Email",
      placeholder: "@example",
      name: "email",
      type: "email",
    },
    {
      required: true,
      label: "Address",
      name: "address",
    },
    {
      required: true,
      label: "Phone Number",
      name: "phone",
      type: "phone",
    },
    {
      required: true,
      label: "Password",
      placeholder: "********",
      name: "password",
      type: "password",
    },
    {
      required: true,
      label: "Confirm Password",
      placeholder: "********",
      name: "confirmPassword",
      type: "password",
    },
  ];

  return (
    <AddEntityPage
      entityType='Driver'
      fields={fields}
      addFn={addDriver}
      backRoute={allRoutes.DRIVERS}
    />
  );
};

export default AddDriver;
