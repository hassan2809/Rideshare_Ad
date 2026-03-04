import { NextResponse } from "next/server";
import User from "../../models/User";
import Post from "../../models/Post";
import asyncHandler from "../../middleware/asyncHandler";
import { roles } from "../../utils/enums";

export const GET = asyncHandler(
  async () => {
    const allInfluencer = await User.find({ role: roles.INFLUENCER }).select(
      "-password"
    );

    const influencerIds = allInfluencer.map((user) => user._id);

    const postsCount = await Post.aggregate([
      { $match: { userId: { $in: influencerIds } } },
      { $group: { _id: "$userId", count: { $sum: 1 } } },
    ]);

    const postsCountMap = {};
    postsCount.forEach((item) => {
      postsCountMap[item._id.toString()] = item.count;
    });

    const influencersWithPostCount = allInfluencer.map((user) => ({
      ...user.toObject(),
      posts: postsCountMap[user._id.toString()] || 0,
    }));

    return NextResponse.json(influencersWithPostCount);
  },
  { auth: true }
);
