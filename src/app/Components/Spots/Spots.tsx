import { allRoutes } from "../../Routes/AllRoutes";
import TableBlock from "../Common/Table/TableBlock";
import CustomTableOptions from "../Common/CustomTableOptions";
import { useRouter } from "next/navigation";
import moment from "moment";
import AvatarWithName from "../Common/AvatarWithName";
import { getAllSpots } from "../../Services/spotsService";

const Spots = () => {
  const router = useRouter();

  const tableHeaders = [
    {
      text: "Spot",
      key: "name",
      customComponent: (props: { picture: string; name: string }) => (
        <AvatarWithName isSquarish name={props.name} picture={props.picture} />
      ),
    },
    {
      text: "Information",
      key: "information",
      showEllipses: true,
      maxWidth: 130,
    },
    {
      text: "Location",
      key: "location",
      sortable: true,
    },
    {
      text: "Phone",
      key: "phone",
      sortable: true,
    },
    {
      text: "Publish Date",
      key: "publishDate",
      sortable: true,
      customComponent: (props: { publishDate: string }) =>
        moment(props.publishDate).format("LL"),
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
              text: "Edit Spot",
              onClick: () => {
                router.push(allRoutes.EDIT_SPOT.replace(":id", props._id));
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
        heading='Spots'
        subHeading='These are all the spots'
        getDataFn={getAllSpots}
        addButtonText='Add spot'
        addButtonPath={allRoutes.ADD_SPOT}
        detailsPagePath={allRoutes.VIEW_SPOT}
        tableHeaders={tableHeaders}
        emptyStateMessage='There are no spots present. Please add a spot.'
      />
    </>
  );
};

export default Spots;
