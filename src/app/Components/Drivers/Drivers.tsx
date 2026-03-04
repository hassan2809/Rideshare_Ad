import { allRoutes } from "../../Routes/AllRoutes";
import TableBlock from "../Common/Table/TableBlock";
import CustomTableOptions from "../Common/CustomTableOptions";
import { useRouter } from "next/navigation";
import AvatarWithName from "../Common/AvatarWithName";
import { getAllDrivers } from "../../Services/driversService";

const Drivers = () => {
  const router = useRouter();

  const tableHeaders = [
    {
      text: "Driver",
      key: "name",
      customComponent: (props: { picture: string; name: string }) => (
        <AvatarWithName picture={props.picture} name={props.name} />
      ),
    },
    {
      text: "Email address",
      key: "email",
      showEllipses: true,
      maxWidth: 130,
      sortable: true,
    },
    {
      text: "Address",
      key: "address",
      showEllipses: true,
      maxWidth: 130,
      sortable: true,
    },
    {
      text: "Phone",
      key: "phone",
      sortable: true,
    },
    {
      text: "Points",
      key: "points",
      sortable: true,
    },
    {
      text: "",
      key: "name",
      align: "right",
      notClickable: true,
      customComponent: (props: { _id: string }) => (
        <CustomTableOptions
          menuOptions={[
            {
              text: "Edit Driver",
              onClick: () => {
                router.push(allRoutes.EDIT_DRIVER.replace(":id", props._id));
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <TableBlock
        getDataFn={getAllDrivers}
        heading='Drivers'
        subHeading='These are all the drivers'
        addButtonText='Add Driver'
        addButtonPath={allRoutes.ADD_DRIVER}
        detailsPagePath={allRoutes.VIEW_DRIVER}
        tableHeaders={tableHeaders}
        emptyStateMessage='There are no drivers present. Please add a driver.'
      />
    </>
  );
};

export default Drivers;
