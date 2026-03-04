import { NextResponse } from "next/server";
import Spot from "../../models/Spot";
import asyncHandler from "../../middleware/asyncHandler";

export const GET = asyncHandler(async () => {
  const spots = await Spot.find();
  console.log(spots)
  console.log("spots")
  return NextResponse.json(spots, { status: 200 });
});
