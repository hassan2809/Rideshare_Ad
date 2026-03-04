import { NextResponse } from "next/server";
import Post from "../../../../models/Post";
import asyncHandler from "../../../../middleware/asyncHandler";

export const DELETE = asyncHandler(
  async (_, { params }) => {
    const { id } = await params;

    const alreadyDeleted = await Post.findById({ _id: id });
    if (!alreadyDeleted)
      return NextResponse.json("Post with the given id was not found", {
        status: 404,
      });

    await Post.findByIdAndDelete({ _id: id });

    return NextResponse.json("Post deleted successfully!");
  },
  { auth: true }
);
