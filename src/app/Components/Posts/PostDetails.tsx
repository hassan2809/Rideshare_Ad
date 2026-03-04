"use client";

import { allRoutes } from "../../Routes/AllRoutes";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slices/userSlice";
import { isInfluencerLoggedIn } from "../../Services/userService";
import AvatarWithName from "../Common/AvatarWithName";
import { PageDetailsField } from "../../Utils/types";
import { useRouter } from "next/navigation";
import EntityDetailsPage from "../ReusablePages/EntityDetailsPage";

const PostDetails = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const isInfluencer = isInfluencerLoggedIn();

  const fields: PageDetailsField[] = [
    { text: "Name", key: "name" },
    { text: "Description", key: "description" },
    {
      text: "Influencer",
      key: "userName",
      customComponent: (props: any) => (
        <AvatarWithName
          name={props?.userName}
          picture={props?.userPicture}
          onClick={() =>
            isInfluencer && props?.userId === user?._id
              ? router.push(allRoutes.MY_PROFILE)
              : router.push(
                  allRoutes.VIEW_INFLUENCER.replace(":id", props.userId)
                )
          }
        />
      ),
    },
    { text: "Publish Date", key: "publishDate", type: "date" },
  ];

  return (
    <EntityDetailsPage
      entityType='Post'
      fields={fields}
      editRoute={allRoutes.EDIT_POST}
      backRoute={allRoutes.POSTS}
      checkEditAccess={(data) => isInfluencer && data?.userId === user?._id}
    />
  );
};

export default PostDetails;
