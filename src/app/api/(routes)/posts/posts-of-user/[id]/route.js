import { NextResponse } from "next/server";
import Post from "../../../../models/Post";
import asyncHandler from "../../../../middleware/asyncHandler";
import { formatPostData } from "../../../../utils/utils";

export const GET = asyncHandler(async (_, { params }) => {
  const { id: userId } = await params;

  const posts = await Post.find({ userId }).populate({
    path: "userId",
    select: "name picture",
  });

  if (!posts)
    return NextResponse.json("Post with the given id was not found", {
      status: 404,
    });

  const formattedPosts = posts.map((ad) => formatPostData(ad));

  return NextResponse.json(formattedPosts);
});
