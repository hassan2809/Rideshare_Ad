"use client";

import AddPost from "@/app/Components/Posts/AddPost";
import withPrivate from "@/app/Routes/withPrivate";

const AddPostPage = () => {
  return <AddPost />;
};

export default withPrivate(AddPostPage, ["admin", "influencer"]);
