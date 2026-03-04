import { NextResponse } from "next/server";
import Post from "../../models/Post";
import asyncHandler from "../../middleware/asyncHandler";
import { roles } from "../../utils/enums";
import { formatPostData } from "../../utils/utils";

export const GET = asyncHandler(
  async (req) => {
    const isInfluencer = req.user.role === roles.INFLUENCER;

    const posts = await Post.find(
      isInfluencer ? { userId: req.user?._id } : {}
    ).populate({
      path: "userId",
      select: "name picture",
    });

    const formattedPosts = posts.map((ad) => formatPostData(ad));

    return NextResponse.json(formattedPosts);
  },
  { auth: true }
);
