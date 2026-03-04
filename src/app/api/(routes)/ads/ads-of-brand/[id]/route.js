import { NextResponse } from "next/server";
import Ad from "../../../../models/Ad";
import asyncHandler from "../../../../middleware/asyncHandler";
import { formatAdData } from "../../../../utils/utils";

export const GET = asyncHandler(async (_, { params }) => {
  const { id: brandId } = await params;

  const ads = await Ad.find({ brandId: brandId })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "brandId", select: "name picture" });

  if (!ads)
    return NextResponse.json("Ad with the given id was not found", {
      status: 404,
    });

  const formattedAds = ads.map((ad) => formatAdData(ad));

  return NextResponse.json(formattedAds);
});
