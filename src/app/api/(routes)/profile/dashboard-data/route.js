import User from "../../../models/User";
import Ad from "../../../models/Ad";
import Post from "../../../models/Post";
import Spot from "../../../models/Spot";
import asyncHandler from "../../../middleware/asyncHandler";
import { roles } from "../../../utils/enums";
import { NextResponse } from "next/server";

export const GET = asyncHandler(
  async (req) => {
    
    const isBrand = req.user?.role === roles.BRAND;
    const isInfluencer = req.user?.role === roles.INFLUENCER;

    if (isBrand) {
      const adsCount = await Ad.countDocuments({ brandId: req.user._id });
      return NextResponse.json({ ads: adsCount }, { status: 200 });
    }

    if (isInfluencer) {
      const postsCount = await Post.countDocuments({ userId: req.user._id });
      return NextResponse.json({ posts: postsCount }, { status: 200 });
    }

    // For other roles (e.g., Admin)
    const [users, adsCount, postsCount, spotsCount] = await Promise.all([
      User.find({ role: { $ne: roles.ADMIN } }),
      Ad.countDocuments(),
      Post.countDocuments(),
      Spot.countDocuments(),
    ]);

    const brands = users.filter((u) => u.role === roles.BRAND)?.length || 0;
    const influencers =
      users.filter((u) => u.role === roles.INFLUENCER)?.length || 0;

    return NextResponse.json(
      { ads: adsCount, posts: postsCount, brands, influencers, spots: spotsCount },
      { status: 200 }
    );
  },
  { auth: true }
);
