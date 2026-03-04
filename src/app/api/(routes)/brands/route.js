import { NextResponse } from "next/server";
import User from "../../models/User";
import Ad from "../../models/Ad";
import asyncHandler from "../../middleware/asyncHandler";
import { roles } from "../../utils/enums";

export const GET = asyncHandler(
  async () => {
    const allBrands = await User.find({ role: roles.BRAND }).select(
      "-password"
    );

    const brandIds = allBrands.map((user) => user._id);

    const adsCount = await Ad.aggregate([
      { $match: { brandId: { $in: brandIds } } },
      { $group: { _id: "$brandId", count: { $sum: 1 } } },
    ]);

    const adsCountMap = {};
    adsCount.forEach((item) => {
      adsCountMap[item._id.toString()] = item.count;
    });

    const brandsWithAdCount = allBrands.map((user) => ({
      ...user.toObject(),
      ads: adsCountMap[user._id.toString()] || 0,
    }));

    return NextResponse.json(brandsWithAdCount);
  },
  { auth: true }
);
