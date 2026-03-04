"use client";

import { allRoutes } from "../../Routes/AllRoutes";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slices/userSlice";
import {
  isBrandLoggedIn,
  isSuperAdminLoggedIn,
} from "../../Services/userService";
import AvatarWithName from "../Common/AvatarWithName";
import { PageDetailsField } from "../../Utils/types";
import { useRouter } from "next/navigation";
import EntityDetailsPage from "../ReusablePages/EntityDetailsPage";
import { adTypes } from "../../Utils/enums";
import RenderExpiryDate from "../Common/RenderExpiryDate";

const AdDetails = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const isBrand = isBrandLoggedIn();
  const isAdmin = isSuperAdminLoggedIn();

  const fields: PageDetailsField[] = [
    { text: "Name", key: "name" },
    { text: "Description", key: "description" },
    { text: "Category", key: "categoryName" },
    {
      text: "Brand",
      key: "brandName",
      customComponent: (props: any) => (
        <AvatarWithName
          name={props?.brandName}
          picture={props?.brandPicture}
          onClick={() =>
            isBrand && props?.brandId === user?._id
              ? router.push(allRoutes.MY_PROFILE)
              : router.push(
                  allRoutes.VIEW_BRAND.replace(":id", props.brandId || "")
                )
          }
        />
      ),
    },

    ...(isAdmin || isBrand
      ? [
          {
            text: "Ad Type",
            key: "adType",
            customComponent: (props: { adType: string }) =>
              Object.values(adTypes).find((type) => type.value === props.adType)
                ?.name,
          },
          { text: "Views", key: "views" },
          { text: "Time Slots", key: "timeSlots" },
          { text: "Days", key: "days" },
          { text: "States", key: "states" },
        ]
      : []),
    { text: "Publish Date", key: "publishDate", type: "date" },

    ...(isAdmin || isBrand
      ? ([
          {
            text: "Expiry Date",
            key: "expiryDate",
            customComponent: (props: { expiryDate: string }) => (
              <RenderExpiryDate date={props.expiryDate} />
            ),
          },
        ] as PageDetailsField[])
      : []),
  ];

  return (
    <EntityDetailsPage
      entityType='Ad'
      fields={fields}
      editRoute={allRoutes.EDIT_AD}
      backRoute={allRoutes.ADS}
      checkEditAccess={(data) => isBrand && data?.brandId === user?._id}
    />
  );
};

export default AdDetails;
