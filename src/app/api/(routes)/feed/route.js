import Post from "../../models/Post";
import asyncHandler from "../../middleware/asyncHandler";
import { NextResponse } from "next/server";
import { formatPostData } from "../../utils/utils";

export const GET = asyncHandler(async () => {
  const posts = await Post.find().sort({ _id: -1 }).populate({
    path: "userId",
    select: "name picture",
  });

  const formattedPosts = posts.map((ad) => formatPostData(ad));

  return NextResponse.json(formattedPosts, { status: 200 });
});
