import { NextResponse } from "next/server";
import Ad from "../../../../models/Ad";
import asyncHandler from "../../../../middleware/asyncHandler";
import mongoose from "mongoose";
import { formatAdData } from "../../../../utils/utils";

export const GET = asyncHandler(async (_, { params }) => {
  const { id: adId } = await params;

  if (!mongoose.Types.ObjectId.isValid(adId))
    return NextResponse.json("This ad is not available", { status: 400 });

  const ad = await Ad.findById({ _id: adId })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "brandId", select: "name picture" });

  if (!ad)
    return NextResponse.json("Ad with the given id was not found", {
      status: 404,
    });

  const formattedAd = formatAdData(ad);

  return NextResponse.json(formattedAd);
});
