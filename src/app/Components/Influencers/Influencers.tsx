import { allRoutes } from "../../Routes/AllRoutes";
import TableBlock from "../Common/Table/TableBlock";
import CustomTableOptions from "../Common/CustomTableOptions";
import { useRouter } from "next/navigation";
import AvatarWithName from "../Common/AvatarWithName";
import { getAllInfluencers } from "../../Services/influencersService";

const Influencers = () => {
  const router = useRouter();

  const tableHeaders = [
    {
      text: "Influencer",
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
      text: "Posts",
      key: "posts",
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
              text: "Edit Influencer",
              onClick: () => {
                router.push(
                  allRoutes.EDIT_INFLUENCER.replace(":id", props._id)
                );
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
        getDataFn={getAllInfluencers}
        heading='Influencers'
        subHeading='These are all the influencers'
        addButtonText='Add Influencer'
        addButtonPath={allRoutes.ADD_INFLUENCER}
        detailsPagePath={allRoutes.VIEW_INFLUENCER}
        tableHeaders={tableHeaders}
        emptyStateMessage='There are no influencers present. Please add an influencer.'
      />
    </>
  );
};

export default Influencers;
