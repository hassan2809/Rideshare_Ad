'use client'

import MyProfile from "@/app/Components/MyProfile/MyProfile";
import withPrivate from "@/app/Routes/withPrivate";

const MyProfilePage = () => {
  return <MyProfile />;
};

export default withPrivate(MyProfilePage);
