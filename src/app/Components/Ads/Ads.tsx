"use client";

import { allRoutes } from "../../Routes/AllRoutes";
import TableBlock from "../Common/Table/TableBlock";
import CustomTableOptions from "../Common/CustomTableOptions";
import { useRouter } from "next/navigation";
import { getAllAds } from "../../Services/adsService";
import moment from "moment";
import AvatarWithName from "../Common/AvatarWithName";
import { adTypes } from "../../Utils/enums";
import RenderExpiryDate from "../Common/RenderExpiryDate";

export const commonAdsTableHeaders = [
  {
    text: "Ad",
    key: "name",
    customComponent: (props: { picture: string; name: string }) => (
      <AvatarWithName isSquarish name={props.name} picture={props.picture} />
    ),
  },
  {
    text: "Category",
    key: "categoryName",
    showEllipses: true,
    maxWidth: 130,
    sortable: true,
  },
  {
    text: "Brand",
    key: "brand",
    sortable: true,
    customComponent: (props: { brandName: string }) => props.brandName,
  },
  {
    text: "Views",
    key: "views",
    sortable: true,
  },
  {
    text: "Ad Type",
    key: "adType",
    sortable: true,
    customComponent: (props: { adType: string }) =>
      Object.values(adTypes).find((type) => type.value === props.adType)?.name,
  },
  {
    text: "Publish Date",
    key: "publishDate",
    sortable: true,
    customComponent: (props: { publishDate: string }) =>
      moment(props.publishDate).format("LL"),
  },
  {
    text: "Expiry Date",
    key: "expiryDate",
    customComponent: (props: { expiryDate: string }) => (
      <RenderExpiryDate date={props.expiryDate} />
    ),
  },
];

const Ads = () => {
  const router = useRouter();

  const tableHeaders = [
    ...commonAdsTableHeaders,
    {
      text: "",
      key: "name",
      align: "right",
      notClickable: true,
      customComponent: (props: { _id: string }) => (
        <CustomTableOptions
          menuOptions={[
            {
              text: "Edit Ad",
              onClick: () => {
                router.push(allRoutes.EDIT_AD.replace(":id", props._id));
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
        getDataFn={getAllAds}
        heading='Ads'
        subHeading='These are all the ads'
        addButtonText='Add ad'
        addButtonPath={allRoutes.ADD_AD}
        detailsPagePath={allRoutes.VIEW_AD}
        tableHeaders={tableHeaders}
        emptyStateMessage='There are no ads present. Please add an ad.'
      />
    </>
  );
};

export default Ads;
