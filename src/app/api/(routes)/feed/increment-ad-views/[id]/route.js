import Ad from "../../../../models/Ad";
import asyncHandler from "../../../../middleware/asyncHandler";
import { NextResponse } from "next/server";

export const PATCH = asyncHandler(async (_, { params }) => {
  const { id: adId } = await params;

  if (!adId) {
    return NextResponse.json("Ad ID is required", { status: 400 });
  }

  const ad = await Ad.findByIdAndUpdate(
    adId,
    { $inc: { views: 1 } }, // increment views by 1
    { new: true } // return updated document
  );

  if (!ad) {
    return NextResponse.json("Ad not found", { status: 404 });
  }

  return NextResponse.json({ message: "Ad view incremented", views: ad.views });
});
