import { NextResponse } from "next/server";
import Post from "../../../../models/Post";
import asyncHandler from "../../../../middleware/asyncHandler";
import mongoose from "mongoose";
import { formatPostData } from "../../../../utils/utils";

export const GET = asyncHandler(async (_, { params }) => {
  const { id: postId } = await params;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return NextResponse.json("This post is not available", { status: 400 });

  const post = await Post.findById({ _id: postId }).populate({
    path: "userId",
    select: "name picture",
  });

  if (!post)
    return NextResponse.json("Post with the given id was not found", {
      status: 404,
    });

  const formattedPost = formatPostData(post);

  return NextResponse.json(formattedPost);
});
