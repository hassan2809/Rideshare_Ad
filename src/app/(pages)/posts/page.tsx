"use client";

import Posts from "@/app/Components/Posts/Posts";
import withPrivate from "@/app/Routes/withPrivate";

const PostsPage = () => {
  return <Posts />;
};

export default withPrivate(PostsPage, ["admin", "influencer"]);
