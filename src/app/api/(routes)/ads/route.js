import { NextResponse } from "next/server";
import Ad from "../../models/Ad";
import asyncHandler from "../../middleware/asyncHandler";
import { roles } from "../../utils/enums";
import { formatAdData } from "../../utils/utils";

export const GET = asyncHandler(
  async (req) => {
    const isBrand = req.user.role === roles.BRAND;

    const ads = await Ad.find(isBrand ? { brandId: req.user?._id } : {})
      .populate({ path: "categoryId", select: "name" })
      .populate({ path: "brandId", select: "name picture" });

    const formattedAds = ads.map((ad) => formatAdData(ad));

    return NextResponse.json(formattedAds);
  },
  { auth: true }
);
