"use client";

import EditPost from "@/app/Components/Posts/EditPost";
import withPrivate from "@/app/Routes/withPrivate";

const EditPostPage = () => {
  return <EditPost />;
};

export default withPrivate(EditPostPage, ["admin", "influencer"]);
